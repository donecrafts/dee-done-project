import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import VideoBackground from "@/components/VideoBackground";
import { useInView } from "@/hooks/use-in-view";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ExternalLink, Github, ArrowLeft, CheckCircle } from "lucide-react";
import { projects } from "@/data/projects";

const ProjectDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);
  const [ref, inView] = useInView<HTMLElement>(0.1);

  if (!project) {
    return (
      <Layout>
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Project Not Found</h1>
            <Link to="/projects" className="text-primary hover:underline">← Back to Projects</Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden">
        <VideoBackground src="/project-detail-video.mp4" />
        <div className="relative z-10 container mx-auto px-6 py-32">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-muted-foreground" />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/projects" className="text-muted-foreground hover:text-primary transition-colors">Projects</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-muted-foreground" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-foreground">{project.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">{project.title}</h1>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.techs.map((tech) => (
              <Badge key={tech} variant="outline" className="rounded-full border-primary/30 bg-primary/5 px-4 py-1 text-sm text-primary">{tech}</Badge>
            ))}
          </div>
          <div className="flex gap-3">
            <a href={project.live} className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--neon)/0.4)] hover:scale-105">
              <ExternalLink className="h-4 w-4" /> Visit Site
            </a>
            <a href={project.github} className="inline-flex items-center gap-2 rounded-xl border border-primary/40 px-6 py-3 font-semibold text-primary transition-all duration-300 hover:bg-primary/10">
              <Github className="h-4 w-4" /> GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Content */}
      <section ref={ref} className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main content */}
            <div className={`lg:col-span-2 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              {/* Large preview */}
              <div className="glass rounded-2xl overflow-hidden mb-8 neon-border-hover">
                <AspectRatio ratio={16 / 9}>
                  <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
                </AspectRatio>
              </div>

              <h2 className="text-2xl font-bold text-foreground mb-4">About This Project</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">{project.longDescription}</p>

              {/* Gallery */}
              <h2 className="text-2xl font-bold text-foreground mb-4">Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {project.gallery.map((img, i) => (
                  <div key={i} className="glass rounded-xl overflow-hidden neon-border-hover">
                    <AspectRatio ratio={16 / 9}>
                      <img src={img} alt={`${project.title} screenshot ${i + 1}`} className="h-full w-full object-cover" loading="lazy" />
                    </AspectRatio>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className={`transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <div className="glass rounded-2xl p-6 sticky top-24">
                <h3 className="text-lg font-bold text-foreground mb-4">Key Features</h3>
                <ul className="space-y-3">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-border">
                  <h3 className="text-lg font-bold text-foreground mb-3">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techs.map((tech) => (
                      <Badge key={tech} variant="outline" className="rounded-full border-primary/20 bg-primary/5 px-3 py-1 text-xs text-primary">{tech}</Badge>
                    ))}
                  </div>
                </div>

                <Link to="/projects" className="mt-8 flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <ArrowLeft className="h-4 w-4" /> Back to Projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectDetailPage;
