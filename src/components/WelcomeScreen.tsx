import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Volume2 } from "lucide-react";
import welcomePortrait from "@/assets/welcome-portrait.jpg";
import welcomePortraitBack from "@/assets/welcome-portrait-back.jpg";
import { BRAND_LOGO, BRAND_NAME } from "@/config/brand";
import { projects } from "@/data/projects";
import { startWelcomeWebGL } from "@/lib/welcome-webgl";
import { preloadWelcomeVoices, speakWelcome, WELCOME_STORAGE_KEY } from "@/lib/welcome-voice";

const WelcomeScreen = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const webglRef = useRef<ReturnType<typeof startWelcomeWebGL> | null>(null);
  const spokeRef = useRef(false);
  const [show, setShow] = useState(() => {
    if (typeof window === "undefined") return false;
    return !sessionStorage.getItem(WELCOME_STORAGE_KEY);
  });
  const [voiceHint, setVoiceHint] = useState(false);
  const reducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const marqueeItems = useMemo(() => {
    const imgs = projects.map((p) => ({ image: p.image, title: p.title }));
    return [...imgs, ...imgs];
  }, []);

  const marqueeReverse = useMemo(() => {
    const imgs = [...projects].reverse().map((p) => ({ image: p.image, title: p.title }));
    return [...imgs, ...imgs];
  }, []);

  useEffect(() => {
    preloadWelcomeVoices();
  }, []);

  useEffect(() => {
    if (!show || !canvasRef.current) return undefined;

    webglRef.current = startWelcomeWebGL(canvasRef.current, welcomePortrait, welcomePortraitBack, reducedMotion);

    const timer = window.setTimeout(() => {
      if (spokeRef.current) return;
      const started = speakWelcome();
      if (started) {
        spokeRef.current = true;
      } else {
        setVoiceHint(true);
      }
    }, 700);

    return () => {
      window.clearTimeout(timer);
      webglRef.current?.stop();
      webglRef.current = null;
    };
  }, [show, reducedMotion]);

  const enterPortfolio = useCallback((goToProjects = false) => {
    if (!spokeRef.current) {
      speakWelcome();
      spokeRef.current = true;
    }
    sessionStorage.setItem(WELCOME_STORAGE_KEY, "1");
    setShow(false);
    if (goToProjects) {
      window.setTimeout(() => {
        if (window.location.pathname === "/") {
          document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.location.hash = "projects";
        }
      }, 400);
    }
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.section
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.7, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#141416]"
          role="dialog"
          aria-modal="true"
          aria-label="Welcome"
        >
          {/* Soft brand wash — same structure as gratitudedev hero */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/15 via-[#141416] to-primary/10" />

          {/* Top scrolling project strip */}
          {!reducedMotion && (
            <div className="pointer-events-none absolute left-0 right-0 top-16 overflow-hidden opacity-30" aria-hidden>
              <div className="flex w-max animate-scroll-left">
                {marqueeItems.map((item, i) => (
                  <div
                    key={`top-${item.title}-${i}`}
                    className="mx-4 h-72 w-40 flex-shrink-0 overflow-hidden rounded-xl shadow-2xl"
                  >
                    <img src={item.image} alt="" className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom scrolling project strip */}
          {!reducedMotion && (
            <div className="pointer-events-none absolute bottom-16 left-0 right-0 overflow-hidden opacity-30" aria-hidden>
              <div className="flex w-max animate-scroll-right">
                {marqueeReverse.map((item, i) => (
                  <div
                    key={`bottom-${item.title}-${i}`}
                    className="mx-4 h-72 w-40 flex-shrink-0 overflow-hidden rounded-xl shadow-2xl"
                  >
                    <img src={item.image} alt="" className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Center content */}
          <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-6 pb-16 pt-28 text-center">
            <div className="mb-5 animate-slide-up" style={{ animationDelay: "0.04s" }}>
              <img
                src={BRAND_LOGO}
                alt=""
                width={112}
                height={112}
                className="h-20 w-20 object-contain drop-shadow-md sm:h-24 sm:w-24"
                aria-hidden
              />
            </div>

            <div
              className="relative mb-5 animate-slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-primary/20 blur-3xl" aria-hidden />
              <canvas
                ref={canvasRef}
                className="relative block h-[min(58vw,280px)] w-[min(58vw,280px)] touch-none rounded-2xl shadow-[0_24px_80px_-20px_rgba(0,0,0,0.65)] sm:h-[300px] sm:w-[300px]"
                aria-label="3D portrait — drag to rotate"
              />
            </div>

            <h1
              className="mb-4 animate-slide-up text-5xl font-extrabold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl"
              style={{ animationDelay: "0.16s", fontFamily: "var(--font-heading)" }}
            >
              {BRAND_NAME}
            </h1>

            <div
              className="mx-auto mb-6 flex w-44 items-center gap-2.5 animate-slide-up"
              style={{ animationDelay: "0.2s" }}
              aria-hidden
            >
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-400/70" />
              <span className="h-1.5 w-1.5 rotate-45 bg-amber-400/80" />
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-400/70" />
            </div>

            <p
              className="mb-8 max-w-xl animate-slide-up text-lg leading-relaxed text-white/70 sm:text-xl"
              style={{ animationDelay: "0.24s" }}
            >
              Python and AI developer who ships real products — smart apps, ComfyUI workflows, and freelance builds people actually use.
            </p>

            <div
              className="flex animate-slide-up flex-col items-center justify-center gap-3 sm:flex-row"
              style={{ animationDelay: "0.3s" }}
            >
              <button
                type="button"
                onClick={() => enterPortfolio(false)}
                className="inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-7 text-base font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl"
              >
                <Volume2 className="h-4 w-4" aria-hidden />
                Enter portfolio
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => enterPortfolio(true)}
                className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-7 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/15"
              >
                View shipped work
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
            </div>

            <p className="mt-5 animate-slide-up text-xs text-white/45" style={{ animationDelay: "0.36s" }}>
              {voiceHint
                ? "Tap Enter portfolio to hear the AI welcome voice if it didn’t start automatically."
                : "Drag the portrait to turn it around · AI welcome voice"}
            </p>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;
