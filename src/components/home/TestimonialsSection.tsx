import { useInView } from "@/hooks/use-in-view";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { featuredTestimonials, clientReviews } from "@/data/testimonials";
import { cn } from "@/lib/utils";

const Stars = () => (
  <div className="flex gap-0.5 text-amber-400" aria-hidden>
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
    ))}
  </div>
);

function TestimonialAvatar({
  name,
  initials,
  image,
  avatarFallbackClassName,
  size = "lg",
}: {
  name: string;
  initials: string;
  image?: string;
  avatarFallbackClassName?: string;
  size?: "lg" | "sm";
}) {
  const dim = size === "lg" ? "h-12 w-12" : "h-11 w-11";

  if (image) {
    return (
      <Avatar className={cn(dim, "border border-border")}>
        <AvatarImage src={image} alt={`${name} profile`} className="object-cover" />
        <AvatarFallback className={cn("text-sm font-semibold", avatarFallbackClassName ?? "bg-primary/10 text-primary")}>
          {initials}
        </AvatarFallback>
      </Avatar>
    );
  }

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full border border-border",
        dim,
        avatarFallbackClassName ?? "bg-primary/10 text-sm font-semibold text-primary",
      )}
      aria-label={`${name} avatar`}
    >
      {initials}
    </div>
  );
}

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
          {featuredTestimonials.map((t, i) => (
            <article
              key={t.name}
              className={`flex flex-col rounded-2xl border border-border bg-card p-6 shadow-md transition-all duration-500 hover:shadow-lg ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: inView ? `${i * 100}ms` : "0ms" }}
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <TestimonialAvatar
                    name={t.name}
                    initials={t.initials}
                    image={t.image}
                    avatarFallbackClassName={t.avatarFallbackClassName}
                  />
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

        {clientReviews.length > 0 && (
          <div className={`mt-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <h3 className="mb-6 text-center text-xl font-bold text-foreground">From client reviews</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {clientReviews.map((r, i) => (
                <div
                  key={r.name}
                  className={`flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-500 hover:shadow-md ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                  style={{ transitionDelay: inView ? `${200 + i * 80}ms` : "0ms" }}
                >
                  <TestimonialAvatar
                    name={r.name}
                    initials={r.initials}
                    image={r.image}
                    avatarFallbackClassName={r.avatarFallbackClassName}
                    size="sm"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                      <span className="font-semibold text-foreground">{r.name}</span>
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">Fiverr</span>
                    </div>
                    <div className="mb-2">
                      <Stars />
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">&ldquo;{r.quote}&rdquo;</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
