"use client";

import { useState } from "react";
import {
  createDiagnosticState,
  getNextQuestion,
  recordAnswer,
  computeGapReport,
  isComplete,
} from "@/lib/diagnostic-engine";
import { DiagnosticState, Question, ScaffoldedLesson } from "@/lib/types";
import DiagnosticQuiz from "@/components/DiagnosticQuiz";
import GapReport from "@/components/GapReport";
import LessonView from "@/components/LessonView";

type View = "intro" | "quiz" | "report" | "lesson";

export default function Home() {
  const [view, setView] = useState<View>("intro");
  const [state, setState] = useState<DiagnosticState>(() => createDiagnosticState());
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [lesson, setLesson] = useState<ScaffoldedLesson | null>(null);
  const [lessonLoading, setLessonLoading] = useState(false);
  const [lessonError, setLessonError] = useState<string | null>(null);

  function start() {
    const fresh = createDiagnosticState();
    setState(fresh);
    setCurrentQuestion(getNextQuestion(fresh));
    setView("quiz");
  }

  function handleAnswer(correct: boolean) {
    if (!currentQuestion) return;
    const next = recordAnswer(state, currentQuestion, correct);
    setState(next);
    if (isComplete(next)) {
      setView("report");
      setCurrentQuestion(null);
    } else {
      setCurrentQuestion(getNextQuestion(next));
    }
  }

  async function buildLesson(skillId: string) {
    setLessonLoading(true);
    setLessonError(null);
    setView("lesson");
    try {
      const report = computeGapReport(state);
      const res = await fetch("/api/lesson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetSkillId: skillId,
          masteredSkillIds: report.mastered,
          gapSkillIds: [...report.gaps, ...report.blocked],
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate lesson");
      setLesson(data.lesson);
    } catch (err) {
      setLessonError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLessonLoading(false);
    }
  }

  const assessedCount = Object.values(state.skillStatus).filter((s) => s !== "not-assessed")
    .length;

  return (
    <main className="min-h-screen px-6 py-16">
      <header className="mx-auto mb-12 max-w-2xl text-center">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-ink-soft">
          math skills builder
        </p>
        <h1 className="font-display text-4xl italic text-ink">
          Find the gap. Build from there.
        </h1>
      </header>

      {view === "intro" && (
        <div className="mx-auto max-w-md rounded-lg border border-paper-line bg-white/70 p-8 text-center shadow-sm">
          <p className="mb-6 font-body text-ink-soft">
            A short adaptive check walks the foundational math skill tree — counting through
            pre-algebra — and stops testing a branch as soon as it finds where things break
            down. Then it builds a lesson from exactly that point.
          </p>
          <button
            onClick={start}
            className="rounded-md bg-ink px-6 py-3 font-body font-medium text-paper transition hover:bg-ink-soft"
          >
            Start diagnostic
          </button>
        </div>
      )}

      {view === "quiz" && currentQuestion && (
        <DiagnosticQuiz
          question={currentQuestion}
          assessedCount={assessedCount}
          onAnswer={handleAnswer}
        />
      )}

      {view === "report" && (
        <GapReport
          report={computeGapReport(state)}
          skillStatus={state.skillStatus}
          onSelectLesson={buildLesson}
        />
      )}

      {view === "lesson" && (
        <div className="mx-auto max-w-2xl">
          {lessonLoading && (
            <p className="text-center font-mono text-sm text-ink-soft">
              Scaffolding a lesson…
            </p>
          )}
          {lessonError && (
            <div className="rounded-md border border-redpen bg-redpen-soft/40 p-4 text-center">
              <p className="mb-3 font-body text-sm text-redpen">{lessonError}</p>
              <button
                onClick={() => setView("report")}
                className="font-mono text-xs underline decoration-dotted"
              >
                ← back to gap report
              </button>
            </div>
          )}
          {!lessonLoading && !lessonError && lesson && (
            <LessonView lesson={lesson} onBack={() => setView("report")} />
          )}
        </div>
      )}
    </main>
  );
}
