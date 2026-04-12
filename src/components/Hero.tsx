import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTheme } from "next-themes";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { HERO_BACKGROUND_VIDEO } from "@/config/videos";
import { testimonials } from "@/data/testimonials";

const HERO_REVIEW_PILL_COUNT = 3;

function heroReviewSnippet(quote: string, maxLen = 46): string {
  const q = quote.replace(/\s+/g, " ").trim();
  if (q.length <= maxLen) return q;
  const cut = q.slice(0, maxLen).trimEnd();
  const lastSpace = cut.lastIndexOf(" ");
  const base = lastSpace > 24 ? cut.slice(0, lastSpace) : cut;
  return `${base}…`;
}

const Hero = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <section className="relative z-10 flex min-h-screen items-center justify-center overflow-hidden">
      {/* Full-bleed hero: video only (no images). */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 z-0 h-full w-full object-cover"
        src={HERO_BACKGROUND_VIDEO}
      />

      {isDark ? (
        <>
          <div className="absolute inset-0 z-[1] bg-[hsl(260_35%_12%/0.72)] backdrop-blur-[2px]" />
          <div
            className="absolute inset-0 z-[1] opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgb(255 255 255) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </>
      ) : (
        <>
          <div className="absolute inset-0 z-[1] bg-gradient-to-b from-white/82 via-white/65 to-white/85" />
          <div className="absolute inset-0 z-[1] bg-[hsl(var(--primary)/0.05)]" />
          <div
            className="pointer-events-none absolute inset-0 z-[1] opacity-[0.22]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 22% 28%, hsl(var(--primary) / 0.1) 0%, transparent 46%), radial-gradient(circle at 78% 72%, hsl(var(--primary) / 0.07) 0%, transparent 44%)",
            }}
          />
        </>
      )}

      <div
        className={cn(
          "relative z-10 container mx-auto px-6 py-28 text-center",
          isDark ? "hero-over-video text-white" : "text-foreground",
        )}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex justify-center"
        >
          <div className="rounded-2xl bg-gradient-to-br from-[#f472b6] via-[#a78bfa] to-[#22d3ee] p-[2px] shadow-lg">
            <div
              className={cn(
                "flex h-[62px] w-[62px] items-center justify-center rounded-[14px] text-lg font-bold tracking-tight",
                isDark ? "bg-black/45 backdrop-blur-md" : "bg-background/92 backdrop-blur-sm",
              )}
            >
              <span className="text-gradient-spectrum">JC</span>
            </div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08 }}
          className="mb-2 text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl"
        >
          <span className={cn("font-mono text-2xl md:text-3xl", isDark ? "text-white/90" : "text-foreground/70")}># </span>
          <span className="text-gradient-spectrum inline-block uppercase tracking-tight">John Craft</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mb-2 text-base font-semibold md:text-lg"
        >
          <span className="text-gradient-spectrum inline-block">Full-Stack Developer</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.16 }}
          className={cn("mb-4 text-sm font-medium md:text-base", isDark ? "text-white/85" : "text-muted-foreground")}
        >
          Full-Stack Developer &amp; Digital Solutions Architect
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className={cn(
            "mx-auto mb-8 max-w-2xl text-lg leading-relaxed",
            isDark ? "text-white/90" : "text-muted-foreground",
          )}
        >
          I craft modern web apps, scalable APIs, and powerful digital experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="mb-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm"
        >
          {testimonials.slice(0, HERO_REVIEW_PILL_COUNT).map((t) => (
            <div
              key={t.name}
              className={cn(
                "flex items-center gap-2 rounded-full border px-3 py-1.5",
                isDark ? "border-white/25 bg-white/10 backdrop-blur-sm" : "border-border bg-card/90 shadow-sm backdrop-blur-sm",
              )}
            >
              <div className="flex gap-0.5 text-amber-500" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <span className={cn("font-medium", isDark ? "text-white" : "text-foreground")}>
                {t.name}— {heroReviewSnippet(t.quote)}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            to="/#projects"
            className="rounded-xl bg-primary px-8 py-3 font-semibold text-primary-foreground shadow-md transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:scale-[1.02]"
          >
            Explore My Work
          </Link>
          <Link
            to="/contact"
            className={cn(
              "inline-flex items-center justify-center rounded-xl border-2 px-8 py-3 font-semibold transition-all duration-300 hover:scale-[1.02]",
              isDark
                ? "border-white/80 bg-transparent text-white hover:bg-white/10"
                : "border-primary bg-transparent text-primary hover:bg-primary/5",
            )}
          >
            Get In Touch
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className={cn("text-xs", isDark ? "text-white/75" : "text-muted-foreground")}>Scroll</span>
          <div
            className={cn(
              "h-8 w-5 rounded-full border p-1",
              isDark ? "border-white/35" : "border-border",
            )}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className={cn("h-2 w-2 rounded-full", isDark ? "bg-white" : "bg-primary")}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
