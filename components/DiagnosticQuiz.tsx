"use client";

import { useMemo, useState } from "react";
import { Question } from "@/lib/types";
import { SKILL_GRAPH, getSkill } from "@/lib/skill-graph";

interface Props {
  question: Question;
  assessedCount: number;
  onAnswer: (correct: boolean) => void;
}

export default function DiagnosticQuiz({ question, assessedCount, onAnswer }: Props) {
  const [freeText, setFreeText] = useState("");
  const [feedback, setFeedback] = useState<null | { correct: boolean }>(null);
  const skill = useMemo(() => getSkill(question.skillId), [question.skillId]);
  const total = SKILL_GRAPH.length;

  function submit(value: string) {
    const correct = value.trim().toLowerCase() === question.answer.trim().toLowerCase();
    setFeedback({ correct });
    setTimeout(() => {
      setFeedback(null);
      setFreeText("");
      onAnswer(correct);
    }, 900);
  }

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-4 flex items-center justify-between text-xs font-mono text-ink-soft">
        <span>
          skill {assessedCount + 1} / {total}
        </span>
        <span className="uppercase tracking-wide">{question.difficulty}</span>
      </div>

      <div className="mb-6 h-1.5 w-full rounded-full bg-paper-line/70">
        <div
          className="h-1.5 rounded-full bg-ink transition-all"
          style={{ width: `${(assessedCount / total) * 100}%` }}
        />
      </div>

      <div className="rounded-lg border border-paper-line bg-white/70 p-6 shadow-sm">
        <p className="mb-1 font-mono text-xs uppercase tracking-wide text-ink-soft">
          {skill.category} — {skill.label}
        </p>
        <h2 className="mb-6 font-display text-2xl italic text-ink">{question.prompt}</h2>

        {question.choices ? (
          <div className="grid gap-2">
            {question.choices.map((choice) => (
              <button
                key={choice}
                onClick={() => submit(choice)}
                disabled={feedback !== null}
                className="rounded-md border border-paper-line bg-paper px-4 py-2.5 text-left font-body text-ink transition hover:border-ink hover:bg-white disabled:opacity-60"
              >
                {choice}
              </button>
            ))}
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (freeText.trim()) submit(freeText);
            }}
            className="flex gap-2"
          >
            <input
              autoFocus
              value={freeText}
              onChange={(e) => setFreeText(e.target.value)}
              disabled={feedback !== null}
              placeholder="Your answer"
              className="flex-1 rounded-md border border-paper-line bg-paper px-4 py-2.5 font-mono text-ink outline-none focus:border-ink disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={feedback !== null}
              className="rounded-md bg-ink px-5 py-2.5 font-body font-medium text-paper transition hover:bg-ink-soft disabled:opacity-60"
            >
              Check
            </button>
          </form>
        )}

        {feedback && (
          <p
            className={`mt-4 font-mono text-sm ${
              feedback.correct ? "text-gold" : "text-redpen"
            }`}
          >
            {feedback.correct ? "✓ correct" : `✕ not quite — ${question.explanation}`}
          </p>
        )}
      </div>
    </div>
  );
}
