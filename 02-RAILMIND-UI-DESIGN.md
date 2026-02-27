# RailMind – Complete UI/UX Design System

---

## DESIGN SYSTEM OVERVIEW

### Color Palette

```
PRIMARY COLORS:
├── Rail Blue: #003A7A (Primary actions, headers)
├── Signal Green: #00AA44 (Confirmation, safety)
├── Alert Red: #DD3333 (Danger, high risk)
├── Warning Yellow: #FFB81C (Caution, medium risk)
├── Station Gold: #FFA500 (Premium, highlights)
└── Track Gray: #F5F5F5 (Background, neutral)

SEMANTIC COLORS:
├── Success: #00AA44
├── Error: #DD3333
├── Warning: #FFB81C
├── Info: #003A7A
├── Neutral: #666666
└── Disabled: #CCCCCC
```

### Typography

```
FONT STACK: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif

SIZES:
├── H1 (Header): 32px, bold
├── H2 (Section): 24px, bold
├── H3 (Subsection): 20px, semibold
├── Body: 16px, regular
├── Small: 14px, regular
├── Caption: 12px, regular

LINE HEIGHTS:
├── Headings: 1.2
├── Body: 1.5
├── Compact: 1.3
```

---

## PAGE LAYOUTS & SCREENS

### 1. AUTHENTICATION SCREENS

#### Login Screen

```
┌──────────────────────────────┐
│   🚆 RailMind                │
├──────────────────────────────┤
│                              │
│    Welcome back!             │
│                              │
│  ┌────────────────────────┐  │
│  │ Phone Number / Email   │  │
│  │ [________________]     │  │
│  └────────────────────────┘  │
│                              │
│  ┌────────────────────────┐  │
│  │ Password               │  │
│  │ [________________]  🔓 │  │
│  └────────────────────────┘  │
│                              │
│  [ ] Remember me             │
│  [Forgot password?]          │
│                              │
│  ┌────────────────────────┐  │
│  │    LOGIN               │  │
│  └────────────────────────┘  │
│                              │
│  OR LOGIN WITH:              │
│  [Google] [Apple] [Phone]    │
│                              │
│  Don't have account?         │
│  [Sign Up] | [Skip for now]  │
│                              │
└──────────────────────────────┘

FEATURES:
- Phone number / email toggle
- Show/hide password
- Social authentication
- Biometric option (mobile)
- Remember me option
- Error state with helpful messages
- Loading state with progress
```

#### OTP Verification Screen

```
┌──────────────────────────────┐
│   Verify your phone          │
├──────────────────────────────┤
│                              │
│   OTP sent to: +91 98765... │
│                              │
│   ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐  │
│   │ │ │ │ │ │ │ │ │ │ │ │  │
│   └─┘ └─┘ └─┘ └─┘ └─┘ └─┘  │
│                              │
│   Didn't receive? [Resend]   │
│   (Resend in 45s)            │
│                              │
│   ┌────────────────────────┐ │
│   │    VERIFY OTP          │ │
│   └────────────────────────┘ │
│                              │
│   [Change number]            │
│                              │
└──────────────────────────────┘

FEATURES:
- 6-digit OTP input fields (autofocus)
- Auto-submit on 6 digits entered
- Timer for resend
- Manual verification button
- Error for wrong OTP
- Loading state during verification
```

---

### 2. HOME SCREEN (Dashboard)

