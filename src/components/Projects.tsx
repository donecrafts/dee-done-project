import { useInView } from "@/hooks/use-in-view";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ExternalLink, Github } from "lucide-react";
import project1Img from "@/assets/project-1.jpg";
import project2Img from "@/assets/project-2.jpg";
import project3Img from "@/assets/project-3.jpg";

const projects = [
  {
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce dashboard with real-time analytics, inventory management, and payment processing.",
    image: project1Img,
    techs: ["React", "Node.js", "MongoDB", "Stripe"],
    live: "#",
    github: "#",
  },
  {
    title: "Real-Time Chat App",
    description: "End-to-end encrypted messaging platform with group chats, file sharing, and video calling capabilities.",
    image: project2Img,
    techs: ["Next.js", "WebSocket", "PostgreSQL", "Redis"],
    live: "#",
    github: "#",
  },
  {
    title: "Analytics Dashboard",
    description: "Comprehensive business analytics platform with customizable widgets, real-time data streams, and AI insights.",
    image: project3Img,
    techs: ["TypeScript", "D3.js", "Python", "AWS"],
    live: "#",
    github: "#",
  },
];

const Projects = () => {
  const [ref, inView] = useInView<HTMLElement>(0.1);

  return (
    <section id="projects" ref={ref} className="relative py-24">
      <div className="container mx-auto px-6">
        <div
          className={`mb-16 text-center transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="mb-2 font-mono text-sm tracking-widest text-primary uppercase">Portfolio</p>
          <h2 className="text-4xl font-bold text-foreground">
            Featured <span className="gradient-neon-text">Projects</span>
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className={`group glass rounded-2xl overflow-hidden transition-all duration-500 neon-border-hover hover:shadow-[0_0_40px_hsl(var(--neon)/0.1)] ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: inView ? `${i * 150}ms` : "0ms" }}
            >
              {/* Image */}
              <div className="overflow-hidden border-b border-border/30">
                <AspectRatio ratio={16 / 9}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </AspectRatio>
              </div>

              <div className="p-6">
                <h3 className="mb-2 text-xl font-bold text-foreground">{project.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                <div className="mb-5 flex flex-wrap gap-2">
                  {project.techs.map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="rounded-full border-primary/20 bg-primary/5 px-3 py-0.5 text-xs text-primary"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-3">
                  <a
                    href={project.live}
                    className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--neon)/0.3)] hover:scale-105"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> Visit Site
                  </a>
                  <a
                    href={project.github}
                    className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-all duration-300 hover:border-primary/40 hover:text-primary"
                  >
                    <Github className="h-3.5 w-3.5" /> GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
