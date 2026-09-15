import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "next-themes";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import CursorGlow from "@/components/CursorGlow";
import AskByVoice from "@/components/AskByVoice";
import AmbientPageBackground from "@/components/AmbientPageBackground";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const location = useLocation();
  const activeTheme: "dark" | "light" =
    resolvedTheme === "light" || theme === "light" ? "light" : "dark";
  const toggleTheme = () => setTheme(activeTheme === "dark" ? "light" : "dark");

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const run = () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      const t = window.setTimeout(run, 80);
      return () => window.clearTimeout(t);
    }
    window.scrollTo(0, 0);
    return undefined;
  }, [location.pathname, location.hash]);

  return (
    <div className="relative min-h-screen bg-background">
      <AmbientPageBackground />
      <CursorGlow />
      <ScrollProgress />
      <Navbar theme={activeTheme} onToggleTheme={toggleTheme} />
      <main className="relative z-10">{children}</main>
      <Footer />
      <AskByVoice />
    </div>
  );
};

export default Layout;
