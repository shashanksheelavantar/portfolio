import { Briefcase } from "lucide-react";
import { experience } from "../data/experience";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import CareerTimeline3D from "./CareerTimeline3D";

export default function Experience() {
  return (
    <section id="experience" className="section-pad">
      <div className="max-w-content mx-auto px-6 lg:px-8">
        <SectionHeading eyebrow="Experience" title="Experience & career timeline" />

        <div className="space-y-4 mb-16">
          {experience.map((exp) => (
            <Reveal key={exp.id} className="rounded-2xl border border-border bg-surface p-6">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-accent/10 text-accent flex items-center justify-center shrink-0">
                    <Briefcase size={16} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink">{exp.organization}</h3>
                    <p className="text-sm text-muted">{exp.role} · {exp.type}</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-muted bg-surface-2 border border-border rounded-full px-3 py-1 shrink-0">
                  {exp.period}
                </span>
              </div>
              <p className="text-sm text-muted leading-relaxed mb-3">{exp.description}</p>
              {exp.highlights.length > 0 && (
                <ul className="list-disc list-inside space-y-1 text-sm text-muted">
                  {exp.highlights.map((h) => <li key={h}>{h}</li>)}
                </ul>
              )}
            </Reveal>
          ))}
        </div>

        <CareerTimeline3D />
      </div>
    </section>
  );
}
