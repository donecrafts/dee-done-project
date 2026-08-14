import { useState, FormEvent } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { submitContactForm } from "@/lib/submit-contact";
import { cn } from "@/lib/utils";

type ContactFormProps = {
  className?: string;
};

const ContactForm = ({ className }: ContactFormProps) => {
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
      await submitContactForm({ name, email, message });

      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to send message. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "card-form-field w-full rounded-xl border px-4 py-3 outline-none transition-all duration-200 focus:border-primary/50 focus:ring-1 focus:ring-primary/30";

  const labelClass = "card-form-label mb-1.5 block text-sm font-medium";

  return (
    <div className={cn(className)}>
      {submitted && (
        <Alert className="mb-6 rounded-xl border-primary/30 bg-primary/10">
          <CheckCircle className="h-4 w-4 text-primary" />
          <AlertDescription className="text-foreground">Message sent successfully! I&apos;ll get back to you soon.</AlertDescription>
        </Alert>
      )}
      {error && (
        <Alert className="mb-6 rounded-xl border-destructive/30 bg-destructive/10">
          <AlertDescription className="text-destructive">{error}</AlertDescription>
        </Alert>
      )}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className={labelClass}>Name</label>
          <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} placeholder="Name" />
        </div>
        <div>
          <label className={labelClass}>Email</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="Email" />
        </div>
        <div>
          <label className={labelClass}>Message</label>
          <textarea
            required
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={cn(inputClass, "resize-none")}
            placeholder="Message"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-semibold text-primary-foreground shadow-md transition-all duration-300 hover:bg-primary/90 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Sending...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" /> Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
