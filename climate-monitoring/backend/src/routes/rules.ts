import express from 'express';
import { mockRules } from '../utils/mockData';
import { authenticate } from '../middleware/auth';

const router = express.Router();

let rules = [...mockRules];

router.get('/', authenticate, (req, res) => {
  res.json({ count: rules.length, rules });
});

router.post('/', authenticate, (req, res) => {
  const { name, expression, explanation } = req.body;
  const id = String(Date.now());
  const rule = { id, name, expression, explanation, active: true };
  rules.push(rule);
  res.status(201).json(rule);
});

router.put('/:id', authenticate, (req, res) => {
  const { id } = req.params;
  const idx = rules.findIndex((r) => r.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  rules[idx] = { ...rules[idx], ...req.body };
  res.json(rules[idx]);
});

router.delete('/:id', authenticate, (req, res) => {
  const { id } = req.params;
  rules = rules.filter((r) => r.id !== id);
  res.status(204).send();
});

export default router;
