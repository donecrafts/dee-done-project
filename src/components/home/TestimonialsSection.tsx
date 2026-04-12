import { useInView } from "@/hooks/use-in-view";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";

const Stars = () => (
  <div className="flex gap-0.5 text-primary" aria-hidden>
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
    ))}
  </div>
);

const TestimonialsSection = () => {
  const [ref, inView] = useInView<HTMLElement>(0.08);

  return (
    <section id="testimonials" ref={ref} className="scroll-mt-24 py-24">
      <div className="container mx-auto px-6">
        <div className={`mb-14 text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h2 className="text-4xl font-bold">
            <span className="text-foreground">Client </span>
            <span className="text-gradient-spectrum inline-block">Testimonials</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            What clients say about working with me on their most important projects.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <article
              key={t.name}
              className={`flex flex-col rounded-2xl border border-border bg-card p-6 shadow-md transition-all duration-500 hover:shadow-lg ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: inView ? `${i * 100}ms` : "0ms" }}
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {t.image ? (
                    <Avatar className="h-12 w-12 border border-border">
                      <AvatarImage src={t.image} alt={`${t.name} profile`} className="object-cover" />
                      <AvatarFallback
                        className={cn(
                          "text-sm font-semibold",
                          t.avatarFallbackClassName ?? "bg-primary/10 text-primary",
                        )}
                      >
                        {t.initials}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <div
                      className={cn(
                        "flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border",
                        t.avatarFallbackClassName ?? "bg-primary/10 text-sm font-semibold text-primary",
                      )}
                      aria-label={`${t.name} avatar`}
                    >
                      {t.initials}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
                <Stars />
              </div>
              <blockquote className="flex-1 text-sm leading-relaxed text-muted-foreground">&ldquo;{t.quote}&rdquo;</blockquote>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
