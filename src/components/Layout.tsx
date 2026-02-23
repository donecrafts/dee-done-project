import { useTheme } from "@/hooks/use-theme";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import CursorGlow from "@/components/CursorGlow";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      <CursorGlow />
      <ScrollProgress />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
