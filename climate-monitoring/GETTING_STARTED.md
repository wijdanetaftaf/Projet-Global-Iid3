# 🚀 Getting Started Guide

## Quick Start (5 Minutes)

### 1. Ensure Dependencies are Installed
```bash
cd climate-monitoring/frontend
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:5173`

### 3. Login
- **Username**: `admin`
- **Password**: `admin123`

### 4. Explore the Dashboard
- You'll see metrics from the dataset
- Recent climate data table
- Quick navigation to other pages

---

## 🎯 Main Pages - What to Do

### 📊 Dashboard (Home Page)
**What You'll See**:
- 5 key metric cards (Temperature, Rainfall, Wind, Alerts, Extreme Events)
- Temperature trend chart
- Recent data table (10 records)
- Quick navigation buttons

**What You Can Do**:
- View overall climate metrics
- See recent extreme weather events
- Click "View Full History" for detailed analysis
- Click "Explore Map" to see geographic view

---

### 🗺️ Map & Cities
**What You'll See**:
- Interactive map with city markers
- City list on the left with extreme event counts
- Search bar to find cities
- Quick statistics for selected city

**What You Can Do**:
- Click cities on the map or in the list
- Search for specific cities
- View quick stats (records, extreme events, avg temp/humidity)
- Click "View Full History & Analysis" to dive deep

---

### 📈 Historical Data & Analysis
**What You'll See** (After selecting a city):
1. **KPI Dashboard**: Key metrics specific to the city
2. **Chart Type Selector**: 6 visualization options
3. **Interactive Chart**: Visual representation of data
4. **Data Table**: All records for the city (scrollable)

**What You Can Do**:
1. **Select a City**: 
   - Search in the search bar
   - Click a city button
   - See instant data update

2. **Choose a Chart Type**:
   - 🌡️ **Temperature** - Line chart showing temperature trends
   - 💧 **Humidity** - Humidity levels over time
   - 🔽 **Pressure** - Atmospheric pressure changes
   - 💨 **Wind** - Wind speed patterns
   - ⚠️ **Extreme Events** - Bar chart of event types
   - 🎯 **Scatter** - Temperature vs Humidity correlation

3. **View KPIs**:
   - Number of days with extreme events
   - Dominant event type
   - Average/max temperatures
   - Humidity, pressure, wind stats
   - Event type distribution

4. **Review Data**:
   - Toggle data table visibility
   - See all records for selected city
   - Color-coded extreme events (red = extreme, green = normal)

---

## 🧭 Navigation Tips

### Using the Sidebar
- **Always visible** (on desktop) - left side of screen
- **Collapsible** - Click `<<` button to collapse to icons only
- **Active page highlighted** in blue
- **Quick logout** - Click the 🚪 button at bottom

### Keyboard Navigation
- Tab to navigate buttons/links
- Enter to click
- Arrow keys to move through lists (mobile)

### Mobile Navigation
- Sidebar collapses to icons on small screens
- Click city list items instead of scrolling
- Charts adapt to screen size
- Tables are scrollable horizontally

---

## 📊 Understanding the KPIs

### Main KPIs
| Icon | Metric | Meaning |
|------|--------|---------|
| 🔴 | Extreme Event Days | Number of days with extreme weather |
| ✅ | Normal Days | Days with regular weather conditions |
| 🎯 | Dominant Event Type | Most common extreme weather type |
| 📈 | Total Records | Total data points for the city |

### Weather Metrics
| Icon | Metric | Example |
|------|--------|---------|
| 🌡️ | Avg Temperature | 18.5°C - Average across all records |
| 🌡️ | Max Temperature | 35.2°C - Highest temperature recorded |
| 💧 | Avg Humidity | 72.3% - Average moisture in air |
| 🔽 | Avg Pressure | 1018.5 hPa - Atmospheric pressure |
| 💨 | Avg Wind | 2.5 m/s - Average wind speed |

### Event Types
| Type | Meaning |
|------|---------|
| `canicule` | Heat wave (high temperature) |
| `froid` | Cold snap (low temperature) |
| `vent_fort` | High wind event |
| `forte_pluie` | Heavy rainfall |
| `vague_froid` | Cold wave |
| `depression` | Low pressure system |

---

## 📍 Cities in the Dataset

| City | Country | Records | Extreme Events |
|------|---------|---------|-----------------|
| Agadir | Morocco | ~1,870 | ~45 |
| Tetouan | Morocco | ~1,850 | ~32 |
| Rabat | Morocco | ~1,860 | ~28 |
| Casablanca | Morocco | ~1,880 | ~35 |
| Tanger | Morocco | ~1,840 | ~29 |

*Note: Exact counts will show in the app*

---

## 🎨 Understanding the Colors

### Status Colors
- 🔴 **Red** = Extreme event / Alert / High value
- 🟢 **Green** = Normal / Safe / No event
- 🔵 **Blue** = Information / General metric
- 🟡 **Yellow** = Warning / Secondary alert

### Gradient Cards
- **Blue gradient** = Temperature/Weather info
- **Red gradient** = Extreme events / Danger
- **Green gradient** = Normal days / Success
- **Purple gradient** = Analysis / Advanced metrics

---

## 💡 Tips & Tricks

