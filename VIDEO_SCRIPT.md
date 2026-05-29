# Golden Analytics Video Script

## Timing & Flow (6-7 minutes)

---

### 0:00 - 0:20 | Intro
- Show the app running in the browser or the repo name on screen.

> "Hey, so what I want to show you today is Golden Analytics — it's a proof-of-concept dashboard I built for exploring government spending data. The core idea is that a non-technical user should be able to come in here, ask a question in plain English, and get an answer without writing a single line of SQL. It's built with React and Vite on the frontend, a .NET API on the backend, and it has AI governance logging built in. Let me just show you how it works."

---

### 0:20 - 1:50 | Product demo: ask a question
- Open the running app at `http://localhost:5173`.
- Point to the three stat cards (green, blue, purple) at the top.

> "So this is the dashboard. At the top you've got three summary cards — total spending in green, the top spending category in blue, and the top vendor in purple. These update in real time based on whatever filters you have active."

- Scroll down slightly to show the "Ask a Question" panel.

> "Now here's the part I'm most excited to show. This is the natural language question panel. Instead of writing a query, I can just type something like... 'What is the top spending category?' and hit Ask."

- Type the question and press Enter or click Ask.
- Show the alert response, then dismiss it and point to the chart.

> "And there it is — it gives me the answer straight away. For a non-technical user, that's the whole experience. You asked a question, you got an answer, and you can see the data behind it in the chart below."

---

### 1:50 - 2:40 | Filters and charts
- Click the **2023** Fiscal Year button (or whichever year is in the data).

> "You can also filter by fiscal year. So if I click 2023 here, everything — the totals, the charts, all of it — updates instantly. No page reload, no query."

- Click a Fund Type button.

> "Same thing with fund type. I can slice it down to just one category, and the dashboard just responds. The idea is that exploration should feel natural, not technical."

- Point to the bar or pie chart updating.

> "This is the kind of thing that normally takes a data analyst a few hours to set up in a spreadsheet — here it's just a button click."

---

### 2:40 - 3:40 | Code walkthrough: frontend
- Open `client/src/pages/Home.tsx` on GitHub or in your editor.

> "Alright, let me jump into the code for a minute. I'm going to open the main dashboard file — Home.tsx. This is where all the frontend logic lives."

