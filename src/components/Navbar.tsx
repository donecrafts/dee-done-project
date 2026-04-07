import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { cn } from "@/lib/utils";

interface NavbarProps {
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

const Navbar = ({ theme, onToggleTheme }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const linkDesktop = (href: string) =>
    cn(
      "text-sm font-medium transition-colors duration-200",
      scrolled
        ? location.pathname === href
          ? "text-primary"
          : "text-card-foreground/90 hover:text-primary"
        : location.pathname === href
          ? "text-white"
          : "text-white/80 hover:text-white",
    );

  const linkMobile = (href: string) =>
    cn(
      "text-left text-sm font-medium transition-colors",
      location.pathname === href ? "text-primary" : "text-card-foreground/90 hover:text-primary",
    );

  const logoAccent = scrolled ? "text-card-foreground" : "text-white";
  const barIcon = scrolled ? "text-card-foreground" : "text-white";

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "glass-strong shadow-lg" : "bg-transparent",
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-bold tracking-tight">
          <span className={cn("neon-text", logoAccent)}>JOHN</span>
          <span className={scrolled ? "text-card-foreground" : "text-white/95"}>-CRAFT</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} to={link.href} className={linkDesktop(link.href)}>
              {link.label}
            </Link>
          ))}
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button type="button" onClick={() => setMobileOpen(!mobileOpen)} className={cn(barIcon, "shrink-0")}>
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="glass-strong border-t border-border md:hidden">
          <div className="container mx-auto flex flex-col gap-4 px-6 py-6">
            {navLinks.map((link) => (
              <Link key={link.href} to={link.href} className={linkMobile(link.href)}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
