import { useEffect, useRef } from "react";
import { usePrefersReducedMotion, useFinePointer } from "../hooks/useMediaPreferences";

export default function MouseReactiveBackground() {
  const glowRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();
  const finePointer = useFinePointer();
  const active = finePointer && !reducedMotion;

  const pos = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  useEffect(() => {
    if (!active) return;
    pos.current = { x: window.innerWidth / 2, y: window.innerHeight * 0.3 };
    current.current = { ...pos.current };

    const handleMove = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMove, { passive: true });

    const tick = () => {
      current.current.x += (pos.current.x - current.current.x) * 0.04;
      current.current.y += (pos.current.y - current.current.y) * 0.04;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${current.current.x - 400}px, ${current.current.y - 400}px, 0)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(raf.current);
    };
  }, [active]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div
        ref={glowRef}
        className="absolute w-[800px] h-[800px] rounded-full opacity-[0.06] dark:opacity-[0.08]"
        style={{
          background: "radial-gradient(circle, rgb(var(--accent)) 0%, transparent 65%)",
          willChange: active ? "transform" : "auto",
          transform: "translate3d(-400px,-400px,0)",
        }}
      />
    </div>
  );
}
