import { useRef } from "react";
import { Code2, LayoutGrid, Server, Database, Wrench } from "lucide-react";
import { skillCategories } from "../data/skills";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { usePrefersReducedMotion, useFinePointer } from "../hooks/useMediaPreferences";

const ICONS = { code: Code2, layout: LayoutGrid, server: Server, database: Database, wrench: Wrench };

function TiltCard({ children }) {
  const ref = useRef(null);
  const reducedMotion = usePrefersReducedMotion();
  const finePointer = useFinePointer();
  const active = finePointer && !reducedMotion;

  const handleMove = (e) => {
    if (!active || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.transform = `perspective(600px) rotateX(${py * -6}deg) rotateY(${px * 6}deg) translateZ(0)`;
  };
  const handleLeave = () => { if (ref.current) ref.current.style.transform = "perspective(600px) rotateX(0) rotateY(0)"; };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="rounded-2xl border border-border bg-surface p-6 transition-transform duration-200 ease-out will-change-transform"
    >
      {children}
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section-pad">
      <div className="max-w-content mx-auto px-6 lg:px-8">
        <SectionHeading eyebrow="Skills" title="What I work with" description="Grouped by area, not scored — I'd rather show what I've built with each than claim a made-up percentage." />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((cat, i) => {
            const Icon = ICONS[cat.icon];
            return (
              <Reveal key={cat.id} delay={i * 60}>
                <TiltCard>
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                      <Icon size={16} />
                    </div>
                    <h3 className="font-semibold text-ink">{cat.label}</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {cat.skills.map((s) => (
                      <li key={s.name} className="flex items-baseline justify-between gap-3">
                        <span className="text-sm font-medium text-ink">{s.name}</span>
                        <span className="text-xs text-muted text-right">{s.note}</span>
                      </li>
                    ))}
                  </ul>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
