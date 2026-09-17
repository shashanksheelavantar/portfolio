import { Suspense, lazy, useState } from "react";
import { FileDown, FolderGit2 } from "lucide-react";
import { profile } from "../data/profile";
import { useWebGLSupport } from "../hooks/useWebGLSupport";
import { usePrefersReducedMotion, useIsMobile } from "../hooks/useMediaPreferences";
import Button from "./Button";
import Reveal from "./Reveal";
import GithubIcon from "./GithubIcon";
import LinkedinIcon from "./LinkedinIcon";

const Canvas3D = lazy(() => import("./HeroCanvas"));

function StaticWorkspaceIllustration() {
  return (
    <div className="w-full h-full flex items-center justify-center p-10">
      <svg viewBox="0 0 400 300" className="w-full max-w-sm text-muted" fill="none" aria-hidden="true">
        <rect x="20" y="220" width="360" height="14" rx="6" fill="currentColor" opacity="0.15" />
        <rect x="140" y="90" width="130" height="90" rx="8" stroke="currentColor" strokeWidth="3" opacity="0.5" />
        <rect x="150" y="100" width="110" height="70" rx="4" fill="currentColor" opacity="0.12" />
        <rect x="185" y="180" width="40" height="14" fill="currentColor" opacity="0.3" />
        <rect x="60" y="180" width="90" height="8" rx="4" fill="currentColor" opacity="0.25" />
        <rect x="300" y="150" width="50" height="45" rx="6" stroke="currentColor" strokeWidth="2.5" opacity="0.4" />
        <circle cx="90" cy="195" r="14" stroke="currentColor" strokeWidth="2.5" opacity="0.4" />
      </svg>
    </div>
  );
}

export default function Hero({ onSelect }) {
  const webglSupported = useWebGLSupport();
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const [hoveringObject, setHoveringObject] = useState(false);
  const use3D = webglSupported;

  return (
    <section id="home" className="relative pt-28 lg:pt-36 pb-16 section-pad !pt-28 lg:!pt-36">
      <div className="max-w-content mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <Reveal className="lg:col-span-6">
          <div className="flex items-center gap-3 mb-5">
            <img
              src={profile.photo}
              alt={`Portrait of ${profile.name}`}
              className="w-12 h-12 rounded-full object-cover border border-border"
              width={48}
              height={48}
            />
            <span className="text-sm font-medium text-muted">{profile.location}</span>
          </div>
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-accent mb-4">
            {profile.role}
          </p>
          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-ink leading-[1.05] mb-6">
            {profile.name}
          </h1>
          <p className="font-mono text-sm sm:text-base text-muted mb-6">
            {profile.taglineTech.join("  •  ")}
          </p>
          <p className="text-base sm:text-lg text-muted leading-relaxed max-w-xl mb-8">
            {profile.intro}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Button as="a" href="#projects" data-cursor="button" data-cursor-label="View">
              <FolderGit2 size={16} /> View Projects
            </Button>
            <Button as="a" href={profile.resumeUrl} download variant="secondary" data-cursor="button">
              <FileDown size={16} /> Download Resume
            </Button>
            <Button as="a" href={profile.github} target="_blank" rel="noreferrer" variant="ghost" data-cursor="link">
              <GithubIcon size={16} /> GitHub
            </Button>
            <Button as="a" href={profile.linkedin} target="_blank" rel="noreferrer" variant="ghost" data-cursor="link">
              <LinkedinIcon size={16} /> LinkedIn
            </Button>
          </div>
        </Reveal>

        <Reveal delay={150} className="lg:col-span-6">
          <div
            className="relative aspect-[4/3] rounded-3xl border border-border bg-surface overflow-hidden"
            data-cursor={use3D ? "three" : undefined}
            data-cursor-label={use3D ? (hoveringObject ? "Click" : "Drag to explore") : undefined}
          >
            {use3D ? (
              <Suspense fallback={<div className="w-full h-full animate-pulse bg-surface-2" />}>
                <Canvas3D onSelect={onSelect} onHoverChange={setHoveringObject} isMobile={isMobile} reducedMotion={reducedMotion} />
              </Suspense>
            ) : (
              <StaticWorkspaceIllustration />
            )}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
              <span className="text-[11px] font-medium text-muted bg-surface/80 backdrop-blur px-2.5 py-1 rounded-full border border-border">
                {use3D ? "Click an object to explore" : "3D preview unavailable — using static view"}
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
