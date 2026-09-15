import { useState } from "react";
import Layout from "@/components/Layout";
import VideoBackground from "@/components/VideoBackground";
import { useInView } from "@/hooks/use-in-view";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ExternalLink, Github } from "lucide-react";
import { Link } from "react-router-dom";
import {
  projects,
  categories,
  projectLiveLinkLabel,
  projectGithubLink,
  projectCardImageClass,
  projectCardMediaBackdropClass,
  projectLiveRibbon,
  type ProjectCategory,
} from "@/data/projects";
import { PROJECTS_INTRO } from "@/config/brand-copy";

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
              {PROJECTS_INTRO}
            </p>
            <p className="mx-auto mt-3 max-w-lg text-sm text-white/70">Ask by voice for any project — use the mic button on the right.</p>
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
            {filtered.map((project, i) => {
              const ribbon = projectLiveRibbon(project);
              return (
              <div
                key={project.slug}
                className={`group glass rounded-2xl overflow-hidden transition-all duration-500 neon-border-hover hover:shadow-[0_0_40px_hsl(var(--neon)/0.1)] ${
                  gridInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: gridInView ? `${i * 100}ms` : "0ms" }}
              >
                <Link to={`/projects/${project.slug}`} className="relative block overflow-hidden border-b border-border/30">
                  {ribbon ? (
                    <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between gap-2 border-b border-white/10 bg-black/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-white/95 backdrop-blur-md">
                      <span>{ribbon.title}</span>
                      {ribbon.subtitle ? <span className="font-medium text-white/65">{ribbon.subtitle}</span> : null}
                    </div>
                  ) : null}
                  <AspectRatio ratio={16 / 9}>
                    {project.cardImageFit === "contain" ? (
                      <div className={projectCardMediaBackdropClass(project)}>
                        <img src={project.image} alt={project.title} className={projectCardImageClass(project)} loading="lazy" />
                      </div>
                    ) : (
                      <img src={project.image} alt={project.title} className={projectCardImageClass(project)} loading="lazy" />
                    )}
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
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-primary transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--neon)/0.3)] hover:scale-105"
                    >
                      <ExternalLink className="h-3.5 w-3.5" /> {projectLiveLinkLabel(project.live)}
                    </a>
                    {projectGithubLink(project) ? (
                      <a
                        href={projectGithubLink(project)!}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 rounded-lg border border-primary/40 bg-white px-4 py-2 text-sm font-medium text-primary transition-all duration-300 hover:shadow-[0_0_15px_hsl(var(--neon)/0.15)]"
                      >
                        <Github className="h-3.5 w-3.5" /> GitHub
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectsPage;
