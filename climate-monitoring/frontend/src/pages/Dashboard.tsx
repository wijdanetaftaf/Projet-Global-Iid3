import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { loadDataset, ClimateRecord } from '../utils/datasetLoader'

export default function Dashboard() {
  const [recentData, setRecentData] = useState<ClimateRecord[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    loadDataset().then((data) => {
      if (data.length > 0) {
        const sorted = [...data].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )
        setRecentData(sorted.slice(0, 20))
      }
      setLoading(false)
    })
  }, [])

  // Calculate all metrics from the 20 recent records
  const avgTemp = recentData.length > 0 
    ? (recentData.reduce((sum, r) => sum + r.temp_mean, 0) / recentData.length).toFixed(2)
    : 'N/A'
  
  const avgHumidity = recentData.length > 0 
    ? (recentData.reduce((sum, r) => sum + r.humidity_mean, 0) / recentData.length).toFixed(2)
    : 'N/A'
  
  const avgPressure = recentData.length > 0 
    ? (recentData.reduce((sum, r) => sum + r.pressure_mean, 0) / recentData.length).toFixed(2)
    : 'N/A'
  
  const avgWind = recentData.length > 0 
    ? (recentData.reduce((sum, r) => sum + r.wind_mean, 0) / recentData.length).toFixed(2)
    : 'N/A'
  
  const maxTemp = recentData.length > 0 
    ? Math.max(...recentData.map(r => r.temp_max)).toFixed(2)
    : 'N/A'

  const extremeEventCount = recentData.filter((r) => r.event_extreme === 1).length
  
  const eventTypes = recentData
    .filter((r) => r.event_extreme === 1)
    .reduce(
      (acc, r) => {
        acc[r.type_event] = (acc[r.type_event] || 0) + 1
        return acc
      },
      {} as Record<string, number>
    )

  // Chart data from the 20 records
  const chartData = recentData
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((r) => ({
      t: new Date(r.date).toLocaleDateString(),
      v: r.temp_mean,
    }))

  // City extreme events data
  const cityExtremeEvents = recentData.reduce((acc, r) => {
    const existing = acc.find(item => item.city === r.city)
    if (existing) {
      existing.events += r.event_extreme
    } else {
      acc.push({ city: r.city, events: r.event_extreme })
    }
    return acc
  }, [] as Array<{ city: string; events: number }>)
    .sort((a, b) => b.events - a.events)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">📊 Dashboard</h1>
        <div className="space-x-2">
          <button
            onClick={() => navigate('/history')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition"
          >
            View Full History
          </button>
          <button
            onClick={() => navigate('/map')}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition"
          >
            Explore Map
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">Avg Temperature</div>
          <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mt-2">
            {avgTemp} °C
          </div>
        </div>

        <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900 dark:to-cyan-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">Avg Humidity</div>
          <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mt-2">
            {avgHumidity} %
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">Avg Wind Speed</div>
          <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mt-2">
            {avgWind} m/s
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">Max Temp</div>
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-300 mt-2">
            {maxTemp} °C
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900 dark:to-amber-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">Extreme Events</div>
          <div className="text-3xl font-bold text-amber-600 dark:text-amber-300 mt-2">
            {extremeEventCount}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* City Extreme Events Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100">
            Extreme Events by City
          </h3>
          <div style={{ height: 280 }}>
            {cityExtremeEvents.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cityExtremeEvents} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="transparent" />
                  <XAxis dataKey="city" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: 'none',
                      borderRadius: 8,
                    }}
                    labelStyle={{ color: '#fff' }}
                    formatter={(value) => [`${value} events`, 'Extreme Events']}
                    cursor={false}
                  />
                  <Bar
                    dataKey="events"
                    fill="#10b981"
                    name="Extreme Events"
                    radius={[8, 8, 0, 0]}
                    isAnimationActive={false}
                    shape={<rect fill="#10b981" />}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center text-slate-500 dark:text-slate-400">No data available</div>
            )}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Recent Extreme Events
            </h3>
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-300">
              {extremeEventCount}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 mt-2">
              in recent 20 records
            </div>
          </div>

          {Object.keys(eventTypes).length > 0 && (
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
                Event Type Distribution
              </h3>
              <div className="space-y-2">
                {Object.entries(eventTypes)
                  .sort(([, a], [, b]) => b - a)
                  .map(([type, count]) => (
                    <div key={type} className="flex items-center justify-between">
                      <span className="text-sm capitalize text-slate-700 dark:text-slate-300">
                        {type.replace(/_/g, ' ')}
                      </span>
                      <span className="font-bold text-slate-900 dark:text-slate-100">{count}</span>
                    </div>
                  ))}
              </div>
            </div>
          )}

          <button
            onClick={() => navigate('/history')}
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition"
          >
            View Detailed Analysis
          </button>
        </div>
      </div>

      {/* Recent Data Table */}
      {recentData.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100">
            Recent Data (Last 20 records)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-100 dark:bg-slate-700 border-b border-slate-200 dark:border-slate-600">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-slate-900 dark:text-slate-100">
                    City
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-slate-900 dark:text-slate-100">
                    Date
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-slate-900 dark:text-slate-100">
                    Temp (°C)
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-slate-900 dark:text-slate-100">
                    Humidity (%)
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-slate-900 dark:text-slate-100">
                    Extreme Event
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-slate-900 dark:text-slate-100">
                    Type
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {recentData.slice(0, 20).map((record, idx) => (
                  <tr
                    key={idx}
                    className={
                      record.event_extreme === 1
                        ? 'bg-red-50 dark:bg-red-900/20'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-700/50'
                    }
                  >
                    <td className="px-4 py-2 text-slate-900 dark:text-slate-100">{record.city}</td>
                    <td className="px-4 py-2 text-slate-700 dark:text-slate-300">
                      {new Date(record.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 text-slate-700 dark:text-slate-300">
                      {record.temp_mean.toFixed(1)}
                    </td>
                    <td className="px-4 py-2 text-slate-700 dark:text-slate-300">
                      {record.humidity_mean.toFixed(1)}
                    </td>
                    <td className="px-4 py-2">
                      {record.event_extreme === 1 ? (
                        <span className="inline-block px-2 py-1 bg-red-500 text-white rounded text-xs font-semibold">
                          Yes
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-1 bg-green-500 text-white rounded text-xs font-semibold">
                          No
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2 text-slate-700 dark:text-slate-300 capitalize">
                      {record.type_event.replace(/_/g, ' ')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
