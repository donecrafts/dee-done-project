import { useInView } from "@/hooks/use-in-view";
import { Sparkles, Heart } from "lucide-react";
import avatarImg from "@/assets/avatar.jpg";

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
              <img src={avatarImg} alt="John Craft" className="aspect-[4/5] w-full object-cover" loading="lazy" />
              <div className="absolute bottom-0 left-0 right-0 border-t border-border/60 bg-card/95 p-5 backdrop-blur-sm">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">JC</div>
                <p className="text-lg font-bold text-card-foreground">John Craft</p>
                <p className="text-sm font-medium text-primary">Full-Stack Developer</p>
              </div>
            </div>
          </div>

          <div className={`space-y-6 transition-all duration-700 delay-100 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <p className="text-lg leading-relaxed text-muted-foreground">
              I&apos;m John Craft, a passionate full-stack developer dedicated to building digital systems that create real impact. With expertise spanning
              frontend, backend, and cloud architecture, I turn complex problems into elegant solutions.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              My mission is to build a powerful portfolio of production-grade applications that solve real problems. I combine technical depth with design
              sensibility to deliver experiences that users love.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">My Vision</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  To craft scalable, user-centered digital products that push boundaries and make a lasting impact.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Heart className="h-5 w-5" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">My Values</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Clean code, thoughtful design, continuous learning, and delivering genuine value to every project.
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
