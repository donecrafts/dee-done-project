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
  toBrandScript(
    "I'm Done Craft, a freelance Python and AI developer based in Wales, UK — focused on building smart apps that solve real problems.",
  ),
  toBrandScript(
    "I build AI-powered mobile apps, web platforms, custom software, and digital loyalty experiences for Apple Wallet and Google Wallet. I use Python, AI, machine learning, APIs, and modern tools to turn ideas into real products.",
  ),
  toBrandScript(
    "As a freelancer, I work across the full stack — from backends and APIs to AI features, wallet passes, and clean, easy-to-use apps for clients worldwide.",
  ),
  toBrandScript("My goal is simple: build useful technology that works well and helps people."),
  toBrandScript("Welcome to Done Craft. Take a look around and see what I can build for you."),
] as const;

/** Plain About Me (voice, SEO, screen readers). */
export const ABOUT_BIO_PLAIN = [
  "I'm Done Craft, a freelance Python and AI developer based in Wales, UK — focused on building smart apps that solve real problems.",
  "I build AI-powered mobile apps, web platforms, custom software, and digital loyalty experiences for Apple Wallet and Google Wallet. I use Python, AI, machine learning, APIs, and modern tools to turn ideas into real products.",
  "As a freelancer, I work across the full stack — from backends and APIs to AI features, wallet passes, and clean, easy-to-use apps for clients worldwide.",
  "My goal is simple: build useful technology that works well and helps people.",
  "Welcome to Done Craft. Take a look around and see what I can build for you.",
] as const;

export const ROLE_LINE = toBrandScript("Freelance Python and AI Developer");

export const HERO_TAGLINE = toBrandScript(
  "A freelance Python and AI developer focused on building smart apps that solve real problems.",
);

export const FOOTER_BLURB = toBrandScript(
  "Freelance Python and AI developer in Wales, UK. I build AI-powered apps, web platforms, and Apple Wallet & Google Wallet experiences.",
);

export const WELCOME_HEADLINE = "𝔻𝕆ℕ𝔼 ℂℝ𝔸𝔽𝕋";

export const WELCOME_SUBLINE = toBrandScript("Take a look around and see what I can build for you.");

export const PROJECTS_INTRO = toBrandScript(
  "A selection of apps and platforms I've built — take a look and see what I can create for you.",
);

export const SKILLS_INTRO = toBrandScript(
  "I use Python, AI, QR codes, barcodes, Apple Wallet, Google Wallet, loyalty cards, e-commerce, machine learning, APIs, and modern tools to turn ideas into real products.",
);

export const CONTACT_INTRO = toBrandScript(
  "Have a project in mind? Tell me what you're trying to build, and let's see what we can create together.",
);

export const TESTIMONIALS_INTRO = toBrandScript(
  "Real feedback from people I've built with — clear work, reliable delivery, and useful results.",
);

export const META_TITLE = "𝔻𝕆ℕ𝔼 ℂℝ𝔸𝔽𝕋 — Freelance Python and AI Developer · Wales, UK";

export const META_DESCRIPTION =
  "𝔻𝕆ℕ𝔼 ℂℝ𝔸𝔽𝕋 — freelance Python and AI developer in Wales, UK. AI-powered apps, web platforms, and Apple Wallet & Google Wallet loyalty experiences.";

export const LOCATION_LINE = "Wales, UK";
