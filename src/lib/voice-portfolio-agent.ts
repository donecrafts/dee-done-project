import { projects } from "@/data/projects";
import { BRAND_NAME } from "@/config/brand";

export type VoiceAction =
  | { type: "speak"; message: string }
  | { type: "navigate"; path: string; message: string }
  | { type: "scroll"; sectionId: string; message: string };

/** Spoken aliases → project slug */
const PROJECT_KEYWORDS: Record<string, string> = {
  poker: "pokerbros-your-poker-app",
  pokerbros: "pokerbros-your-poker-app",
  bros: "pokerbros-your-poker-app",
  sauce: "sauce-recipes-meal-planner",
  recipe: "sauce-recipes-meal-planner",
  meal: "sauce-recipes-meal-planner",
  spentzy: "spentzy",
  expense: "spentzy",
  comfy: "comfy-ui-workflow",
  comfyui: "comfy-ui-workflow",
  lora: "comfy-ui-workflow",
  wan: "comfy-ui-workflow",
  workflow: "comfy-ui-workflow",
  bluffing: "bluffing-monkeys",
  monkeys: "bluffing-monkeys",
  pokerclub: "bluffing-monkeys",
  instarecipe: "instarecipe-ai-recipe-scanner",
  scanner: "instarecipe-ai-recipe-scanner",
  steplock: "step-lock",
  "step lock": "step-lock",
  walk: "step-lock",
  noskips: "noskips",
  music: "noskips",
  vojour: "vojour-ai",
  wellness: "vojour-ai",
};

const SECTION_ALIASES: Record<string, string> = {
  home: "top",
  about: "about",
  skills: "skills",
  projects: "projects",
  testimonials: "testimonials",
  contact: "contact",
};

function matchesAny(text: string, patterns: RegExp[]): boolean {
  return patterns.some((p) => p.test(text));
}

function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

function findProject(query: string) {
  const q = query.toLowerCase();

  for (const [keyword, slug] of Object.entries(PROJECT_KEYWORDS)) {
    if (q.includes(keyword)) {
      const match = getProjectBySlug(slug);
      if (match) return match;
    }
  }

  return projects.find((p) => {
    const title = p.title.toLowerCase();
    const slug = p.slug.toLowerCase();
    return (
      q.includes(slug) ||
      q.includes(title) ||
      title.split(/[\s:&-]+/).some((word) => word.length > 3 && q.includes(word))
    );
  });
}

function listTopProjects(): string {
  return projects
    .slice(0, 5)
    .map((p) => p.title.replace(/:.*$/, "").split(" - ")[0])
    .join(", ");
}