```
┌──────────────────────────────────────┐
│ ☰  RailMind  🔔  👤                 │
├──────────────────────────────────────┤
│                                      │
│  Good Morning, Rajesh! 🌅           │
│                                      │
│  ┌──────────────────────────────┐   │
│  │ 📍 Quick Train Finder        │   │
│  │ ┌────────────┐ ┌──────────┐  │   │
│  │ │ From:  DEL │ │ Return   │  │   │
│  │ │ [Search]   │ │ [Date]   │  │   │
│  │ └────────────┘ └──────────┘  │   │
│  │                              │   │
│  │ ┌────────────┐ ┌──────────┐  │   │
│  │ │ To: BCT    │ │ Traveler │  │   │
│  │ │ [Search]   │ │ [2]      │  │   │
│  │ └────────────┘ └──────────┘  │   │
│  │                              │   │
│  │ ┌──────────────────────────┐ │   │
│  │ │  🔍 SEARCH TRAINS       │ │   │
│  │ └──────────────────────────┘ │   │
│  └──────────────────────────────┘   │
│                                      │
│  ┌──────────────────────────────┐   │
│  │ 🚆 Your Active PNRs          │   │
│  │                              │   │
│  │ ┌────────────────────────┐   │   │
│  │ │ 12623 Rajdhani Express │   │   │
│  │ │ Confirms: 87% ✅       │   │   │
│  │ │ DEL→BCT | Today 6:45 PM   │   │
│  │ │ Seat: 3A | Car: 4      │   │   │
│  │ │ Boarding Strategy →    │   │   │
│  │ └────────────────────────┘   │   │
│  │                              │   │
│  │ ┌────────────────────────┐   │   │
│  │ │ 12312 Shatabdi Express │   │   │
│  │ │ Confirms: 45% ⚠️        │   │   │
│  │ │ DEL→JNH | Tomorrow      │   │   │
│  │ └────────────────────────┘   │   │
│  └──────────────────────────────┘   │
│                                      │
│  ┌──────────────────────────────┐   │
│  │ 📰 Nearby Attractions        │   │
│  │                              │   │
│  │ 🕌 Red Fort - 5 km away     │   │
│  │ 🏨 Taj Mahal Historical      │   │
│  │ 🌳 Yamuna Biodiversity       │   │
│  └──────────────────────────────┘   │
│                                      │
│  ┌──────────────────────────────┐   │
│  │ 🛡️ Travel Safety Score: 92%  │   │
│  │    Today - Moderate Risk      │   │
│  │    [View Details]             │   │
│  └──────────────────────────────┘   │
│                                      │
├──────────────────────────────────────┤
│ 🏠 Home │ 🔍 Search │ 🎫 Bookings │ ⚙️ │
└──────────────────────────────────────┘

FEATURES:
- Smart greeting based on time
- Quick 1-step train finder
- Active PNR cards with confirmation probabilities
- Tourism POI recommendations
- Safety score widget
- Bottom navigation for main sections
```

---

### 3. TRAIN SEARCH & RESULTS

#### Search Results Screen

```
┌─────────────────────────────────┐
│ ← DEL → BCT | Mar 15, 2025      │
├─────────────────────────────────┤
│                                 │
│ Filters: [Class ▼] [Price ▼]   │
│ Sort:    [Speed ▼] [Dept ▼]    │
│                                 │
│ ┌──────────────────────────┐   │
│ │ 12623 Rajdhani Express   │   │
│ │ 🟢 6:45 PM - 9:50 PM     │   │
│ │ 3h 05 min | 400 km       │   │
│ │                          │   │
│ │ AC | 45 seats left       │   │
│ │ ₹4,560 per seat          │   │
│ │                          │   │
│ │ ✓ 92% Punctuality        │   │
│ │ ✓ Only 2 stops           │   │
│ │ → View coaches | Book    │   │
│ └──────────────────────────┘   │
│                                 │
│ ┌──────────────────────────┐   │
│ │ 12312 Shatabdi Express   │   │
│ │ 🟢 7:30 AM - 12:30 PM    │   │
│ │ 5h 00 min | 400 km       │   │
│ │                          │   │
│ │ Chair Car | 12 left      │   │
│ │ ₹1,240 per seat          │   │
│ │                          │   │
│ │ ✓ 88% Punctuality        │   │
│ │ → View coaches | Book    │   │
│ └──────────────────────────┘   │
│                                 │
│ ┌──────────────────────────┐   │
│ │ 12345 Local Express      │   │
│ │ 🟠 10:15 AM - 3:45 PM    │   │
│ │ 5h 30 min | 400 km       │   │
│ │                          │   │
│ │ Sleeper | 234 left       │   │
│ │ ₹450 per seat            │   │
│ │                          │   │
│ │ ⚠️ 65% Punctuality       │   │
│ │ → View coaches | Book    │   │
│ └──────────────────────────┘   │
│                                 │
└─────────────────────────────────┘

CARDS SHOW:
- Train number & name
- Departure & arrival with visual timeline
- Duration & distance
- Class & seat availability
- Price per seat (highlight cheapest)
- Punctuality rating
- Special features (non-stop, etc.)
- CTA buttons (coaches, booking)
```

#### Coach Layout Screen

```
┌───────────────────────────────┐
│ ← 12623 Rajdhani Express     │
│   Coach 4 - AC 3 Tier       │
├───────────────────────────────┤
│                               │
│  FRONT OF TRAIN    →          │
│                               │
│   Coach Positions:            │
│   [1] [2] [3] [4●] [5] [6]   │
│   Position: Middle            │
│   Distance from engine: 400m  │
│                               │
│   ┌────────────────────────┐ │
│   │ COACH LAYOUT (2x2)     │ │
│   │                        │ │
│   │  Window  │  Aisle │ W │ │
│   │    1U   │  3U  │ 5U    │ │
│   │    1M   │  3M  │ 5M    │ │
│   │    1L   │  3L  │ 5L    │ │
│   │ ─────────┼──────┼──── │ │
│   │    2U   │  4U  │ 6U    │ │
│   │    2M   │  4M  │ 6M    │ │
│   │    2L   │  4L  │ 6L    │ │
│   └────────────────────────┘ │
│                               │
│   Legend:  🟩 Available      │
│           🟥 Booked         │
│           🟨 Your seat      │
│           ⚫ Wheelchair     │
│                               │
│   Crowd Density:   ████░░░░░░ │
│   Occupancy: 45%  👥👥👥     │
│                               │
│   Cleanliness: ⭐⭐⭐⭐      │
│   Toilet: Western + Indian    │
│   Water: Available            │
│   Charging: 4 points          │
│   Accessibility: Yes          │
│                               │
│   Safe Coach Score: 88% 🛡️   │
│                               │
│ ┌──────────────────────────┐ │
│ │ SELECT SEAT & CONTINUE  │ │
│ └──────────────────────────┘ │
│                               │
└───────────────────────────────┘

FEATURES:
- Visual coach layout with colors
- Seat selection capability
- Coach statistics (crowd, facilities)
- Position from engine
- Safety rating
- Amenities list
- Real-time occupancy
```

