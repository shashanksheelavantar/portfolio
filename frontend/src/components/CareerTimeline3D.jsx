import { useRef, useState } from "react";
import { X } from "lucide-react";
import { careerTimeline } from "../data/experience";
import { projects } from "../data/projects";
import { usePrefersReducedMotion, useFinePointer } from "../hooks/useMediaPreferences";
import Reveal from "./Reveal";

// Implemented as a CSS-3D (perspective/rotateX/rotateY) timeline rather than
// a full Three.js scene. A WebGL timeline of this shape would add real
// weight (its own scene/camera/lighting) for interaction that CSS 3D
// transforms deliver just as well here — in line with the brief's own
// performance and "don't use 3D everywhere" guidance.
function Milestone3DCard({ milestone, onOpen }) {
  const ref = useRef(null);
  const reducedMotion = usePrefersReducedMotion();
  const finePointer = useFinePointer();
  const active = finePointer && !reducedMotion;

  const handleMove = (e) => {
    if (!active || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.transform = `perspective(700px) rotateX(${py * -8}deg) rotateY(${px * 8}deg) translateY(-4px)`;
  };
  const handleLeave = () => { if (ref.current) ref.current.style.transform = "perspective(700px) rotateX(0) rotateY(0) translateY(0)"; };

  return (
    <button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={() => onOpen(milestone)}
      data-cursor="button"
      className="text-left w-full rounded-2xl border border-border bg-surface p-6 transition-transform duration-200 ease-out will-change-transform focus-ring"
    >
      <span className="text-2xl font-extrabold text-accent">{milestone.year}</span>
      <h4 className="font-semibold text-ink mt-2 mb-1.5">{milestone.title}</h4>
      <p className="text-sm text-muted line-clamp-2">{milestone.description}</p>
    </button>
  );
}

export default function CareerTimeline3D() {
  const [open, setOpen] = useState(null);
  const relatedProject = open?.relatedProject ? projects.find((p) => p.id === open.relatedProject) : null;

  return (
    <div>
      <h3 className="text-lg font-semibold text-ink mb-6">Career timeline</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {careerTimeline.map((m, i) => (
          <Reveal key={m.year} delay={i * 80}>
            <Milestone3DCard milestone={m} onOpen={setOpen} />
          </Reveal>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setOpen(null)} />
          <div className="relative w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-2xl">
            <div className="flex items-start justify-between mb-4">
              <span className="text-2xl font-extrabold text-accent">{open.year}</span>
              <button onClick={() => setOpen(null)} aria-label="Close" className="text-muted hover:text-ink focus-ring rounded">
                <X size={18} />
              </button>
            </div>
            <h3 className="font-semibold text-ink text-lg mb-2">{open.title}</h3>
            <p className="text-sm text-muted leading-relaxed mb-4">{open.description}</p>
            {open.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {open.technologies.map((t) => (
                  <span key={t} className="text-xs font-medium bg-surface-2 border border-border rounded-full px-2.5 py-1 text-ink">{t}</span>
                ))}
              </div>
            )}
            {relatedProject && (
              <a href={`#projects`} onClick={() => setOpen(null)} className="text-sm font-medium text-accent hover:underline">
                Related project: {relatedProject.name} →
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
