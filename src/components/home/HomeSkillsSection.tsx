import { useInView } from "@/hooks/use-in-view";
import { homeSkillCards } from "@/data/homeSkills";
import { Layers, LayoutTemplate, Server, Database, Cloud, Gauge } from "lucide-react";

const icons = [Layers, LayoutTemplate, Server, Database, Cloud, Gauge] as const;

const HomeSkillsSection = () => {
  const [ref, inView] = useInView<HTMLElement>(0.1);

  return (
    <section id="skills" ref={ref} className="scroll-mt-24 bg-surface/40 py-24">
      <div className="container mx-auto px-6">
        <div className={`mb-14 text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h2 className="text-4xl font-bold">
            <span className="text-foreground">My </span>
            <span className="text-gradient-spectrum inline-block">Skills</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            A comprehensive toolkit built through years of real-world projects and continuous learning.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {homeSkillCards.map((card, i) => {
            const Icon = icons[i] ?? Layers;
            return (
              <div
                key={card.title}
                className={`group relative h-[340px] overflow-hidden rounded-2xl border border-border bg-card shadow-md transition-all duration-500 hover:-translate-y-0.5 hover:shadow-xl ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: inView ? `${i * 80}ms` : "0ms" }}
              >
                <img
                  src={card.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/92 to-white/15 dark:from-card dark:via-card/95 dark:to-card/10" />
                <div className="absolute inset-x-0 bottom-0 p-5 pt-12">
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/12 text-primary dark:bg-primary/15">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-1.5 text-lg font-bold text-foreground">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{card.description}</p>
                  {card.tags && card.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {card.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-primary/15 bg-primary/5 px-2 py-0.5 text-[11px] font-medium text-foreground/90 dark:text-card-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeSkillsSection;
