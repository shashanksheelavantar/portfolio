import Reveal from "./Reveal";

export default function SectionHeading({ eyebrow, title, description, align = "left" }) {
  return (
    <Reveal className={`max-w-2xl mb-14 ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-ink mb-4">{title}</h2>
      {description && <p className="text-muted text-base md:text-lg leading-relaxed">{description}</p>}
    </Reveal>
  );
}
