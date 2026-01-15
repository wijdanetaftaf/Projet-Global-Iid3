import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import api from '../services/api'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

const cities = [
  { name: 'Cairo', coords: [30.0444, 31.2357] },
  { name: 'Paris', coords: [48.8566, 2.3522] },
  { name: 'New York', coords: [40.7128, -74.0060] },
  { name: 'Mumbai', coords: [19.0760, 72.8777] },
  { name: 'Tokyo', coords: [35.6895, 139.6917] }
]

export default function CityWeather() {
  const [query, setQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState<string | null>(null)
  const [data, setData] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!selectedCity) return
    setLoading(true); setError(null)
    api.get(`/climate-data?city=${encodeURIComponent(selectedCity)}`)
      .then(r => setData(r.data))
      .catch((e) => { setError(e?.response?.data?.error || 'Failed to load'); setData(null) })
      .finally(()=>setLoading(false))
  }, [selectedCity])

  const onSearch = () => { if (query) setSelectedCity(query) }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">City Weather — History & Predictions</h1>

      <div className="flex gap-3 mb-4">
        <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search city (e.g. Paris)" className="border p-2 rounded flex-1" />
        <button onClick={onSearch} className="px-3 py-2 bg-primary text-white rounded">Search</button>
      </div>

      <div className="card mb-4" style={{ height: 360 }}>
        <MapContainer center={[20,0]} zoom={2} style={{ height: '100%', borderRadius: 8 }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <GeoJSON data={{ type: 'FeatureCollection', features: cities.map(c => ({ type: 'Feature', properties: { name: c.name }, geometry: { type: 'Point', coordinates: [c.coords[1], c.coords[0]] } })) } as any} onEachFeature={(feature, layer:any) => {
            layer.on('click', () => { setSelectedCity(feature.properties.name); setQuery(feature.properties.name) })
            layer.bindPopup(`<strong>${feature.properties.name}</strong>`) 
          }} />
        </MapContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-sm text-slate-500">Selected</div>
              <div className="font-medium">{selectedCity || '—'}</div>
            </div>
            <div className="text-sm text-slate-500">{loading ? 'Loading…' : ''}</div>
          </div>

          {error && <div className="text-red-500 mb-2">{error}</div>}

          {data ? (
            <>
              <h4 className="font-medium mb-2">Temperature — Last 30 days</h4>
              <div style={{ height: 220 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.historical.map((h:any)=>({ date: new Date(h.date).toLocaleDateString(), temp: h.temp, humidity: h.humidity }))}>
                    <XAxis dataKey="date" tick={false} />
                    <YAxis yAxisId="left" />
                    <Tooltip />
                    <Line yAxisId="left" dataKey="temp" stroke="#fb923c" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <h4 className="font-medium mt-4 mb-2">Humidity — Last 30 days</h4>
              <div style={{ height: 140 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.historical.map((h:any)=>({ date: new Date(h.date).toLocaleDateString(), humidity: h.humidity }))}>
                    <XAxis dataKey="date" tick={false} />
                    <YAxis />
                    <Tooltip />
                    <Line dataKey="humidity" stroke="#06b6d4" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </>
          ) : (
            <div className="text-slate-500">Select a city on the map or search to view its historical data.</div>
          )}
        </div>

        <div className="card">
          <h4 className="font-medium mb-2">7-day Predictions</h4>
          {!data && <div className="text-slate-500">No predictions. Select a city first.</div>}
          {data && (
            <>
              <div style={{ height: 180 }} className="mb-3">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.predictions.map((p:any)=>({ date: new Date(p.date).toLocaleDateString(), temp: p.temp }))}>
                    <XAxis dataKey="date" tick={false} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="temp" fill="#0ea5a4" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mb-3">
                {data.extremeAlerts.length > 0 ? (
                  <div>
                    <div className="text-red-500 font-semibold mb-2">Predicted Extreme Events</div>
                    {data.extremeAlerts.map((a:any)=> (
                      <div key={a.id} className="p-2 border rounded mb-2">
                        <div className="font-medium">{a.type}</div>
                        <div className="text-sm">Date: {new Date(a.date).toLocaleDateString()}</div>
                        <div className="text-sm">Confidence: {a.confidence}%</div>
                        <div className="text-sm">Severity: {a.severity}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-green-600">No extreme events predicted for the next week.</div>
                )}
              </div>

              <div>
                <h5 className="font-medium mb-2">Details</h5>
                <table className="w-full text-sm">
                  <thead className="text-slate-500"><tr><th>Date</th><th>Temp</th><th>Rain%</th><th>Event</th></tr></thead>
                  <tbody>
                    {data.predictions.map((p:any)=> (
                      <tr key={p.id} className="border-t"><td className="py-2">{new Date(p.date).toLocaleDateString()}</td><td>{p.temp} °C</td><td>{p.rainProb}%</td><td>{p.eventType}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
