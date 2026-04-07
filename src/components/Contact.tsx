import { useState, FormEvent } from "react";
import { useInView } from "@/hooks/use-in-view";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const [ref, inView] = useInView<HTMLElement>(0.1);
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
    <section id="contact" ref={ref} className="relative py-24">
      <div className="container mx-auto px-6">
        <div className={`mb-16 text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <p className="mb-2 font-mono text-sm tracking-widest text-foreground uppercase">Get In Touch</p>
          <h2 className="text-4xl font-bold text-foreground">
            Let's <span className="gradient-neon-text">Connect</span>
          </h2>
        </div>

        <div className={`mx-auto max-w-xl transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
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
            <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-primary transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--neon)/0.4)] hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</> : <><Send className="h-4 w-4" /> Send Message</>}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
