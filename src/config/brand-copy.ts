/** Mathematical double-struck A–Z / a–z for brand display copy. */
const DS_UPPER = [..."𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ"];
const DS_LOWER = [..."𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫"];

/** Convert Latin letters to the DONE CRAFT display script. Other characters stay as-is. */
export function toBrandScript(text: string): string {
  let out = "";
  for (const ch of text) {
    if (ch >= "A" && ch <= "Z") out += DS_UPPER[ch.charCodeAt(0) - 65];
    else if (ch >= "a" && ch <= "z") out += DS_LOWER[ch.charCodeAt(0) - 97];
    else out += ch;
  }
  return out;
}

/** Exact About Me bio (display). */
export const ABOUT_BIO = [
  "𝕀’m 𝔻𝕆ℕ𝔼 ℂℝ𝔸𝔽𝕋, 𝕒 ℙ𝕪𝕥𝕙𝕠𝕟 𝕒𝕟𝕕 𝔸𝕀 𝕕𝕖𝕧𝕖𝕝𝕠𝕡𝕖𝕣 𝕗𝕠𝕔𝕦𝕤𝕖𝕕 𝕠𝕟 𝕓𝕦𝕚𝕝𝕕𝕚𝕟𝕘 𝕤𝕞𝕒𝕣𝕥 𝕒𝕡𝕡𝕤 𝕥𝕙𝕒𝕥 𝕤𝕠𝕝𝕧𝕖 𝕣𝕖𝕒𝕝 𝕡𝕣𝕠𝕓𝕝𝕖𝕞𝕤.",
  "𝕀 𝕓𝕦𝕚𝕝𝕕 𝔸𝕀-𝕡𝕠𝕨𝕖𝕣𝕖𝕕 𝕞𝕠𝕓𝕚𝕝𝕖 𝕒𝕡𝕡𝕤, 𝕨𝕖𝕓 𝕡𝕝𝕒𝕥𝕗𝕠𝕣𝕞𝕤, 𝕒𝕟𝕕 𝕔𝕦𝕤𝕥𝕠𝕞 𝕤𝕠𝕗𝕥𝕨𝕒𝕣𝕖. 𝕀 𝕦𝕤𝕖 ℙ𝕪𝕥𝕙𝕠𝕟, 𝔸𝕀, 𝕞𝕒𝕔𝕙𝕚𝕟𝕖 𝕝𝕖𝕒𝕣𝕟𝕚𝕟𝕘, 𝔸ℙ𝕀𝕤, 𝕒𝕟𝕕 𝕞𝕠𝕕𝕖𝕣𝕟 𝕥𝕠𝕠𝕝𝕤 𝕥𝕠 𝕥𝕦𝕣𝕟 𝕚𝕕𝕖𝕒𝕤 𝕚𝕟𝕥𝕠 𝕣𝕖𝕒𝕝 𝕡𝕣𝕠𝕕𝕦𝕔𝕥𝕤.",
  "𝕀 𝕨𝕠𝕣𝕜 𝕒𝕔𝕣𝕠𝕤𝕤 𝕥𝕙𝕖 𝕗𝕦𝕝𝕝 𝕤𝕥𝕒𝕔𝕜, 𝕗𝕣𝕠𝕞 𝕓𝕦𝕚𝕝𝕕𝕚𝕟𝕘 𝕓𝕒𝕔𝕜𝕖𝕟𝕕𝕤 𝕒𝕟𝕕 𝔸ℙ𝕀𝕤 𝕥𝕠 𝕒𝕕𝕕𝕚𝕟𝕘 𝔸𝕀 𝕗𝕖𝕒𝕥𝕦𝕣𝕖𝕤 𝕒𝕟𝕕 𝕔𝕣𝕖𝕒𝕥𝕚𝕟𝕘 𝕔𝕝𝕖𝕒𝕟, 𝕖𝕒𝕤𝕪-𝕥𝕠-𝕦𝕤𝕖 𝕒𝕡𝕡𝕤.",
  "𝕄𝕪 𝕘𝕠𝕒𝕝 𝕚𝕤 𝕤𝕚𝕞𝕡𝕝𝕖: 𝕓𝕦𝕚𝕝𝕕 𝕦𝕤𝕖𝕗𝕦𝕝 𝕥𝕖𝕔𝕙𝕟𝕠𝕝𝕠𝕘𝕪 𝕥𝕙𝕒𝕥 𝕨𝕠𝕣𝕜𝕤 𝕨𝕖𝕝𝕝 𝕒𝕟𝕕 𝕙𝕖𝕝𝕡𝕤 𝕡𝕖𝕠𝕡𝕝𝕖.",
  "𝕎𝕖𝕝𝕔𝕠𝕞𝕖 𝕥𝕠 𝔻𝕆ℕ𝔼 ℂℝ𝔸𝔽𝕋. 𝕋𝕒𝕜𝕖 𝕒 𝕝𝕠𝕠𝕜 𝕒𝕣𝕠𝕦𝕟𝕕 𝕒𝕟𝕕 𝕤𝕖𝕖 𝕨𝕙𝕒𝕥 𝕀 𝕔𝕒𝕟 𝕓𝕦𝕚𝕝𝕕 𝕗𝕠𝕣 𝕪𝕠𝕦.",
] as const;

/** Plain About Me (voice, SEO, screen readers). */
export const ABOUT_BIO_PLAIN = [
  "I'm Done Craft, a Python and AI developer focused on building smart apps that solve real problems.",
  "I build AI-powered mobile apps, web platforms, and custom software. I use Python, AI, machine learning, APIs, and modern tools to turn ideas into real products.",
  "I work across the full stack, from building backends and APIs to adding AI features and creating clean, easy-to-use apps.",
  "My goal is simple: build useful technology that works well and helps people.",
  "Welcome to Done Craft. Take a look around and see what I can build for you.",
] as const;

export const ROLE_LINE = toBrandScript("Python and AI Developer");

export const HERO_TAGLINE = toBrandScript(
  "A Python and AI developer focused on building smart apps that solve real problems.",
);

export const FOOTER_BLURB = toBrandScript(
  "I build AI-powered mobile apps, web platforms, and custom software. Useful technology that works well and helps people.",
);

export const WELCOME_HEADLINE = "𝔻𝕆ℕ𝔼 ℂℝ𝔸𝔽𝕋";

export const WELCOME_SUBLINE = toBrandScript("Take a look around and see what I can build for you.");

export const PROJECTS_INTRO = toBrandScript(
  "A selection of apps and platforms I've built — take a look and see what I can create for you.",
);

export const SKILLS_INTRO = toBrandScript(
  "I use Python, AI, machine learning, APIs, and modern tools to turn ideas into real products.",
);

export const CONTACT_INTRO = toBrandScript(
  "Have a project in mind? Tell me what you're trying to build, and let's see what we can create together.",
);

export const TESTIMONIALS_INTRO = toBrandScript(
  "Real feedback from people I've built with — clear work, reliable delivery, and useful results.",
);

export const META_TITLE = "𝔻𝕆ℕ𝔼 ℂℝ𝔸𝔽𝕋 — Python and AI Developer";

export const META_DESCRIPTION =
  "𝔻𝕆ℕ𝔼 ℂℝ𝔸𝔽𝕋 — a Python and AI developer focused on building smart apps that solve real problems. AI-powered mobile apps, web platforms, and custom software.";
