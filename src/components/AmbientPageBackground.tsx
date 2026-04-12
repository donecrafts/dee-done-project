import { useCallback, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { PAGE_AMBIENT_VIDEO, PAGE_AMBIENT_VIDEO_FALLBACK } from "@/config/videos";

/**
 * Fixed full-viewport video behind page content (separate asset from the hero section).
 */
const AmbientPageBackground = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [src, setSrc] = useState(PAGE_AMBIENT_VIDEO);

  const onVideoError = useCallback(() => {
    setSrc((current) => (current === PAGE_AMBIENT_VIDEO ? PAGE_AMBIENT_VIDEO_FALLBACK : current));
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden>
      <video
        key={src}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        onError={onVideoError}
        className="absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover opacity-[0.62] dark:opacity-50"
        src={src}
      />
      <div
        className={cn(
          "absolute inset-0 backdrop-blur-[0.5px]",
          isDark ? "bg-[hsl(260_20%_8%/0.82)]" : "bg-[hsl(0_0%_100%/0.72)]",
        )}
      />
    </div>
  );
};

export default AmbientPageBackground;
