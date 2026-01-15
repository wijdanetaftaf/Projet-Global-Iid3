# Quick Reference Guide - Routes & Navigation

## Application Routes

### Public Routes
| Route | Page | Purpose |
|-------|------|---------|
| `/login` | Login | User authentication |

### Protected Routes (Require Login)
| Route | Page | Description |
|-------|------|-------------|
| `/` | Dashboard | Home page with metrics and recent data |
| `/map` | Map & Cities | Interactive map with city selection |
| `/history` | Historical Data | Comprehensive data analysis and visualization |
| `/predictions` | Predictions | Weather predictions (existing) |
| `/rules` | Rules | Weather rules management (existing) |
| `/data` | Data Management | Data management tools (existing) |

---

## Navigation Flow

### From Sidebar
The sidebar appears on all authenticated pages and provides quick access to:
```
📊 Dashboard     → Home page with overview
🗺️ Map & Cities   → Interactive map view
📈 Historical Data → Detailed analysis page
🔮 Predictions    → Prediction features
⚙️ Rules          → Rule management
📁 Data Management → Data tools
🚪 Logout         → Exit application
```

### Quick Navigation Paths

**Dashboard**
```
Home (/) 
  ├─ View Full History → (/history)
  └─ Explore Map → (/map)
```

**Map & Cities**
```
Map (/map)
  └─ View Full History & Analysis → (/history)
```

**Historical Data**
```
History (/history)
  ├─ Select City
  ├─ View KPIs
  ├─ Choose Chart Type
  └─ Review Data Table
```

---

## Main Pages Overview

### 1. Dashboard (/)
**Purpose**: Overview and quick summary
**Features**:
- 5 main metric cards
- Temperature trend chart
- Recent data table
- Quick links to other pages

### 2. Map & Cities (/map)
**Purpose**: Geographic exploration
**Features**:
- Interactive Leaflet map
- City list with search
- City selection
- Quick statistics
- Link to detailed analysis

### 3. Historical Data (/history) - **NEW**
**Purpose**: Comprehensive analysis
**Features**:
- City selection and search
- KPI dashboard
- 6 chart visualization types
- Full data table
- Event type analysis

### 4. Login (/login)
**Purpose**: Authentication
**Demo Credentials**:
- Username: `admin` / `analyst` / `viewer`
- Password: `admin123`

---

## Sidebar Component Details

### States
- **Expanded** (default): Shows full labels, 256px wide
- **Collapsed**: Shows icons only, 80px wide
- Toggle with **<<** or **>>** button

### Menu Items (with icons)
```
📊 Dashboard
🗺️ Map & Cities
📈 Historical Data
🔮 Predictions
⚙️ Rules
📁 Data Management
```

### Active States
- Current page highlighted in blue
- Smooth transitions between pages
- Hover effects on navigation items

---

## Historical Data Page - Deep Dive

### Layout
```
┌─────────────────────────────────────────┐
│  Historical Climate Data               │
├──────────────┬──────────────────────────┤
│ City List    │ Main Content             │
│ & Search     ├──────────────────────────┤
│              │ KPI Cards (5x2 grid)     │
│              ├──────────────────────────┤
│              │ Chart Type Selector      │
│              ├──────────────────────────┤
│              │ Chart Display            │
│              ├──────────────────────────┤
│              │ Data Table               │
└──────────────┴──────────────────────────┘
```

### Chart Types Available
1. **Temperature** - Mean and Max (Line Chart)
2. **Humidity** - Humidity levels (Line Chart)
3. **Pressure** - Atmospheric pressure (Line Chart)
4. **Wind** - Mean and Max wind speed (Line Chart)
5. **Extreme Events** - Distribution by type (Bar Chart)
6. **Scatter** - Temperature vs Humidity correlation

### KPI Metrics Displayed
- **Extreme Event Days** - Red badge
- **Normal Days** - Green badge
- **Dominant Event Type** - Purple badge
- **Total Records** - Blue badge
- Average/Max metrics for all weather variables

