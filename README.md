# Golden Analytics POC

A lightweight proof-of-concept dashboard for exploring government spending data and auditing AI interactions.

This repo contains:
- `client/` main React + Vite dashboard with charts, filters, and natural-language inquiry.
- `VehicleManagement.Api/` minimal .NET backend for vehicles and future log ingestion.
- `client/src/services/logging.ts` captures AI questions and responses for governance.
- `client/src/data/vendor_payments.json` sample dataset for spending insights.

The focus is on demonstrating the core flow: data exploration, natural-language insights, and logging, without building a full enterprise system.

## Highlights
- Natural-language "Ask a question" experience
- Interactive spending charts and filters
- Frontend/backend separation with a .NET API
- AI governance logging for every interaction
- Clean folder-based commit history

## Run locally
```powershell
cd "C:\Users\kidan\New folder"
& "C:\Program Files\nodejs\npm.cmd" install
& "C:\Program Files\nodejs\npm.cmd" run dev
```
Open the URL printed by Vite (for example `http://localhost:5175/`).

In a second terminal, start the backend:
```powershell
cd "C:\Users\kidan\New folder\VehicleManagement.Api"
dotnet run --urls http://localhost:5215
```

## Notes
- The project is a proof-of-concept, not a finished production app.
- AI interaction logs are stored locally in `localStorage` under `ai_interactions` and also attempted to be sent to `/api/logs`.
- The dashboard is designed for non-technical users who need simple spending insights without SQL.

## Video guide
See `VIDEO_SCRIPT.md` for the recording script, timestamps, and exact talking points.
