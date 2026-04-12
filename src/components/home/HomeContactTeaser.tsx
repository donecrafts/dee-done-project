import { useInView } from "@/hooks/use-in-view";
import ContactForm from "@/components/ContactForm";

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

        <div className="mx-auto grid max-w-4xl gap-10 lg:grid-cols-2 lg:gap-14">
          <div className={`space-y-4 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <h3 className="text-lg font-semibold text-foreground">Get In Touch</h3>
            <p className="leading-relaxed text-muted-foreground">
              Whether you have a project idea, want to collaborate, or just want to say hello — my inbox is always open.
            </p>
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
