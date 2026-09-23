import { useMemo } from "react";
import { projects } from "@/data/projects";
import { ProjectPhoneCard } from "@/components/ProjectPhoneCard";

type ProjectPhonesBackgroundProps = {
  className?: string;
};

/** Keep marquees light: fewer phones = faster paint and less image decode work. */
const MARQUEE_COUNT = 8;

/** Scrolling phone rows with portfolio project logos — home hero background. */
const ProjectPhonesBackground = ({ className }: ProjectPhonesBackgroundProps) => {
  const reducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const phoneProjects = useMemo(() => {
    const featured = projects.filter((p) => p.featured);
    const pool = featured.length >= MARQUEE_COUNT ? featured : projects;
    return pool.slice(0, MARQUEE_COUNT).map((p) => ({ image: p.image, title: p.title }));
  }, []);

  const marqueeItems = useMemo(() => [...phoneProjects, ...phoneProjects], [phoneProjects]);
  const marqueeReverse = useMemo(
    () => [...phoneProjects].reverse().concat([...phoneProjects].reverse()),
    [phoneProjects],
  );

  return (
    <div
      className={`absolute inset-0 overflow-hidden bg-[#2c2a32] ${className ?? ""}`}
      aria-hidden
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/25 via-[#35333c] to-primary/20" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#2c2a32]/80 via-transparent to-[#2c2a32]/50" />

      {!reducedMotion ? (
        <>
          <div className="pointer-events-none absolute left-0 right-0 top-12 overflow-hidden opacity-70">
            <div className="flex w-max animate-scroll-left">
              {marqueeItems.map((item, i) => (
                <ProjectPhoneCard key={`top-${item.title}-${i}`} image={item.image} title={item.title} />
              ))}
            </div>
          </div>
          <div className="pointer-events-none absolute bottom-12 left-0 right-0 overflow-hidden opacity-70">
            <div className="flex w-max animate-scroll-right">
              {marqueeReverse.map((item, i) => (
                <ProjectPhoneCard key={`bottom-${item.title}-${i}`} image={item.image} title={item.title} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center gap-4 opacity-55">
          {phoneProjects.slice(0, 4).map((p) => (
            <ProjectPhoneCard key={p.title} image={p.image} title={p.title} />
          ))}
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-black/15" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/25" />
    </div>
  );
};

export default ProjectPhonesBackground;
