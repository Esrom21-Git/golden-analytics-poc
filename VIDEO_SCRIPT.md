# Golden Analytics Video Script

## Timing & Flow (6-7 minutes)

### 0:00 - 0:20 | Intro
- Show the app title or repo name.
- Say: "Hi, this is Golden Analytics, a proof-of-concept dashboard for exploring government spending without SQL. It combines a React frontend, a .NET backend, and AI interaction logging for governance."

### 0:20 - 1:50 | Product demo: ask a question
- Show the running app in browser.
- Open the Ask card and type: "What is the top spending category?"
- Press Enter and show the alert response.
- Say: "The app answers the question directly and links it to the charts, so non-technical users can see the result and the evidence together."

### 1:50 - 2:40 | Filters and charts
- Click a Fiscal Year filter button.
- Click a Fund Type filter button.
- Show how the total spending card and charts update.
- Say: "Filters update the charts instantly, so the user can compare years and fund categories without any SQL."

### 2:40 - 3:40 | Code walkthrough: frontend
- Switch to editor and open `client/src/pages/Home.tsx`.
- Highlight the `handleNaturalLanguageQuery` function.
- Say: "This function parses the user question and returns a simple answer. In a production version, this is where you'd integrate an LLM or a smarter parser."
- Open `client/src/services/logging.ts`.
- Say: "This service logs every AI query and response for governance. It saves to localStorage and sends a copy to `/api/logs`."

### 3:40 - 4:30 | Backend overview
- Open `VehicleManagement.Api/Program.cs`.
- Say: "The backend is a minimal .NET API. It supports vehicles and can be extended to persist logs or connect to a database."
- Optionally mention `VehicleManagement.Infrastructure/Services/VehicleService.cs` and seeding sample vehicles.

### 4:30 - 5:20 | AI governance check
- Open browser DevTools → Application → localStorage.
- Show `ai_interactions` entries.
- Say: "This is the audit trail. Every question and response is recorded so the team can review AI behavior."

### 5:20 - 6:00 | Trade-offs and next steps
- Show `README.md` or a quick bullet slide.
- Say: "This POC focuses on the core value: data exploration, simple AI-driven insights, and governance logging. Next steps would be adding a persistent database, stronger AI validation, and secure server-side log storage."

### 6:00 - 6:20 | Closing
- Say: "That’s Golden Analytics: a fast proof-of-concept for non-technical spending insights with governance built in. The repo and run instructions are ready in GitHub."

## Exact talking points to read

- "Golden Analytics is a POC dashboard for government spending data, built with React, Vite, and .NET."
- "I’m showing a simple natural-language question flow so non-technical users can get answers without SQL."
- "The dashboard updates charts and totals as filters change, making the data easy to explore."
- "AI governance is included: every interaction is logged in `localStorage` and attempted to be sent to a backend endpoint."
- "The backend is a minimal API that can be extended for persistence and logging."
- "The project is focused on the core flow, not full enterprise polish, which is exactly what a strong POC needs."

## Helpful notes for recording

- Keep each section short and intentional.
- Pause after each screen change so editing is easier.
- Use a slightly larger editor font for code visibility.
- If you want, record the frontend demo first, then the code walkthrough separately.
- If you need a verbal cue, say: "Now I’ll show the code behind this feature." then switch to the editor.