---

### 4. PNR PREDICTION SCREEN

```
┌─────────────────────────────────┐
│ ← PNR: 1234567890             │
├─────────────────────────────────┤
│                                 │
│  12623 Rajdhani Express         │
│  DEL → BCT | Mar 15, 2025       │
│                                 │
│  ┌─────────────────────────┐   │
│  │ CONFIRMATION PREDICTION │   │
│  │                         │   │
│  │    87% ✅              │   │
│  │  ════════════════░░░   │   │
│  │  HIGH CONFIDENCE       │   │
│  │                         │   │
│  │  Status: RAC 5          │   │
│  │  Boarding: Mar 14       │   │
│  │                         │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌──────────────────────────┐  │
│  │ 📊 DETAILED ANALYSIS     │  │
│  │                          │  │
│  │ RAC to CNF Conversion:   │  │
│  │    73% ✓✓✓░             │  │
│  │                          │  │
│  │ Upgrade Probability:     │  │
│  │    42% ✓✓░░             │  │
│  │                          │  │
│  │ Risk Score: 13/100 🟢    │  │
│  │ (Lower is better)        │  │
│  │                          │  │
│  │ Confidence Level: 92%    │  │
│  │ (Based on ML analysis)   │  │
│  │                          │  │
│  └──────────────────────────┘  │
│                                 │
│  ┌──────────────────────────┐  │
│  │ 🎯 BOARDING STRATEGY     │  │
│  │                          │  │
│  │ ✓ Confirm immediately.   │  │
│  │   Ticket likely to      │  │
│  │   confirm before        │  │
│  │   boarding.             │  │
│  │                          │  │
│  │ ✓ Check status after    │  │
│  │   10 PM (cancellation   │  │
│  │   release point)        │  │
│  │                          │  │
│  │ ✓ Keep RAC as backup if │  │
│  │   your plans flexible   │  │
│  │                          │  │
│  │ ✓ Recommended coach: 4   │  │
│  │   (safest & best crowd) │  │
│  │                          │  │
│  └──────────────────────────┘  │
│                                 │
│  ┌──────────────────────────┐  │
│  │ 📈 HISTORICAL ANALYSIS   │  │
│  │                          │  │
│  │ This train avg confirm: │  │
│  │ 89% (excellent)         │  │
│  │                          │  │
│  │ Seasonal demand:         │  │
│  │ 1.2x (moderate increase)│  │
│  │                          │  │
│  │ Cancellation history:    │  │
│  │ 2% (very rare)          │  │
│  │                          │  │
│  └──────────────────────────┘  │
│                                 │
│ 🔄 Refresh | 📲 Share | 🔔 Alert│
│                                 │
└─────────────────────────────────┘

FEATURES:
- Circular progress for confirmation %
- AI confidence indicator
- Detailed breakdown of probabilities
- Risk score color-coded
- Smart boarding recommendations
- Historical pattern analysis
- Auto-refresh capability
- Share & alert options
```

---

### 5. REAL-TIME LOCATION TRACKING

