import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import HomeAboutSection from "@/components/home/HomeAboutSection";
import HomeSkillsSection from "@/components/home/HomeSkillsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import HomeContactTeaser from "@/components/home/HomeContactTeaser";
import { Link } from "react-router-dom";
import { useInView } from "@/hooks/use-in-view";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ArrowRight } from "lucide-react";
import { projects, projectCardImageClass, projectCardMediaBackdropClass, projectLiveRibbon } from "@/data/projects";

const FeaturedProjects = () => {
  const [ref, inView] = useInView<HTMLElement>(0.1);

  return (
    <section id="projects" ref={ref} className="scroll-mt-24 relative py-24">
      <div className="container mx-auto px-6">
        <div className={`mb-16 text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h2 className="text-4xl font-bold">
            <span className="text-foreground">Featured </span>
            <span className="text-gradient-spectrum inline-block">Projects</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            A selection of projects that showcase my technical range and passion for building great products.
            <span className="mt-1 block text-sm">Ask by voice for any project — tap the mic button on the right.</span>
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => {
            const ribbon = projectLiveRibbon(project);
            return (
            <Link
              key={project.slug}
              to={`/projects/${project.slug}`}
              className={`group relative rounded-2xl border border-border bg-card overflow-hidden shadow-sm transition-all duration-500 hover:border-primary/25 hover:shadow-[0_0_40px_hsl(var(--neon)/0.08)] ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: inView ? `${i * 100}ms` : "0ms" }}
            >
              {project.featured && (
                <Badge className="absolute right-4 top-4 z-20 rounded-full bg-primary text-primary-foreground shadow-md">Featured</Badge>
              )}
              <div className="relative overflow-hidden border-b border-border/30">
                {ribbon ? (
                  <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between gap-2 border-b border-white/10 bg-black/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-white/95 backdrop-blur-md">
                    <span>{ribbon.title}</span>
                    {ribbon.subtitle ? <span className="font-medium text-white/65">{ribbon.subtitle}</span> : null}
                  </div>
                ) : null}
                <AspectRatio ratio={16 / 9}>
                  {project.cardImageFit === "contain" ? (
                    <div className={projectCardMediaBackdropClass(project)}>
                      <img
                        src={project.image}
                        alt={project.title}
                        className={projectCardImageClass(project)}
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <img
                      src={project.image}
                      alt={project.title}
                      className={projectCardImageClass(project)}
                      loading="lazy"
                    />
                  )}
                </AspectRatio>
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-bold text-foreground">{project.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.techs.map((tech) => (
                    <Badge key={tech} variant="outline" className="rounded-full border-primary/20 bg-primary/5 px-3 py-0.5 text-xs text-card-foreground">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </Link>
            );
          })}
        </div>

        <div className={`mt-12 text-center transition-all duration-700 delay-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3 font-semibold text-primary-foreground shadow-md transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:scale-105"
          >
            View all projects <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

const Index = () => {
  return (
    <Layout>
      <Hero />
      <HomeAboutSection />
      <HomeSkillsSection />
      <FeaturedProjects />
      <TestimonialsSection />
      <HomeContactTeaser />
    </Layout>
  );
};

export default Index;
