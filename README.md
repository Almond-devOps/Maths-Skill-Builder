# Math Skills Builder

An agent that diagnoses gaps in foundational math and scaffolds lessons to close them —
starting from wherever a learner's understanding actually breaks down, not from a fixed
grade level.

## Why this is different from a quiz app

Most "adaptive" math tools adjust difficulty within a single topic. This agent reasons over
the *prerequisite structure of math itself*: it won't waste a question testing division if
multiplication facts already came back shaky, and when it finds a gap, it doesn't just flag
it — it walks backward to the **earliest** point the foundation actually breaks, because
that's the only place a lesson can actually stick. The generated lesson is then built
explicitly on the skills that specific learner has already demonstrated, not a generic
explanation.

## Deploying to Vercel

If you see a 404 at your deployed root, it's almost always the **Root Directory** setting.
This repo's `package.json` should be at whatever path you set as Root Directory in
Vercel → Project Settings → General. Set `ANTHROPIC_API_KEY` under Environment Variables
before deploying, or lesson generation will fail (the diagnostic itself doesn't need it).

## How it works

**1. Skill graph.** Foundational math is modeled as a DAG of skills with prerequisites
(`lib/skill-graph.ts`) — counting → place value → the four operations → fractions/decimals/
percents → ratios → pre-algebra → geometry & measurement. 18 nodes out of the box, meant to
be extended.

**2. Adaptive diagnostic.** `lib/diagnostic-engine.ts` walks the graph in topological order.
For each skill on the "frontier" (prerequisites already resolved), it asks up to 3 questions
from `lib/question-bank.ts`, calling mastery early on two-in-a-row correct or two-in-a-row
wrong. If a skill's prerequisite came back as a gap, the skill itself is marked `blocked`
without spending questions on it — an unreliable read on a shaky foundation isn't worth
testing. This is the "diagnoses gaps" half of the brief, and it runs entirely client-side —
no API calls, no server state.

**3. Gap report.** Once every skill is resolved, `computeGapReport` separates skills into
mastered / gap / blocked / not-assessed, and — the important part — surfaces **root gaps**:
gaps whose own prerequisites are all mastered. That's the earliest point where the foundation
actually breaks, and it's the right place to start remediation rather than the first gap
found or the most recently tested one.

**4. Lesson scaffolding.** Picking a root gap calls `POST /api/lesson`, which asks Claude
(`lib/claude.ts`) to write a lesson using the "I do, we do, you do" gradual-release model —
explicitly bridging from the learner's *confirmed* mastered skills into the new concept,
then a worked example, guided practice, independent practice, and a check for understanding.
This is the "scaffolds lessons accordingly" half — the lesson is generated fresh per learner
and per gap, not pulled from a static curriculum.

## Project structure

```
app/
  page.tsx              orchestrates intro → quiz → gap report → lesson
  api/lesson/route.ts   calls Claude to generate a scaffolded lesson
  layout.tsx, globals.css
components/
  DiagnosticQuiz.tsx     one question at a time, adaptive progress bar
  GapReport.tsx          skill graph by status, root gaps highlighted
  LessonView.tsx         renders the generated lesson
  SkillBadge.tsx
lib/
  types.ts               shared domain types
  skill-graph.ts          the prerequisite DAG — EXTEND THIS
  question-bank.ts        diagnostic items — EXTEND THIS
  diagnostic-engine.ts    topological sort, adaptive selection, mastery scoring, gap report
  claude.ts               server-only Anthropic call for lesson generation
```

## Setup

```bash
npm install
cp .env.example .env.local   # add your ANTHROPIC_API_KEY
npm run dev
```

Open http://localhost:3000. The diagnostic itself needs no API key — only lesson generation
does.

## Extending it

- **More items:** `question-bank.ts` ships 3 questions per skill (enough for a mastery call).
  Add more per skill/difficulty for a sturdier read, ideally calibrated against real learner
  data over time.
- **More granular skills:** split any node in `skill-graph.ts` into finer-grained skills —
  the engine only needs a valid DAG (it topologically sorts on every diagnostic and throws on
  a cycle).
- **Persistence:** state currently lives in React state and resets on refresh. To track a
  learner over time, persist `DiagnosticState` and lesson history keyed by learner id.
- **Item response theory:** the mastery rule (2-in-a-row, or majority of items) is a simple
  heuristic. A calibrated IRT or Bayesian knowledge-tracing model would make the diagnostic
  shorter and more accurate as the item bank grows.
- **Multi-turn tutoring:** the lesson is currently one Claude call. A natural next step is a
  chat-style follow-up after independent practice, so the agent can re-diagnose if practice
  answers reveal the lesson didn't land.
