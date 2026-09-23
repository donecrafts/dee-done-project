import { useEffect, useRef } from "react";

/** Soft cursor highlight — DOM style updates, no React re-renders per move. */
const CursorGlow = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isDark = () => document.documentElement.classList.contains("dark");
    if (!isDark()) {
      el.style.display = "none";
      return;
    }

    let raf = 0;
    let x = 0;
    let y = 0;
    let visible = false;

    const paint = () => {
      raf = 0;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      el.style.opacity = visible ? "1" : "0";
    };

    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      visible = true;
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const leave = () => {
      visible = false;
      if (!raf) raf = requestAnimationFrame(paint);
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="cursor-glow"
      style={{ left: 0, top: 0, opacity: 0, willChange: "transform, opacity" }}
      aria-hidden
    />
  );
};

export default CursorGlow;
