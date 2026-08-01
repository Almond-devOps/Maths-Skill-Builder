import { SKILL_GRAPH, getSkill } from "./skill-graph";
import { questionsForSkill } from "./question-bank";
import { Attempt, DiagnosticState, GapReport, Question, SkillStatus } from "./types";

/**
 * Topologically sorts SKILL_GRAPH so prerequisites always precede the
 * skills that depend on them. Throws if the graph has a cycle.
 */
export function topologicalOrder(): string[] {
  const visited = new Set<string>();
  const visiting = new Set<string>();
  const order: string[] = [];

  function visit(id: string) {
    if (visited.has(id)) return;
    if (visiting.has(id)) {
      throw new Error(`Cycle detected in skill graph at "${id}"`);
    }
    visiting.add(id);
    const skill = getSkill(id);
    for (const prereq of skill.prerequisites) visit(prereq);
    visiting.delete(id);
    visited.add(id);
    order.push(id);
  }

  for (const skill of SKILL_GRAPH) visit(skill.id);
  return order;
}

export function createDiagnosticState(): DiagnosticState {
  const skillStatus: Record<string, SkillStatus> = {};
  for (const skill of SKILL_GRAPH) skillStatus[skill.id] = "not-assessed";
  return { askedQuestionIds: [], attempts: [], skillStatus };
}

function attemptsForSkill(state: DiagnosticState, skillId: string): Attempt[] {
  return state.attempts.filter((a) => a.skillId === skillId);
}

/**
 * A skill is "on the frontier" once every prerequisite has a final verdict
 * (mastered or gap/blocked) and the skill itself hasn't been assessed yet.
 * If any prerequisite is a gap, we don't spend questions probing this skill
 * directly — a shaky foundation makes the result unreliable — we mark it
 * "blocked" instead and move on.
 */
function resolveFrontier(state: DiagnosticState): { skillId: string; blocked: boolean } | null {
  for (const skillId of topologicalOrder()) {
    if (state.skillStatus[skillId] !== "not-assessed") continue;
    const skill = getSkill(skillId);
    const prereqStatuses = skill.prerequisites.map((p) => state.skillStatus[p]);
    const allPrereqsResolved = prereqStatuses.every(
      (s) => s === "mastered" || s === "gap" || s === "blocked"
    );
    if (!allPrereqsResolved) continue; // still waiting on an earlier skill
    const hasUnmetPrereq = prereqStatuses.some((s) => s === "gap" || s === "blocked");
    return { skillId, blocked: hasUnmetPrereq };
  }
  return null;
}

/**
 * Returns the next diagnostic question to ask, or null if the diagnostic is
 * complete (every skill is mastered, a gap, or blocked by an earlier gap).
 * Automatically marks blocked skills without spending a question on them.
 */
export function getNextQuestion(state: DiagnosticState): Question | null {
  // Auto-resolve any number of consecutive blocked skills first.
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const frontier = resolveFrontier(state);
    if (!frontier) return null;
    if (frontier.blocked) {
      state.skillStatus[frontier.skillId] = "blocked";
      continue;
    }
    const asked = new Set(state.askedQuestionIds);
    const remaining = questionsForSkill(frontier.skillId).filter((q) => !asked.has(q.id));
    if (remaining.length === 0) {
      // Ran out of items for this skill — decide from what we have.
      finalizeSkill(state, frontier.skillId);
      continue;
    }
    // Ask in increasing difficulty order.
    const order = { easy: 0, medium: 1, hard: 2 } as const;
    remaining.sort((a, b) => order[a.difficulty] - order[b.difficulty]);
    return remaining[0];
  }
}

function finalizeSkill(state: DiagnosticState, skillId: string) {
  const attempts = attemptsForSkill(state, skillId);
  const correct = attempts.filter((a) => a.correct).length;
  state.skillStatus[skillId] = correct * 2 >= attempts.length ? "mastered" : "gap";
}

/**
 * Records an answer and re-evaluates the skill's status: two correct
 * answers in a row calls it mastered early, two incorrect calls it a gap
 * early, otherwise it falls through to finalizeSkill once items run out.
 */
export function recordAnswer(
  state: DiagnosticState,
  question: Question,
  correct: boolean
): DiagnosticState {
  const next: DiagnosticState = {
    askedQuestionIds: [...state.askedQuestionIds, question.id],
    attempts: [...state.attempts, { questionId: question.id, skillId: question.skillId, correct }],
    skillStatus: { ...state.skillStatus },
  };

  const attempts = attemptsForSkill(next, question.skillId);
  const lastTwo = attempts.slice(-2);
  if (lastTwo.length === 2 && lastTwo.every((a) => a.correct)) {
    next.skillStatus[question.skillId] = "mastered";
  } else if (lastTwo.length === 2 && lastTwo.every((a) => !a.correct)) {
    next.skillStatus[question.skillId] = "gap";
  } else if (attempts.length >= questionsForSkill(question.skillId).length) {
    finalizeSkill(next, question.skillId);
  }

  return next;
}

export function computeGapReport(state: DiagnosticState): GapReport {
  const mastered: string[] = [];
  const gaps: string[] = [];
  const blocked: string[] = [];
  const notAssessed: string[] = [];

  for (const skill of SKILL_GRAPH) {
    const status = state.skillStatus[skill.id];
    if (status === "mastered") mastered.push(skill.id);
    else if (status === "gap") gaps.push(skill.id);
    else if (status === "blocked") blocked.push(skill.id);
    else notAssessed.push(skill.id);
  }

  // Root gaps: directly-tested gaps whose prerequisites are all mastered —
  // i.e. the earliest place the learner's foundation actually breaks down.
  // This is where a lesson should start.
  const rootGaps = gaps.filter((id) => {
    const skill = getSkill(id);
    return skill.prerequisites.every((p) => state.skillStatus[p] === "mastered");
  });

  return { mastered, gaps, blocked, notAssessed, rootGaps };
}

export function isComplete(state: DiagnosticState): boolean {
  return Object.values(state.skillStatus).every((s) => s !== "not-assessed");
}
