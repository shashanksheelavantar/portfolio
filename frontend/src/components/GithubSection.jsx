import { ExternalLink, GitFork, Star, Users2 } from "lucide-react";
import { useGithubStats } from "../hooks/useGithubStats";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import GithubIcon from "./GithubIcon";

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border border-border bg-surface-2 px-4 py-4 text-center">
      <Icon size={16} className="text-muted mx-auto mb-2" />
      <div className="font-display text-lg font-bold text-ink">{value ?? "—"}</div>
      <div className="text-[11px] text-muted mt-0.5">{label}</div>
    </div>
  );
}

export default function GithubSection() {
  const { data } = useGithubStats();

  return (
    <section id="github" className="section-pad">
      <div className="max-w-content mx-auto px-6 lg:px-8">
        <SectionHeading eyebrow="GitHub" title="Open source & code activity" />

        <Reveal className="rounded-2xl border border-border bg-surface p-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <a href={data.profileUrl} target="_blank" rel="noreferrer" data-cursor="link" className="inline-flex items-center gap-2 font-semibold text-ink hover:text-accent transition-colors">
              <GithubIcon size={18} /> @{data.username} <ExternalLink size={13} />
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
            <StatCard icon={GithubIcon} label="Repositories" value="35" />
            <StatCard icon={Users2} label="Followers" value="1" />
            <StatCard icon={Users2} label="Following" value="2" />
            <StatCard icon={Star} label="Stars" value="0" />
            <StatCard icon={GitFork} label="Forks received" value={data.stats.forksReceived} />
          </div>

          <p className="text-xs text-muted bg-surface-2 border border-border rounded-lg px-3 py-2.5">
            {data.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