```
┌────────────────────────────────┐
│ ← 12623 Rajdhani Express       │
│   Live Tracking                │
├────────────────────────────────┤
│                                │
│  ┌──────────────────────────┐ │
│  │    LIVE MAP VIEW         │ │
│  │                          │ │
│  │     DELHI ●━━ ━━● AGRA  │ │
│  │    (Origin)         (Next)  │
│  │                          │ │
│  │    Current: Between      │ │
│  │    Panipat & Karnal      │ │
│  │                          │ │
│  │    🚆 Speed: 120 km/h    │ │
│  │    🏃 Delay: +5 mins     │ │
│  │    📍 Accuracy: 98%      │ │
│  │                          │ │
│  └──────────────────────────┘ │
│                                │
│  ┌──────────────────────────┐ │
│  │ 📊 JOURNEY PROGRESS      │ │
│  │                          │ │
│  │  Distance Covered:       │ │
│  │  245 km / 400 km  ███░░░ │ │
│  │  61% Complete    (2h 20m)│ │
│  │                          │ │
│  │  Time Elapsed:           │ │
│  │  2h 30m / 3h 05m ███░░░░ │ │
│  │                          │ │
│  │  ETA Destination:        │ │
│  │  9:50 PM ⏱️  (On time)   │ │
│  │                          │ │
│  └──────────────────────────┘ │
│                                │
│  ┌──────────────────────────┐ │
│  │ 🚉 STATION TIMELINE      │ │
│  │                          │ │
│  │ ✓ DEL 6:45 PM (depart)  │ │
│  │ ✓ Panipat 7:15 PM       │ │
│  │ ✓ Karnal 7:42 PM        │ │
│  │ ◆ Ambala 8:10 PM (next) │ │
│  │   ├─ Exact stop: 8m     │ │
│  │   ├─ Platform: 5        │ │
│  │   ├─ ETA: On time ✓     │ │
│  │   └─ Walk dist: 200m    │ │
│  │                          │ │
│  │ ○ Chandigarh 8:50 PM   │ │
│  │ ○ Jalandhar 10:20 PM   │ │
│  │ ○ Amritsar 11:15 PM    │ │
│  │ ○ BCT 9:50 PM (arrive)  │ │
│  │                          │ │
│  └──────────────────────────┘ │
│                                │
│  🔔 Alerts:                     │
│  • Arrival alert for Ambala    │
│  • Moving to another coach?    │
│  • Next 5 rivers ahead 🌊      │
│                                │
├────────────────────────────────┤
│ 🔄 Refresh (updates every 10s) │
└────────────────────────────────┘

FEATURES:
- Live interactive map
- Real-time speed & delay
- Location accuracy indicator
- Journey progress bar
- Station timeline with details
- Platform number for next station
- Walking distance to coach
- Push notifications for station approach
- Offline estimation fallback
```

---

### 6. CROWD DENSITY FORECAST

```
┌───────────────────────────────┐
│ ← 12623 Rajdhani Express      │
│   Crowd Forecast              │
├───────────────────────────────┤
│                               │
│  ┌─────────────────────────┐ │
│  │ PLATFORM FORECAST       │ │
│  │ Ambala (Next Station)   │ │
│  │ Arrival: 8:10 PM        │ │
│  │                         │ │
│  │ Predicted Crowd:        │ │
│  │ 75% CROWDED 🟠          │ │
│  │ ██████░░ 75/100        │ │
│  │                         │ │
│  │ Boarding Difficulty:    │ │
│  │ MODERATE ⚠️             │ │
│  │                         │ │
│  │ Best Time to Board:     │ │
│  │ 8:12 - 8:15 PM         │ │
│  │ (Quick departure)       │ │
│  │                         │ │
│  └─────────────────────────┘ │
│                               │
│  ┌─────────────────────────┐ │
│  │ COACH-BY-COACH FORECAST │ │
│  │                         │ │
│  │ Coach 1: 40% ██░░░░░░░░ │ │
│  │ Coach 2: 92% █████████░ │ │
│  │ Coach 3: 55% █████░░░░░ │ │
│  │ Coach 4: 48% ████░░░░░░ │ │
│  │ Coach 5: 70% ███████░░░ │ │
│  │ Coach 6: 85% ████████░░ │ │
│  │                         │ │
│  │ 🟢 Recommended: Coach 1 │ │
│  │    (Least crowded)      │ │
│  │                         │ │
│  └─────────────────────────┘ │
│                               │
│  ┌─────────────────────────┐ │
│  │ CROWD HEATMAP           │ │
│  │  (Visual timeline)      │ │
│  │                         │ │
│  │ 7:00 PM ▁▂▃▄▅          │ │
│  │ 7:30 PM ▂▃▄▅▆          │ │
│  │ 8:00 PM ▃▄▅▆▇          │ │
│  │ 8:10 PM ▅▆▇█░ ← You    │ │
│  │ 8:30 PM ▂▃▄▅▆          │ │
│  │ 9:00 PM ▁▂▃▄▅          │ │
│  │                         │ │
│  │ Peak: 8-9 PM           │ │
│  │                         │ │
│  └─────────────────────────┘ │
│                               │
│  🔔 Alert Preferences         │
│  ☑ Notify if crowd > 70%     │
│  ☑ Suggest less crowded coach│
│  ☑ Boarding time suggestion  │
│                               │
└───────────────────────────────┘

FEATURES:
- Real-time platform forecast
- Coach-by-coach occupancy
- Boarding difficulty score
- Optimal boarding time window
- Historical crowd patterns
- Visual heatmap
- Notification preferences
- Coach recommendations
```

---

