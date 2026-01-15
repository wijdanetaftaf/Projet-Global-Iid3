import express from 'express';
import multer from 'multer';
import { authenticate } from '../middleware/auth';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', authenticate, upload.single('file'), (req, res) => {
  // For the demo we simulate processing and return metadata
  const file = req.file;
  if (!file) return res.status(400).json({ error: 'Missing file' });
  const metadata = {
    filename: file.originalname,
    uploadedAt: new Date(),
    processed: true,
    preview: {
      columns: ['timestamp', 'temp', 'humidity', 'pressure', 'rain'],
      rowCount: 1200,
      dateRange: { start: new Date(Date.now() - 90 * 24 * 3600 * 1000), end: new Date() }
    }
  };
  res.status(201).json({ metadata });
});

export default router;
