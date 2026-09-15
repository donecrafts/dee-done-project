import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { cn } from "@/lib/utils";
import { BRAND_LOGO, BRAND_NAME } from "@/config/brand";

interface NavbarProps {
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

type NavItem = { label: string; href: string; hash?: string };

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Skills", href: "/", hash: "#skills" },
  { label: "Projects", href: "/projects" },
  { label: "Testimonials", href: "/", hash: "#testimonials" },
  { label: "Contact", href: "/", hash: "#contact" },
];

function linkTo(item: NavItem) {
  return item.hash ? `${item.href}${item.hash}` : item.href;
}

const Navbar = ({ theme, onToggleTheme }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isLight = theme === "light";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  const isActive = (item: NavItem) => {
    if (item.hash) {
      return location.pathname === item.href && location.hash === item.hash;
    }
    return location.pathname === item.href;
  };

  const linkDesktop = (item: NavItem) =>
    cn(
      "text-sm font-medium transition-colors duration-200 whitespace-nowrap",
      isLight
        ? isActive(item)
          ? "text-primary"
          : "text-foreground/80 hover:text-primary"
        : scrolled
          ? isActive(item)
            ? "text-primary"
            : "text-card-foreground/90 hover:text-primary"
          : isActive(item)
            ? "text-white"
            : "text-white/80 hover:text-white",
    );

  const linkMobile = (item: NavItem) =>
    cn(
      "text-left text-sm font-medium transition-colors",
      isActive(item) ? "text-primary" : "text-foreground/90 hover:text-primary",
    );

  const hireClass =
    "inline-flex shrink-0 items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md";

  const shell = cn(
    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
    isLight && "border-b border-border/70 bg-background/95 shadow-sm backdrop-blur-md",
    !isLight && (scrolled ? "glass-strong border-b border-border/20 shadow-lg" : "bg-transparent"),
  );

  return (
    <nav className={shell}>
      <div className="container mx-auto grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-6 py-4">
        <Link to="/" className="justify-self-start flex items-center gap-2.5 font-bold tracking-tight">
          <div className="rounded-xl bg-gradient-to-br from-[#f472b6] via-[#a78bfa] to-[#22d3ee] p-px shadow-sm">
            <div
              className={cn(
                "h-9 w-9 overflow-hidden rounded-[10px]",
                isLight && "bg-background",
                !isLight && !scrolled && "bg-primary/45 backdrop-blur-md",
                !isLight && scrolled && "bg-card",
              )}
            >
              <img src={BRAND_LOGO} alt="" className="h-full w-full object-contain" aria-hidden />
            </div>
          </div>
          <span
            className={cn(
              "hidden text-lg font-bold tracking-tight sm:inline md:text-xl",
              isLight && "text-black",
              !isLight && !scrolled && "text-white",
              !isLight && scrolled && "text-card-foreground",
            )}
          >
            {BRAND_NAME}
          </span>
        </Link>

        <div className="hidden items-center justify-center gap-5 lg:flex xl:gap-7">
          {navItems.map((item) => (
            <Link key={`${item.label}-${linkTo(item)}`} to={linkTo(item)} className={linkDesktop(item)}>
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-end gap-2 sm:gap-3">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <Link to="/contact" className={cn(hireClass, "hidden sm:inline-flex")}>
            Hire me
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className={cn(
              "justify-self-end p-1 lg:hidden",
              isLight ? "text-foreground" : scrolled ? "text-card-foreground" : "text-white",
            )}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-background/98 backdrop-blur-md lg:hidden">
          <div className="container mx-auto flex flex-col gap-3 px-6 py-6">
            {navItems.map((item) => (
              <Link key={`m-${item.label}-${linkTo(item)}`} to={linkTo(item)} className={linkMobile(item)}>
                {item.label}
              </Link>
            ))}
            <Link to="/contact" className={cn(hireClass, "mt-2 w-full py-3")}>
              Hire me
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
