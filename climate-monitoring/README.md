# Climate Monitoring — Fullstack Demo

This repository contains a production-minded demo web application for "Prediction of Extreme Climate Events from Historical Meteorological Data".

Structure

- `backend/` — Node.js + Express mocked API with JWT auth and endpoints for metrics, predictions, alerts, rules, and file upload.
- `frontend/` — Vite + React + TypeScript + Tailwind frontend with dashboard, interactive map, predictions, rules editor, and data management UI.

Quick start

1. Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

2. Frontend

```bash
cd frontend
npm install
npm run dev
```

API endpoints

- `POST /auth/login` — { username, password } -> { token }
- `GET /dashboard/metrics` — JWT
- `GET /predictions` — JWT
- `GET /alerts` — JWT
- `GET/POST/PUT/DELETE /rules` — JWT
- `POST /upload` — file (multipart), JWT

Future ML integration

The backend defines clear endpoints for predictions and data ingestion. Replace the mock implementations (in `backend/src/utils/mockData.ts` and route handlers) with real ML model invocations or a model-serving service. Keep the same contract (JSON shape) to avoid frontend changes.
