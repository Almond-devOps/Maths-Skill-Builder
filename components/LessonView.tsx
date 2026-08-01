import { ScaffoldedLesson } from "@/lib/types";

interface Props {
  lesson: ScaffoldedLesson;
  onBack: () => void;
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <p className="mb-1.5 font-mono text-xs uppercase tracking-wide text-ink-soft">{label}</p>
      <div className="font-body text-ink leading-relaxed">{children}</div>
    </div>
  );
}

export default function LessonView({ lesson, onBack }: Props) {
  return (
    <div className="mx-auto max-w-2xl">
      <button
        onClick={onBack}
        className="mb-4 font-mono text-xs text-ink-soft underline decoration-dotted hover:text-ink"
      >
        ← back to gap report
      </button>

      <div className="rounded-lg border border-paper-line bg-white/70 p-8 shadow-sm">
        <p className="mb-1 font-mono text-xs uppercase tracking-wide text-gold">
          scaffolded lesson
        </p>
        <h1 className="mb-6 font-display text-3xl italic text-ink">{lesson.title}</h1>

        <Section label="Hook">{lesson.hook}</Section>
        <Section label="Building on what you know">{lesson.buildOnKnown}</Section>
        <Section label="New concept">{lesson.newConcept}</Section>
        <Section label="Worked example (I do)">
          <pre className="whitespace-pre-wrap font-mono text-sm text-ink">
            {lesson.workedExample}
          </pre>
        </Section>
        <Section label="Guided practice (we do)">
          <ol className="list-decimal space-y-1 pl-5">
            {lesson.guidedPractice.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ol>
        </Section>
        <Section label="Independent practice (you do)">
          <ol className="list-decimal space-y-1 pl-5">
            {lesson.independentPractice.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ol>
        </Section>
        <div className="rounded-md border border-gold bg-gold-soft/50 p-4">
          <p className="mb-1 font-mono text-xs uppercase tracking-wide text-ink-soft">
            Check for understanding
          </p>
          <p className="font-body text-ink">{lesson.checkForUnderstanding}</p>
        </div>
      </div>
    </div>
  );
}
