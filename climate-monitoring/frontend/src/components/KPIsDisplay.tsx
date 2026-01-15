import React from 'react'

interface KPIsDisplayProps {
  extremeEventDays: number
  normalDays: number
  dominantEventType: string
  avgTemp: number
  avgHumidity: number
  avgPressure: number
  avgWind: number
  maxTemp: number
  totalRecords: number
  eventDistribution: Record<string, number>
}

export default function KPIsDisplay({
  extremeEventDays,
  normalDays,
  dominantEventType,
  avgTemp,
  avgHumidity,
  avgPressure,
  avgWind,
  maxTemp,
  totalRecords,
  eventDistribution,
}: KPIsDisplayProps) {
  const KPICard = ({
    icon,
    label,
    value,
    unit = '',
    color = 'blue',
  }: {
    icon: string
    label: string
    value: string | number
    unit?: string
    color?: string
  }) => {
    const colorClasses = {
      blue: 'from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800',
      red: 'from-red-50 to-red-100 dark:from-red-900 dark:to-red-800',
      green: 'from-green-50 to-green-100 dark:from-green-900 dark:to-green-800',
      yellow: 'from-yellow-50 to-yellow-100 dark:from-yellow-900 dark:to-yellow-800',
      purple: 'from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800',
    }

    return (
      <div className={`bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} p-4 rounded-lg border border-slate-200 dark:border-slate-700`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl">{icon}</span>
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">{label}</span>
        </div>
        <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          {value}
          {unit && <span className="text-sm ml-1">{unit}</span>}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">📊 Key Performance Indicators</h2>

      {/* Main KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          icon="🔴"
          label="Extreme Event Days"
          value={extremeEventDays}
          color="red"
        />
        <KPICard
          icon="✅"
          label="Normal Days"
          value={normalDays}
          color="green"
        />
        <KPICard
          icon="🎯"
          label="Dominant Event Type"
          value={dominantEventType === 'N/A' ? 'None' : dominantEventType}
          color="purple"
        />
        <KPICard
          icon="📈"
          label="Total Records"
          value={totalRecords}
          color="blue"
        />
      </div>

      {/* Weather Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard
          icon="🌡️"
          label="Avg Temperature"
          value={avgTemp}
          unit="°C"
          color="red"
        />
        <KPICard
          icon="💧"
          label="Avg Humidity"
          value={avgHumidity.toFixed(1)}
          unit="%"
          color="blue"
        />
        <KPICard
          icon="🔽"
          label="Avg Pressure"
          value={avgPressure.toFixed(0)}
          unit="hPa"
          color="yellow"
        />
        <KPICard
          icon="💨"
          label="Avg Wind"
          value={avgWind.toFixed(2)}
          unit="m/s"
          color="blue"
        />
        <KPICard
          icon="🌡️"
          label="Max Temperature"
          value={maxTemp.toFixed(1)}
          unit="°C"
          color="red"
        />
      </div>

      {/* Event Distribution */}
      {Object.keys(eventDistribution).length > 0 && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100">Event Type Distribution</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {Object.entries(eventDistribution)
              .sort(([, a], [, b]) => b - a)
              .map(([eventType, count]) => (
                <div key={eventType} className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-600 p-4 rounded-lg text-center">
                  <div className="text-sm font-semibold text-slate-700 dark:text-slate-200 capitalize mb-2">
                    {eventType.replace(/_/g, ' ')}
                  </div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{count}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">occurrences</div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
