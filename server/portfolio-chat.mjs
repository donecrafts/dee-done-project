/**
 * Shared OpenAI chat logic for Vite (local) and Vercel (/api/chat).
 * Server-only — never import this into the browser bundle.
 */

export const SYSTEM_PROMPT = `You are Samuel John's AI assistant on his portfolio website — as smart, helpful, and conversational as ChatGPT.

Identity & owner facts:
- Name: Samuel John
- Role: Full-stack Python and AI developer (frontend + backend)
- Location: Osogbo, Nigeria
- Email: doneporpor@gmail.com
- X/Twitter: @donecraft225 (https://x.com/donecraft225)
- GitHub: https://github.com/donecrafts
- Skills: Python, FastAPI, ComfyUI, Wan 2.2 LoRA training, AI automation, GoHighLevel, React, TypeScript, PostgreSQL, Docker, AWS, OpenAI API
- Projects (with site paths):
  - PokerBROS → /projects/pokerbros-your-poker-app
  - Wan 2.2 LoRA Training Pipeline → /projects/comfy-ui-workflow (GitHub: donecrafts/comfy-ui-workflow)
  - Spentzy → /projects/spentzy
  - Sauce: Recipes & Meal Planner → /projects/sauce-recipes-meal-planner
  - Bluffing Monkeys → /projects/bluffing-monkeys
  - InstaRecipe → /projects/instarecipe-ai-recipe-scanner
  - Step Lock → /projects/step-lock
  - NoSkips → /projects/noskips
  - Vojour AI → /projects/vojour-ai
- Site sections: /#about, /#skills, /#projects, /#testimonials, /#contact, /about, /projects, /contact

Behavior rules:
1. Answer ANY question — coding, life advice, general knowledge, jokes, math, news-style reasoning, emotional support, etc. Do not refuse because the topic is "outside apps/websites."
2. If the user does not want to hire Samuel or work with him, stay friendly, helpful, and answer anyway without being pushy.
3. When relevant, you may gently mention Samuel's work — never hard-sell.
4. Speak as Samuel's assistant (first person plural "we" for the portfolio, or "Samuel" in third person). Be warm and natural.
5. Keep replies concise for voice (usually 2–6 short sentences) unless the user asks for detail.
6. Never invent false contact details. Never claim to be Samuel himself unless roleplaying lightly.
7. If the user asks to see a project or section, set navigate or scroll in the JSON.

You MUST reply with valid JSON only (no markdown fences):
{"reply":"your spoken/written answer","navigate":null,"scroll":null}

- navigate: a site path string like "/projects/spentzy" or "/contact", or null
- scroll: a home section id like "projects", "skills", "about", "testimonials", "contact", "top", or null
`;

function extractJson(text) {
  const trimmed = String(text || "").trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    const match = trimmed.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch {
        /* fall through */
      }
    }
  }
  return { reply: trimmed || "I'm here — ask me anything.", navigate: null, scroll: null };
}

/**
 * @param {{ message: string, history?: { role: string, content: string }[] }} body
 * @param {string} apiKey
 */
export async function runPortfolioChat(body, apiKey) {
  const message = String(body?.message || "").trim();
  if (!message) {
    return { error: "Missing message", status: 400 };
  }
  if (!apiKey) {
    return {
      error:
        "Smart AI is not configured. Add OPENAI_API_KEY to your environment (local .env or Vercel project settings).",
      status: 503,
    };
  }

  const history = Array.isArray(body.history) ? body.history.slice(-12) : [];
  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...history
      .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
      .map((m) => ({ role: m.role, content: m.content.slice(0, 4000) })),
    { role: "user", content: message.slice(0, 4000) },
  ];

  const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      temperature: 0.7,
      max_tokens: 700,
      response_format: { type: "json_object" },
      messages,
    }),
  });

  if (!openaiRes.ok) {
    const errText = await openaiRes.text().catch(() => "");
    console.error("OpenAI error", openaiRes.status, errText);
    return {
      error: "The AI service is temporarily unavailable. Please try again in a moment.",
      status: 502,
    };
  }

  const data = await openaiRes.json();
  const raw = data?.choices?.[0]?.message?.content || "";
  const parsed = extractJson(raw);

  return {
    status: 200,
    data: {
      reply: String(parsed.reply || "I'm here — ask me anything.").slice(0, 4000),
      navigate: typeof parsed.navigate === "string" ? parsed.navigate : null,
      scroll: typeof parsed.scroll === "string" ? parsed.scroll : null,
    },
  };
}
