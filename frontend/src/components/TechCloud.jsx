import { Suspense, lazy, useState } from "react";
import { X } from "lucide-react";
import { useWebGLSupport } from "../hooks/useWebGLSupport";
import { usePrefersReducedMotion, useIsMobile } from "../hooks/useMediaPreferences";
import { techCloud } from "../data/skills";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const TechCloudCanvas = lazy(() => import("./TechCloudCanvas"));

function TechListFallback({ onSelect }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 p-6">
      {techCloud.map((t) => (
        <button
          key={t.name}
          onClick={() => onSelect(t)}
          className="rounded-xl border border-border bg-surface px-3 py-3 text-sm font-medium text-ink hover:border-accent transition-colors focus-ring"
        >
          {t.name}
        </button>
      ))}
    </div>
  );
}

export default function TechCloud() {
  const webglSupported = useWebGLSupport();
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const [selected, setSelected] = useState(null);

  return (
    <section id="tech-cloud" className="section-pad">
      <div className="max-w-content mx-auto px-6 lg:px-8">
        <SectionHeading
          eyebrow="Technology"
          title="Technologies I work with"
          description="Click a node to see where I use it and the core concepts behind it."
        />
        <Reveal>
          <div className="relative rounded-3xl border border-border bg-surface overflow-hidden" style={{ height: 420 }} data-cursor={webglSupported ? "three" : undefined} data-cursor-label="Click">
            {webglSupported ? (
              <Suspense fallback={<div className="w-full h-full animate-pulse bg-surface-2" />}>
                <TechCloudCanvas onSelect={setSelected} isMobile={isMobile} reducedMotion={reducedMotion} />
              </Suspense>
            ) : (
              <TechListFallback onSelect={setSelected} />
            )}
          </div>
        </Reveal>

        {selected && (
          <div
            role="dialog"
            aria-label={`${selected.name} details`}
            className="mt-6 rounded-2xl border border-border bg-surface p-6 max-w-xl animate-fadeUp"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-bold text-ink">{selected.name}</h3>
              <button onClick={() => setSelected(null)} aria-label="Close" className="text-muted hover:text-ink focus-ring rounded">
                <X size={18} />
              </button>
            </div>
            <p className="text-sm text-muted mb-4"><span className="font-medium text-ink">Where I use it: </span>{selected.usage}</p>
            <div className="flex flex-wrap gap-2">
              {selected.concepts.map((c) => (
                <span key={c} className="text-xs font-medium bg-surface-2 border border-border rounded-full px-3 py-1 text-ink">{c}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
