import { GapReport as GapReportType, SkillStatus } from "@/lib/types";
import { SKILL_GRAPH } from "@/lib/skill-graph";
import SkillBadge from "./SkillBadge";

interface Props {
  report: GapReportType;
  skillStatus: Record<string, SkillStatus>;
  onSelectLesson: (skillId: string) => void;
}

export default function GapReport({ report, skillStatus, onSelectLesson }: Props) {
  const categories = Array.from(new Set(SKILL_GRAPH.map((s) => s.category)));

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8 rounded-lg border-2 border-redpen/40 bg-redpen-soft/40 p-6">
        <h2 className="mb-2 font-display text-xl text-ink">Where to start</h2>
        {report.rootGaps.length === 0 ? (
          <p className="font-body text-ink-soft">
            No open gaps sit on solid ground yet — nice work, the foundation checks out so far.
          </p>
        ) : (
          <>
            <p className="mb-4 font-body text-sm text-ink-soft">
              These are the earliest points where the foundation actually breaks — every
              prerequisite beneath them is mastered. Start here; everything downstream depends
              on it.
            </p>
            <div className="flex flex-wrap gap-2">
              {report.rootGaps.map((id) => {
                const skill = SKILL_GRAPH.find((s) => s.id === id)!;
                return (
                  <button
                    key={id}
                    onClick={() => onSelectLesson(id)}
                    className="rounded-md border border-redpen bg-white px-4 py-2 font-body text-sm font-medium text-redpen transition hover:bg-redpen hover:text-white"
                  >
                    Build a lesson: {skill.label} →
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>

      <div className="space-y-6">
        {categories.map((category) => (
          <div key={category}>
            <h3 className="mb-2 font-mono text-xs uppercase tracking-wide text-ink-soft">
              {category}
            </h3>
            <div className="space-y-1.5">
              {SKILL_GRAPH.filter((s) => s.category === category).map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-center justify-between rounded-md border border-paper-line bg-white/60 px-3 py-2"
                >
                  <span className="font-body text-sm text-ink">{skill.label}</span>
                  <SkillBadge status={skillStatus[skill.id]} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
