import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { loadDataset, getRecordsByCity, ClimateRecord } from '../utils/datasetLoader'
import { useNavigate } from 'react-router-dom'

// City coordinates (Moroccan cities dataset)
const cityCoordinates: Record<string, [number, number]> = {
  'Agadir': [30.4278, -9.5981],
  'Tetouan': [35.5877, -5.3661],
  'Rabat': [34.0209, -6.8416],
  'Casablanca': [33.5731, -7.5898],
  'Tanger': [35.7595, -5.8340],
  'Marrakech': [31.6295, -8.0047],
  'Fez': [34.0647, -5.0031],
  'Tangier': [35.7595, -5.8340],
  'Meknes': [33.8869, -5.5478],
}

export default function MapView() {
  const [cities, setCities] = useState<string[]>([])
  const [selectedCity, setSelectedCity] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [cityRecords, setCityRecords] = useState<ClimateRecord[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    loadDataset().then((data) => {
      if (data.length > 0) {
        const uniqueCities = Array.from(new Set(data.map((r) => r.city))).sort()
        setCities(uniqueCities)
        if (uniqueCities.length > 0) {
          setSelectedCity(uniqueCities[0])
        }
      }
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    if (selectedCity) {
      const records = getRecordsByCity(selectedCity)
      setCityRecords(records)
    }
  }, [selectedCity])

  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSelectCity = (city: string) => {
    setSelectedCity(city)
    setSearchQuery('')
  }

  const getExtremeEventCount = (city: string) => {
    const records = getRecordsByCity(city)
    return records.filter((r) => r.event_extreme === 1).length
  }

  if (loading) {
    return <div className="text-center text-xl">Loading cities from dataset...</div>
  }

  if (cities.length === 0) {
    return <div className="text-center text-xl text-red-500">No cities found in dataset</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">🗺️ Map & Cities</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar - City Selection */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm p-6 space-y-4 max-h-[600px] overflow-y-auto">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Select City</h2>

          {/* Search */}
          <input
            type="text"
            placeholder="Search cities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* City List */}
          <div className="space-y-2">
            {filteredCities.map((city) => {
              const extremeCount = getExtremeEventCount(city)
              return (
                <button
                  key={city}
                  onClick={() => handleSelectCity(city)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition font-medium ${
                    selectedCity === city
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{city}</span>
                    {extremeCount > 0 && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                        {extremeCount}
                      </span>
                    )}
                  </div>
                </button>
              )
            })}
          </div>

          {filteredCities.length === 0 && (
            <div className="text-center text-slate-500 dark:text-slate-400">No cities found</div>
          )}
        </div>

        {/* Map and Info */}
        <div className="lg:col-span-2 space-y-4">
          {/* Map */}
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden" style={{ height: 400 }}>
            <MapContainer center={[31.5, -5]} zoom={5} style={{ height: '100%' }} className="rounded-lg">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {cities.map((city) => {
                const coords = cityCoordinates[city]
                if (!coords) return null
                const isSelected = city === selectedCity

                return (
                  <Marker
                    key={city}
                    position={coords}
                    icon={L.icon({
                      iconUrl: isSelected
                        ? 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="blue"><path d="M12 0C7.03 0 3 4.03 3 9c0 5.25 9 15 9 15s9-9.75 9-15c0-4.97-4.03-9-9-9zm0 12c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/></svg>'
                        : 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray"><path d="M12 0C7.03 0 3 4.03 3 9c0 5.25 9 15 9 15s9-9.75 9-15c0-4.97-4.03-9-9-9zm0 12c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/></svg>',
                      iconSize: [32, 32],
                      iconAnchor: [16, 32],
                      popupAnchor: [0, -32],
                    })}
                  >
                    <Popup>
                      <div className="text-center">
                        <strong>{city}</strong>
                        <div className="text-sm mt-1">
                          Extreme Events: {getExtremeEventCount(city)}
                        </div>
                        <button
                          onClick={() => handleSelectCity(city)}
                          className="mt-2 px-2 py-1 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700"
                        >
                          Select
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                )
              })}
            </MapContainer>
          </div>

          {/* City Info */}
          {selectedCity && (
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{selectedCity}</h2>
                <button
                  onClick={() => navigate('/history')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition"
                >
                  View Full History & Analysis
                </button>
              </div>

              {cityRecords.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 p-4 rounded-lg">
                    <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">Total Records</div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                      {cityRecords.length}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900 dark:to-red-800 p-4 rounded-lg">
                    <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">Extreme Events</div>
                    <div className="text-2xl font-bold text-red-600 dark:text-red-300">
                      {cityRecords.filter((r) => r.event_extreme === 1).length}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 p-4 rounded-lg">
                    <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">Avg Temperature</div>
                    <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                      {(
                        cityRecords.reduce((sum, r) => sum + r.temp_mean, 0) / cityRecords.length
                      ).toFixed(1)}
                      °C
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900 dark:to-yellow-800 p-4 rounded-lg">
                    <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">Avg Humidity</div>
                    <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">
                      {(
                        cityRecords.reduce((sum, r) => sum + r.humidity_mean, 0) / cityRecords.length
                      ).toFixed(1)}
                      %
                    </div>
                  </div>
                </div>
              )}

              {cityRecords.length === 0 && (
                <div className="text-center text-slate-500 dark:text-slate-400">
                  No data available for this city
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
