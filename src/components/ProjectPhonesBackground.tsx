import { useMemo } from "react";
import { projects } from "@/data/projects";
import { ProjectPhoneCard } from "@/components/ProjectPhoneCard";

type ProjectPhonesBackgroundProps = {
  /** Extra overlay darkness over the phones (0–1-ish via opacity class). */
  className?: string;
};

/** Scrolling phone rows with all portfolio projects — same look as the welcome screen. */
const ProjectPhonesBackground = ({ className }: ProjectPhonesBackgroundProps) => {
  const reducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const marqueeItems = useMemo(() => {
    const imgs = projects.map((p) => ({ image: p.image, title: p.title }));
    return [...imgs, ...imgs];
  }, []);

  const marqueeReverse = useMemo(() => {
    const imgs = [...projects].reverse().map((p) => ({ image: p.image, title: p.title }));
    return [...imgs, ...imgs];
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden bg-[#141416] ${className ?? ""}`} aria-hidden>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/15 via-[#141416] to-primary/10" />

      {!reducedMotion ? (
        <>
          <div className="pointer-events-none absolute left-0 right-0 top-12 overflow-hidden opacity-40">
            <div className="flex w-max animate-scroll-left">
              {marqueeItems.map((item, i) => (
                <ProjectPhoneCard key={`top-${item.title}-${i}`} image={item.image} title={item.title} />
              ))}
            </div>
          </div>
          <div className="pointer-events-none absolute bottom-12 left-0 right-0 overflow-hidden opacity-40">
            <div className="flex w-max animate-scroll-right">
              {marqueeReverse.map((item, i) => (
                <ProjectPhoneCard key={`bottom-${item.title}-${i}`} image={item.image} title={item.title} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center gap-4 opacity-30">
          {projects.slice(0, 4).map((p) => (
            <ProjectPhoneCard key={p.slug} image={p.image} title={p.title} />
          ))}
        </div>
      )}

      {/* Readability wash over phones */}
      <div className="pointer-events-none absolute inset-0 bg-black/45" />
    </div>
  );
};

export default ProjectPhonesBackground;
