import React, { useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'
import { loadDataset, getRecordsByCity, getCityKPIs, ClimateRecord } from '../utils/datasetLoader'
import KPIsDisplay from '../components/KPIsDisplay'

type ChartType = 'temperature' | 'humidity' | 'pressure' | 'wind' | 'extreme-events' | 'scatter'

export default function HistoricalData() {
  const [cities, setCities] = useState<string[]>([])
  const [selectedCity, setSelectedCity] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [records, setRecords] = useState<ClimateRecord[]>([])
  const [chartType, setChartType] = useState<ChartType>('temperature')
  const [loading, setLoading] = useState(true)
  const [showTable, setShowTable] = useState(false)

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
      const cityRecords = getRecordsByCity(selectedCity)
      setRecords(cityRecords)
    }
  }, [selectedCity])

  const kpis = getCityKPIs(selectedCity)
  const filteredCities = cities.filter((city) => city.toLowerCase().includes(searchQuery.toLowerCase()))

  const chartData = records.map((r) => ({
    date: new Date(r.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' }),
    fullDate: r.date,
    temp_mean: parseFloat(r.temp_mean.toFixed(2)),
    humidity_mean: parseFloat(r.humidity_mean.toFixed(2)),
    pressure_mean: parseFloat(r.pressure_mean.toFixed(2)),
    wind_mean: parseFloat(r.wind_mean.toFixed(2)),
    temp_max: parseFloat(r.temp_max.toFixed(2)),
    wind_max: parseFloat(r.wind_max.toFixed(2)),
    extreme: r.event_extreme === 1 ? 1 : 0,
    type_event: r.type_event,
  }))

  const extremeEventsByType = records
    .filter((r) => r.event_extreme === 1)
    .reduce(
      (acc, r) => {
        const existing = acc.find((item) => item.type === r.type_event)
        if (existing) {
          existing.count += 1
        } else {
          acc.push({ type: r.type_event, count: 1 })
        }
        return acc
      },
      [] as Array<{ type: string; count: number }>
    )

  const renderChart = () => {
    const height = 400

    switch (chartType) {
      case 'temperature':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: 8 }}
                labelStyle={{ color: '#fff' }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="temp_mean"
                stroke="#ef4444"
                strokeWidth={2}
                name="Avg Temperature (°C)"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="temp_max"
                stroke="#f97316"
                strokeWidth={2}
                name="Max Temperature (°C)"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )

      case 'humidity':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: 8 }}
                labelStyle={{ color: '#fff' }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="humidity_mean"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Humidity (%)"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )

      case 'pressure':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: 8 }}
                labelStyle={{ color: '#fff' }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="pressure_mean"
                stroke="#eab308"
                strokeWidth={2}
                name="Pressure (hPa)"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )

      case 'wind':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: 8 }}
                labelStyle={{ color: '#fff' }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="wind_mean"
                stroke="#10b981"
                strokeWidth={2}
                name="Avg Wind (m/s)"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="wind_max"
                stroke="#059669"
                strokeWidth={2}
                name="Max Wind (m/s)"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )

      case 'extreme-events':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <BarChart data={extremeEventsByType}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: 8 }}
                labelStyle={{ color: '#fff' }}
              />
              <Legend />
              <Bar dataKey="count" fill="#ef4444" name="Event Count" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )

      case 'scatter':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="temp_mean" type="number" name="Temperature (°C)" />
              <YAxis dataKey="humidity_mean" type="number" name="Humidity (%)" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: 8 }}
                labelStyle={{ color: '#fff' }}
                cursor={{ strokeDasharray: '3 3' }}
              />
              <Scatter
                name="Temperature vs Humidity"
                data={chartData}
                fill="#8b5cf6"
                isAnimationActive={false}
              />
            </ScatterChart>
          </ResponsiveContainer>
        )

      default:
        return null
    }
  }

  if (loading) {
    return <div className="text-center text-xl">Loading dataset...</div>
  }

  if (cities.length === 0) {
    return <div className="text-center text-xl text-red-500">No data available</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">📈 Historical Climate Data</h1>

      {/* City Selection */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
        <h2 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100">Select City</h2>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search cities..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* City Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {filteredCities.map((city) => (
            <button
              key={city}
              onClick={() => {
                setSelectedCity(city)
                setSearchQuery('')
              }}
              className={`px-3 py-2 rounded-lg font-medium transition ${
                selectedCity === city
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* KPIs Section */}
      {selectedCity && <KPIsDisplay {...kpis} />}

      {/* Chart Section */}
      {selectedCity && records.length > 0 && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100">📊 Data Visualization</h2>

          {/* Chart Type Selector */}
          <div className="mb-6 flex flex-wrap gap-2">
            {[
              { key: 'temperature', label: '🌡️ Temperature' },
              { key: 'humidity', label: '💧 Humidity' },
              { key: 'pressure', label: '🔽 Pressure' },
              { key: 'wind', label: '💨 Wind' },
              { key: 'extreme-events', label: '⚠️ Extreme Events' },
              { key: 'scatter', label: '🎯 Scatter' },
            ].map((option) => (
              <button
                key={option.key}
                onClick={() => setChartType(option.key as ChartType)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  chartType === option.key
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Chart */}
          <div className="mb-6">{renderChart()}</div>
        </div>
      )}

      {/* Data Table Toggle */}
      {selectedCity && records.length > 0 && (
        <div className="space-y-4">
          <button
            onClick={() => setShowTable(!showTable)}
            className="px-4 py-2 bg-slate-600 dark:bg-slate-700 text-white rounded-lg hover:bg-slate-700 dark:hover:bg-slate-600 font-medium"
          >
            {showTable ? 'Hide Data Table' : 'Show Data Table'} ({records.length} records)
          </button>

          {showTable && (
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-100 dark:bg-slate-700 border-b border-slate-200 dark:border-slate-600">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold text-slate-900 dark:text-slate-100">Date</th>
                    <th className="px-4 py-2 text-left font-semibold text-slate-900 dark:text-slate-100">Avg Temp (°C)</th>
                    <th className="px-4 py-2 text-left font-semibold text-slate-900 dark:text-slate-100">Max Temp (°C)</th>
                    <th className="px-4 py-2 text-left font-semibold text-slate-900 dark:text-slate-100">Humidity (%)</th>
                    <th className="px-4 py-2 text-left font-semibold text-slate-900 dark:text-slate-100">Pressure (hPa)</th>
                    <th className="px-4 py-2 text-left font-semibold text-slate-900 dark:text-slate-100">Avg Wind (m/s)</th>
                    <th className="px-4 py-2 text-left font-semibold text-slate-900 dark:text-slate-100">Extreme Event</th>
                    <th className="px-4 py-2 text-left font-semibold text-slate-900 dark:text-slate-100">Event Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {records.map((record, idx) => (
                    <tr
                      key={idx}
                      className={`${
                        record.event_extreme === 1
                          ? 'bg-red-50 dark:bg-red-900/20'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-700/50'
                      }`}
                    >
                      <td className="px-4 py-2 text-slate-700 dark:text-slate-300">
                        {new Date(record.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2 text-slate-700 dark:text-slate-300">
                        {record.temp_mean.toFixed(2)}
                      </td>
                      <td className="px-4 py-2 text-slate-700 dark:text-slate-300">
                        {record.temp_max.toFixed(2)}
                      </td>
                      <td className="px-4 py-2 text-slate-700 dark:text-slate-300">
                        {record.humidity_mean.toFixed(2)}
                      </td>
                      <td className="px-4 py-2 text-slate-700 dark:text-slate-300">
                        {record.pressure_mean.toFixed(2)}
                      </td>
                      <td className="px-4 py-2 text-slate-700 dark:text-slate-300">
                        {record.wind_mean.toFixed(2)}
                      </td>
                      <td className="px-4 py-2">
                        {record.event_extreme === 1 ? (
                          <span className="inline-block px-3 py-1 bg-red-500 text-white rounded-full text-xs font-semibold">
                            Yes
                          </span>
                        ) : (
                          <span className="inline-block px-3 py-1 bg-green-500 text-white rounded-full text-xs font-semibold">
                            No
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2">
                        <span className="inline-block px-3 py-1 bg-slate-200 dark:bg-slate-600 text-slate-900 dark:text-slate-100 rounded-full text-xs font-semibold capitalize">
                          {record.type_event.replace(/_/g, ' ')}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {selectedCity && records.length === 0 && (
        <div className="text-center text-lg text-slate-500 dark:text-slate-400">
          No data available for {selectedCity}
        </div>
      )}
    </div>
  )
}
