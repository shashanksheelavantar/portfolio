import { GraduationCap, Compass, Target, BookOpen } from "lucide-react";
import { profile, education, interests, currentlyLearning, careerGoals } from "../data/profile";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

function Block({ icon: Icon, title, children }) {
  return (
    <Reveal className="rounded-2xl border border-border bg-surface p-6">
      <div className="w-9 h-9 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-4">
        <Icon size={18} />
      </div>
      <h3 className="font-semibold text-ink mb-2">{title}</h3>
      {children}
    </Reveal>
  );
}

export default function About() {
  return (
    <section id="about" className="section-pad">
      <div className="max-w-content mx-auto px-6 lg:px-8">
        <SectionHeading eyebrow="About" title="A bit about me" description={profile.intro} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Block icon={GraduationCap} title="Education">
            <ul className="space-y-1.5 text-sm text-muted">
              {education.map((e) => (
                <li key={e.degree}>{e.degree}</li>
              ))}
            </ul>
          </Block>

          <Block icon={Compass} title="Development interests">
            <ul className="space-y-1.5 text-sm text-muted">
              {interests.map((i) => <li key={i}>{i}</li>)}
            </ul>
          </Block>

          <Block icon={BookOpen} title="Currently learning">
            <ul className="space-y-1.5 text-sm text-muted">
              {currentlyLearning.map((i) => <li key={i}>{i}</li>)}
            </ul>
          </Block>

          <Block icon={Target} title="Career goals">
            <p className="text-sm text-muted leading-relaxed">{careerGoals}</p>
          </Block>
        </div>
      </div>
    </section>
  );
}
