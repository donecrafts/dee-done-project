import Layout from "@/components/Layout";
import VideoBackground from "@/components/VideoBackground";
import { useInView } from "@/hooks/use-in-view";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Mail, MapPin, Twitter, Github } from "lucide-react";
import ContactForm from "@/components/ContactForm";

const ContactPage = () => {
  const [heroRef, heroInView] = useInView<HTMLElement>(0.1);
  const [formRef, formInView] = useInView<HTMLElement>(0.1);

  return (
    <Layout>
      <section ref={heroRef} className="relative flex min-h-[50vh] items-center justify-center overflow-hidden">
        <VideoBackground src="/contact-video.mp4" />
        <div className="relative z-10 container mx-auto px-6 py-32 text-center">
          <div className={`transition-all duration-700 ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <p className="mb-2 font-mono text-sm tracking-widest text-white uppercase">Get In Touch</p>
            <h1 className="mb-4 text-5xl font-bold text-white md:text-6xl">
              Let&apos;s <span className="gradient-neon-text neon-text">Connect</span>
            </h1>
            <p className="mx-auto max-w-xl text-lg text-white/85">Have a project in mind? Let&apos;s build something amazing together.</p>
          </div>
        </div>
      </section>

      <section ref={formRef} className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className={`transition-all duration-700 ${formInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <div className="glass rounded-2xl p-8">
                <ContactForm />
              </div>
            </div>

            <div className={`transition-all duration-700 delay-200 ${formInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <div className="glass mb-6 rounded-2xl p-8">
                <h3 className="mb-6 text-xl font-bold text-foreground">Contact info</h3>
                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <a href="mailto:doneporpor@gmail.com" className="font-medium text-card-foreground transition-colors hover:text-primary">
                        doneporpor@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                      <Twitter className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">X Profile</p>
                      <a
                        href="https://x.com/donecraft225"
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-card-foreground transition-colors hover:text-primary"
                      >
                        @donecraft225
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="card-icon-badge flex h-10 w-10 items-center justify-center rounded-xl">
                      <Github className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">GitHub</p>
                      <a
                        href="https://github.com/donecrafts"
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-card-foreground transition-colors hover:text-primary"
                      >
                        github.com/donecrafts
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium text-card-foreground">Osogbo, Nigeria</p>
                    </div>
                  </div>
                </div>
              </div>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button
                    type="button"
                    className="w-full rounded-xl bg-primary px-8 py-3 font-semibold text-primary-foreground shadow-md transition-all duration-300 hover:bg-primary/90 hover:shadow-lg"
                  >
                    Hire me
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="glass-strong rounded-2xl border-primary/20">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-foreground">Let&apos;s work together</AlertDialogTitle>
                    <AlertDialogDescription className="text-muted-foreground">
                      Schedule a call or download my resume—your choice.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-xl border-border">Cancel</AlertDialogCancel>
                    <AlertDialogAction className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">Schedule call</AlertDialogAction>
                    <AlertDialogAction className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">Download resume</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
