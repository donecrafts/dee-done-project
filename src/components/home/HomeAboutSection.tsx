import { useInView } from "@/hooks/use-in-view";
import aboutPortrait from "@/assets/about-portrait.jpg";
import { BRAND_LOGO, BRAND_NAME } from "@/config/brand";
import { ABOUT_BIO, ROLE_LINE } from "@/config/brand-copy";

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
                      alt={BRAND_NAME}
                      className="h-full w-full object-cover object-center scale-[1.02]"
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
                        <img src={BRAND_LOGO} alt="" className="h-full w-full object-contain" aria-hidden />
                      </div>
                      <div className="min-w-0 pb-0.5">
                        <p className="text-lg font-semibold tracking-tight text-white">{BRAND_NAME}</p>
                        <p className="text-sm text-white/80">{ROLE_LINE}</p>
                      </div>
                    </div>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>

          <div className={`space-y-5 transition-all duration-700 delay-100 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            {ABOUT_BIO.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="text-base leading-relaxed text-muted-foreground md:text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeAboutSection;
