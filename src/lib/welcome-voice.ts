export const WELCOME_STORAGE_KEY = "portfolio-welcome-seen";

export const WELCOME_SCRIPT =
  "Hey, welcome. I am Samuel John, a full-stack Python and AI developer building smart solutions. I specialize in both frontend and backend. Thanks for visiting my portfolio. You can explore my projects, skills, and ask by voice anytime you need help. You can also reach out to me through my email or my X account—you will get that on my portfolio. Thank you.";

function pickEnglishVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(
    (v) =>
      v.lang.startsWith("en") &&
      /google|natural|online|aria|jenny|guy|samantha|zira|mark|neural/i.test(v.name),
  );
  return preferred ?? voices.find((v) => v.lang.startsWith("en")) ?? null;
}

export function speakWelcome(onEnd?: () => void): boolean {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    onEnd?.();
    return false;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(WELCOME_SCRIPT);
  utterance.rate = 0.92;
  utterance.pitch = 1.02;
  const voice = pickEnglishVoice();
  if (voice) utterance.voice = voice;
  utterance.onend = () => onEnd?.();
  utterance.onerror = () => onEnd?.();
  window.speechSynthesis.speak(utterance);
  return true;
}

export function preloadWelcomeVoices() {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}
