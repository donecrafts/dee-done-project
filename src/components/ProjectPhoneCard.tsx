/** Phone frame for scrolling project marquees (welcome + home hero). */
export function ProjectPhoneCard({ image, title }: { image: string; title: string }) {
  return (
    <div className="mx-3 flex-shrink-0" title={title}>
      <div className="relative h-[18.5rem] w-[9.25rem] rounded-[1.65rem] bg-gradient-to-b from-[#3a3a40] via-[#1c1c1f] to-[#0d0d0f] p-[0.35rem] shadow-[0_18px_40px_-12px_rgba(0,0,0,0.75),inset_0_1px_0_rgba(255,255,255,0.12)]">
        <span className="absolute -left-[2px] top-16 h-7 w-[2px] rounded-l bg-[#2a2a2e]" aria-hidden />
        <span className="absolute -left-[2px] top-28 h-10 w-[2px] rounded-l bg-[#2a2a2e]" aria-hidden />
        <span className="absolute -right-[2px] top-24 h-12 w-[2px] rounded-r bg-[#2a2a2e]" aria-hidden />

        <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[1.35rem] bg-[#0a0a0c]">
          <div className="absolute left-1/2 top-2 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-black shadow-sm" aria-hidden>
            <span className="absolute right-2.5 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#1a1a22] ring-1 ring-white/10" />
          </div>

          {/* Centered app logo / icon — not a full-screen UI screenshot */}
          <div className="relative z-[1] h-[4.25rem] w-[4.25rem] overflow-hidden rounded-[1.2rem] bg-[#151518] shadow-[0_10px_28px_-8px_rgba(0,0,0,0.65)] ring-1 ring-white/15">
            <img
              src={image}
              alt=""
              className="h-full w-full object-cover object-center"
              loading="lazy"
            />
          </div>

          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-black/30"
            aria-hidden
          />

          <div className="absolute bottom-2 left-1/2 z-10 h-1 w-16 -translate-x-1/2 rounded-full bg-white/35" aria-hidden />
        </div>
      </div>
    </div>
  );
}
