import { useInView } from "@/hooks/use-in-view";
import { Code2, Server, Cloud, Wrench } from "lucide-react";

const categories = [
  {
    icon: Code2,
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Redux"],
  },
  {
    icon: Server,
    title: "Backend",
    skills: ["Node.js", "Express", "Python", "GraphQL", "REST APIs", "WebSocket"],
  },
  {
    icon: Cloud,
    title: "DevOps",
    skills: ["Docker", "AWS", "CI/CD", "Kubernetes", "Nginx", "Linux"],
  },
  {
    icon: Wrench,
    title: "Tools",
    skills: ["Git", "Figma", "VS Code", "Postman", "Jira", "MongoDB"],
  },
];

const Skills = () => {
  const [ref, inView] = useInView<HTMLElement>(0.1);

  return (
    <section id="skills" ref={ref} className="relative py-24 bg-surface/50">
      <div className="container mx-auto px-6">
        <div
          className={`mb-16 text-center transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="mb-2 font-mono text-sm tracking-widest text-primary uppercase">Expertise</p>
          <h2 className="text-4xl font-bold text-foreground">
            Skills & <span className="gradient-neon-text">Technologies</span>
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, i) => (
            <div
              key={cat.title}
              className={`glass rounded-2xl p-6 transition-all duration-500 neon-border-hover hover:shadow-[0_0_30px_hsl(var(--neon)/0.08)] ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: inView ? `${i * 100}ms` : "0ms" }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <cat.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-4 text-lg font-bold text-foreground">{cat.title}</h3>
              <ul className="space-y-2">
                {cat.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
