import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed bottom-8 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-xl border shadow-lg transition-all hover:shadow-xl md:right-10",
        isLight
          ? "border-primary/40 bg-primary hover:bg-primary/90"
          : "border-border bg-card hover:border-primary/30",
      )}
      aria-label="Back to top"
    >
      <ChevronUp className={cn("h-5 w-5", isLight ? "text-white" : "text-card-foreground")} />
    </button>
  );
};

export default BackToTop;
