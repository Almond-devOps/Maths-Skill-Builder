export type Category =
  | "Number Sense"
  | "Operations"
  | "Fractions, Decimals & Percents"
  | "Ratios & Proportions"
  | "Pre-Algebra"
  | "Geometry & Measurement";

export interface Skill {
  id: string;
  label: string;
  category: Category;
  /** Skill ids that must be mastered before this skill can be meaningfully assessed. */
  prerequisites: string[];
  /** One line describing what mastery of this skill looks like. */
  description: string;
}

export type Difficulty = "easy" | "medium" | "hard";

export interface Question {
  id: string;
  skillId: string;
  difficulty: Difficulty;
  prompt: string;
  /** If present, the question is multiple choice. Otherwise it's short-answer. */
  choices?: string[];
  answer: string;
  explanation: string;
}

export interface Attempt {
  questionId: string;
  skillId: string;
  correct: boolean;
}

export type SkillStatus =
  | "mastered"
  | "gap"
  | "blocked"
  | "not-assessed";

export interface DiagnosticState {
  /** Question ids already asked, in order. */
  askedQuestionIds: string[];
  attempts: Attempt[];
  skillStatus: Record<string, SkillStatus>;
}

export interface ScaffoldedLesson {
  skillId: string;
  title: string;
  hook: string;
  buildOnKnown: string;
  newConcept: string;
  workedExample: string;
  guidedPractice: string[];
  independentPractice: string[];
  checkForUnderstanding: string;
}

export interface GapReport {
  mastered: string[];
  gaps: string[];
  blocked: string[];
  notAssessed: string[];
  /**
   * Gaps with no unmastered prerequisite gap beneath them — i.e. the earliest
   * point of breakdown in the learner's foundation. Lessons should start here.
   */
  rootGaps: string[];
}