### 7. SAFETY & SECURITY DASHBOARD

```
┌─────────────────────────────────┐
│ ← Safety Information            │
├─────────────────────────────────┤
│                                 │
│  ┌───────────────────────────┐ │
│  │ YOUR JOURNEY SAFETY SCORE │ │
│  │                           │ │
│  │       88% 🛡️ SAFE        │ │
│  │     ════════░░░░         │ │
│  │                           │ │
│  │ Overall Risk: LOW ✓       │ │
│  │ Status: Green Zone        │ │
│  │                           │ │
│  └───────────────────────────┘ │
│                                 │
│  ┌───────────────────────────┐ │
│  │ SAFETY BREAKDOWN          │ │
│  │                           │ │
│  │ Time of Travel:           │ │
│  │ Evening (6-9 PM)          │ │
│  │ Risk: ▄░░░░ LOW ✓        │ │
│  │                           │ │
│  │ Route Safety:             │ │
│  │ Delhi-Mathura Corridor    │ │
│  │ Risk: ▂░░░░ VERY LOW ✓   │ │
│  │                           │ │
│  │ Coach Selection:          │ │
│  │ AC 3-Tier, Mid-train      │ │
│  │ Risk: ▃░░░░ LOW ✓        │ │
│  │                           │ │
│  │ Crowd Density:            │ │
│  │ 48% (Good visibility)     │ │
│  │ Risk: ▂░░░░ VERY LOW ✓   │ │
│  │                           │ │
│  │ Crime Incidents (past yr):│ │
│  │ 3 (Rare) Delhi Zone       │ │
│  │ Risk: ▂░░░░ VERY LOW ✓   │ │
│  │                           │
│  └───────────────────────────┘ │
│                                 │
│  ┌───────────────────────────┐ │
│  │ 🚨 EMERGENCY FEATURES     │ │
│  │                           │ │
│  │ ┌─────────────────────┐   │ │
│  │ │ ⚠️ SOS PANIC BUTTON │   │ │ (Red, always visible)
│  │ │ One-tap emergency   │   │ │ (Requires 3s hold)
│  │ │ Shares location,    │   │ │ (Alerts GRP/RPF)
│  │ │ phone with GRP      │   │ │ (Notifies emergency
│  │ └─────────────────────┘   │ │  contacts)
│  │                           │ │
│  │ Emergency Contacts:       │ │
│  │ • GRP (Government Railway │ │
│  │   Police): +91-11-XXXX   │ │
│  │ • RPF (Railway Protec):   │ │
│  │   +91-11-YYYY             │ │
│  │ • Local Police: 100       │ │
│  │ • Woman Helpline: 1090    │ │
│  │                           │ │
│  └───────────────────────────┘ │
│                                 │
│  ┌───────────────────────────┐ │
│  │ SAFE COACH RECOMMENDATION │ │
│  │                           │ │
│  │ Recommended: Coach 4      │ │
│  │                           │ │
│  │ Why?                      │ │
│  │ ✓ Closest to security    │ │
│  │ ✓ Good crowd density     │ │
│  │ ✓ Better lighting        │ │
│  │ ✓ Near women's section   │ │
│  │ ✓ Quick exit to platform │ │
│  │                           │ │
│  │ Safety Features:          │ │
│  │ • CCTV Camera (Yes)      │ │
│  │ • Alarm Chain (Yes)      │ │
│  │ • Wheelchair Access      │ │
│  │                           │ │
│  └───────────────────────────┘ │
│                                 │
│  ┌───────────────────────────┐ │
│  │ 🗺️ CRIME HEATMAP         │ │
│  │                           │ │
│  │ Delhi Zone (Annual):      │ │
│  │ ● Red Zone (High):        │ │
│  │   - Dwarka: 45 incidents  │ │
│  │   - Outer Delhi: 38       │ │
│  │                           │ │
│  │ ● Yellow (Medium):        │ │
│  │   - Central Delhi: 15     │ │
│  │                           │ │
│  │ ● Green (Safe):           │ │
│  │   - Your route: 3 inc.    │ │
│  │                           │ │
│  │ Most Common Crimes:       │ │
│  │ 1. Pickpocketing (55%)    │ │
│  │ 2. Bag snatching (25%)    │ │
│  │ 3. Harassment (15%)       │ │
│  │ 4. Theft (5%)             │ │
│  │                           │ │
│  │ Prevention Tips:          │ │
│  │ ✓ Secure valuables       │ │
│  │ ✓ Avoid solo travel late  │ │
│  │ ✓ Trust your instincts    │ │
│  │ ✓ Stay aware, not scared  │ │
│  │                           │ │
│  └───────────────────────────┘ │
│                                 │
│ 🔔 Enable Safety Alerts        │
│ ✉️ Share with Emergency Contact │
│                                 │
└─────────────────────────────────┘

FEATURES:
- Overall safety score & rating
- Detailed risk breakdown
- SOS panic button (prominent, protected)
- Emergency contact list
- Safe coach recommendations
- Crime heatmap & statistics
- Crime prevention tips
- Emergency contact sharing
- Real-time alerts
```

