import { useRef } from "react";
import { usePrefersReducedMotion, useFinePointer } from "../hooks/useMediaPreferences";

const STRENGTH = 0.25;
const MAX_OFFSET = 10;

export default function Magnetic({ children, className = "", as: Tag = "div", ...props }) {
  const ref = useRef(null);
  const reducedMotion = usePrefersReducedMotion();
  const finePointer = useFinePointer();
  const active = finePointer && !reducedMotion;

  const handleMove = (e) => {
    if (!active || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    const dx = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, x * STRENGTH));
    const dy = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, y * STRENGTH));
    ref.current.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
  };

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = "translate3d(0,0,0)";
  };

  return (
    <Tag
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`transition-transform duration-300 ease-out will-change-transform inline-block ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
