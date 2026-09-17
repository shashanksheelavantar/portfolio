import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { projects } from "../data/projects";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import GithubIcon from "../components/GithubIcon";
import Reveal from "../components/Reveal";

const SECTION_ORDER = [
  ["problem", "Problem"],
  ["solution", "Solution"],
  ["architecture", "Architecture"],
  ["featuresDetail", "Features"],
  ["technology", "Technology"],
  ["challenges", "Challenges"],
  ["learned", "What I learned"],
];

export default function ProjectCaseStudy() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center pt-24">
          <h1 className="text-2xl font-bold text-ink mb-3">Project not found</h1>
          <Link to="/#projects" className="text-accent hover:underline">← Back to projects</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const { caseStudy } = project;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <Reveal>
            <Link to="/#projects" data-cursor="link" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink transition-colors mb-8">
              <ArrowLeft size={14} /> Back to projects
            </Link>

            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-ink mb-2">{project.name}</h1>
                <p className="text-accent font-medium">{project.tagline}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.links.demo ? (
                  <Button as="a" href={project.links.demo} target="_blank" rel="noreferrer" variant="secondary" data-cursor="button">
                    Live Demo <ExternalLink size={14} />
                  </Button>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-muted/50">
                    Live Demo (coming soon)
                  </span>
                )}
                {project.links.github ? (
                  <Button as="a" href={project.links.github} target="_blank" rel="noreferrer" variant="secondary" data-cursor="button">
                    <GithubIcon size={14} /> GitHub
                  </Button>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-muted/50">
                    <GithubIcon size={14} /> GitHub (coming soon)
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-10">
              {project.tech.map((t) => (
                <span key={t} className="text-xs font-medium bg-surface-2 border border-border rounded-full px-2.5 py-1 text-ink">{t}</span>
              ))}
            </div>
          </Reveal>

          <div className="space-y-10">
            {SECTION_ORDER.map(([key, label], i) => (
              <Reveal key={key} delay={i * 60} className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
                <h2 className="text-lg font-bold text-ink mb-3">{label}</h2>
                <p className="text-sm sm:text-base text-muted leading-relaxed">{caseStudy[key]}</p>
              </Reveal>
            ))}

            <Reveal className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
              <h2 className="text-lg font-bold text-ink mb-4">Features</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted">
                {project.features.map((f) => (
                  <li key={f} className="flex items-start gap-2"><span className="text-accent mt-0.5">•</span>{f}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