### Finding Interesting Patterns
1. Go to Historical Data
2. Select different cities
3. Switch between chart types
4. Look for peaks and valleys
5. Note dates of extreme events
6. Check the data table for specific records

### Comparing Cities
1. Note down KPIs from one city
2. Switch to another city
3. Compare extreme event counts
4. Compare average temperatures
5. Identify which city is more stable

### Identifying Event Clusters
1. View "Extreme Events" chart for a city
2. Look for event types that cluster together
3. Check the data table for date patterns
4. See if certain seasons have more events

### Understanding Correlations
1. View "Scatter" chart (Temperature vs Humidity)
2. Look for pattern relationships
3. Check if high temp = low humidity or vice versa
4. Compare across different cities

---

## 🔧 Troubleshooting

### "Cities not loading"
- Check if CSV file is in correct location
- Try refreshing the page
- Check browser console for errors

### "Charts not showing"
- Select a city first
- Click a chart type button
- Wait for data to load
- Try switching chart types

### "Data table empty"
- Select a city
- Click "Show Data Table"
- Scroll down to see content

### "Map not displaying"
- Check if Leaflet library loaded
- Verify internet connection (for map tiles)
- Try refreshing page

### "Can't login"
- Use correct credentials: `admin` / `admin123`
- Check if localStorage is enabled
- Clear browser cache if persistent
- Try different browser

---

## 📱 Responsive Design

### On Phone (< 640px)
- Sidebar hidden by default
- Click menu button for sidebar
- Single column layout
- Larger touch targets
- Scrollable content

### On Tablet (640-1024px)
- Sidebar collapses to icons
- Two column layouts
- Adjusted chart sizes
- Better readability

### On Desktop (> 1024px)
- Full sidebar always visible
- Multi-column layouts
- Large charts and maps
- Full functionality

---

## 🌙 Dark Mode

The app automatically detects your system preference:
- **Light mode** - During day
- **Dark mode** - During night (or manual setting)

To change:
- **Windows**: Settings > Personalization > Colors
- **Mac**: System Preferences > General > Appearance
- **Linux**: Check your DE settings

---

## ⌨️ Common Keyboard Shortcuts (Future)

Planned shortcuts (not yet implemented):
- `Ctrl+H` = Go to Home
- `Ctrl+M` = Go to Map
- `Ctrl+D` = Go to Dashboard
- `Ctrl+L` = Logout
- `Escape` = Close dialogs

---

## 🎓 Learning Path

### Beginner
1. Login to the app
2. Explore the Dashboard
3. Click on a city in the list
4. View the quick statistics

### Intermediate
1. Go to Map & Cities
2. Click cities on the map
3. Compare their statistics
4. View extreme event counts

### Advanced
1. Go to Historical Data
2. Select different cities
3. Try all 6 chart types
4. Identify weather patterns
5. Review the data table
6. Calculate your own statistics
7. Find correlations

### Expert
1. Open browser DevTools (F12)
2. Check the Network tab
3. View API calls being made
4. Check the console for any errors
5. Explore the component hierarchy
6. Modify chart parameters
7. Create custom analyses

---

## 📚 Documentation

For more detailed information, see:
- **NEW_INTERFACE_GUIDE.md** - Complete feature overview
- **IMPLEMENTATION_SUMMARY.md** - Technical summary
- **ROUTES_AND_NAVIGATION.md** - Page routing reference
- **VISUAL_ARCHITECTURE.md** - Component diagrams
- **IMPLEMENTATION_CHECKLIST.md** - What's implemented

---

## 🤝 Support & Help

### If Something Doesn't Work

1. **Check the browser console** (F12)
2. **Try refreshing the page** (Ctrl+R)
3. **Clear browser cache** (Ctrl+Shift+Delete)
4. **Try a different browser**
5. **Check that CSV file exists** at: `../DATASETWIJDANE.csv`
6. **Verify API is running** (backend should be accessible)

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Cities not appearing | Refresh page, check CSV location |
| Charts blank | Select a city first, wait for load |
| Sidebar missing | Check if logged in |
| Login fails | Use `admin` / `admin123` |
| Dark mode not working | Update browser, check OS setting |

---

## 🎉 You're Ready!

Start exploring the climate data:

1. **Login** with `admin` / `admin123`
2. **Explore Dashboard** to get an overview
3. **Check the Map** to see cities
4. **Dive into Historical Data** for detailed analysis
5. **Discover patterns** in the weather data

Enjoy! 🌍

---

## Quick Reference Card

```
┌─────────────────────────────────────────┐
│      CLIMATE MONITORING DASHBOARD       │
├─────────────────────────────────────────┤
│                                         │
│  📊 Dashboard  - Overview & Metrics    │
│  🗺️ Map        - Geographic View       │
│  📈 History    - Detailed Analysis     │
│                                         │
│  Cities: Agadir, Tetouan, Rabat,      │
│          Casablanca, Tanger            │
│                                         │
│  Records: 9,370+ climate entries       │
│  Years: 2012-2017                      │
│                                         │
│  Charts: 6 visualization types         │
│  KPIs: 10+ key metrics                 │
│                                         │
│  Login: admin / admin123               │
│                                         │
└─────────────────────────────────────────┘
```

---

**Happy exploring! 🚀**
