import { useState } from "react";
import Layout from "@/components/Layout";
import VideoBackground from "@/components/VideoBackground";
import { useInView } from "@/hooks/use-in-view";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ExternalLink, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { projects, categories, type ProjectCategory } from "@/data/projects";

const ProjectsPage = () => {
  const [heroRef, heroInView] = useInView<HTMLElement>(0.1);
  const [gridRef, gridInView] = useInView<HTMLElement>(0.05);
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");

  const filtered = activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <Layout>
      {/* Hero */}
      <section ref={heroRef} className="relative flex min-h-[50vh] items-center justify-center overflow-hidden">
        <VideoBackground src="/projects-video.mp4" />
        <div className="relative z-10 container mx-auto px-6 py-32 text-center">
          <div className={`transition-all duration-700 ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <p className="mb-2 font-mono text-sm tracking-widest text-white uppercase">Portfolio</p>
            <h1 className="mb-4 text-5xl font-bold text-white md:text-6xl">
              My <span className="gradient-neon-text neon-text">Projects</span>
            </h1>
            <p className="mx-auto max-w-xl text-lg text-white/85">
              A collection of applications I've built across various domains and technologies.
            </p>
          </div>
        </div>
      </section>

      {/* Filters & Grid */}
      <section ref={gridRef} className="py-16">
        <div className="container mx-auto px-6">
          {/* Category filters */}
          <div className="mb-12 flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-white text-primary neon-glow-sm"
                    : "border border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Projects grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, i) => (
              <div
                key={project.slug}
                className={`group glass rounded-2xl overflow-hidden transition-all duration-500 neon-border-hover hover:shadow-[0_0_40px_hsl(var(--neon)/0.1)] ${
                  gridInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: gridInView ? `${i * 100}ms` : "0ms" }}
              >
                <Link to={`/projects/${project.slug}`} className="block overflow-hidden border-b border-border/30">
                  <AspectRatio ratio={16 / 9}>
                    <img src={project.image} alt={project.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                  </AspectRatio>
                </Link>
                <div className="p-6">
                  <Link to={`/projects/${project.slug}`}>
                    <h3 className="mb-2 text-xl font-bold text-foreground hover:text-primary transition-colors">{project.title}</h3>
                  </Link>
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                  <div className="mb-5 flex flex-wrap gap-2">
                    {project.techs.map((tech) => (
                      <Badge key={tech} variant="outline" className="rounded-full border-primary/20 bg-primary/5 px-3 py-0.5 text-xs text-card-foreground">{tech}</Badge>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <a href={project.live} className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-primary transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--neon)/0.3)] hover:scale-105">
                      <ExternalLink className="h-3.5 w-3.5" /> Visit Site
                    </a>
                    <a href={project.github} className="flex items-center gap-2 rounded-lg border border-primary/40 bg-white px-4 py-2 text-sm font-medium text-primary transition-all duration-300 hover:shadow-[0_0_15px_hsl(var(--neon)/0.15)]">
                      <Github className="h-3.5 w-3.5" /> GitHub
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectsPage;
