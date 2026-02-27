// ============================================================================
// RailMind Backend - Core API Implementation
// Node.js + Express + TypeScript
// ============================================================================

// ============================================================================
// 1. PROJECT SETUP
// ============================================================================

/*
DEPENDENCIES (package.json):
{
  "dependencies": {
    "express": "^4.18.0",
    "axios": "^1.6.0",
    "pg": "^8.11.0",
    "redis": "^4.6.0",
    "ws": "^8.14.0",
    "jsonwebtoken": "^9.1.0",
    "bcryptjs": "^2.4.0",
    "cors": "^2.8.5",
    "dotenv": "^16.3.0",
    "joi": "^17.11.0",
    "elasticsearch": "^7.17.0",
    "socket.io": "^4.7.0",
    "pino": "^8.16.0",
    "bull": "^4.11.0"
  }
}

ENVIRONMENT VARIABLES (.env):
DATABASE_URL=postgresql://user:pass@localhost:5432/railmind
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
ELASTICSEARCH_URL=http://localhost:9200
EXTERNAL_API_KEY=xxxxx
NODE_ENV=production
PORT=3000
LOG_LEVEL=info
*/

// ============================================================================
// 2. EXPRESS SERVER SETUP
// ============================================================================

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const pino = require('pino');
const { Pool } = require('pg');
const redis = require('redis');
const WebSocket = require('ws');
const jwt = require('jsonwebtoken');

const app = express();

// Logging
const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty'
  }
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per 15 minutes
  message: 'Too many requests, please try again later',
  standardHeaders: true,
  legacyHeaders: false
});

const strictLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // 5 requests per minute for sensitive endpoints
  skipSuccessfulRequests: true
});

app.use('/api/', limiter);

// Database connections
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
});

const redisClient = redis.createClient({
  url: process.env.REDIS_URL
});
redisClient.connect();

// ============================================================================
// 3. AUTHENTICATION SERVICE
// ============================================================================

class AuthenticationService {
  constructor() {
    this.pool = pool;
    this.redis = redisClient;
    this.jwtSecret = process.env.JWT_SECRET;
    this.jwtExpire = process.env.JWT_EXPIRE || '7d';
  }

  async generateTokens(userId, permissions) {
    const accessToken = jwt.sign(
      {
        sub: userId,
        permissions,
        type: 'access'
      },
      this.jwtSecret,
      { expiresIn: this.jwtExpire }
    );

    const refreshToken = jwt.sign(
      {
        sub: userId,
        type: 'refresh'
      },
      this.jwtSecret,
      { expiresIn: '30d' }
    );

    return { accessToken, refreshToken };
  }

