import { useEffect, useMemo, useRef, useState } from "react";
import { Play, Pause, SkipForward, RotateCcw } from "lucide-react";
import { sortingAlgorithms, searchingAlgorithms, graphAlgorithms } from "../data/dsa";
import { usePrefersReducedMotion } from "../hooks/useMediaPreferences";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const DEFAULT_ARRAY = [7, 2, 9, 1, 5, 6, 3];
const SORTED_ARRAY = [1, 3, 5, 7, 9, 11, 14];

function ComplexityPanel({ complexity }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {Object.entries(complexity).map(([k, v]) => (
        <div key={k} className="rounded-xl border border-border bg-surface-2 px-3 py-2.5 text-center">
          <div className="text-[10px] uppercase tracking-wider text-muted mb-1">{k}</div>
          <div className="font-mono text-sm font-semibold text-ink">{v}</div>
        </div>
      ))}
    </div>
  );
}

function Controls({ onStart, onPause, onNext, onReset, playing, atEnd }) {
  return (
    <div className="flex items-center gap-2">
      <button onClick={playing ? onPause : onStart} data-cursor="button" className="inline-flex items-center gap-1.5 rounded-full bg-ink text-bg px-4 py-2 text-sm font-semibold hover:opacity-90 transition-opacity focus-ring">
        {playing ? <Pause size={14} /> : <Play size={14} />} {playing ? "Pause" : "Start"}
      </button>
      <button onClick={onNext} disabled={atEnd} data-cursor="button" className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-ink hover:bg-surface-2 transition-colors disabled:opacity-40 focus-ring">
        <SkipForward size={14} /> Next Step
      </button>
      <button onClick={onReset} data-cursor="button" className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-ink hover:bg-surface-2 transition-colors focus-ring">
        <RotateCcw size={14} /> Reset
      </button>
    </div>
  );
}

function useStepPlayer(steps, speed = 500) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timer = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!playing) return;
    if (index >= steps.length - 1) { setPlaying(false); return; }
    timer.current = setTimeout(() => setIndex((i) => Math.min(i + 1, steps.length - 1)), reducedMotion ? 50 : speed);
    return () => clearTimeout(timer.current);
  }, [playing, index, steps.length, speed, reducedMotion]);

  const reset = () => { setPlaying(false); setIndex(0); };
  const next = () => setIndex((i) => Math.min(i + 1, steps.length - 1));

  return { current: steps[index], index, playing, setPlaying, next, reset, atEnd: index >= steps.length - 1 };
}

function Bars({ array, compare = [], found = -1, maxValue }) {
  return (
    <div className="flex items-end justify-center gap-2 h-56 px-4" style={{ perspective: 500 }}>
      {array.map((val, i) => {
        const isCompared = compare.includes(i);
        const isFound = found === i;
        return (
          <div
            key={i}
            className="flex flex-col items-center gap-2 transition-transform duration-200"
            style={{ transform: isCompared ? "rotateX(4deg) translateY(-4px)" : "rotateX(0)" }}
          >
            <div
              className={`w-8 sm:w-10 rounded-t-lg transition-colors duration-200 ${
                isFound ? "bg-emerald" : isCompared ? "bg-accent" : "bg-surface-2 border border-border"
              }`}
              style={{ height: `${(val / maxValue) * 180 + 20}px` }}
            />
            <span className="font-mono text-xs text-muted">{val}</span>
          </div>
        );
      })}
    </div>
  );
}

