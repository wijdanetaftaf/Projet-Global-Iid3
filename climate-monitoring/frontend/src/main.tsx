import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Dashboard from './pages/Dashboard'
import HistoricalData from './pages/HistoricalData'
import Rules from './pages/Rules'
import MapView from './pages/MapView'
import Predictions from './pages/Predictions'
import DataManagement from './pages/DataManagement'
import Sidebar from './components/Sidebar'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
        <Sidebar />
        <main className="ml-64 transition-all duration-300 min-h-screen p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/map" element={<MapView />} />
            <Route path="/history" element={<HistoricalData />} />
            <Route path="/predictions" element={<Predictions />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/data" element={<DataManagement />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

const root = createRoot(document.getElementById('root')!)
console.log('Starting app render...')
root.render(<App />)
console.log('App rendered successfully')
