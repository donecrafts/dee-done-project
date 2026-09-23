import { useInView } from "@/hooks/use-in-view";
import { Mail, MapPin } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { CONTACT_INTRO, LOCATION_LINE } from "@/config/brand-copy";

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
            {CONTACT_INTRO}
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className={`space-y-4 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <h3 className="text-lg font-semibold text-foreground">Get in touch</h3>

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
                <p className="font-medium text-foreground">{LOCATION_LINE}</p>
              </div>
            </div>
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
