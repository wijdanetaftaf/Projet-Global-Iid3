import express from 'express'
import { authenticate } from '../middleware/auth'
import { v4 as uuidv4 } from 'uuid'

const router = express.Router()

// Return mocked historical data and short-term predictions for a city
router.get('/', authenticate, (req, res) => {
  const city = String(req.query.city || 'Demo City')
  const now = Date.now()

  // historical: last 30 days daily values
  const historical: Array<any> = []
  for (let i = 30; i >= 1; i--) {
    const ts = new Date(now - i * 24 * 3600 * 1000)
    const temp = +(10 + Math.random() * 25).toFixed(2)
    const humidity = +(30 + Math.random() * 60).toFixed(1)
    const wind = +(1 + Math.random() * 12).toFixed(2)
    historical.push({ date: ts.toISOString(), temp, humidity, wind })
  }

  // predictions: next 7 days
  const predictions: Array<any> = []
  const extremeAlerts: Array<any> = []
  for (let d = 1; d <= 7; d++) {
    const date = new Date(now + d * 24 * 3600 * 1000)
    const temp = +(10 + Math.random() * 30 + (Math.random() < 0.08 ? 15 : 0)).toFixed(2)
    const humidity = +(30 + Math.random() * 60).toFixed(1)
    const rainProb = Math.floor(Math.random() * 100)
    const willExtreme = temp >= 42 || rainProb > 90
    const eventType = willExtreme ? (temp >= 42 ? 'Heatwave' : 'Flood') : 'Normal'
    const confidence = willExtreme ? Math.floor(70 + Math.random() * 30) : Math.floor(40 + Math.random() * 40)
    const pred = { id: uuidv4(), date: date.toISOString(), temp, humidity, rainProb, eventType, confidence }
    predictions.push(pred)
    if (willExtreme) {
      extremeAlerts.push({ id: pred.id, type: pred.eventType, date: pred.date, confidence: pred.confidence, severity: pred.eventType === 'Heatwave' ? 'High' : 'Moderate' })
    }
  }

  res.json({ city, historical, predictions, extremeAlerts })
})

export default router
