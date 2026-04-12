const LABELS = [
  "E-Commerce",
  "SaaS Dashboard",
  "Mobile App",
  "Analytics",
  "CMS Platform",
  "Portfolio",
  "Real-Time App",
  "API Service",
] as const;

const MarqueeStrip = () => {
  const row = (
    <div className="flex w-max shrink-0 items-center gap-10 px-4 font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
      {LABELS.map((label) => (
        <span key={label} className="flex items-center gap-10">
          <span>{label}</span>
          <span className="text-primary/40" aria-hidden>
            ·
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="relative overflow-hidden border-b border-border bg-muted/40 py-2.5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />
      <div className="flex w-max animate-marquee">
        {row}
        {row}
      </div>
    </div>
  );
};

export default MarqueeStrip;