function SortingPanel() {
  const [algoKey, setAlgoKey] = useState("bubble");
  const algo = sortingAlgorithms[algoKey];
  const steps = useMemo(() => algo.steps(DEFAULT_ARRAY), [algoKey]);
  const player = useStepPlayer(steps);
  const maxValue = Math.max(...DEFAULT_ARRAY);

  useEffect(() => { player.reset(); }, [algoKey]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {Object.entries(sortingAlgorithms).map(([key, a]) => (
          <button
            key={key}
            onClick={() => setAlgoKey(key)}
            data-cursor="button"
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors focus-ring ${
              algoKey === key ? "bg-ink text-bg border-ink" : "border-border text-muted hover:text-ink"
            }`}
          >
            {a.name}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-surface p-6">
        <Bars array={player.current.array} compare={player.current.compare} maxValue={maxValue} />
        <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
          <Controls
            playing={player.playing}
            atEnd={player.atEnd}
            onStart={() => player.setPlaying(true)}
            onPause={() => player.setPlaying(false)}
            onNext={player.next}
            onReset={player.reset}
          />
          <span className="text-xs text-muted">Step {player.index + 1} / {steps.length}{player.current.done ? " — sorted!" : ""}</span>
        </div>
      </div>

      <ComplexityPanel complexity={algo.complexity} />
      <p className="text-sm text-muted leading-relaxed">{algo.explanation}</p>
      <pre className="rounded-xl border border-border bg-surface-2 p-4 overflow-x-auto text-xs font-mono text-ink"><code>{algo.code}</code></pre>
    </div>
  );
}

function SearchingPanel() {
  const [algoKey, setAlgoKey] = useState("linear");
  const algo = searchingAlgorithms[algoKey];
  const array = algoKey === "binary" ? SORTED_ARRAY : DEFAULT_ARRAY;
  const [target, setTarget] = useState(array[3]);
  const steps = useMemo(() => algo.steps(array, Number(target)), [algoKey, target]); // eslint-disable-line react-hooks/exhaustive-deps
  const player = useStepPlayer(steps);
  const maxValue = Math.max(...array);

  useEffect(() => { player.reset(); }, [algoKey, target]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { setTarget(array[3]); }, [algoKey]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        {Object.entries(searchingAlgorithms).map(([key, a]) => (
          <button
            key={key}
            onClick={() => setAlgoKey(key)}
            data-cursor="button"
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors focus-ring ${
              algoKey === key ? "bg-ink text-bg border-ink" : "border-border text-muted hover:text-ink"
            }`}
          >
            {a.name}
          </button>
        ))}
        <label className="ml-auto flex items-center gap-2 text-sm text-muted">
          Target:
          <select value={target} onChange={(e) => setTarget(Number(e.target.value))} className="rounded-lg border border-border bg-surface px-2 py-1 text-ink text-sm focus-ring">
            {array.map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        </label>
      </div>

      {algoKey === "binary" && <p className="text-xs text-muted -mt-2">Binary search requires a sorted array — this array is pre-sorted.</p>}

      <div className="rounded-2xl border border-border bg-surface p-6">
        <Bars array={player.current.array} compare={player.current.compare} found={player.current.found ?? -1} maxValue={maxValue} />
        <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
          <Controls
            playing={player.playing}
            atEnd={player.atEnd}
            onStart={() => player.setPlaying(true)}
            onPause={() => player.setPlaying(false)}
            onNext={player.next}
            onReset={player.reset}
          />
          <span className="text-xs text-muted">
            Step {player.index + 1} / {steps.length}
            {player.current.found >= 0 ? ` — found at index ${player.current.found}` : player.current.done ? " — not found" : ""}
          </span>
        </div>
      </div>

      <ComplexityPanel complexity={algo.complexity} />
      <p className="text-sm text-muted leading-relaxed">{algo.explanation}</p>
      <pre className="rounded-xl border border-border bg-surface-2 p-4 overflow-x-auto text-xs font-mono text-ink"><code>{algo.code}</code></pre>
    </div>
  );
}

const SAMPLE_GRAPH = {
  nodes: [
    { id: "A", x: 60, y: 40 }, { id: "B", x: 180, y: 20 }, { id: "C", x: 300, y: 40 },
    { id: "D", x: 120, y: 130 }, { id: "E", x: 260, y: 130 }, { id: "F", x: 190, y: 200 },
  ],
  edges: [["A", "B"], ["A", "D"], ["B", "C"], ["B", "D"], ["C", "E"], ["D", "F"], ["E", "F"]],
};

function computeGraphOrder(kind) {
  const adjacency = Object.fromEntries(SAMPLE_GRAPH.nodes.map((n) => [n.id, []]));
  SAMPLE_GRAPH.edges.forEach(([a, b]) => { adjacency[a].push(b); adjacency[b].push(a); });

  if (kind === "bfs") {
    const visited = new Set(["A"]);
    const queue = ["A"];
    const order = [];
    while (queue.length) {
      const node = queue.shift();
      order.push(node);
      for (const next of adjacency[node]) {
        if (!visited.has(next)) { visited.add(next); queue.push(next); }
      }
    }
    return order;
  }
  if (kind === "dfs") {
    const visited = new Set();
    const order = [];
    const walk = (node) => {
      visited.add(node);
      order.push(node);
      for (const next of adjacency[node]) if (!visited.has(next)) walk(next);
    };
    walk("A");
    return order;
  }
  // dijkstra: unweighted sample graph, so this shows visit order by shortest hop count
  const dist = { A: 0 };
  const queue = ["A"];
  const order = [];
  const visited = new Set();
  while (queue.length) {
    queue.sort((a, b) => dist[a] - dist[b]);
    const node = queue.shift();
    if (visited.has(node)) continue;
    visited.add(node);
    order.push(node);
    for (const next of adjacency[node]) {
      const nd = dist[node] + 1;
      if (dist[next] === undefined || nd < dist[next]) { dist[next] = nd; queue.push(next); }
    }
  }
  return order;
}

