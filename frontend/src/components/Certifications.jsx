import { Award, ExternalLink } from "lucide-react";
import { certifications } from "../data/certifications";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Certifications() {
  return (
    <section id="certifications" className="section-pad">
      <div className="max-w-content mx-auto px-6 lg:px-8">
        <SectionHeading eyebrow="Certifications" title="Certifications" />

        {certifications.length === 0 ? (
          <Reveal className="rounded-2xl border border-dashed border-border bg-surface p-10 text-center">
            <Award size={24} className="text-muted mx-auto mb-3" />
            <p className="text-sm text-muted">No certifications added yet — this section is ready to display real certificates as they're earned.</p>
          </Reveal>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {certifications.map((cert) => (
              <Reveal key={cert.name} className="rounded-2xl border border-border bg-surface p-6">
                <Award size={18} className="text-accent mb-3" />
                <h3 className="font-semibold text-ink mb-1">{cert.name}</h3>
                <p className="text-sm text-muted mb-1">{cert.organization}</p>
                <p className="text-xs text-muted mb-4">{cert.date}</p>
                {cert.credentialId && <p className="text-xs font-mono text-muted mb-3">ID: {cert.credentialId}</p>}
                {cert.verifyUrl && (
                  <a href={cert.verifyUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline">
                    Verify <ExternalLink size={13} />
                  </a>
                )}
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
