import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
  theme: "dark" | "light";
  onToggle: () => void;
}

const ThemeToggle = ({ theme, onToggle }: ThemeToggleProps) => {
  return (
    <button
      type="button"
      onClick={() => onToggle()}
      className="relative z-[60] flex h-8 w-14 shrink-0 items-center rounded-full border border-primary/30 bg-primary/20 p-1 transition-colors duration-300 dark:bg-white/15"
      aria-label="Toggle theme"
    >
      <div
        className={`flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-300 ${
          theme === "dark" ? "translate-x-0" : "translate-x-6"
        }`}
      >
        {theme === "dark" ? (
          <Moon className="h-3.5 w-3.5 text-primary" />
        ) : (
          <Sun className="h-3.5 w-3.5 text-primary" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;
