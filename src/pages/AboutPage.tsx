import Layout from "@/components/Layout";
import VideoBackground from "@/components/VideoBackground";
import { useInView } from "@/hooks/use-in-view";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Code2, Server, Cloud, Wrench, Download, Briefcase } from "lucide-react";
import avatarImg from "@/assets/avatar.jpg";

const techs = ["React", "Next.js", "TypeScript", "Node.js", "Python", "MongoDB", "PostgreSQL", "GraphQL", "Docker", "AWS", "Tailwind CSS", "Figma"];

const timeline = [
  { year: "2024 – Present", role: "Senior Full Stack Developer", company: "Tech Corp", desc: "Leading development of enterprise SaaS platform." },
  { year: "2022 – 2024", role: "Full Stack Developer", company: "StartupXYZ", desc: "Built and scaled multiple client-facing web applications." },
  { year: "2020 – 2022", role: "Frontend Developer", company: "Digital Agency", desc: "Created responsive and accessible web interfaces." },
  { year: "2019 – 2020", role: "Junior Developer", company: "Freelance", desc: "Started building websites and web applications for clients." },
];

const skillCategories = [
  { icon: Code2, title: "Frontend", skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Redux"] },
  { icon: Server, title: "Backend", skills: ["Node.js", "Express", "Python", "GraphQL", "REST APIs", "WebSocket"] },
  { icon: Cloud, title: "DevOps", skills: ["Docker", "AWS", "CI/CD", "Kubernetes", "Nginx", "Linux"] },
  { icon: Wrench, title: "Tools", skills: ["Git", "Figma", "VS Code", "Postman", "Jira", "MongoDB"] },
];

const AboutPage = () => {
  const [heroRef, heroInView] = useInView<HTMLElement>(0.1);
  const [skillsRef, skillsInView] = useInView<HTMLElement>(0.1);
  const [timelineRef, timelineInView] = useInView<HTMLElement>(0.1);

  return (
    <Layout>
      {/* Hero section with video */}
      <section ref={heroRef} className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
        <VideoBackground src="/about-video.mp4" />
        <div className="relative z-10 container mx-auto px-6 py-32 text-center">
          <div className={`transition-all duration-700 ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="mb-8 flex justify-center">
              <Avatar className="h-32 w-32 border-2 border-primary animate-float neon-glow-sm">
                <AvatarImage src={avatarImg} alt="John Craft" />
                <AvatarFallback>JC</AvatarFallback>
              </Avatar>
            </div>
            <p className="mb-2 font-mono text-sm tracking-widest text-white uppercase">About Me</p>
            <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl">
              Hi, I'm <span className="gradient-neon-text neon-text">John Craft</span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-white/85">
              A passionate full-stack developer with 5+ years of experience building high-performance web applications. I specialize in React ecosystems, scalable backend architectures, and cloud-native deployments.
            </p>

            <div className="mb-10 flex flex-wrap justify-center gap-3">
              {techs.map((tech, i) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className={`rounded-full border-white/35 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 neon-glow-hover ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  style={{ transitionDelay: heroInView ? `${i * 50}ms` : "0ms" }}
                >
                  {tech}
                </Badge>
              ))}
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3 font-semibold text-primary transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--neon)/0.4)] hover:scale-105">
                  <Download className="h-4 w-4" /> Download Resume
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent className="glass-strong rounded-2xl border-primary/20">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-foreground">Download Resume</AlertDialogTitle>
                  <AlertDialogDescription className="text-muted-foreground">
                    Would you like to download John Craft's resume as a PDF?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="rounded-xl border-border">Cancel</AlertDialogCancel>
                  <AlertDialogAction className="rounded-xl bg-white text-primary hover:bg-white/90">
                    Download PDF
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="expertise" ref={skillsRef} className="scroll-mt-24 py-24 bg-surface/50">
        <div className="container mx-auto px-6">
          <div className={`mb-16 text-center transition-all duration-700 ${skillsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <p className="mb-2 font-mono text-sm tracking-widest text-foreground uppercase">Expertise</p>
            <h2 className="text-4xl font-bold text-foreground">Skills & <span className="gradient-neon-text">Technologies</span></h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {skillCategories.map((cat, i) => (
              <div
                key={cat.title}
                className={`glass rounded-2xl p-6 transition-all duration-500 neon-border-hover hover:shadow-[0_0_30px_hsl(var(--neon)/0.08)] ${skillsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: skillsInView ? `${i * 100}ms` : "0ms" }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <cat.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-4 text-lg font-bold text-card-foreground">{cat.title}</h3>
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

      {/* Timeline */}
      <section ref={timelineRef} className="py-24">
        <div className="container mx-auto px-6">
          <div className={`mb-16 text-center transition-all duration-700 ${timelineInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <p className="mb-2 font-mono text-sm tracking-widest text-foreground uppercase">Journey</p>
            <h2 className="text-4xl font-bold text-foreground">Experience <span className="gradient-neon-text">Timeline</span></h2>
          </div>
          <div className="mx-auto max-w-2xl space-y-8">
            {timeline.map((item, i) => (
              <div
                key={item.year}
                className={`glass rounded-2xl p-6 transition-all duration-500 neon-border-hover ${timelineInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
                style={{ transitionDelay: timelineInView ? `${i * 150}ms` : "0ms" }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Briefcase className="h-4 w-4 text-primary" />
                  <span className="font-mono text-xs text-primary">{item.year}</span>
                </div>
                <h3 className="text-lg font-bold text-card-foreground">{item.role}</h3>
                <p className="text-sm text-muted-foreground">{item.company} — {item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
