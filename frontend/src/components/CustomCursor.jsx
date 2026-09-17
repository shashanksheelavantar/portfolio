import { useEffect, useRef } from "react";
import { usePrefersReducedMotion, useFinePointer } from "../hooks/useMediaPreferences";

const TRAIL_SIZE = 5;
const LERP_DOT = 0.35;
const LERP_GLOW = 0.12;
const LERP_TRAIL = 0.45;

// Elements opt in via data-cursor="view" | "link" | "button" | "drag" | "three"
// and an optional data-cursor-label="Click" for a text hint.
export default function CustomCursor() {
  const reducedMotion = usePrefersReducedMotion();
  const finePointer = useFinePointer();
  const enabled = finePointer && !reducedMotion;

  const dotRef = useRef(null);
  const glowRef = useRef(null);
  const labelRef = useRef(null);
  const trailRefs = useRef([]);

  const mouse = useRef({ x: -100, y: -100 });
  const dot = useRef({ x: -100, y: -100 });
  const glow = useRef({ x: -100, y: -100 });
  const trail = useRef(Array.from({ length: TRAIL_SIZE }, () => ({ x: -100, y: -100 })));
  const rafId = useRef(null);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove("has-custom-cursor");
      return;
    }
    document.documentElement.classList.add("has-custom-cursor");

    const handleMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const handleOver = (e) => {
      const target = e.target.closest?.("[data-cursor]");
      const nextVariant = target?.getAttribute("data-cursor") || "default";
      const label = target?.getAttribute("data-cursor-label") || "";
      if (dotRef.current) dotRef.current.dataset.variant = nextVariant;
      if (labelRef.current) labelRef.current.textContent = label;
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseover", handleOver, { passive: true });

    const tick = () => {
      dot.current.x += (mouse.current.x - dot.current.x) * LERP_DOT;
      dot.current.y += (mouse.current.y - dot.current.y) * LERP_DOT;
      glow.current.x += (dot.current.x - glow.current.x) * LERP_GLOW;
      glow.current.y += (dot.current.y - glow.current.y) * LERP_GLOW;

      let leaderX = dot.current.x;
      let leaderY = dot.current.y;
      trail.current.forEach((p, i) => {
        p.x += (leaderX - p.x) * LERP_TRAIL;
        p.y += (leaderY - p.y) * LERP_TRAIL;
        const el = trailRefs.current[i];
        if (el) el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
        leaderX = p.x;
        leaderY = p.y;
      });

      if (dotRef.current) dotRef.current.style.transform = `translate3d(${dot.current.x}px, ${dot.current.y}px, 0)`;
      if (glowRef.current) glowRef.current.style.transform = `translate3d(${glow.current.x}px, ${glow.current.y}px, 0)`;

      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      cancelAnimationFrame(rafId.current);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[9999]">
      {trail.current.map((_, i) => (
        <div
          key={i}
          ref={(el) => (trailRefs.current[i] = el)}
          className="absolute top-0 left-0 w-1.5 h-1.5 rounded-full bg-accent"
          style={{ opacity: 0.22 - i * 0.035, marginLeft: -3, marginTop: -3, willChange: "transform" }}
        />
      ))}
      <div
        ref={glowRef}
        className="absolute top-0 left-0 w-16 h-16 rounded-full"
        style={{
          background: "radial-gradient(circle, rgb(var(--accent) / 0.18) 0%, transparent 70%)",
          marginLeft: -32,
          marginTop: -32,
          willChange: "transform",
        }}
      />
      <div
        ref={dotRef}
        data-variant="default"
        className="cursor-dot absolute top-0 left-0 flex items-center justify-center rounded-full border border-ink/40 bg-ink/90 transition-[width,height,background-color,border-color] duration-200 ease-out"
        style={{ marginLeft: -8, marginTop: -8, willChange: "transform" }}
      >
        <span ref={labelRef} className="text-[10px] font-semibold uppercase tracking-wider text-ink whitespace-nowrap" />
      </div>
    </div>
  );
}
