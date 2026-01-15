import express from 'express';
import { getPredictions } from '../utils/mockData';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticate, (req, res) => {
  const preds = getPredictions(20);
  res.json({ count: preds.length, results: preds });
});

export default router;