- Navigate to the data aggregation section: [Home.tsx:26-50](https://github.com/Esrom21-Git/golden-analytics-poc/blob/main/client/src/pages/Home.tsx#L26-L50)

> "So up here we've got the data processing — this is where we group spending by category and by year. It runs through a useMemo hook so it only recalculates when the filters change, which is what makes the dashboard feel instant."

- Navigate to the natural language handler: [Home.tsx:58-88](https://github.com/Esrom21-Git/golden-analytics-poc/blob/main/client/src/pages/Home.tsx#L58-L88)

> "And this is the natural language handler. When you type a question and hit Ask, this function runs. It checks for keywords — 'top spending', 'total', 'trend' — and returns the right answer. It's rule-based for the POC, which is intentional. It keeps it fast and predictable."

- Show where the input is wired to the button: [Home.tsx:128-146](https://github.com/Esrom21-Git/golden-analytics-poc/blob/main/client/src/pages/Home.tsx#L128-L146)

> "And you can see down here the input field and the Ask button are wired directly to that function — when you press Enter or click Ask, it fires."

---

### 3:40 - 4:00 | Show the core parser code
- Stay on [Home.tsx:58-88](https://github.com/Esrom21-Git/golden-analytics-poc/blob/main/client/src/pages/Home.tsx#L58-L88) — the `handleNaturalLanguageQuery` function.

```tsx
const handleNaturalLanguageQuery = (query: string) => {
  logAiInteraction({
    question: query,
    response: "Processing query...",
    action: "natural_language_parse",
    timestamp: new Date().toISOString(),
  });

  let response = "";
  if (query.toLowerCase().includes("top spending")) {
    response = `Top Spending Category: ${processedData.byCategory[0]?.name} - $${processedData.byCategory[0]?.value.toLocaleString()}`;
    alert(response);
  } else if (query.toLowerCase().includes("total")) {
    response = `Total Spending: $${processedData.totalSpending.toLocaleString()}`;
    alert(response);
  } else {
    response = "Try asking: 'What is the top spending category?' or 'Show me the total spending'";
    alert(response);
  }

  logAiInteraction({
    question: query,
    response,
    action: "natural_language_response",
    timestamp: new Date().toISOString(),
  });
};
```

> "What I want to highlight here is that the function logs the interaction *before* it processes it, and then logs it again *after* with the actual response. So you get a full before-and-after record of every AI interaction. That's the governance piece, and I'll show that in a second."

---

### 4:00 - 4:30 | Logging and governance
- Open `client/src/services/logging.ts` on GitHub.
- Show the full `logAiInteraction` function: [logging.ts:11-36](https://github.com/Esrom21-Git/golden-analytics-poc/blob/main/client/src/services/logging.ts#L11-L36)
- Highlight the localStorage + backend POST: [logging.ts:17-29](https://github.com/Esrom21-Git/golden-analytics-poc/blob/main/client/src/services/logging.ts#L17-L29)

> "So this is the logging service. Every time someone asks a question, this runs. It saves the question, the response, the action type, and a timestamp to localStorage — and it also tries to send it to the backend. The idea is that in a real deployment, you'd have a persistent log of every AI interaction. That's really important in a government context where you need to be able to audit what the system told users."

> "Even at the POC stage, I wanted to make sure that pattern was established — because retrofitting governance onto an AI product later is a lot harder than building it in from day one."

---

### 4:30 - 5:10 | Backend overview
- Open `VehicleManagement.Api/Program.cs` on GitHub.
- Show service registration: [Program.cs:29-30](https://github.com/Esrom21-Git/golden-analytics-poc/blob/main/VehicleManagement.Api/Program.cs#L29-L30)
- Show the API endpoints: [Program.cs:44-70](https://github.com/Esrom21-Git/golden-analytics-poc/blob/main/VehicleManagement.Api/Program.cs#L44-L70)

> "Quick look at the backend. It's a minimal .NET API — I kept it intentionally lightweight for the POC. You can see the service registration here, and the endpoints below. It's got a health check and the main data endpoints. The reason I kept it minimal is so it's easy to extend — you could drop in a Postgres database or a proper log-ingestion endpoint without having to rework the whole thing."

---

### 5:10 - 5:40 | Backend service layer
- Open `VehicleManagement.Infrastructure/Services/VehicleService.cs` on GitHub.
- Show `GetVehicles()`: [VehicleService.cs:62-76](https://github.com/Esrom21-Git/golden-analytics-poc/blob/main/VehicleManagement.Infrastructure/Services/VehicleService.cs#L62-L76)
- Show `CreateVehicle()`: [VehicleService.cs:78-107](https://github.com/Esrom21-Git/golden-analytics-poc/blob/main/VehicleManagement.Infrastructure/Services/VehicleService.cs#L78-L107)

> "And this is the service layer. It handles the data operations for the API. In a production version, this is where you'd connect to a real database — Supabase, Postgres, whatever the team is using. Right now it's running with in-memory data, which is fine for a demo but obviously something you'd swap out."

---

### 5:40 - 6:20 | Trade-offs and what's next
- Switch back to the browser or show the README.

> "So I want to be upfront about where this sits. It's a POC — the natural language parsing is rule-based, the data is seeded, and the logs are going to localStorage. Those are all intentional shortcuts to get to a working demo quickly. The core patterns are all there though: a clean React frontend, a .NET backend that's ready to extend, and AI governance logging that you can build on."

> "The next steps would be swapping in a real database, upgrading the natural language layer to use an actual LLM, and moving the audit logs to a proper backend store. But the structure for all of that is already in place."

---

### 6:20 - 6:30 | Closing
- Show the app one more time.

> "That's Golden Analytics. The full code and run instructions are in the repo — there's a README with the exact commands to get it running locally. Thanks for watching."

---

## Quick reference: natural things to say while navigating

Use these when you're clicking around and need to fill silence naturally:

- *While opening the app:* "Let me just pull this up in the browser..."
- *While typing a question:* "So I'm going to type this in just like a normal user would..."
- *While the alert shows:* "There's the response — and you can see the chart is still there behind it..."
- *While switching to the editor:* "Let me flip over to the code for a second..."
- *While scrolling through a file:* "So this is the main component, I'm just going to scroll down to the interesting part..."
- *While showing the logging file:* "This is a small file but it's doing something important..."
- *While showing the backend:* "The backend is minimal by design — I'll show you why that's actually a feature..."
- *If you lose your place:* "So — yeah — the key thing here is..."

---

## Recording tips
- Use a larger editor font (18–20pt) so code is readable on video.
- Pause for 1–2 seconds after each screen change before speaking — makes editing easier.
- Record the app demo first, then the code walkthrough.
- Dismiss alerts promptly so the chart is visible when you make the point about it.
- If you stumble on a word, pause and restart the sentence — don't push through.
