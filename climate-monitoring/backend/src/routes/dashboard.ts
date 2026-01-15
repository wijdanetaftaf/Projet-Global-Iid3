import express from 'express';
import { getMetrics, getTimeSeries } from '../utils/mockData';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.get('/metrics', authenticate, (req, res) => {
  res.json({ metrics: getMetrics(), series: { temperature: getTimeSeries('temperature') } });
});

export default router;
