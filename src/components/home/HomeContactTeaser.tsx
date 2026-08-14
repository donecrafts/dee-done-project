import { useInView } from "@/hooks/use-in-view";
import { Mail, MapPin, Twitter } from "lucide-react";
import ContactForm from "@/components/ContactForm";

const iconBoxClass =
  "card-icon-badge flex h-11 w-11 shrink-0 items-center justify-center rounded-xl";

const cardClass =
  "flex gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:border-primary/25 hover:shadow-md";

const HomeContactTeaser = () => {
  const [ref, inView] = useInView<HTMLElement>(0.1);

  return (
    <section id="contact" ref={ref} className="scroll-mt-24 bg-surface/35 py-24">
      <div className="container mx-auto px-6">
        <div className={`mb-14 text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h2 className="text-4xl font-bold">
            <span className="text-foreground">Let&apos;s Work </span>
            <span className="text-gradient-spectrum inline-block">Together</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Have a project in mind? I&apos;d love to hear about it. Let&apos;s create something amazing together.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className={`space-y-4 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <h3 className="text-lg font-semibold text-foreground">Get in touch</h3>
            <p className="leading-relaxed text-muted-foreground">
              Whether you have a project idea, want to collaborate, or just want to say hello—my inbox is always open.
            </p>

            <a href="mailto:doneporpor@gmail.com" className="block">
              <div className={cardClass}>
                <div className={iconBoxClass}>
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Email</p>
                  <p className="font-medium text-foreground">doneporpor@gmail.com</p>
                </div>
              </div>
            </a>

            <div className={cardClass}>
              <div className={iconBoxClass}>
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Address</p>
                <p className="font-medium text-foreground">Osogbo, Nigeria</p>
              </div>
            </div>

            <a href="https://x.com/donecraft225" target="_blank" rel="noreferrer" className="block">
              <div className={cardClass}>
                <div className={iconBoxClass}>
                  <Twitter className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">X Profile</p>
                  <p className="font-medium text-foreground">@donecraft225</p>
                </div>
              </div>
            </a>
          </div>

          <div
            className={`rounded-2xl border border-border bg-card p-6 shadow-md transition-all duration-700 delay-100 sm:p-8 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeContactTeaser;
