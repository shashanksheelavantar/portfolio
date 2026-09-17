import { useState } from "react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { usePrefersReducedMotion } from "../hooks/useMediaPreferences";

const NODES = [
  { id: "browser", label: "Browser", x: 60, y: 40, description: "The client sends an HTTP request — e.g. loading the dashboard or submitting a form." },
  { id: "react", label: "React", x: 60, y: 120, description: "The React frontend renders the UI and calls the API via fetch/axios." },
  { id: "api", label: "REST API", x: 60, y: 200, description: "A REST API layer defines endpoints (routes) that the frontend calls." },
  { id: "middleware", label: "Middleware", x: 220, y: 160, description: "Requests pass through middleware first — CORS, JSON parsing, logging." },
  { id: "auth", label: "Authentication", x: 220, y: 240, description: "JWT-based auth middleware verifies the request's token before it reaches business logic." },
  { id: "validation", label: "Validation", x: 220, y: 320, description: "Request bodies are validated before touching the database, to reject bad input early." },
  { id: "express", label: "Express.js", x: 60, y: 280, description: "Express routes the validated, authenticated request to the right controller." },
  { id: "postgres", label: "PostgreSQL", x: 60, y: 360, description: "The controller runs a parameterized query against PostgreSQL and gets the result back." },
  { id: "response", label: "Response", x: 60, y: 440, description: "Express formats a JSON response, which flows back up to React and renders in the browser." },
];

const FLOW = ["browser", "react", "api", "middleware", "auth", "validation", "express", "postgres", "response"];

export default function BackendArchitecture3D() {
  const [selected, setSelected] = useState(NODES[0]);
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section id="architecture" className="section-pad">
      <div className="max-w-content mx-auto px-6 lg:px-8">
        <SectionHeading
          eyebrow="Architecture"
          title="How a request flows through my stack"
          description="Click any component to see what it does. The typical InternHub/ProjectHub request path is shown."
        />
        <Reveal className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 rounded-2xl border border-border bg-surface p-6 overflow-x-auto">
            <svg viewBox="0 0 320 480" className="w-full max-w-xs mx-auto" style={{ minWidth: 260 }}>
              <defs>
                <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="rgb(var(--border))" />
                </marker>
              </defs>
              {FLOW.slice(0, -1).map((id, i) => {
                const a = NODES.find((n) => n.id === id);
                const b = NODES.find((n) => n.id === FLOW[i + 1]);
                return (
                  <line key={id} x1={a.x} y1={a.y + 14} x2={b.x} y2={b.y - 14} stroke="rgb(var(--border))" strokeWidth="2" markerEnd="url(#arrow)" />
                );
              })}
              {!reducedMotion && (
                <circle r="4" fill="#63b3ed">
                  <animateMotion
                    dur="6s"
                    repeatCount="indefinite"
                    path={`M${NODES.filter((n) => FLOW.includes(n.id)).map((n) => `${n.x},${n.y}`).join(" L")}`}
                  />
                </circle>
              )}
              {NODES.map((n) => (
                <g
                  key={n.id}
                  onClick={() => setSelected(n)}
                  className="cursor-pointer"
                  data-cursor="button"
                  role="button"
                  tabIndex={0}
                  aria-label={n.label}
                  onKeyDown={(e) => e.key === "Enter" && setSelected(n)}
                >
                  <rect
                    x={n.x - 52} y={n.y - 14} width="104" height="28" rx="14"
                    fill={selected.id === n.id ? "rgb(99 179 237 / 0.15)" : "rgb(var(--surface-2))"}
                    stroke={selected.id === n.id ? "#63b3ed" : "rgb(var(--border))"}
                    strokeWidth="2"
                  />
                  <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize="11" fontWeight="600" fill="rgb(var(--ink))">{n.label}</text>
                </g>
              ))}
            </svg>
          </div>

          <div className="lg:col-span-2 rounded-2xl border border-border bg-surface p-6 h-fit">
            <h3 className="font-semibold text-ink mb-2">{selected.label}</h3>
            <p className="text-sm text-muted leading-relaxed">{selected.description}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
