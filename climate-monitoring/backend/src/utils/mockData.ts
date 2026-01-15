import { v4 as uuidv4 } from 'uuid';

const regions = ['North America', 'South America', 'Europe', 'Africa', 'Asia', 'Oceania'];

export function getMetrics() {
  return {
    temperature: +(15 + Math.random() * 20).toFixed(2),
    rainfallIndex: +(Math.random() * 200).toFixed(2),
    windSpeed: +(2 + Math.random() * 20).toFixed(2),
    activeAlerts: Math.floor(Math.random() * 8)
  };
}

export function getTimeSeries(variable = 'temperature') {
  const now = Date.now();
  const points = [] as { ts: number; value: number }[];
  for (let i = 0; i < 48; i++) {
    const ts = now - (47 - i) * 60 * 60 * 1000;
    const base = variable === 'temperature' ? 15 : variable === 'humidity' ? 50 : 1013;
    const noise = (Math.random() - 0.5) * (variable === 'temperature' ? 6 : 10);
    points.push({ ts, value: +(base + noise).toFixed(2) });
  }
  return points;
}

export function getPredictions(count = 12) {
  const types = ['Heatwave', 'Flood', 'Drought', 'Cold wave'];
  const arr = [] as any[];
  for (let i = 0; i < count; i++) {
    const region = regions[Math.floor(Math.random() * regions.length)];
    const type = types[Math.floor(Math.random() * types.length)];
    const severity = ['Low', 'Moderate', 'High', 'Severe'][Math.floor(Math.random() * 4)];
    const confidence = Math.floor(60 + Math.random() * 40);
    const start = new Date(Date.now() + Math.floor(Math.random() * 10) * 24 * 3600 * 1000);
    const end = new Date(start.getTime() + (1 + Math.floor(Math.random() * 5)) * 24 * 3600 * 1000);
    arr.push({ id: uuidv4(), region, type, severity, confidence, window: { start, end } });
  }
  return arr;
}

export function getAlerts() {
  const preds = getPredictions(5);
  return preds.map((p) => ({
    id: p.id,
    region: p.region,
    type: p.type,
    severity: p.severity,
    confidence: p.confidence,
    createdAt: new Date()
  }));
}

export const mockRules = [
  { id: uuidv4(), name: 'Heatwave rule', expression: 'temp>42 && days>=3', active: true, explanation: 'Detect prolonged extreme heat' },
  { id: uuidv4(), name: 'Flood rule', expression: 'rain>100', active: true, explanation: 'Heavy rainfall threshold' }
];
