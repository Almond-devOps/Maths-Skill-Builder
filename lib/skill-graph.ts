import { Skill } from "./types";

/**
 * The foundational math skill graph. Each skill lists the skills that must
 * already be solid before it can be assessed or taught meaningfully. This is
 * intentionally a starter graph (18 nodes, roughly K-8 foundational math) —
 * extend it with more granular nodes as needed.
 *
 * IMPORTANT: keep this a DAG (no cycles). diagnostic-engine.ts topologically
 * sorts this graph and will throw if a cycle is introduced.
 */
export const SKILL_GRAPH: Skill[] = [
  {
    id: "counting-cardinality",
    label: "Counting & Cardinality",
    category: "Number Sense",
    prerequisites: [],
    description: "Counts objects accurately and connects a count to a quantity.",
  },
  {
    id: "place-value",
    label: "Place Value",
    category: "Number Sense",
    prerequisites: ["counting-cardinality"],
    description: "Understands that a digit's value depends on its position.",
  },
  {
    id: "addition-facts",
    label: "Addition Facts & Strategies",
    category: "Operations",
    prerequisites: ["place-value"],
    description: "Adds single-digit and simple multi-digit numbers fluently.",
  },
  {
    id: "subtraction-facts",
    label: "Subtraction Facts & Strategies",
    category: "Operations",
    prerequisites: ["addition-facts"],
    description: "Subtracts fluently and understands it as addition's inverse.",
  },
  {
    id: "multiplication-facts",
    label: "Multiplication Facts",
    category: "Operations",
    prerequisites: ["addition-facts"],
    description: "Knows multiplication facts and understands repeated addition.",
  },
  {
    id: "division-facts",
    label: "Division Facts",
    category: "Operations",
    prerequisites: ["multiplication-facts"],
    description: "Divides fluently and understands it as multiplication's inverse.",
  },
  {
    id: "multi-digit-arithmetic",
    label: "Multi-Digit Arithmetic",
    category: "Operations",
    prerequisites: ["subtraction-facts", "division-facts"],
    description: "Applies the four operations to multi-digit whole numbers.",
  },
  {
    id: "fractions-basics",
    label: "Fraction Concepts",
    category: "Fractions, Decimals & Percents",
    prerequisites: ["multi-digit-arithmetic"],
    description: "Understands fractions as parts of a whole and compares them.",
  },
  {
    id: "fraction-operations",
    label: "Fraction Operations",
    category: "Fractions, Decimals & Percents",
    prerequisites: ["fractions-basics"],
    description: "Adds, subtracts, multiplies, and divides fractions.",
  },
  {
    id: "decimals",
    label: "Decimal Concepts",
    category: "Fractions, Decimals & Percents",
    prerequisites: ["place-value", "fractions-basics"],
    description: "Reads, writes, and compares decimals; links them to fractions.",
  },
  {
    id: "decimal-operations",
    label: "Decimal Operations",
    category: "Fractions, Decimals & Percents",
    prerequisites: ["decimals", "multi-digit-arithmetic"],
    description: "Adds, subtracts, multiplies, and divides decimals.",
  },
  {
    id: "percentages",
    label: "Percentages",
    category: "Fractions, Decimals & Percents",
    prerequisites: ["fractions-basics", "decimals"],
    description: "Converts between fractions, decimals, and percents; solves percent problems.",
  },
  {
    id: "ratios-proportions",
    label: "Ratios & Proportions",
    category: "Ratios & Proportions",
    prerequisites: ["multiplication-facts", "division-facts", "fractions-basics"],
    description: "Compares quantities with ratios and solves proportional problems.",
  },
  {
    id: "integers-negative-numbers",
    label: "Integers & Negative Numbers",
    category: "Number Sense",
    prerequisites: ["multi-digit-arithmetic"],
    description: "Understands, orders, and operates with positive and negative numbers.",
  },
  {
    id: "basic-algebra-expressions",
    label: "Algebraic Expressions",
    category: "Pre-Algebra",
    prerequisites: ["integers-negative-numbers"],
    description: "Evaluates and simplifies expressions with variables.",
  },
  {
    id: "basic-algebra-equations",
    label: "One- & Two-Step Equations",
    category: "Pre-Algebra",
    prerequisites: ["basic-algebra-expressions"],
    description: "Solves for an unknown using inverse operations.",
  },
  {
    id: "geometry-basics",
    label: "Geometry Basics",
    category: "Geometry & Measurement",
    prerequisites: ["multi-digit-arithmetic"],
    description: "Identifies shapes and finds perimeter, area, and angle basics.",
  },
  {
    id: "measurement-basics",
    label: "Measurement & Units",
    category: "Geometry & Measurement",
    prerequisites: ["multi-digit-arithmetic", "decimals"],
    description: "Measures length, weight, volume, and time, and converts units.",
  },
];

export function getSkill(id: string): Skill {
  const skill = SKILL_GRAPH.find((s) => s.id === id);
  if (!skill) throw new Error(`Unknown skill id: ${id}`);
  return skill;
}
