import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  theme: "dark" | "light";
  onToggle: () => void;
}

const ThemeToggle = ({ theme, onToggle }: ThemeToggleProps) => {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => onToggle()}
      className={cn(
        "relative z-[60] flex h-8 w-14 shrink-0 items-center rounded-full border p-1 transition-colors duration-300",
        isDark ? "border-white/25 bg-primary shadow-inner" : "border-primary/35 bg-white shadow-sm",
      )}
      aria-label={isDark ? "Switch to light theme" : "Switch to wine theme"}
    >
      <div
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded-full shadow-sm transition-transform duration-300",
          isDark ? "translate-x-0 bg-white text-primary" : "translate-x-6 bg-primary text-primary-foreground",
        )}
      >
        {isDark ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
      </div>
    </button>
  );
};

export default ThemeToggle;