---

### 8. TOURISM & JOURNEY GUIDE

```
┌──────────────────────────────────┐
│ ← Tourism Guide                  │
│   12623 Rajdhani Express         │
├──────────────────────────────────┤
│                                  │
│  🎯 POINTS OF INTEREST          │
│  Upcoming on your route          │
│                                  │
│  ┌────────────────────────────┐ │
│  │ 🕌 TEMPLE (Next 20 mins)   │ │
│  │ Shiva Temple - Panipat     │ │
│  │                            │ │
│  │ 300+ years old Hindu temple│ │
│  │ Architectural style: North │ │
│  │ Indian Hindu                │ │
│  │                            │ │
│  │ Opening: Always open       │ │
│  │ Timing: 5 AM - 10 PM      │ │
│  │                            │ │
│  │ Photography: Allowed       │ │
│  │ Entry: Free                │ │
│  │                            │ │
│  │ [View on Map] [Photos]     │ │
│  │                            │ │
│  │ 🎧 [Play Narration]        │ │
│  │ (2 min audio guide)        │ │
│  │                            │ │
│  └────────────────────────────┘ │
│                                  │
│  ┌────────────────────────────┐ │
│  │ 🌳 FOREST (Next 45 mins)   │ │
│  │ Yamuna Biodiversity        │ │
│  │                            │ │
│  │ Flora:                     │ │
│  │ • Neem, Pipal, Mango     │ │
│  │ • Over 150 tree species   │ │
│  │                            │ │
│  │ Fauna:                     │ │
│  │ • Nilgai (Blue Bull)      │ │
│  │ • Sambar Deer             │ │
│  │ • 200+ bird species       │ │
│  │                            │ │
│  │ Ecological importance:     │ │
│  │ Natural water filtration,  │ │
│  │ carbon sink, habitat       │ │
│  │                            │ │
│  │ 🎧 [Play Narration]        │ │
│  │                            │ │
│  └────────────────────────────┘ │
│                                  │
│  ┌────────────────────────────┐ │
│  │ 🏛️ HISTORICAL SITE         │ │
│  │ Panipat - Battle Ground    │ │
│  │ (Past 10 mins)             │ │
│  │                            │ │
│  │ Historical Event:          │ │
│  │ Three major battles (1526, │ │
│  │ 1556, 1761)                │ │
│  │                            │ │
│  │ Significance:              │ │
│  │ Changed Indian political   │ │
│  │ landscape                  │ │
│  │                            │ │
│  │ 🎧 [Play Narration]        │ │
│  │ (3 min detailed history)   │ │
│  │                            │ │
│  └────────────────────────────┘ │
│                                  │
│  ┌────────────────────────────┐ │
│  │ 🍽️ LOCAL FOOD SPECIALTIES  │ │
│  │ Panipat - Known for:       │ │
│  │                            │ │
│  │ 🥘 Kheer (Rice pudding)    │ │
│  │    Sweet, cooling dessert  │ │
│  │    ⭐⭐⭐⭐ Rating: 4.5   │ │
│  │    Price: ₹50-100/bowl     │ │
│  │                            │ │
│  │ 🌶️ Chole Bhature           │ │
│  │    Fried bread with spice  │ │
│  │    ⭐⭐⭐⭐ Rating: 4.3   │ │
│  │                            │ │
│  │ 🥛 Lassi (Yogurt drink)    │ │
│  │    Traditional cool drink  │ │
│  │    ⭐⭐⭐⭐ Rating: 4.7   │ │
│  │                            │ │
│  │ 📍 Where to buy:           │ │
│  │ At station, from vendors   │ │
│  │ near platform 5            │ │
│  │                            │ │
│  │ Cleanliness: ⭐⭐⭐ (Good) │ │
│  │ Safety: ⭐⭐⭐⭐ (Trusted) │ │
│  │                            │ │
│  └────────────────────────────┘ │
│                                  │
│  ┌────────────────────────────┐ │
│  │ 🏨 ACCOMMODATION (STATION) │ │
│  │ Panipat Junction           │ │
│  │                            │ │
│  │ IRCTC Retiring Rooms:      │ │
│  │ • 2 rooms available (6-12h)│ │
│  │ • ₹200-400 per room        │ │
│  │ • AC, Basic bathroom       │ │
│  │ • Book at counter          │ │
│  │                            │ │
│  │ Nearby Hotels:             │ │
│  │ • Hotel Sunrise (100m)     │ │
│  │   ⭐⭐⭐ ₹800/night       │ │
│  │ • Station view (200m)      │ │
│  │   ⭐⭐ ₹400/night         │ │
│  │                            │ │
│  │ Safety Rating: 8.5/10      │ │
│  │ Budget: ₹400-1000/night    │ │
│  │                            │ │
│  └────────────────────────────┘ │
│                                  │
│  🔊 AUDIO GUIDE SETTINGS         │
│  ☑ English  ☐ Hindi             │
│  Voice: Female                   │
│  Speed: 1x                       │
│  [Disable for offline mode]      │
│                                  │
└──────────────────────────────────┘

FEATURES:
- Real-time POI detection
- Audio narration in multiple languages
- Historical & cultural information
- Food recommendations with ratings
- Accommodation options
- Photo galleries
- Cleanliness ratings
- Duration estimates
- Voice assistant integration
```

