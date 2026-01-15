import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { json, urlencoded } from 'express';
import authRoutes from './routes/auth';
import dashboardRoutes from './routes/dashboard';
import predictionsRoutes from './routes/predictions';
import alertsRoutes from './routes/alerts';
import rulesRoutes from './routes/rules';
import uploadRoutes from './routes/upload';
import climateDataRoutes from './routes/climateData';

const app = express();

app.use(helmet());
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/predictions', predictionsRoutes);
app.use('/alerts', alertsRoutes);
app.use('/rules', rulesRoutes);
app.use('/upload', uploadRoutes);
app.use('/climate-data', climateDataRoutes);

app.get('/', (req, res) => res.json({ ok: true, service: 'Climate Monitoring API' }));

// Global error handler
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

export default app;
