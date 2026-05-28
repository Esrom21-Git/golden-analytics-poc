export interface AiInteraction {
  id?: string;
  timestamp: string;
  question: string;
  response: string;
  action: string;
}

const STORAGE_KEY = "ai_interactions";

export function logAiInteraction(interaction: AiInteraction) {
  try {
    const now = new Date().toISOString();
    const record: AiInteraction = { ...interaction, timestamp: now, id: now };

    // Save to localStorage as a simple audit log (POC for governance)
    const raw = localStorage.getItem(STORAGE_KEY);
    const arr: AiInteraction[] = raw ? JSON.parse(raw) : [];
    arr.push(record);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));

    // Attempt to POST to backend /api/logs if available (non-blocking)
    fetch((import.meta as any).env?.VITE_API_URL ? `${(import.meta as any).env.VITE_API_URL}/logs` : "/api/logs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
    }).catch(() => {
      // swallow -- backend logging is optional in the POC
    });

    // Also console-log for developer visibility
    console.log("[AI_LOG]", record);
  } catch (err) {
    console.error("Failed to log AI interaction", err);
  }
}

export function getAiLogs(): AiInteraction[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return [];
  }
}
