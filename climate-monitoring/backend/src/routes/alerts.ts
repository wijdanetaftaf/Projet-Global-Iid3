import express from 'express';
import { getAlerts } from '../utils/mockData';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticate, (req, res) => {
  const alerts = getAlerts();
  res.json({ count: alerts.length, alerts });
});

export default router;
