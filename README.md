# golden-analytics-poc

## What this project is

Golden Analytics is a proof-of-concept dashboard for exploring government vendor payment data without writing SQL. It combines a React + Vite frontend, a .NET backend API, and a simple AI question flow so non-technical users can ask questions in plain English and see results immediately.

## What to say in a non-technical demo

- "This is a spending dashboard where you can ask a question in plain language and get an answer — no SQL needed."
- "The app shows charts and totals. You can ask things like 'What is the top spending category?' or 'Show me the total spending'."
- "Behind the scenes there is a lightweight .NET API, but from the user view it is just a dashboard with filters, charts, and a question panel."
- "The core idea is to make government spending data accessible to non-technical users through a familiar interface."

## Key files

- [client/src/pages/Home.tsx](client/src/pages/Home.tsx) — dashboard logic, chart data, and natural-language question handling
- [client/src/services/logging.ts](client/src/services/logging.ts) — AI governance logging: records every question and answer for audit and accountability
- [client/src/data/vendor_payments.json](client/src/data/vendor_payments.json) — sample government vendor payment dataset
- [VehicleManagement.Api/Program.cs](VehicleManagement.Api/Program.cs) — backend API entry point

## Demo talking points

- "The dashboard answers questions without SQL or spreadsheets."
- "It is a proof-of-concept, so the focus is the user flow and the value of plain-language queries."
- "Every AI question and response is logged — this gives us an audit trail for governance and accountability."
- "The backend is minimal by design, making it easy to extend with a database or a stronger AI model."

## Run instructions

**Frontend**
```bash
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

**Backend**
```bash
dotnet run --project VehicleManagement.Api
```
The API runs on `http://localhost:5000` by default.

> This project is a demo of core functionality, not a fully polished enterprise product. The goal is to show the value of natural-language exploration and AI audit logging in a simple spending dashboard.
