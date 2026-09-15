import { runPortfolioChat } from "../server/portfolio-chat.mjs";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const result = await runPortfolioChat(req.body || {}, process.env.OPENAI_API_KEY || "");
    if (result.error) {
      return res.status(result.status || 500).json({ error: result.error });
    }
    return res.status(200).json(result.data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Unexpected server error." });
  }
}
