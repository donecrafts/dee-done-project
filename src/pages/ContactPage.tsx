import { useState, FormEvent } from "react";
import Layout from "@/components/Layout";
import VideoBackground from "@/components/VideoBackground";
import { useInView } from "@/hooks/use-in-view";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Send, CheckCircle, Mail, MapPin, Phone, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const ContactPage = () => {
  const [heroRef, heroInView] = useInView<HTMLElement>(0.1);
  const [formRef, formInView] = useInView<HTMLElement>(0.1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error: fnError } = await supabase.functions.invoke("send-contact-email", {
        body: { name, email, message },
      });

      if (fnError) throw fnError;

      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: any) {
      setError(err.message || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <section ref={heroRef} className="relative flex min-h-[50vh] items-center justify-center overflow-hidden">
        <VideoBackground src="/contact-video.mp4" />
        <div className="relative z-10 container mx-auto px-6 py-32 text-center">
          <div className={`transition-all duration-700 ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <p className="mb-2 font-mono text-sm tracking-widest text-primary uppercase">Get In Touch</p>
            <h1 className="mb-4 text-5xl font-bold text-foreground md:text-6xl">
              Let's <span className="gradient-neon-text neon-text">Connect</span>
            </h1>
            <p className="mx-auto max-w-xl text-lg text-muted-foreground">
              Have a project in mind? Let's build something amazing together.
            </p>
          </div>
        </div>
      </section>

      {/* Contact form + info */}
      <section ref={formRef} className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Form */}
            <div className={`transition-all duration-700 ${formInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              {submitted && (
                <Alert className="mb-6 rounded-xl border-primary/30 bg-primary/10">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <AlertDescription className="text-foreground">Message sent successfully! I'll get back to you soon.</AlertDescription>
                </Alert>
              )}
              {error && (
                <Alert className="mb-6 rounded-xl border-destructive/30 bg-destructive/10">
                  <AlertDescription className="text-destructive">{error}</AlertDescription>
                </Alert>
              )}
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Name</label>
                  <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none transition-all duration-200 focus:border-primary/50 focus:ring-1 focus:ring-primary/30" placeholder="Your name" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none transition-all duration-200 focus:border-primary/50 focus:ring-1 focus:ring-primary/30" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Message</label>
                  <textarea required rows={5} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none transition-all duration-200 focus:border-primary/50 focus:ring-1 focus:ring-primary/30" placeholder="Tell me about your project..." />
                </div>
                <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--neon)/0.4)] hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</> : <><Send className="h-4 w-4" /> Send Message</>}
                </button>
              </form>
            </div>

            {/* Info sidebar */}
            <div className={`transition-all duration-700 delay-200 ${formInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <div className="glass rounded-2xl p-8 mb-6">
                <h3 className="text-xl font-bold text-foreground mb-6">Contact Info</h3>
                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10"><Mail className="h-5 w-5 text-primary" /></div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <a href="mailto:johndeveloper225@gmail.com" className="font-medium text-foreground hover:text-primary transition-colors">johndeveloper225@gmail.com</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10"><Phone className="h-5 w-5 text-primary" /></div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <a href="tel:+2347062599914" className="font-medium text-foreground hover:text-primary transition-colors">+234 7062599914</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10"><MapPin className="h-5 w-5 text-primary" /></div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium text-foreground">Lagos, Nigeria</p>
                    </div>
                  </div>
                </div>
              </div>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="w-full rounded-xl border border-primary/40 bg-transparent px-8 py-3 font-semibold text-primary transition-all duration-300 hover:bg-primary/10 hover:shadow-[0_0_30px_hsl(var(--neon)/0.2)] hover:scale-[1.02]">
                    🤝 Hire Me
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="glass-strong rounded-2xl border-primary/20">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-foreground">Let's Work Together</AlertDialogTitle>
                    <AlertDialogDescription className="text-muted-foreground">Would you like to schedule a call or download my resume?</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-xl border-border">Cancel</AlertDialogCancel>
                    <AlertDialogAction className="rounded-xl bg-secondary text-secondary-foreground hover:bg-secondary/80">Schedule Call</AlertDialogAction>
                    <AlertDialogAction className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">Download Resume</AlertDialogAction>
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
