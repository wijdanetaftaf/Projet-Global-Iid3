import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = express.Router();

// In-memory users for demo
const users = [
  { id: '1', username: 'admin', passwordHash: bcrypt.hashSync('admin123', 8), role: 'Admin' },
  { id: '2', username: 'analyst', passwordHash: bcrypt.hashSync('analyst123', 8), role: 'Analyst' },
  { id: '3', username: 'viewer', passwordHash: bcrypt.hashSync('viewer123', 8), role: 'Viewer' }
];

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const match = bcrypt.compareSync(password, user.passwordHash);
  if (!match) return res.status(401).json({ error: 'Invalid credentials' });

  const secret = process.env.JWT_SECRET || 'dev-secret';
  const token = jwt.sign({ sub: user.id, username: user.username, role: user.role }, secret, { expiresIn: '8h' });
  res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
});

router.post('/register', (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Missing fields' });
  const exists = users.find((u) => u.username === username);
  if (exists) return res.status(400).json({ error: 'User exists' });
  const id = String(users.length + 1);
  const passwordHash = bcrypt.hashSync(password, 8);
  users.push({ id, username, passwordHash, role: role || 'Viewer' });
  res.status(201).json({ id, username, role: role || 'Viewer' });
});

export default router;
