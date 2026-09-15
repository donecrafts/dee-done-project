export const WELCOME_STORAGE_KEY = "portfolio-welcome-seen";

/** Spoken on first visit — plain English for TTS; matches site bio tone. */
export const WELCOME_SCRIPT =
  "Welcome to Done Craft. Take a look around and see what I can build for you. I build AI-powered mobile apps, web platforms, and custom software. My goal is simple: useful technology that works well and helps people.";

const FEMALE_VOICE =
  /aria|jenny|zira|hazel|samantha|sonia|susan|karen|moira|sara|sarah|linda|heather|michelle|catherine|anna|emma|ava|allison|victoria|fiona|tessa|veena|raveena|female|woman/i;

const MALE_VOICE =
  /guy|ryan|davis|david|mark|daniel|alex|fred|aaron|tom|matthew|joey|brian|christopher|eric|george|james|john|michael|andrew|tony|ravi|thomas|steffan|male|man\b/i;

function scoreVoice(v: SpeechSynthesisVoice): number {
  const name = v.name.toLowerCase();
  const lang = v.lang.toLowerCase();
  let score = 0;

  if (!lang.startsWith("en")) return -1000;
  if (lang === "en-us" || lang === "en_us") score += 10;
  if (lang.startsWith("en-gb") || lang === "en_gb") score += 6;

  // Hard reject female voices — we want a man tone only
  if (FEMALE_VOICE.test(name)) return -1000;

  // Strongly prefer clearly male voices
  if (MALE_VOICE.test(name)) score += 60;

  // Prefer neural / natural / online premium (still male-filtered above)
  if (/neural|natural|premium|enhanced|online \(natural\)/i.test(name)) score += 35;
  if (/google|microsoft|apple/i.test(name)) score += 8;
  if (v.localService === false) score += 12;

  // Explicit high-quality male neural voices
  if (/microsoft (guy|ryan|davis|andrew|brian|christopher|eric|guy)/i.test(name)) score += 25;
  if (/google uk english male|google us english male/i.test(name)) score += 25;
  if (/\balex\b|\bdaniel\b|\bfred\b/i.test(name)) score += 15;

  // Penalize robotic novelty voices
  if (/compact|eloquence|whisper|zarvox|bad news|bahh|bells|boing|bubbles|cellos|good news|jigsaw|organ|pipes|trinoids/i.test(name)) {
    score -= 50;
  }

  return score;
}

export function pickMaleEnglishVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith("en"));
  if (!voices.length) return null;

  const maleOnly = voices.filter((v) => !FEMALE_VOICE.test(v.name) && (MALE_VOICE.test(v.name) || scoreVoice(v) > 0));
  const pool = maleOnly.length ? maleOnly : voices.filter((v) => !FEMALE_VOICE.test(v.name));
  const ranked = [...pool].sort((a, b) => scoreVoice(b) - scoreVoice(a));
  return ranked[0] ?? null;
}

export function speakWelcome(onEnd?: () => void): boolean {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    onEnd?.();
    return false;
  }

  window.speechSynthesis.cancel();

  const speakNow = () => {
    const utterance = new SpeechSynthesisUtterance(WELCOME_SCRIPT);
    // Lower pitch + steady rate = deeper male, less robotic
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
  };

  const voices = window.speechSynthesis.getVoices();
  if (voices.length) {
    speakNow();
  } else {
    const onVoices = () => {
      window.speechSynthesis.removeEventListener("voiceschanged", onVoices);
      speakNow();
    };
    window.speechSynthesis.addEventListener("voiceschanged", onVoices);
    window.setTimeout(() => {
      window.speechSynthesis.removeEventListener("voiceschanged", onVoices);
      speakNow();
    }, 400);
  }

  return true;
}

export function preloadWelcomeVoices() {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}
