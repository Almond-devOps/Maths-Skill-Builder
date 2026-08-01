"use client";

import { useMemo } from "react";
import { SKILL_GRAPH, getSkillDepths } from "@/lib/skill-graph";
import { SkillStatus } from "@/lib/types";

interface Props {
  skillStatus: Record<string, SkillStatus>;
  activeSkillId?: string | null;
  onSelect?: (skillId: string) => void;
  selectable?: (skillId: string) => boolean;
}

const NODE_R = 16;
const COL_W = 128;
const ROW_H = 88;
const PAD = 56;

const FILL: Record<SkillStatus, string> = {
  mastered: "#C89A3A",
  gap: "#F3D9D5",
  blocked: "#EAE6D8",
  "not-assessed": "#FFFFFF",
};
const STROKE: Record<SkillStatus, string> = {
  mastered: "#8A6A22",
  gap: "#C0392B",
  blocked: "#B8B29C",
  "not-assessed": "#B8B29C",
};

export default function SkillMap({ skillStatus, activeSkillId, onSelect, selectable }: Props) {
  const layout = useMemo(() => {
    const depths = getSkillDepths();
    const byCol: Record<number, string[]> = {};
    for (const skill of SKILL_GRAPH) {
      const d = depths[skill.id];
      (byCol[d] ||= []).push(skill.id);
    }
    const maxCol = Math.max(...Object.keys(byCol).map(Number));
    const maxRows = Math.max(...Object.values(byCol).map((c) => c.length));

    const pos: Record<string, { x: number; y: number }> = {};
    for (const [colStr, ids] of Object.entries(byCol)) {
      const col = Number(colStr);
      const rows = ids.length;
      const offset = ((maxRows - rows) * ROW_H) / 2;
      ids.forEach((id, i) => {
        pos[id] = {
          x: PAD + col * COL_W,
          y: PAD + offset + i * ROW_H,
        };
      });
    }

    return {
      pos,
      width: PAD * 2 + maxCol * COL_W,
      height: PAD * 2 + (maxRows - 1) * ROW_H,
    };
  }, []);

  return (
    <svg
      viewBox={`0 0 ${layout.width} ${layout.height}`}
      className="w-full"
      role="img"
      aria-label="Skill prerequisite map"
    >
      {/* edges */}
      {SKILL_GRAPH.flatMap((skill) =>
        skill.prerequisites.map((prereqId) => {
          const a = layout.pos[prereqId];
          const b = layout.pos[skill.id];
          const prereqGap =
            skillStatus[prereqId] === "gap" || skillStatus[prereqId] === "blocked";
          return (
            <line
              key={`${prereqId}->${skill.id}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={prereqGap ? "#C0392B" : "#B8B29C"}
              strokeWidth={prereqGap ? 1.5 : 1}
              strokeDasharray={prereqGap ? "3 3" : "2 4"}
              opacity={0.7}
            />
          );
        })
      )}

      {/* nodes */}
      {SKILL_GRAPH.map((skill) => {
        const p = layout.pos[skill.id];
        const status = skillStatus[skill.id];
        const isActive = skill.id === activeSkillId;
        const canSelect = selectable?.(skill.id) ?? false;
        return (
          <g
            key={skill.id}
            transform={`translate(${p.x}, ${p.y})`}
            onClick={() => canSelect && onSelect?.(skill.id)}
            className={canSelect ? "cursor-pointer" : ""}
          >
            <title>
              {skill.label} — {status.replace("-", " ")}
            </title>
            {isActive && (
              <circle r={NODE_R + 6} fill="none" stroke="#2B3A67" strokeWidth={1.5}>
                <animate
                  attributeName="r"
                  values={`${NODE_R + 4};${NODE_R + 9};${NODE_R + 4}`}
                  dur="1.6s"
                  repeatCount="indefinite"
                />
                <animate attributeName="opacity" values="0.6;0.1;0.6" dur="1.6s" repeatCount="indefinite" />
              </circle>
            )}
            <circle
              r={NODE_R}
              fill={FILL[status]}
              stroke={STROKE[status]}
              strokeWidth={status === "not-assessed" ? 1.25 : 1.75}
              strokeDasharray={status === "not-assessed" ? "3 2" : undefined}
              className={canSelect ? "transition hover:opacity-80" : ""}
            />
            {status === "mastered" && (
              <text
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="14"
                fill="#5A4415"
              >
                ★
              </text>
            )}
            {status === "gap" && (
              <text
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="13"
                fill="#C0392B"
                fontWeight={600}
              >
                ✕
              </text>
            )}
            <text
              y={NODE_R + 16}
              textAnchor="middle"
              fontSize="10.5"
              fontFamily="var(--font-body)"
              fill="#5A6690"
            >
              {skill.label.length > 16 ? skill.label.slice(0, 15) + "…" : skill.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
