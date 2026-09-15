import type { SVGProps } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "next-themes";
import { Github, Twitter, Mail, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { BRAND_NAME } from "@/config/brand";
import { FOOTER_BLURB } from "@/config/brand-copy";

function WhatsAppIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Skills", to: "/#skills" },
  { label: "Projects", to: "/projects" },
  { label: "Testimonials", to: "/#testimonials" },
  { label: "Contact", to: "/#contact" },
];

const socials = [
  {
    icon: Github,
    href: "https://github.com/donecrafts",
    label: "GitHub — open profile to invite as collaborator",
  },
  {
    icon: WhatsAppIcon,
    href: "https://wa.me/13438913888",
    label: "WhatsApp",
  },
  {
    icon: Twitter,
    href: "https://x.com/donecraft225",
    label: "Twitter / X",
  },
  { icon: Mail, href: "mailto:doneporpor@gmail.com", label: "Email" },
] as const;

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
            <Link to="/" className="mb-4 inline-block text-xl font-bold tracking-tight">
              <span className={cn(isDark ? "text-white" : "text-black")}>{BRAND_NAME}</span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              {FOOTER_BLURB}
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
                  key={href}
                  href={href}
                  {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                  aria-label={label}
                  className={socialTile}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-center text-sm text-muted-foreground sm:text-left">
            © 2020 {BRAND_NAME}. Built with React & Tailwind.
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={cn(
              "inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium shadow-sm transition-all hover:border-primary/30",
              isDark ? "text-card-foreground hover:text-primary" : "text-foreground hover:text-primary",
            )}
          >
            Back to top
            <ArrowUp className={cn("h-4 w-4", isDark ? "text-card-foreground" : "text-foreground")} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
