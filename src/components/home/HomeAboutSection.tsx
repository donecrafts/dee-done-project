import { useInView } from "@/hooks/use-in-view";
import { Sparkles, Heart } from "lucide-react";
import avatarImg from "@/assets/avatar.png";
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

        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
              <img src={avatarImg} alt="Samuel John" className="aspect-[4/5] w-full object-cover" loading="lazy" />
              <div className="absolute bottom-0 left-0 right-0 border-t border-border/60 bg-card/95 p-5 backdrop-blur-sm">
                <div className="mb-3 h-12 w-12 overflow-hidden rounded-full border border-border/40 bg-card shadow-sm">
                  <img src={BRAND_LOGO} alt="" className="h-full w-full object-cover" aria-hidden />
                </div>
                <p className="text-lg font-bold text-card-foreground">Samuel John</p>
                <p className="text-sm font-medium text-card-foreground dark:text-primary">Python and AI Developer Building Smart Solutions</p>
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
