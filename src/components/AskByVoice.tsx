import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";
import { Mic, MicOff, Send, X, Volume2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { askPortfolioAI, typeOutText, type ChatMessage } from "@/lib/ask-portfolio-ai";
import {
  ensureMicrophoneAccess,
  getSpeechRecognition,
  isVoiceEnvironmentSupported,
  speakText,
  speechRecognitionErrorMessage,
} from "@/lib/voice-portfolio-agent";
import { BRAND_NAME } from "@/config/brand";

type VoiceStatus = "idle" | "listening" | "processing" | "writing" | "speaking" | "unsupported" | "error";
type InputMode = "voice" | "text";

const AskByVoice = () => {
  const navigate = useNavigate();
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<VoiceStatus>("idle");
  const [transcript, setTranscript] = useState("");
  const [reply, setReply] = useState("");
  const [typedQuery, setTypedQuery] = useState("");
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const userStoppedRef = useRef(false);
  const gotResultRef = useRef(false);
  const gotErrorRef = useRef(false);
  const historyRef = useRef<ChatMessage[]>([]);
  const cancelTypeRef = useRef<(() => void) | null>(null);
  const busyRef = useRef(false);

  useEffect(() => {
    if (!isVoiceEnvironmentSupported()) setStatus("unsupported");
  }, []);

  const applySiteAction = useCallback(
    (navigatePath: string | null, scrollId: string | null) => {
      if (navigatePath) {
        navigate(navigatePath);
        const hash = navigatePath.split("#")[1];
        if (hash) {
          window.setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" }), 280);
        }
        return;
      }
      if (scrollId) {
        if (scrollId === "top") {
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
        if (window.location.pathname !== "/") {
          navigate(`/#${scrollId}`);
        } else {
          document.getElementById(scrollId)?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    },
    [navigate],
  );

  const deliverReply = useCallback(
    (fullReply: string, inputMode: InputMode, navigatePath: string | null, scrollId: string | null) => {
      cancelTypeRef.current?.();
      setReply("");
      setStatus("writing");

      const finish = () => {
        applySiteAction(navigatePath, scrollId);
        setStatus("idle");
        busyRef.current = false;
      };

      cancelTypeRef.current = typeOutText(
        fullReply,
        (partial) => setReply(partial),
        () => {
          if (inputMode === "voice") {
            setStatus("speaking");
            speakText(fullReply, finish);
          } else {
            finish();
          }
        },
      );
    },
    [applySiteAction],
  );

  const submitQuery = useCallback(
    async (text: string, inputMode: InputMode) => {
      const trimmed = text.trim();
      if (!trimmed || busyRef.current) return;

      busyRef.current = true;
      window.speechSynthesis?.cancel();
      cancelTypeRef.current?.();

      setOpen(true);
      setTranscript(trimmed);
      setReply("");
      setStatus("processing");

      try {
        const result = await askPortfolioAI(trimmed, historyRef.current);
        historyRef.current = [
          ...historyRef.current,
          { role: "user", content: trimmed },
          { role: "assistant", content: result.reply },
        ].slice(-12);

        deliverReply(result.reply, inputMode, result.navigate, result.scroll);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
        setStatus("error");
        setReply(message);
        busyRef.current = false;
      }
    },
    [deliverReply],
  );

  const stopListening = useCallback(() => {
    userStoppedRef.current = true;
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    if (status === "listening") setStatus("idle");
  }, [status]);

  const startListening = useCallback(async () => {
    if (busyRef.current) return;
    setOpen(true);
    setReply("");
    setTranscript("");

    const access = await ensureMicrophoneAccess();
    if (!access.ok) {
      setStatus("error");
      setReply(access.message);
      return;
    }

    const SpeechRecognitionCtor = getSpeechRecognition();
    if (!SpeechRecognitionCtor) {
      setStatus("unsupported");
      setReply("Voice input isn't supported here. Use Chrome or Edge, or type your question below.");
      return;
    }

    if (recognitionRef.current) {
      stopListening();
      return;
    }

    userStoppedRef.current = false;
    gotResultRef.current = false;
    gotErrorRef.current = false;

    const recognition = new SpeechRecognitionCtor();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;
    recognitionRef.current = recognition;

    recognition.onstart = () => {
      setStatus("listening");
      setReply("");
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const last = event.results.length - 1;
      const result = event.results[last];
      if (!result?.isFinal) return;
      gotResultRef.current = true;
      const text = result[0]?.transcript?.trim() ?? "";
      if (text) void submitQuery(text, "voice");
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      if (event.error === "aborted" && userStoppedRef.current) {
        setStatus("idle");
        return;
      }
      const message = speechRecognitionErrorMessage(event.error);
      if (!message) {
        setStatus("idle");
        return;
      }
      gotErrorRef.current = true;
      setStatus("error");
      setReply(message);
    };

    recognition.onend = () => {
      recognitionRef.current = null;
      if (gotErrorRef.current || gotResultRef.current || userStoppedRef.current) return;
      setStatus("idle");
      setReply("No speech heard. Tap the mic, wait for Listening, then speak clearly.");
    };

    try {
      recognition.start();
    } catch {
      setStatus("error");
      setReply("Could not start the microphone. Refresh the page and try again.");
    }
  }, [stopListening, submitQuery]);

  const handleTypedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = typedQuery;
    setTypedQuery("");
    void submitQuery(q, "text");
  };

  useEffect(
    () => () => {
      userStoppedRef.current = true;
      recognitionRef.current?.stop();
      window.speechSynthesis?.cancel();
      cancelTypeRef.current?.();
    },
    [],
  );

  const statusLabel: Record<VoiceStatus, string> = {
    idle: "Ask anything — voice or type. Voice answers speak + write; typing writes only.",
    listening: "Listening… speak now.",
    processing: "Thinking like ChatGPT…",
    writing: "Writing reply…",
    speaking: "Speaking reply…",
    unsupported: "Voice not supported here. Type any question below.",
    error: "Something went wrong — see the note below.",
  };

  return (
    <>
      <button
        type="button"
        onClick={() => (status === "listening" ? stopListening() : void startListening())}
        className={cn(
          "fixed bottom-8 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl md:right-10",
          status === "listening" && "animate-pulse ring-2 ring-primary/60 ring-offset-2 ring-offset-background",
        )}
        aria-label={status === "listening" ? "Stop listening" : "Ask by voice"}
        aria-expanded={open}
        title="Ask by voice"
      >
        {status === "listening" ? <MicOff className="h-6 w-6" strokeWidth={2} /> : <Mic className="h-6 w-6" strokeWidth={2} />}
      </button>

      {open && (
        <div
          className={cn(
            "fixed bottom-[5.75rem] right-6 z-40 w-[min(24rem,calc(100vw-3rem))] rounded-2xl border p-4 shadow-xl backdrop-blur-md md:right-10",
            isLight ? "border-border bg-background/95" : "border-border bg-card/95",
          )}
          role="dialog"
          aria-label="AI assistant"
        >
          <div className="mb-3 flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4 text-primary" aria-hidden />
              <p className="text-sm font-semibold text-foreground">{BRAND_NAME} AI</p>
            </div>
            <button
              type="button"
              onClick={() => {
                userStoppedRef.current = true;
                recognitionRef.current?.stop();
                window.speechSynthesis?.cancel();
                cancelTypeRef.current?.();
                busyRef.current = false;
                setOpen(false);
                setStatus(isVoiceEnvironmentSupported() ? "idle" : "unsupported");
                setReply("");
              }}
              className="rounded-lg p-1 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Close AI assistant"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <p className="text-xs text-muted-foreground">{statusLabel[status]}</p>

          {status === "processing" ? (
            <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Thinking…
            </p>
          ) : null}

          {transcript ? (
            <p className="mt-3 max-h-20 overflow-y-auto text-sm text-foreground">
              <span className="font-medium text-muted-foreground">You: </span>
              {transcript}
            </p>
          ) : null}

          {reply ? (
            <p
              className={cn(
                "mt-2 max-h-40 overflow-y-auto text-sm leading-relaxed",
                status === "error" ? "text-destructive" : "text-foreground",
              )}
            >
              {status === "error" ? (
                <>
                  <span className="font-medium">Note: </span>
                  {reply}
                </>
              ) : (
                <>
                  <span className="font-medium text-muted-foreground">{BRAND_NAME}: </span>
                  {reply}
                  {status === "writing" ? <span className="animate-pulse">▍</span> : null}
                </>
              )}
            </p>
          ) : null}

          <form onSubmit={handleTypedSubmit} className="mt-3 flex gap-2">
            <input
              type="text"
              value={typedQuery}
              onChange={(e) => setTypedQuery(e.target.value)}
              placeholder="Ask anything…"
              disabled={busyRef.current && status === "processing"}
              className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-60"
              aria-label="Type a message"
            />
            <button
              type="submit"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

          <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
            Smart AI · Voice = speak + write · Typed = write only. Ask about projects, coding, life — anything.
          </p>

          {(status === "error" || status === "unsupported") && (
            <div className="mt-3 rounded-lg border border-border/80 bg-muted/30 p-3 text-[11px] leading-relaxed text-muted-foreground">
              <p className="mb-1.5 font-semibold text-foreground">Need help?</p>
              <ul className="list-inside list-disc space-y-1">
                <li>
                  Add <strong>OPENAI_API_KEY</strong> to a local <strong>.env</strong> file, then restart{" "}
                  <code>npm start</code>.
                </li>
                <li>
                  On Vercel, set <strong>OPENAI_API_KEY</strong> in Project → Settings → Environment Variables.
                </li>
                <li>Voice: Chrome/Edge + allow microphone.</li>
                <li>Typing always works for text replies once the API key is set.</li>
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AskByVoice;
