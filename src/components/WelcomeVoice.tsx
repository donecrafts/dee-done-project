import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "next-themes";
import { Volume2, VolumeX, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { cancelSpeech, speakText } from "@/lib/voice-portfolio-agent";
import {
  WELCOME_VOICE_MESSAGE,
  hasWelcomeVoicePlayed,
  markWelcomeVoicePlayed,
  prefersReducedMotion,
  waitForSpeechVoices,
} from "@/lib/welcome-voice";
import { BRAND_NAME } from "@/config/brand";

type WelcomeState = "hidden" | "prompt" | "playing" | "done";

/** One-time spoken welcome on the home page per browser session. */
const WelcomeVoice = () => {
  const location = useLocation();
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";
  const [state, setState] = useState<WelcomeState>("hidden");
  const playedRef = useRef(false);
  const timerRef = useRef<number | null>(null);

  const dismiss = useCallback(() => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    cancelSpeech();
    markWelcomeVoicePlayed();
    playedRef.current = true;
    setState("done");
    window.setTimeout(() => setState("hidden"), 300);
  }, []);

  const playWelcome = useCallback(async () => {
    if (playedRef.current || typeof window === "undefined" || !window.speechSynthesis) return;
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    playedRef.current = true;
    setState("playing");
    await waitForSpeechVoices();
    speakText(WELCOME_VOICE_MESSAGE, () => {
      markWelcomeVoicePlayed();
      setState("done");
      window.setTimeout(() => setState("hidden"), 400);
    });
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") return;
    if (hasWelcomeVoicePlayed() || prefersReducedMotion()) return;
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    setState("prompt");
    timerRef.current = window.setTimeout(() => {
      void playWelcome();
    }, 1800);

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [location.pathname, playWelcome]);

  if (state === "hidden" || state === "done") return null;

  return (
    <div
      className={cn(
        "fixed bottom-[5.75rem] left-6 z-40 flex max-w-[min(20rem,calc(100vw-3rem))] items-start gap-3 rounded-2xl border p-4 shadow-xl backdrop-blur-md md:left-10",
        isLight ? "border-border bg-background/95" : "border-border bg-card/95",
        state === "playing" && "ring-2 ring-primary/30",
      )}
      role="status"
      aria-live="polite"
    >
      <div
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
          state === "playing" ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary",
        )}
      >
        {state === "playing" ? (
          <Volume2 className="h-5 w-5 animate-pulse" aria-hidden />
        ) : (
          <Volume2 className="h-5 w-5" aria-hidden />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-foreground">
          {state === "playing" ? "Welcome message playing…" : "AI welcome"}
        </p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          {state === "playing"
            ? `${BRAND_NAME} is greeting you. Use the mic on the right to ask anything.`
            : "Starting a short welcome in a moment…"}
        </p>
        {state === "prompt" ? (
          <button
            type="button"
            onClick={() => void playWelcome()}
            className="mt-2 text-xs font-medium text-primary underline-offset-2 hover:underline"
          >
            Play now
          </button>
        ) : null}
      </div>

      <button
        type="button"
        onClick={dismiss}
        className="rounded-lg p-1 text-muted-foreground transition-colors hover:text-foreground"
        aria-label="Skip welcome message"
      >
        {state === "playing" ? <VolumeX className="h-4 w-4" /> : <X className="h-4 w-4" />}
      </button>
    </div>
  );
};

export default WelcomeVoice;