---

### 9. ADMIN DASHBOARD

```
┌──────────────────────────────────────┐
│ ☰ RailMind Admin | Rajesh Singh ▼  │
├──────────────────────────────────────┤
│                                      │
│ 📊 REAL-TIME ANALYTICS              │
│                                      │
│ ┌────────┬────────┬────────┬────┐   │
│ │ Active │ PNRs   │ Issues │ SOS │   │
│ │ Users  │ Today  │ Open   │      │   │
│ │        │        │        │     │   │
│ │342.5K  │12.4K   │243     │7    │   │
│ │ ↑8%    │ ↑12%   │ ↑5%    │ ↓3% │   │
│ └────────┴────────┴────────┴────┘   │
│                                      │
│ ┌──────────────────────────────────┐ │
│ │ 🚆 FLEET TRACKING (Live)         │ │
│ │                                  │ │
│ │ Trains On Schedule: 234/250 (94%)│ │
│ │ ▓▓▓▓▓▓▓▓▓▓░░░░░░░░             │ │
│ │                                  │ │
│ │ Delayed Trains: 12               │ │
│ │ • 12623 Rajdhani: +8 mins       │ │
│ │ • 12345 Local: +25 mins         │ │
│ │ • 12567 Express: +3 mins        │ │
│ │ [View all]                       │ │
│ │                                  │ │
│ │ Status by Zone:                  │ │
│ │ Northern: 94% | Central: 88%    │ │
│ │ Eastern: 91%  | Western: 96%    │ │
│ │ Southern: 92% | North-East: 85% │ │
│ │                                  │ │
│ └──────────────────────────────────┘ │
│                                      │
│ ┌──────────────────────────────────┐ │
│ │ 🛡️ CRIME MONITORING              │ │
│ │                                  │ │
│ │ Incidents Today: 23              │ │
│ │                                  │ │
│ │ High Risk Areas:                 │ │
│ │ 🔴 Dwarka Zone: 5 incidents     │ │
│ │ 🟠 Outer Delhi: 3 incidents     │ │
│ │ 🟡 Central: 2 incidents         │ │
│ │                                  │ │
│ │ Incident Types:                  │ │
│ │ Pickpocketing: 12 (52%)         │ │
│ │ Bag snatching: 8 (35%)          │ │
│ │ Harassment: 2 (9%)              │ │
│ │ Theft: 1 (4%)                   │ │
│ │                                  │ │
│ │ SOS Alerts: 7                    │ │
│ │ [View incident details]          │ │
│ │ [Generate report]                │ │
│ │                                  │ │
│ └──────────────────────────────────┘ │
│                                      │
│ ┌──────────────────────────────────┐ │
│ │ 🔧 MAINTENANCE TRACKING          │ │
│ │                                  │ │
│ │ Due for Maintenance:             │ │
│ │ • 12345 Express: 3 days due     │ │
│ │ • 12567 Local: 7 days due      │ │
│ │ • 12789 Rajdhani: 15 days due  │ │
│ │                                  │ │
│ │ In Progress: 8 trains            │ │
│ │ Recently Completed: 5 trains     │ │
│ │ [Full schedule]                  │ │
│ │                                  │ │
│ └──────────────────────────────────┘ │
│                                      │
│ ┌──────────────────────────────────┐ │
│ │ 📞 COMPLAINTS & RESOLUTION       │ │
│ │                                  │ │
│ │ Open Issues: 243                 │ │
│ │ • Critical: 12                   │ │
│ │ • High: 45                       │ │
│ │ • Medium: 98                     │ │
│ │ • Low: 88                        │ │
│ │                                  │ │
│ │ Avg Resolution Time:             │ │
│ │ 4.2 hours (Target: 24h)         │ │
│ │                                  │ │
│ │ Latest Complaints:               │ │
│ │ • Cleanliness issue - Resolving │ │
│ │ • Lost luggage - With GRP       │ │
│ │ • Delayed train - Monitoring    │ │
│ │ [View all]                       │ │
│ │                                  │ │
│ └──────────────────────────────────┘ │
│                                      │
│ ┌──────────────────────────────────┐ │
│ │ 💰 REVENUE ANALYTICS             │ │
│ │                                  │ │
│ │ Daily Revenue: ₹2.34 Cr          │ │
│ │ This Month: ₹45.2 Cr             │ │
│ │ Growth: ↑18% (vs last month)    │ │
│ │                                  │ │
│ │ Revenue by Stream:               │ │
│ │ Subscriptions: 60% (₹27.1 Cr)   │ │
│ │ Sponsored: 25% (₹11.3 Cr)       │ │
│ │ Data API: 15% (₹6.8 Cr)         │ │
│ │                                  │ │
│ │ User Distribution:               │ │
│ │ Free: 2.8M | Premium: 350K     │ │
│ │ Conversion: 12.5%                │ │
│ │ Avg LTV: ₹3,240                 │ │
│ │                                  │ │
│ └──────────────────────────────────┘ │
│                                      │
│ 🔒 Logout                             │
│                                      │
└──────────────────────────────────────┘

ADMIN DASHBOARD FEATURES:
- Real-time key metrics
- Fleet tracking map
- Crime monitoring heatmap
- Maintenance schedule
- Complaint management system
- Revenue analytics
- User analytics
- Compliance reporting
- Permission-based access
- Audit logging
```

