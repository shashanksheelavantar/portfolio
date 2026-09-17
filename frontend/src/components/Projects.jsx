import { useRef } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { projects } from "../data/projects";
import { usePrefersReducedMotion, useFinePointer } from "../hooks/useMediaPreferences";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import GithubIcon from "./GithubIcon";

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const reducedMotion = usePrefersReducedMotion();
  const finePointer = useFinePointer();
  const active = finePointer && !reducedMotion;

  const handleMove = (e) => {
    if (!active || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.transform = `perspective(900px) rotateX(${py * -5}deg) rotateY(${px * 5}deg) translateY(-4px)`;
  };
  const handleLeave = () => { if (ref.current) ref.current.style.transform = "perspective(900px) rotateX(0) rotateY(0) translateY(0)"; };

  return (
    <Reveal delay={index * 90}>
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="rounded-3xl border border-border bg-surface p-7 flex flex-col h-full transition-transform duration-200 ease-out will-change-transform"
      >
        <div className="mb-5">
          <h3 className="text-xl font-bold text-ink mb-1">{project.name}</h3>
          <p className="text-sm text-accent font-medium">{project.tagline}</p>
        </div>
        <p className="text-sm text-muted leading-relaxed mb-5">{project.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.map((t) => (
            <span key={t} className="text-xs font-medium bg-surface-2 border border-border rounded-full px-2.5 py-1 text-ink">{t}</span>
          ))}
        </div>

        <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs text-muted mb-6">
          {project.features.slice(0, 6).map((f) => (
            <li key={f} className="flex items-start gap-1.5">
              <span className="text-accent mt-0.5">•</span>{f}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-4 border-t border-border">
          <Link
            to={`/projects/${project.id}`}
            data-cursor="link"
            className="inline-flex items-center gap-1 text-sm font-semibold text-ink hover:text-accent transition-colors focus-ring rounded"
          >
            Case Study <ArrowUpRight size={14} />
          </Link>
          <span className="text-border">|</span>
          {project.links.demo ? (
            <a href={project.links.demo} target="_blank" rel="noreferrer" data-cursor="link" className="inline-flex items-center gap-1 text-sm font-medium text-muted hover:text-ink transition-colors">
              Live Demo <ExternalLink size={13} />
            </a>
          ) : (
            <span className="inline-flex items-center gap-1 text-sm font-medium text-muted/50 cursor-not-allowed" title="Link not yet available">
              Live Demo <ExternalLink size={13} />
            </span>
          )}
          <span className="text-border">|</span>
          {project.links.github ? (
            <a href={project.links.github} target="_blank" rel="noreferrer" data-cursor="link" className="inline-flex items-center gap-1 text-sm font-medium text-muted hover:text-ink transition-colors">
              <GithubIcon size={13} /> GitHub
            </a>
          ) : (
            <span className="inline-flex items-center gap-1 text-sm font-medium text-muted/50 cursor-not-allowed" title="Link not yet available">
              <GithubIcon size={13} /> GitHub
            </span>
          )}
        </div>
      </div>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section-pad">
      <div className="max-w-content mx-auto px-6 lg:px-8">
        <SectionHeading
          eyebrow="Projects"
          title="Things I've built"
          description="Each project links to a full case study covering the problem, architecture, and what I learned."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}