export function processVoiceQuery(raw: string): VoiceAction {
  const q = raw.toLowerCase().trim();
  if (!q) {
    return {
      type: "speak",
      message: "I didn't catch that. Try asking about my projects, skills, or how to contact me.",
    };
  }

  const project = findProject(q);

  if (matchesAny(q, [/what projects|list projects|name.*projects|which projects/i])) {
    return {
      type: "scroll",
      sectionId: "projects",
      message: `My top projects include ${listTopProjects()}, and more. Say a project name to open it.`,
    };
  }

  if (project && matchesAny(q, [/show|open|go to|tell me about|about the|view|launch|see/i])) {
    return {
      type: "navigate",
      path: `/projects/${project.slug}`,
      message: `${project.title}. ${project.description}`,
    };
  }

  if (matchesAny(q, [/who are you|who is samuel|who is done|about you|about samuel|about done craft|introduce|your name/i])) {
    return {
      type: "scroll",
      sectionId: "about",
      message: `I'm ${BRAND_NAME}, a Python and AI developer focused on building smart apps that solve real problems. I build AI-powered mobile apps, web platforms, and custom software. My goal is simple: build useful technology that works well and helps people. I'm based in Osogbo, Nigeria.`,
    };
  }

  if (matchesAny(q, [/github|git hub|code repository|repo/i])) {
    return {
      type: "navigate",
      path: "/contact",
      message: "My GitHub is donecrafts at github.com/donecrafts. Opening contact where you'll find the link.",
    };
  }

  if (matchesAny(q, [/email|gmail|mail address/i])) {
    return {
      type: "navigate",
      path: "/contact",
      message: "You can email me at doneporpor@gmail.com. Opening the contact page now.",
    };
  }

  if (matchesAny(q, [/location|where.*from|where.*live|nigeria|osogbo/i])) {
    return {
      type: "speak",
      message: "I'm based in Osogbo, Nigeria, and work with clients worldwide remotely.",
    };
  }

  if (matchesAny(q, [/skill|comfyui|python|lora|automation|gohighlevel|tech stack/i])) {
    return {
      type: "scroll",
      sectionId: "skills",
      message:
        "Scrolling to skills. I specialize in Python, FastAPI, ComfyUI, Wan 2.2 LoRA training, AI automation, GoHighLevel, React, and cloud deployment.",
    };
  }

  if (matchesAny(q, [/project|portfolio|work|built|apps|app store/i])) {
    return {
      type: "scroll",
      sectionId: "projects",
      message: `Here are my featured projects—including ${listTopProjects()}. Say a project name like PokerBROS or ComfyUI to open one.`,
    };
  }

  if (matchesAny(q, [/testimonial|review|client|fiverr|feedback/i])) {
    return {
      type: "scroll",
      sectionId: "testimonials",
      message: "Scrolling to client testimonials from Fiverr and freelance work.",
    };
  }

  if (matchesAny(q, [/contact|hire|reach|work together|collaborate|get in touch/i])) {
    return {
      type: "navigate",
      path: "/contact",
      message: "Opening contact. Email doneporpor@gmail.com, message on X at donecraft225, or use the contact form.",
    };
  }

  if (matchesAny(q, [/resume|cv|download/i])) {
    return {
      type: "navigate",
      path: "/about",
      message: "Head to the About page to download my resume.",
    };
  }

  if (matchesAny(q, [/twitter|^\sx$|donecraft/i])) {
    return {
      type: "speak",
      message: "Find me on X at donecraft225, or visit x.com/donecraft225.",
    };
  }

  for (const [keyword, sectionId] of Object.entries(SECTION_ALIASES)) {
    if (q.includes(keyword) && matchesAny(q, [/go to|show|scroll|take me|open|navigate/i])) {
      if (sectionId === "top") {
        return { type: "scroll", sectionId: "top", message: "Going to the top of the page." };
      }
      return {
        type: "scroll",
        sectionId,
        message: `Scrolling to ${keyword}.`,
      };
    }
  }

  if (project) {
    return {
      type: "navigate",
      path: `/projects/${project.slug}`,
      message: `${project.title}. ${project.description}`,
    };
  }

  return {
    type: "speak",
    message: `I can help with who I am, my projects like ${listTopProjects()}, skills, contact info, or GitHub. Try saying "show my projects" or "open PokerBROS".`,
  };
}

import { pickMaleEnglishVoice } from "@/lib/welcome-voice";

export function speakText(text: string, onEnd?: () => void): void {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    onEnd?.();
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.9;
  utterance.pitch = 0.82;
  utterance.volume = 1;
  const voice = pickMaleEnglishVoice();
  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang || "en-US";
  } else {
    utterance.lang = "en-US";
    utterance.pitch = 0.75;
  }
  utterance.onend = () => onEnd?.();
  utterance.onerror = () => onEnd?.();
  window.speechSynthesis.speak(utterance);
}

export function getSpeechRecognition(): (new () => SpeechRecognition) | null {
  if (typeof window === "undefined") return null;
  const w = window as Window & {
    SpeechRecognition?: new () => SpeechRecognition;
    webkitSpeechRecognition?: new () => SpeechRecognition;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export function isVoiceEnvironmentSupported(): boolean {
  return typeof window !== "undefined" && window.isSecureContext && !!getSpeechRecognition();
}

export async function ensureMicrophoneAccess(): Promise<{ ok: true } | { ok: false; message: string }> {
  if (typeof window === "undefined") {
    return { ok: false, message: "Voice is only available in the browser." };
  }
  if (!window.isSecureContext) {
    return {
      ok: false,
      message: "Voice needs a secure page. Use http://localhost:8080 locally, or your HTTPS Vercel URL when deployed.",
    };
  }
  if (!getSpeechRecognition()) {
    return { ok: false, message: "This browser doesn't support voice input. Use Chrome or Edge on desktop." };
  }
  if (!navigator.mediaDevices?.getUserMedia) {
    return { ok: false, message: "Microphone API is not available in this browser." };
  }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach((track) => track.stop());
    return { ok: true };
  } catch {
    return {
      ok: false,
      message: "Microphone blocked. Click the lock icon in your browser address bar and allow microphone access for this site.",
    };
  }
}

export function speechRecognitionErrorMessage(code: string): string {
  switch (code) {
    case "not-allowed":
    case "service-not-allowed":
      return "Microphone permission denied. Allow the mic in your browser settings, then try again.";
    case "no-speech":
      return "No speech detected. Tap the mic, wait for Listening, then speak clearly.";
    case "network":
      return "Speech recognition needs internet (Chrome sends audio to Google). Check your connection and try again.";
    case "audio-capture":
      return "No microphone found. Plug in a mic or check Windows sound settings.";
    case "aborted":
      return "";
    default:
      return "Could not recognize speech. Try Chrome or Edge, speak in English, and stay close to your mic.";
  }
}
