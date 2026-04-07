import { useTheme } from "next-themes";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import CursorGlow from "@/components/CursorGlow";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const activeTheme: "dark" | "light" =
    resolvedTheme === "light" || theme === "light" ? "light" : "dark";
  const toggleTheme = () => setTheme(activeTheme === "dark" ? "light" : "dark");

  return (
    <div className="min-h-screen bg-background">
      <CursorGlow />
      <ScrollProgress />
      <Navbar theme={activeTheme} onToggleTheme={toggleTheme} />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
