# Climate Monitoring Dashboard - Interface Redesign

## Overview
The application has been redesigned with a modern sidebar navigation and enhanced data visualization features focused on historical climate data analysis.

## New Features

### 1. **Sidebar Navigation**
- Fixed left sidebar with collapsible menu
- Quick access to all major sections
- Logout button for user session management
- Active page indicator with highlight styling
- Responsive design with collapse/expand toggle

### 2. **Dashboard (Home Page)**
- Overview of key metrics from the dataset
- Recent climate data summary
- Temperature charts and statistics
- Quick navigation to detailed analysis
- Event type distribution visualization

### 3. **Map & Cities View** (`/map`)
- Interactive map showing all cities from the dataset
- City selection from the dataset (Agadir, Tetouan, Rabat, Casablanca, Tanger)
- Search/filter functionality to find cities
- Display of extreme event counts per city
- Quick statistics for selected city:
  - Total records
  - Extreme event count
  - Average temperature and humidity
- Direct link to full historical analysis

### 4. **Historical Data & Analysis** (`/history`) - NEW PAGE
Comprehensive page for analyzing climate data with:

#### City Selection
- Search bar to filter cities
- Grid of all available cities from dataset
- Quick access to city-specific data

#### KPI Dashboard
Displays important metrics including:
- **Extreme Event Days**: Count of days with extreme weather
- **Normal Days**: Count of regular weather days
- **Dominant Event Type**: Most common extreme weather type
- **Temperature Metrics**: Average and maximum temperatures
- **Humidity**: Average humidity levels
- **Pressure**: Average atmospheric pressure
- **Wind**: Average and maximum wind speeds
- **Event Distribution**: Breakdown of event types

#### Data Visualization
Multiple chart options:
1. **🌡️ Temperature** - Line chart showing mean and max temperatures
2. **💧 Humidity** - Humidity trend analysis
3. **🔽 Pressure** - Pressure variations over time
4. **💨 Wind** - Wind speed patterns
5. **⚠️ Extreme Events** - Bar chart of event type distribution
6. **🎯 Scatter** - Temperature vs Humidity correlation

#### Data Table
- Complete table of all records for selected city
- Sortable/scrollable view
- Color-coded extreme event indicators
- Event type display with formatting

### 5. **Updated Dashboard**
- Enhanced layout with gradient cards
- Recent data preview table
- Quick navigation buttons
- Improved visual hierarchy

## Dataset Integration

### Data Loading
- `datasetLoader.ts` utility loads DATASETWIJDANE.csv
- Client-side processing for fast interactions
- Caching for performance optimization

### Available Data Fields
- **city**: City name
- **date**: Record date
- **temp_mean**: Average temperature
- **humidity_mean**: Average humidity
- **pressure_mean**: Atmospheric pressure
- **wind_mean**: Average wind speed
- **temp_max**: Maximum temperature
- **wind_max**: Maximum wind speed
- **event_extreme**: Binary flag for extreme events
- **type_event**: Type of extreme event (canicule, froid, vent_fort, forte_pluie, etc.)
- Additional derived fields (mu_canicule, mu_froid, etc.)

### Cities in Dataset
- Agadir
- Tetouan
- Rabat
- Casablanca
- Tanger
- And others

## UI/UX Improvements

### Color Scheme
- Gradient backgrounds for visual appeal
- Dark mode support
- Color-coded metrics (red for extreme, green for normal, blue for info)
- Consistent icon usage with emojis for quick identification

### Navigation Flow
1. **Login** → Dashboard
2. Dashboard → Map & Cities (for geographic view)
3. Map & Cities → Historical Data (detailed analysis)
4. Dashboard → Historical Data (direct access)
5. Sidebar allows navigation to other features (Predictions, Rules, Data Management)

### Responsive Design
- Mobile-friendly sidebar (collapsible)
- Responsive grid layouts
- Scrollable tables and data containers
- Adaptive chart dimensions

## Technical Stack

### Frontend Components
- **React Router**: Navigation between pages
- **Recharts**: Data visualization (Line, Bar, Scatter charts)
- **Leaflet & React-Leaflet**: Interactive maps
- **Tailwind CSS**: Styling and responsiveness

### State Management
- React hooks (useState, useEffect)
- Local state for city selection and chart type
- LocalStorage for authentication token

### Data Processing
- CSV parsing on client side
- Array filtering and sorting for KPI calculation
- Event type aggregation and statistics

## File Structure

```
frontend/src/
├── components/
│   ├── Sidebar.tsx          (New - Navigation sidebar)
│   ├── KPIsDisplay.tsx      (New - KPI cards component)
│   └── Navbar.tsx           (Existing)
├── pages/
│   ├── Dashboard.tsx        (Updated - Enhanced dashboard)
│   ├── HistoricalData.tsx   (New - Full analysis page)
│   ├── MapView.tsx          (Updated - Dataset integration)
│   ├── Login.tsx
│   ├── Predictions.tsx
│   ├── Rules.tsx
│   └── DataManagement.tsx
├── services/
│   └── api.ts
├── utils/
│   └── datasetLoader.ts     (New - Dataset utilities)
├── main.tsx                 (Updated - Layout structure)
└── index.css
```

## How to Use

### Workflow 1: Quick Dashboard View
1. Login
2. View summary metrics on Dashboard
3. See recent data table
4. Click "View Full History" for detailed analysis

### Workflow 2: Geographic Analysis
1. Login
2. Navigate to "Map & Cities"
3. Click on city in map or select from list
4. View city quick stats
5. Click "View Full History & Analysis"

### Workflow 3: Deep Data Analysis
1. Login
2. Navigate to "Historical Data"
3. Search and select city
4. View comprehensive KPIs
5. Choose different chart types to visualize various metrics
6. Review data table for record details

## Key Features Implemented

✅ Sidebar navigation menu  
✅ City selection from dataset  
✅ Search functionality for cities  
✅ Multiple chart types (6 visualization options)  
✅ Comprehensive KPI display  
✅ Data table with extreme event highlighting  
✅ Interactive map with city markers  
✅ Responsive design  
✅ Dark mode support  
✅ Event type distribution analysis  
✅ Statistical calculations (average, max, counts)  

## Future Enhancements

- Real-time data updates
- Advanced filtering options
- Export data functionality
- Custom date range selection
- User preferences for visualization
- Predictive analytics integration
- Alert system for extreme events
