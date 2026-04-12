import { Link } from "react-router-dom";
import { useTheme } from "next-themes";
import { Github, Linkedin, Twitter, Mail, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Skills", to: "/#skills" },
  { label: "Projects", to: "/projects" },
  { label: "Testimonials", to: "/#testimonials" },
  { label: "Contact", to: "/contact" },
];

const socials = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Mail, href: "mailto:njohndeveloper225@gmail.com", label: "Email" },
];

const Footer = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const socialTile = cn(
    "flex h-10 w-10 items-center justify-center rounded-xl border text-sm transition-all duration-300 hover:scale-105 hover:shadow-md",
    isDark
      ? "border-white/15 bg-white text-primary hover:bg-white"
      : "border-primary/40 bg-primary text-primary-foreground hover:bg-primary/90",
  );

  return (
    <footer className="relative z-10 border-t border-border bg-surface/40 py-14 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          <div>
            <Link to="/" className="mb-4 inline-block text-xl font-bold tracking-tight uppercase">
              <span className="text-gradient-spectrum">John Craft</span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Full-stack developer and digital solutions architect—crafting modern web apps, scalable APIs, and powerful digital experiences.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-foreground">Quick links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.to + l.label}>
                  <Link to={l.to} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-foreground">Connect</h3>
            <div className="flex flex-wrap gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                  aria-label={label}
                  className={socialTile}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-center text-sm text-muted-foreground sm:text-left">
            © {new Date().getFullYear()} John Craft. Built with React & Tailwind.
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-all hover:border-primary/30 hover:text-primary"
          >
            Back to top
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