function GraphPanel() {
  const [algoKey, setAlgoKey] = useState("bfs");
  const algo = graphAlgorithms[algoKey];
  const order = useMemo(() => computeGraphOrder(algoKey), [algoKey]);
  const steps = useMemo(() => order.map((_, i) => ({ visited: order.slice(0, i + 1) })), [order]);
  const player = useStepPlayer(steps, 700);

  useEffect(() => { player.reset(); }, [algoKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const visited = player.current?.visited || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {Object.entries(graphAlgorithms).map(([key, a]) => (
          <button
            key={key}
            onClick={() => setAlgoKey(key)}
            data-cursor="button"
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors focus-ring ${
              algoKey === key ? "bg-ink text-bg border-ink" : "border-border text-muted hover:text-ink"
            }`}
          >
            {a.name}
          </button>
        ))}
      </div>
      <p className="text-xs text-muted">
        {algoKey === "dijkstra" ? "Shown on an unweighted sample graph, so it visits in shortest-hop order (each edge has equal weight)." : "Traversal order on a fixed sample graph, starting at node A."}
      </p>

      <div className="rounded-2xl border border-border bg-surface p-6">
        <svg viewBox="0 0 360 240" className="w-full max-w-md mx-auto">
          {SAMPLE_GRAPH.edges.map(([a, b]) => {
            const na = SAMPLE_GRAPH.nodes.find((n) => n.id === a);
            const nb = SAMPLE_GRAPH.nodes.find((n) => n.id === b);
            return <line key={`${a}-${b}`} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke="rgb(var(--border))" strokeWidth="2" />;
          })}
          {SAMPLE_GRAPH.nodes.map((n) => {
            const isVisited = visited.includes(n.id);
            const isCurrent = visited[visited.length - 1] === n.id;
            return (
              <g key={n.id}>
                <circle cx={n.x} cy={n.y} r={isCurrent ? 18 : 15} fill={isVisited ? "rgb(99 179 237)" : "rgb(var(--surface-2))"} stroke="rgb(var(--border))" strokeWidth="2" className="transition-all duration-300" />
                <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill={isVisited ? "#fff" : "rgb(var(--ink))"}>{n.id}</text>
              </g>
            );
          })}
        </svg>
        <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
          <Controls
            playing={player.playing}
            atEnd={player.atEnd}
            onStart={() => player.setPlaying(true)}
            onPause={() => player.setPlaying(false)}
            onNext={player.next}
            onReset={player.reset}
          />
          <span className="text-xs text-muted font-mono">Order: {visited.join(" → ") || "—"}</span>
        </div>
      </div>

      <ComplexityPanel complexity={algo.complexity} />
      <p className="text-sm text-muted leading-relaxed">{algo.explanation}</p>
      <pre className="rounded-xl border border-border bg-surface-2 p-4 overflow-x-auto text-xs font-mono text-ink"><code>{algo.code}</code></pre>
    </div>
  );
}

const TABS = [
  { id: "sorting", label: "Sorting", Panel: SortingPanel },
  { id: "searching", label: "Searching", Panel: SearchingPanel },
  { id: "graphs", label: "Graphs", Panel: GraphPanel },
];

export default function DSAPlayground() {
  const [tab, setTab] = useState("sorting");
  const ActivePanel = TABS.find((t) => t.id === tab).Panel;

  return (
    <section id="dsa" className="section-pad">
      <div className="max-w-content mx-auto px-6 lg:px-8">
        <SectionHeading
          eyebrow="DSA Playground"
          title="Algorithms, visualized"
          description="Step through real implementations — array elements as bars, graph traversal as an animated highlight. Complexity figures are the standard, well-established values."
        />
        <Reveal className="flex gap-2 mb-8">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              data-cursor="button"
              className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-colors focus-ring ${
                tab === t.id ? "bg-accent/10 border-accent text-accent" : "border-border text-muted hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </Reveal>
        <Reveal><ActivePanel /></Reveal>
      </div>
    </section>
  );
}
