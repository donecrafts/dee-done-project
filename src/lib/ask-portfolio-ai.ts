import { processVoiceQuery } from "@/lib/voice-portfolio-agent";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export type PortfolioAIResponse = {
  reply: string;
  navigate: string | null;
  scroll: string | null;
};

function localPortfolioReply(message: string): PortfolioAIResponse {
  const action = processVoiceQuery(message);
  if (action.type === "navigate") {
    return { reply: action.message, navigate: action.path, scroll: null };
  }
  if (action.type === "scroll") {
    return { reply: action.message, navigate: null, scroll: action.sectionId };
  }
  return { reply: action.message, navigate: null, scroll: null };
}

export async function askPortfolioAI(
  message: string,
  history: ChatMessage[] = [],
): Promise<PortfolioAIResponse> {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history }),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      // Keep voice usable on Vercel when OPENAI_API_KEY is missing.
      if (res.status === 503 || res.status === 401 || res.status === 429) {
        return localPortfolioReply(message);
      }
      throw new Error(
        typeof data?.error === "string"
          ? data.error
          : "Could not reach the AI assistant. Check your connection and OPENAI_API_KEY.",
      );
    }

    return {
      reply: String(data.reply || "I'm here — ask me anything."),
      navigate: typeof data.navigate === "string" ? data.navigate : null,
      scroll: typeof data.scroll === "string" ? data.scroll : null,
    };
  } catch {
    return localPortfolioReply(message);
  }
}

/** Typewriter / writing-out effect. Returns a cancel function. */
export function typeOutText(
  fullText: string,
  onUpdate: (partial: string) => void,
  onDone?: () => void,
  charsPerTick = 2,
  tickMs = 18,
): () => void {
  let i = 0;
  let cancelled = false;
  const id = window.setInterval(() => {
    if (cancelled) return;
    i = Math.min(fullText.length, i + charsPerTick);
    onUpdate(fullText.slice(0, i));
    if (i >= fullText.length) {
      window.clearInterval(id);
      onDone?.();
    }
  }, tickMs);

  return () => {
    cancelled = true;
    window.clearInterval(id);
  };
}