  async validateToken(token) {
    try {
      // Check if token is revoked
      const isRevoked = await this.redis.get(`revoked_token:${token}`);
      if (isRevoked) {
        throw new Error('Token revoked');
      }

      const decoded = jwt.verify(token, this.jwtSecret);
      return decoded;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  async registerUser(phone, email, password, name) {
    const client = await this.pool.connect();
    try {
      // Check if user exists
      const existing = await client.query(
        'SELECT user_id FROM users WHERE phone = $1 OR email = $2',
        [phone, email]
      );

      if (existing.rows.length > 0) {
        throw new Error('User already exists');
      }

      // Hash password
      const bcrypt = require('bcryptjs');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create user
      const result = await client.query(
        `INSERT INTO users (user_id, phone, email, password_hash, name, is_verified)
         VALUES (gen_random_uuid(), $1, $2, $3, $4, FALSE)
         RETURNING user_id, phone, email, name`,
        [phone, email, hashedPassword, name]
      );

      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async loginUser(phone, password) {
    const result = await this.pool.query(
      `SELECT user_id, password_hash, permissions FROM users WHERE phone = $1`,
      [phone]
    );

    if (result.rows.length === 0) {
      throw new Error('User not found');
    }

    const user = result.rows[0];
    const bcrypt = require('bcryptjs');
    const isValid = await bcrypt.compare(password, user.password_hash);

    if (!isValid) {
      throw new Error('Invalid password');
    }

    const tokens = await this.generateTokens(user.user_id, user.permissions);

    // Update last login
    await this.pool.query(
      'UPDATE users SET last_login = NOW() WHERE user_id = $1',
      [user.user_id]
    );

    return {
      userId: user.user_id,
      ...tokens
    };
  }

  async revokeToken(token) {
    const decoded = jwt.decode(token);
    const ttl = Math.floor(decoded.exp - Date.now() / 1000);
    await this.redis.setEx(`revoked_token:${token}`, ttl, '1');
  }
}

// ============================================================================
// 4. TRAIN IDENTIFICATION ENGINE
// ============================================================================

class TrainIdentificationEngine {
  constructor(pool, redis) {
    this.pool = pool;
    this.redis = redis;
  }

  // Search by train number
  async searchByTrainNumber(trainNumber) {
    const cacheKey = `train:${trainNumber}`;

    // Try cache first
    const cached = await this.redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    const result = await this.pool.query(
      `SELECT t.*, s.departure_time, s.arrival_time, s.distance_km
       FROM trains t
       LEFT JOIN schedules s ON t.train_id = s.train_id
       WHERE t.train_number = $1
       LIMIT 1`,
      [trainNumber]
    );

    if (result.rows.length === 0) {
      throw new Error('Train not found');
    }

    const train = result.rows[0];

    // Cache for 24 hours
    await this.redis.setEx(cacheKey, 86400, JSON.stringify(train));

    return train;
  }

  // Search by train name with fuzzy matching
  async searchByTrainName(name, language = 'en') {
    // Use Elasticsearch for fuzzy search
    const results = await this.elasticsearchClient.search({
      index: 'trains',
      body: {
        query: {
          multi_match: {
            query: name,
            fields: ['train_name', 'train_name_hindi'],
            fuzziness: 'AUTO'
          }
        },
        size: 10
      }
    });

    return results.body.hits.hits.map(hit => hit._source);
  }

  // Search by route
  async searchByRoute(origin, destination, date, passengers, preferences = {}) {
    const cacheKey = `route:${origin}:${destination}:${date}`;

    const cached = await this.redis.get(cacheKey);
    if (cached && !preferences.noCache) {
      return JSON.parse(cached);
    }

    const query = `
      SELECT DISTINCT 
        t.train_id,
        t.train_number,
        t.train_name,
        t.train_type,
        s.departure_time,
        s.arrival_time,
        s.travel_duration_minutes,
        s.distance_km,
        t.total_seats,
        CAST(AVG(CAST(s.punctuality_percentage AS FLOAT)) AS INT) as avg_punctuality,
        COUNT(DISTINCT s.schedule_id) as stop_count
      FROM trains t
      JOIN schedules s ON t.train_id = s.train_id
      WHERE 
        s.origin_station_code = $1
        AND s.destination_station_code = $2
        AND s.is_operational = TRUE
        AND t.total_seats >= $3
        AND CAST(s.effective_from AS DATE) <= $4
        AND CAST(s.effective_to AS DATE) >= $4
      GROUP BY t.train_id, t.train_number, s.departure_time, s.arrival_time
      ORDER BY 
        CASE WHEN $5 = 'speed' THEN s.travel_duration_minutes END ASC,
        CASE WHEN $5 = 'price' THEN t.total_seats END DESC,
        CASE WHEN $5 = 'punctuality' THEN avg_punctuality END DESC
      LIMIT 20
    `;

    const result = await this.pool.query(
      query,
      [origin, destination, passengers, new Date(date), preferences.sortBy || 'speed']
    );

    const trains = result.rows;

    // Enrich with availability data
    const enriched = await Promise.all(
      trains.map(async (train) => ({
        ...train,
        seatsAvailable: await this.getAvailableSeats(train.train_id, date),
        predictedConfirmation: await this.predictConfirmation(train.train_id, date),
        crowdForecast: await this.forecastCrowd(train.train_id, origin, destination, date)
      }))
    );

    // Cache for 1 hour
    await this.redis.setEx(cacheKey, 3600, JSON.stringify(enriched));

    return enriched;
  }

  // Find trains near user location
  async searchNearbyTrains(latitude, longitude, radiusKm = 50) {
    const result = await this.pool.query(
      `SELECT DISTINCT t.*, 
              st1.latitude as current_lat, st1.longitude as current_lon,
              st1.station_code as current_station,
              SQRT(POWER(st1.latitude - $1, 2) + POWER(st1.longitude - $2, 2)) * 111 as distance_km
       FROM trains t
       JOIN location_tracking lt ON t.train_id = lt.train_id
       JOIN stations st1 ON lt.current_station_code = st1.station_code
       WHERE SQRT(POWER(st1.latitude - $1, 2) + POWER(st1.longitude - $2, 2)) * 111 <= $3
       ORDER BY distance_km ASC
       LIMIT 10`,
      [latitude, longitude, radiusKm]
    );

    return result.rows;
  }

  async getAvailableSeats(trainId, date) {
    const result = await this.pool.query(
      `SELECT SUM(available_seats) as available FROM coaches 
       WHERE train_id = $1`,
      [trainId]
    );
    return result.rows[0]?.available || 0;
  }

  async predictConfirmation(trainId, date) {
    // Call ML prediction service
    // Returns confirmation probability
    return 85; // Placeholder
  }

  async forecastCrowd(trainId, origin, destination, date) {
    // Call ML crowd forecasting service
    return {
      platformDensity: 65,
      boardingDifficulty: 'MODERATE',
      peakHours: ['18:00', '19:00']
    };
  }
}

// ============================================================================
// 5. LOCATION TRACKING SERVICE
// ============================================================================

class LocationTrackingService {
  constructor(pool, redis) {
    this.pool = pool;
    this.redis = redis;
  }

  async updateTrainLocation(trainId, latitude, longitude, speed, accuracy = 95) {
    const cacheKey = `train:${trainId}:location`;

    // Calculate delay
    const delayMinutes = await this.calculateDelay(trainId, latitude, longitude);

    // Get next station
    const nextStation = await this.getNextStation(trainId, latitude, longitude);
    const eta = await this.calculateETA(trainId, latitude, longitude, nextStation);

    const locationData = {
      trainId,
      latitude,
      longitude,
      speed,
      accuracy,
      delay: delayMinutes,
      nextStation,
      eta,
      timestamp: new Date(),
      trackingMethod: accuracy > 90 ? 'GPS' : 'CellTower'
    };

    // Store in cache (expires in 30 seconds - auto-refresh)
    await this.redis.setEx(cacheKey, 30, JSON.stringify(locationData));

    // Store in database for history
    await this.pool.query(
      `INSERT INTO location_tracking 
       (tracking_id, train_id, latitude, longitude, speed, current_delay_minutes, 
        next_station_code, location_accuracy_percentage, tracking_method, updated_at)
       VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, NOW())`,
      [trainId, latitude, longitude, speed, delayMinutes, nextStation.code, accuracy, 
       accuracy > 90 ? 'GPS' : 'CellTower']
    );

    return locationData;
  }

  async getTrainLocation(trainId) {
    const cacheKey = `train:${trainId}:location`;
    const cached = await this.redis.get(cacheKey);

    if (cached) {
      return JSON.parse(cached);
    }

    // Get latest from database
    const result = await this.pool.query(
      `SELECT * FROM location_tracking 
       WHERE train_id = $1 
       ORDER BY updated_at DESC LIMIT 1`,
      [trainId]
    );

    return result.rows[0] || null;
  }

  async calculateDelay(trainId, latitude, longitude) {
    // Get schedule for this train at this location
    // Compare actual position with expected position
    // Return delay in minutes
    return 0; // Placeholder
  }

  async getNextStation(trainId, latitude, longitude) {
    // Find next scheduled station ahead of current location
    const result = await this.pool.query(
      `SELECT st.station_code, st.station_name, st.latitude, st.longitude
       FROM stations st
       JOIN schedules s ON s.destination_station_code = st.station_code
       WHERE s.train_id = $1
       AND ST_Distance(
         ST_MakePoint($2, $3),
         ST_MakePoint(st.longitude, st.latitude)
       ) > 0
       ORDER BY ST_Distance(...) ASC
       LIMIT 1`,
      [trainId, longitude, latitude]
    );

    return result.rows[0];
  }

  async calculateETA(trainId, latitude, longitude, nextStation) {
    const speed = 60; // km/h (average)
    const distanceKm = this.calculateDistance(latitude, longitude, 
                                             nextStation.latitude, nextStation.longitude);
    const minutesRemaining = Math.ceil((distanceKm / speed) * 60);
    const eta = new Date(Date.now() + minutesRemaining * 60000);
    
    return eta;
  }

  calculateDistance(lat1, lon1, lat2, lon2) {
    // Haversine formula
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
}

// ============================================================================
// 6. PNR PREDICTION ENGINE
// ============================================================================

class PNRPredictionEngine {
  constructor(pool, mlClient) {
    this.pool = pool;
    this.mlClient = mlClient;
  }

  async predictPNR(pnrNumber) {
    // Fetch PNR details
    const pnrData = await this.pool.query(
      `SELECT * FROM pnr_records WHERE pnr_number = $1`,
      [pnrNumber]
    );

    if (pnrData.rows.length === 0) {
      throw new Error('PNR not found');
    }

    const pnr = pnrData.rows[0];

    // Extract features
    const features = await this.extractFeatures(pnr);

    // Call ML model
    const prediction = await this.mlClient.predict({
      model: 'pnr_predictor_v2',
      features
    });

    // Update PNR record
    await this.pool.query(
      `UPDATE pnr_records 
       SET confirmation_probability = $1,
           rac_to_cnf_probability = $2,
           upgrade_probability = $3,
           risk_score = $4
       WHERE pnr_number = $5`,
      [
        prediction.confirmationProbability,
        prediction.racToCnfProbability,
        prediction.upgradeProbability,
        prediction.riskScore,
        pnrNumber
      ]
    );

    return {
      pnrNumber,
      confirmationProbability: prediction.confirmationProbability,
      racToCnfProbability: prediction.racToCnfProbability,
      upgradeProbability: prediction.upgradeProbability,
      riskScore: prediction.riskScore,
      boardingStrategy: this.generateBoardingStrategy(prediction),
      confidenceLevel: prediction.confidence
    };
  }

  async extractFeatures(pnr) {
    const train = await this.pool.query(
      `SELECT * FROM trains WHERE train_id = $1`,
      [pnr.train_id]
    );

    const historicalData = await this.pool.query(
      `SELECT AVG(CAST(confirmation_probability AS FLOAT)) as avg_confirm
       FROM pnr_records 
       WHERE train_id = $1
       AND created_at > NOW() - INTERVAL '90 days'`,
      [pnr.train_id]
    );

    return {
      bookingToTravelGapDays: Math.floor((new Date(pnr.journey_date) - new Date(pnr.booking_date)) / (1000 * 60 * 60 * 24)),
      passengerCount: pnr.passenger_count,
      trainClass: pnr.train_class,
      trainType: train.rows[0].train_type,
      dayOfWeek: new Date(pnr.journey_date).getDay(),
      isWeekend: [0, 6].includes(new Date(pnr.journey_date).getDay()),
      isHoliday: await this.isHoliday(pnr.journey_date),
      historicalConfirmationRate: historicalData.rows[0].avg_confirm,
      trainPunctuality: train.rows[0].punctuality_percentage,
      currentConfirmationStatus: pnr.confirmation_status === 'CNF' ? 1 : 0
    };
  }

  async isHoliday(date) {
    // Check if date is holiday
    return false; // Placeholder
  }

  generateBoardingStrategy(prediction) {
    if (prediction.confirmationProbability > 85) {
      return "Confirm immediately. High success rate. Prepare for travel.";
    } else if (prediction.racToCnfProbability > 70) {
      return "RAC likely to convert. Monitor status till 10 PM cancellation release.";
    } else if (prediction.confirmationProbability > 50) {
      return "Check regularly. Keep monitoring waitlist for changes.";
    } else {
      return "Low probability. Consider booking alternative train or date.";
    }
  }
}

// ============================================================================
// 7. CROWD DENSITY FORECASTING
// ============================================================================

class CrowdDensityForecaster {
  constructor(pool, mlClient) {
    this.pool = pool;
    this.mlClient = mlClient;
  }

  async forecastPlatformCrowd(trainId, stationCode, date, time) {
    // Get historical data
    const historical = await this.pool.query(
      `SELECT occupancy_percentage, recorded_at, is_weekend, is_festival_season
       FROM crowd_density
       WHERE train_id = $1 AND station_id = (SELECT station_id FROM stations WHERE station_code = $2)
       ORDER BY recorded_at DESC
       LIMIT 365`,
      [trainId, stationCode]
    );

    // Extract features
    const features = {
      dayOfWeek: new Date(date).getDay(),
      hour: new Date(time).getHours(),
      isWeekend: [0, 6].includes(new Date(date).getDay()),
      isFestivalSeason: await this.isFestivalSeason(date),
      historicalAverage: historical.rows.reduce((sum, row) => sum + row.occupancy_percentage, 0) / historical.rows.length
    };

    // Call ML model
    const forecast = await this.mlClient.predict({
      model: 'crowd_forecaster_v1',
      features
    });

    return {
      predictedOccupancy: forecast.occupancy,
      crowdingLevel: this.classifyCrowding(forecast.occupancy),
      boardingDifficulty: Math.min(100, forecast.occupancy * 1.25),
      recommendedBoardingTime: this.getOptimalBoardingTime(forecast),
      confidence: forecast.confidence
    };
  }

  classifyCrowding(occupancy) {
    if (occupancy < 20) return 'EMPTY';
    if (occupancy < 40) return 'LIGHT';
    if (occupancy < 60) return 'MODERATE';
    if (occupancy < 80) return 'CROWDED';
    return 'FULL';
  }

  getOptimalBoardingTime(forecast) {
    // Return time window with lowest expected crowd
    return {
      startTime: new Date(Date.now() + 5 * 60000).toISOString(),
      endTime: new Date(Date.now() + 15 * 60000).toISOString()
    };
  }

  async isFestivalSeason(date) {
    // Check if date falls in festival season
    return false; // Placeholder
  }
}

// ============================================================================
// 8. API ROUTES
// ============================================================================

const authService = new AuthenticationService();
const trainEngine = new TrainIdentificationEngine(pool, redisClient);
const locationService = new LocationTrackingService(pool, redisClient);
const pnrEngine = new PNRPredictionEngine(pool, mlClient);
const crowdForecaster = new CrowdDensityForecaster(pool, mlClient);

// Middleware: JWT authentication
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  authService.validateToken(token).then(decoded => {
    req.user = decoded;
    next();
  }).catch(err => {
    res.status(403).json({ error: 'Invalid token' });
  });
};

// Auth Routes
app.post('/api/v1/auth/register', strictLimiter, async (req, res) => {
  try {
    const { phone, email, password, name } = req.body;
    const user = await authService.registerUser(phone, email, password, name);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/v1/auth/login', strictLimiter, async (req, res) => {
  try {
    const { phone, password } = req.body;
    const result = await authService.loginUser(phone, password);
    res.json(result);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

app.post('/api/v1/auth/logout', authenticateToken, async (req, res) => {
  try {
    const token = req.headers['authorization'].split(' ')[1];
    await authService.revokeToken(token);
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Train Discovery Routes
app.get('/api/v1/trains', async (req, res) => {
  try {
    const { number, name } = req.query;
    
    if (number) {
      const train = await trainEngine.searchByTrainNumber(number);
      res.json(train);
    } else if (name) {
      const trains = await trainEngine.searchByTrainName(name);
      res.json(trains);
    } else {
      res.status(400).json({ error: 'Provide train number or name' });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

app.post('/api/v1/trains/search-by-route', authenticateToken, async (req, res) => {
  try {
    const { origin, destination, date, passengers, preferences } = req.body;
    const trains = await trainEngine.searchByRoute(origin, destination, date, passengers, preferences);
    res.json(trains);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/v1/trains/by-location', async (req, res) => {
  try {
    const { lat, lon, radius } = req.query;
    const trains = await trainEngine.searchNearbyTrains(
      parseFloat(lat),
      parseFloat(lon),
      radius ? parseInt(radius) : 50
    );
    res.json(trains);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Location Tracking Routes
app.get('/api/v1/trains/:trainId/location', async (req, res) => {
  try {
    const { trainId } = req.params;
    const location = await locationService.getTrainLocation(trainId);
    res.json(location);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PNR Routes
app.post('/api/v1/pnr/predict', authenticateToken, async (req, res) => {
  try {
    const { pnrNumber } = req.body;
    const prediction = await pnrEngine.predictPNR(pnrNumber);
    res.json(prediction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Crowd Density Routes
app.get('/api/v1/crowd/platform-forecast/:stationCode', async (req, res) => {
  try {
    const { stationCode } = req.params;
    const { trainId, date, time } = req.query;
    const forecast = await crowdForecaster.forecastPlatformCrowd(
      trainId,
      stationCode,
      date,
      time
    );
    res.json(forecast);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Health check
app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date() });
});

// ============================================================================
// 9. WEBSOCKET SERVER (Real-time Updates)
// ============================================================================

const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws) => {
  logger.info('WebSocket client connected');

  ws.on('message', async (message) => {
    try {
      const data = JSON.parse(message);
      
      if (data.type === 'subscribe') {
        if (data.channel === 'train:location') {
          // Send location updates every 5 seconds
          const locationInterval = setInterval(async () => {
            const location = await locationService.getTrainLocation(data.trainId);
            ws.send(JSON.stringify({
              type: 'location:update',
              data: location
            }));
          }, 5000);

          ws.locationInterval = locationInterval;
        } else if (data.channel === 'crowd:updates') {
          // Send crowd density updates every 2 minutes
          const crowdInterval = setInterval(async () => {
            const forecast = await crowdForecaster.forecastPlatformCrowd(
              data.trainId,
              data.stationCode,
              new Date().toISOString().split('T')[0],
              new Date().toISOString().split('T')[1]
            );
            ws.send(JSON.stringify({
              type: 'crowd:update',
              data: forecast
            }));
          }, 120000);

          ws.crowdInterval = crowdInterval;
        }
      }
    } catch (error) {
      logger.error('WebSocket error:', error);
    }
  });

  ws.on('close', () => {
    if (ws.locationInterval) clearInterval(ws.locationInterval);
    if (ws.crowdInterval) clearInterval(ws.crowdInterval);
    logger.info('WebSocket client disconnected');
  });
});

// ============================================================================
// 10. ERROR HANDLING
// ============================================================================

app.use((err, req, res, next) => {
  logger.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// ============================================================================
// 11. SERVER STARTUP
// ============================================================================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`RailMind API server running on port ${PORT}`);
  logger.info(`Environment: ${process.env.NODE_ENV}`);
});

module.exports = {
  AuthenticationService,
  TrainIdentificationEngine,
  LocationTrackingService,
  PNRPredictionEngine,
  CrowdDensityForecaster
};
