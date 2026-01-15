// Utility to load and parse the climate dataset

export type ClimateRecord = {
  city: string
  date: string
  temp_mean: number
  humidity_mean: number
  pressure_mean: number
  wind_mean: number
  temp_max: number
  wind_max: number
  mu_canicule: number
  mu_froid: number
  mu_vent: number
  mu_pluie: number
  mu_depression: number
  mu_extreme: number
  event_extreme: number
  type_event: string
}

let cachedData: ClimateRecord[] | null = null

export async function loadDataset(): Promise<ClimateRecord[]> {
  if (cachedData) return cachedData

  try {
    const response = await fetch('/DATASETWIJDANE.csv')
    const text = await response.text()
    cachedData = parseCSV(text)
    return cachedData
  } catch (error) {
    console.error('Error loading dataset:', error)
    return []
  }
}

function parseCSV(text: string): ClimateRecord[] {
  const lines = text.trim().split('\n')
  const headers = lines[0].split(',')

  return lines.slice(1).map((line) => {
    const values = line.split(',')
    return {
      city: values[0],
      date: values[1],
      temp_mean: parseFloat(values[2]),
      humidity_mean: parseFloat(values[3]),
      pressure_mean: parseFloat(values[4]),
      wind_mean: parseFloat(values[5]),
      temp_max: parseFloat(values[6]),
      wind_max: parseFloat(values[7]),
      mu_canicule: parseFloat(values[8]),
      mu_froid: parseFloat(values[9]),
      mu_vent: parseFloat(values[10]),
      mu_pluie: parseFloat(values[11]),
      mu_depression: parseFloat(values[12]),
      mu_extreme: parseFloat(values[13]),
      event_extreme: parseInt(values[14]),
      type_event: values[15],
    }
  })
}

export function getUniqueCities(): string[] {
  if (!cachedData) return []
  const cities = new Set(cachedData.map((r) => r.city))
  return Array.from(cities).sort()
}

export function getRecordsByCity(city: string): ClimateRecord[] {
  if (!cachedData) return []
  return cachedData.filter((r) => r.city === city).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

export function getCityKPIs(city: string) {
  const records = getRecordsByCity(city)
  if (records.length === 0) {
    return {
      totalRecords: 0,
      extremeEventDays: 0,
      normalDays: 0,
      dominantEventType: 'N/A',
      avgTemp: 0,
      avgHumidity: 0,
      avgPressure: 0,
      avgWind: 0,
      maxTemp: 0,
      eventDistribution: {},
    }
  }

  const extremeEvents = records.filter((r) => r.event_extreme === 1)
  const eventTypes = extremeEvents.reduce(
    (acc, r) => {
      acc[r.type_event] = (acc[r.type_event] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  const dominantType = Object.entries(eventTypes).sort(([, a], [, b]) => b - a)[0]?.[0] || 'N/A'

  return {
    totalRecords: records.length,
    extremeEventDays: extremeEvents.length,
    normalDays: records.length - extremeEvents.length,
    dominantEventType: dominantType,
    avgTemp: parseFloat((records.reduce((sum, r) => sum + r.temp_mean, 0) / records.length).toFixed(2)),
    avgHumidity: parseFloat((records.reduce((sum, r) => sum + r.humidity_mean, 0) / records.length).toFixed(2)),
    avgPressure: parseFloat((records.reduce((sum, r) => sum + r.pressure_mean, 0) / records.length).toFixed(2)),
    avgWind: parseFloat((records.reduce((sum, r) => sum + r.wind_mean, 0) / records.length).toFixed(2)),
    maxTemp: Math.max(...records.map((r) => r.temp_max)),
    eventDistribution: eventTypes,
  }
}
