import { ExternalLink } from "lucide-react";
import { useLeetcodeStats } from "../hooks/useLeetcodeStats";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

function StatCard({ label, value, tone = "default" }) {
  const tones = { default: "text-ink", easy: "text-emerald", medium: "text-amber", hard: "text-coral" };
  return (
    <div className="rounded-xl border border-border bg-surface-2 px-4 py-4 text-center">
      <div className={`font-display text-lg font-bold ${tones[tone]}`}>{value ?? "—"}</div>
      <div className="text-[11px] text-muted mt-0.5">{label}</div>
    </div>
  );
}

export default function LeetcodeSection() {
  const { data } = useLeetcodeStats();

  return (
    <section id="leetcode" className="section-pad">
      <div className="max-w-content mx-auto px-6 lg:px-8">
        <SectionHeading eyebrow="LeetCode" title="DSA practice" />

        <Reveal className="rounded-2xl border border-border bg-surface p-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            {data.profileUrl ? (
              <a href={data.profileUrl} target="_blank" rel="noreferrer" data-cursor="link" className="inline-flex items-center gap-2 font-semibold text-ink hover:text-accent transition-colors">
                LeetCode profile <ExternalLink size={13} />
              </a>
            ) : (
              <span className="text-sm text-muted">LeetCode profile link not added yet</span>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <StatCard label="Total Solved" value={data.stats.totalSolved} />
            <StatCard label="Easy" value={data.stats.easy} tone="easy" />
            <StatCard label="Medium" value={data.stats.medium} tone="medium" />
            <StatCard label="Hard" value={data.stats.hard} tone="hard" />
          </div>

          <p className="text-xs text-muted bg-surface-2 border border-border rounded-lg px-3 py-2.5">
            {data.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
