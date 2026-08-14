import { useInView } from "@/hooks/use-in-view";
import { Badge } from "@/components/ui/badge";

const techs = [
  "React", "Next.js", "TypeScript", "Node.js", "Python", "MongoDB",
  "PostgreSQL", "GraphQL", "Docker", "AWS", "Tailwind CSS", "Figma",
];

const About = () => {
  const [ref, inView] = useInView<HTMLElement>(0.15);

  return (
    <section id="about" ref={ref} className="relative py-24">
      <div className="container mx-auto px-6">
        <div
          className={`mx-auto max-w-3xl text-center transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="mb-2 font-mono text-sm tracking-widest text-foreground uppercase">About Me</p>
          <h2 className="mb-6 text-4xl font-bold text-foreground">
            Crafting Digital <span className="gradient-neon-text">Experiences</span>
          </h2>
          <p className="mb-10 text-lg leading-relaxed text-muted-foreground">
            I&apos;m Samuel John, a Python and AI developer building smart solutions—from intelligent APIs and machine learning integrations to polished web and mobile products that solve real problems.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {techs.map((tech, i) => (
              <Badge
                key={tech}
                variant="outline"
                className={`rounded-full border-primary/35 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary transition-all duration-300 hover:bg-primary/15 hover:border-primary/50 neon-glow-hover ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: inView ? `${i * 50}ms` : "0ms" }}
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
