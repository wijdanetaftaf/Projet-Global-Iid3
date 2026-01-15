# Climate Monitoring — Backend

Simple Node + Express backend with mocked endpoints for the climate monitoring demo.

Quick start

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env` and adjust values
3. Run in dev: `npm run dev`

Available endpoints (mocked):

- `POST /auth/login` — body: { username, password }
- `POST /auth/register`
- `GET /dashboard/metrics` — JWT protected
- `GET /predictions` — JWT protected
- `GET /alerts` — JWT protected
- `GET /rules`, `POST /rules`, `PUT /rules/:id`, `DELETE /rules/:id` — JWT protected
- `POST /upload` — form-data file upload, JWT protected

This project returns realistic fake data to integrate with the frontend. The architecture is ML-ready — predictions endpoints and data ingestion endpoints are defined as placeholders for future integration.
