import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import FreelanceAlert from "@/components/FreelanceAlert";
import { Link } from "react-router-dom";
import { useInView } from "@/hooks/use-in-view";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ExternalLink, ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";

const FeaturedProjects = () => {
  const [ref, inView] = useInView<HTMLElement>(0.1);
  const featured = projects.slice(0, 3);

  return (
    <section ref={ref} className="relative py-24">
      <div className="container mx-auto px-6">
        <div className={`mb-16 text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <p className="mb-2 font-mono text-sm tracking-widest text-foreground uppercase">Portfolio</p>
          <h2 className="text-4xl font-bold text-foreground">
            Featured <span className="gradient-neon-text">Projects</span>
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <Link
              key={project.slug}
              to={`/projects/${project.slug}`}
              className={`group glass rounded-2xl overflow-hidden transition-all duration-500 neon-border-hover hover:shadow-[0_0_40px_hsl(var(--neon)/0.1)] ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: inView ? `${i * 150}ms` : "0ms" }}
            >
              <div className="overflow-hidden border-b border-border/30">
                <AspectRatio ratio={16 / 9}>
                  <img src={project.image} alt={project.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                </AspectRatio>
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-bold text-foreground">{project.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.techs.map((tech) => (
                    <Badge key={tech} variant="outline" className="rounded-full border-primary/20 bg-primary/5 px-3 py-0.5 text-xs text-card-foreground">{tech}</Badge>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className={`mt-12 text-center transition-all duration-700 delay-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3 font-semibold text-primary transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--neon)/0.4)] hover:scale-105"
          >
            View All Projects <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

const Index = () => {
  return (
    <Layout>
      <FreelanceAlert />
      <Hero />
      <FeaturedProjects />
    </Layout>
  );
};

export default Index;
