import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

/**
 * Lightweight fixed wash behind page content (no video — keeps the site fast).
 */
const AmbientPageBackground = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden>
      <div
        className={cn(
          "absolute inset-0",
          isDark
            ? "bg-[radial-gradient(ellipse_at_top,_hsl(345_40%_22%/_0.55),_transparent_55%),linear-gradient(180deg,_hsl(350_30%_12%),_hsl(350_25%_8%))]"
            : "bg-[radial-gradient(ellipse_at_top,_hsl(345_50%_95%/_0.9),_transparent_55%),linear-gradient(180deg,_hsl(0_0%_100%),_hsl(345_20%_97%))]",
        )}
      />
    </div>
  );
};

export default AmbientPageBackground;
