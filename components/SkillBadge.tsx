import { SkillStatus } from "@/lib/types";

const STYLES: Record<SkillStatus, string> = {
  mastered: "bg-gold-soft text-ink border-gold",
  gap: "bg-redpen-soft text-redpen border-redpen",
  blocked: "bg-paper-line/60 text-ink-soft border-paper-line",
  "not-assessed": "bg-white text-ink-soft border-paper-line",
};

const LABELS: Record<SkillStatus, string> = {
  mastered: "★ mastered",
  gap: "gap",
  blocked: "blocked by gap",
  "not-assessed": "not yet assessed",
};

export default function SkillBadge({ status }: { status: SkillStatus }) {
  return (
    <span
      className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium font-mono tracking-tight ${STYLES[status]}`}
    >
      {LABELS[status]}
    </span>
  );
}
