/**
 * Lightweight page hero backdrop — CSS only (no multi‑MB looping videos).
 */
const VideoBackground = (_props: { src?: string }) => {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 20%, hsl(345 55% 42% / 0.55), transparent 55%), linear-gradient(165deg, hsl(350 35% 18%) 0%, hsl(350 40% 10%) 45%, hsl(345 50% 22% / 0.85) 100%)",
        }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-[hsl(350_40%_8%/0.35)]" aria-hidden />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
        aria-hidden
      />
    </>
  );
};

export default VideoBackground;
