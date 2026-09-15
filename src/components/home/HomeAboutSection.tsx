import { useInView } from "@/hooks/use-in-view";
import { Sparkles, Heart } from "lucide-react";
import aboutPortrait from "@/assets/about-portrait.png";
import { BRAND_LOGO } from "@/config/brand";

const HomeAboutSection = () => {
  const [ref, inView] = useInView<HTMLElement>(0.12);

  return (
    <section id="about" ref={ref} className="scroll-mt-24 bg-surface/50 py-24">
      <div className="container mx-auto px-6">
        <div
          className={`mb-14 text-center transition-all duration-700 md:text-left ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-4xl font-bold">
            <span className="text-foreground">About </span>
            <span className="text-gradient-spectrum inline-block">Me</span>
          </h2>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="mx-auto max-w-md lg:mx-0">
              <div className="relative">
                <div
                  className="pointer-events-none absolute -inset-3 rounded-[2rem] opacity-70 blur-2xl"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 30%, hsl(345 70% 45% / 0.28), transparent 65%)",
                  }}
                  aria-hidden
                />
                <figure className="relative overflow-hidden rounded-[1.75rem] border border-border/60 bg-card shadow-[0_24px_60px_-28px_hsl(345_40%_20%/0.45)]">
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#f3efe9]">
                    <img
                      src={aboutPortrait}
                      alt="Samuel John"
                      className="h-full w-full object-cover object-[center_18%] scale-[1.02]"
                      loading="lazy"
                    />
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, transparent 58%, hsl(350 40% 12% / 0.55) 100%)",
                      }}
                      aria-hidden
                    />
                  </div>
                  <figcaption className="absolute inset-x-0 bottom-0 p-6">
                    <div className="flex items-end gap-3">
                      <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full border border-white/25 bg-white/10 shadow-md backdrop-blur-sm">
                        <img src={BRAND_LOGO} alt="" className="h-full w-full object-cover" aria-hidden />
                      </div>
                      <div className="min-w-0 pb-0.5">
                        <p className="text-lg font-semibold tracking-tight text-white">Samuel John</p>
                        <p className="text-sm text-white/80">Python and AI Developer</p>
                      </div>
                    </div>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>

          <div className={`space-y-6 transition-all duration-700 delay-100 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <p className="text-lg leading-relaxed text-muted-foreground">
              I&apos;m Samuel John, a Python and AI developer focused on building intelligent applications that solve real problems. From AI-powered mobile products like Sauce to production web platforms, I combine Python backends, machine learning, and clean engineering to deliver smart solutions.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              I work across the stack—designing APIs, integrating AI models, and shipping polished apps that turn complex ideas into reliable, user-ready products.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-card-foreground dark:bg-primary/12 dark:text-primary">
                  <Heart className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mb-2 font-semibold text-card-foreground">My mission</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Build AI-powered applications that solve real problems with Python, thoughtful architecture, and production-grade code.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-card-foreground dark:bg-primary/12 dark:text-primary">
                  <Sparkles className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mb-2 font-semibold text-card-foreground">My vision</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  To create intelligent, scalable digital products that harness AI to make everyday experiences smarter and more impactful.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeAboutSection;