### Data Table
- 20+ records per page (scrollable)
- All weather metrics
- Extreme event flag with color coding
- Event type display

---

## Login & Authentication

### Login Flow
```
Login Page (/login)
  ├─ Enter credentials
  ├─ Click "Sign in"
  └─ Token stored in localStorage
       └─ Redirected to Dashboard (/)
```

### Logout
- Click "🚪 Logout" in sidebar
- Token removed from localStorage
- Redirected to Login (/login)

### Protected Routes
- Routes check for `token` in localStorage
- Missing token → Redirect to `/login`
- All routes except `/login` are protected

---

## Data Sources

### Dataset Location
`../DATASETWIJDANE.csv` (relative to frontend public folder)

### Supported Cities
- Agadir
- Tetouan
- Rabat
- Casablanca
- Tanger
- (And others in the dataset)

### Data Fields
- city, date, temp_mean, humidity_mean
- pressure_mean, wind_mean, temp_max, wind_max
- event_extreme (0/1 flag)
- type_event (canicule, froid, vent_fort, etc.)

---

## Mobile Responsiveness

### Sidebar
- Desktop: Fixed 256px sidebar
- Mobile: Collapsible toggle

### Pages
- Historical Data: Single column on mobile
- Dashboard: Stacked cards
- Map: Full width map
- Tables: Horizontal scroll

---

## Dark Mode

All pages support dark mode:
- Toggle via browser/OS settings
- Colors adapt automatically
- Gradients work in both themes
- Text contrast preserved

---

## Keyboard Shortcuts (Future)

Recommended additions:
- `Ctrl+H` → Home/Dashboard
- `Ctrl+M` → Map
- `Ctrl+D` → Historical Data
- `Ctrl+L` → Logout
- `Escape` → Close modals

---

## Common Actions

### View City Data
1. Go to Historical Data (`/history`)
2. Search/select city
3. Choose chart type
4. View KPIs and data

### Find Extreme Events
1. Dashboard - see recent extremes
2. Historical Data - filter by city
3. View "Extreme Events" chart
4. Check data table for dates

### Compare Cities
1. Go to Map (`/map`)
2. Compare extreme event counts
3. View city quick stats
4. Navigate to detailed analysis

---

## Error Handling

### No Data Available
- Shows helpful message
- Suggests alternative actions
- Guides user to other pages

### Loading States
- Shows "Loading..." message
- Prevents interaction during load
- Auto-loads data on component mount

---

## Performance Optimization

### Dataset Caching
- CSV loaded once, cached in memory
- All cities extracted on first load
- Filtering done client-side

### Chart Optimization
- Recharts handles large datasets
- Smooth animations
- Responsive rendering

### Memory Management
- Cleanup on component unmount
- No memory leaks
- Efficient state updates

---

## Best Practices

✅ **Always start from Dashboard** for overview  
✅ **Use Map** for geographic context  
✅ **Go to Historical Data** for detailed analysis  
✅ **Use search** to find specific cities  
✅ **Try different charts** to find patterns  
✅ **Review data table** for specific records  

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Sidebar not visible | Logged in? Check localStorage token |
| Cities not loading | CSV file accessible? Check path |
| Charts not rendering | Valid data selected? Check city choice |
| Maps not displaying | Leaflet library loaded? Check console |
| Dark mode not working | Browser supports prefers-color-scheme? |

---

## Development Notes

### Add New Route
1. Create component in `src/pages/`
2. Import in `main.tsx`
3. Add Route in Routes component
4. Add menu item in Sidebar.tsx

### Add New Page
```tsx
// 1. Create page file
export default function NewPage() {
  return <div>Page content</div>
}

// 2. Import in main.tsx
import NewPage from './pages/NewPage'

// 3. Add route
<Route path="/new" element={token ? <NewPage /> : <Navigate to="/login" />} />

// 4. Add to sidebar (optional)
{ label: 'New Page', path: '/new', icon: '📄' }
```

---

This is your complete navigation and routing reference! 🗺️