---

## COLOR STATES & INDICATORS

```
CONFIRMATION PROBABILITY COLORS:
├── 0-25%:   🔴 Red (Very Low Chance)
├── 25-50%:  🟠 Orange (Low Chance)
├── 50-75%:  🟡 Yellow (Medium Chance)
├── 75-90%:  🟢 Light Green (High Chance)
└── 90-100%: 🟢 Dark Green (Very High)

SAFETY SCORE COLORS:
├── 0-33%:   🔴 Red (Unsafe - Don't Travel)
├── 34-66%:  🟡 Yellow (Moderate - Be Careful)
└── 67-100%: 🟢 Green (Safe - Good to Go)

CROWD DENSITY COLORS:
├── Empty (<20%):      🟢 Light Blue
├── Light (20-40%):    🟢 Green
├── Moderate (40-60%): 🟡 Yellow
├── Crowded (60-80%):  🟠 Orange
└── Full (80-100%):    🔴 Red

DELAY INDICATORS:
├── On Time:      🟢 Green (+/- 5 mins)
├── Slightly Late: 🟡 Yellow (+5 to +15)
├── Late:         🟠 Orange (+15 to +30)
└── Very Late:    🔴 Red (> +30 mins)
```

---

## RESPONSIVE DESIGN BREAKPOINTS

```
MOBILE (< 640px):
├── Single column layout
├── Full-width buttons
├── Stacked cards
├── Bottom navigation
├── Bottom sheet for details
└── Touch-friendly (44px+ targets)

TABLET (640px - 1024px):
├── Two-column layout
├── Side panel navigation
├── Larger touch targets
├── Landscape orientation support
└── Split-view details

DESKTOP (> 1024px):
├── Three+ column layout
├── Top navigation bar
├── Sidebar menu
├── Modal dialogs
├── Keyboard shortcuts
└── Hover states
```

---

## ACCESSIBILITY FEATURES

```
WCAG 2.1 AA COMPLIANCE:
├── Color Contrast (4.5:1 text)
├── Keyboard Navigation (Tab, Enter, ESC)
├── Screen Reader Support (ARIA labels)
├── Focus Indicators (Visible, 3px)
├── Alternative Text (Images)
├── Form Labels (Associated with inputs)
├── Error Messages (Clear, instructive)
├── Page Titles (Unique, descriptive)
└── Language Declaration (HTML lang)

ADDITIONAL FEATURES:
├── Font size adjustment (90-150%)
├── High contrast mode
├── Reduced motion option
├── Sound + Visual alerts
├── Haptic feedback (mobile)
├── Voice narration
├── Closed captions (audio)
├── Simplified language option
└── Dyslexia-friendly font
```

---

## OFFLINE MODE DESIGN

```
OFFLINE CAPABILITIES:
├── Cached train schedules
├── Saved PNR predictions
├── Local map views (cached tiles)
├── Stored user bookings
├── Browsable notifications
└── Queued SMS-based updates

OFFLINE INDICATORS:
├── "Offline Mode" banner at top
├── "Last updated: X mins ago"
├── Grayed-out real-time features
├── Sync button when online
├── Background data sync icon
└── SMS pending indicators

OFFLINE FEATURES:
├── View cached train info
├── Check saved PNRs
├── Offline map (raster tiles)
├── SMS to get updates
│   "Send: PNR 1234567890"
│   Reply: Confirmation status
├── Track via last known location
└── Emergency contacts available
```

