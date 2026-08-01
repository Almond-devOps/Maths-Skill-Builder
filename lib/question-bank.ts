import { Question } from "./types";

/**
 * Starter question bank: 3 questions per skill (easy/medium/hard). This is
 * enough for the adaptive engine to make a mastery call per skill and is
 * meant to be extended — add more items per skill/difficulty for a
 * production-grade item bank, ideally with calibrated difficulty.
 */
export const QUESTION_BANK: Question[] = [
  // counting-cardinality
  { id: "cc-1", skillId: "counting-cardinality", difficulty: "easy", prompt: "Count: ●●●●● — how many dots?", answer: "5", explanation: "Counting each dot once gives 5." },
  { id: "cc-2", skillId: "counting-cardinality", difficulty: "medium", prompt: "What number comes right after 39?", answer: "40", explanation: "Counting on by one from 39 gives 40." },
  { id: "cc-3", skillId: "counting-cardinality", difficulty: "hard", prompt: "Which is greater: 47 or 74?", choices: ["47", "74"], answer: "74", explanation: "74 has a 7 in the tens place versus 4 in 47, so 74 is greater." },

  // place-value
  { id: "pv-1", skillId: "place-value", difficulty: "easy", prompt: "In 32, what does the 3 represent?", choices: ["3 ones", "3 tens", "3 hundreds"], answer: "3 tens", explanation: "The 3 is in the tens place, so it represents 30." },
  { id: "pv-2", skillId: "place-value", difficulty: "medium", prompt: "What is the value of the 7 in 4,732?", answer: "700", explanation: "The 7 is in the hundreds place, so it represents 700." },
  { id: "pv-3", skillId: "place-value", difficulty: "hard", prompt: "Write 5 hundreds, 0 tens, 6 ones as a number.", answer: "506", explanation: "5 hundreds + 0 tens + 6 ones = 506." },

  // addition-facts
  { id: "ad-1", skillId: "addition-facts", difficulty: "easy", prompt: "6 + 7 = ?", answer: "13", explanation: "6 + 7 = 13." },
  { id: "ad-2", skillId: "addition-facts", difficulty: "medium", prompt: "48 + 27 = ?", answer: "75", explanation: "48 + 27 = 75 (regroup 8+7=15, carry 1)." },
  { id: "ad-3", skillId: "addition-facts", difficulty: "hard", prompt: "364 + 279 = ?", answer: "643", explanation: "364 + 279 = 643, regrouping twice." },

  // subtraction-facts
  { id: "sb-1", skillId: "subtraction-facts", difficulty: "easy", prompt: "12 - 5 = ?", answer: "7", explanation: "12 - 5 = 7." },
  { id: "sb-2", skillId: "subtraction-facts", difficulty: "medium", prompt: "82 - 37 = ?", answer: "45", explanation: "82 - 37 = 45, regrouping a ten." },
  { id: "sb-3", skillId: "subtraction-facts", difficulty: "hard", prompt: "500 - 268 = ?", answer: "232", explanation: "500 - 268 = 232, regrouping across zeros." },

  // multiplication-facts
  { id: "ml-1", skillId: "multiplication-facts", difficulty: "easy", prompt: "3 x 4 = ?", answer: "12", explanation: "3 groups of 4 is 12." },
  { id: "ml-2", skillId: "multiplication-facts", difficulty: "medium", prompt: "7 x 8 = ?", answer: "56", explanation: "7 x 8 = 56." },
  { id: "ml-3", skillId: "multiplication-facts", difficulty: "hard", prompt: "9 x 12 = ?", answer: "108", explanation: "9 x 12 = 108 (9x10 + 9x2)." },

  // division-facts
  { id: "dv-1", skillId: "division-facts", difficulty: "easy", prompt: "8 ÷ 2 = ?", answer: "4", explanation: "8 split into groups of 2 makes 4 groups." },
  { id: "dv-2", skillId: "division-facts", difficulty: "medium", prompt: "63 ÷ 7 = ?", answer: "9", explanation: "63 ÷ 7 = 9, since 7 x 9 = 63." },
  { id: "dv-3", skillId: "division-facts", difficulty: "hard", prompt: "144 ÷ 12 = ?", answer: "12", explanation: "144 ÷ 12 = 12, since 12 x 12 = 144." },

  // multi-digit-arithmetic
  { id: "md-1", skillId: "multi-digit-arithmetic", difficulty: "easy", prompt: "123 + 456 = ?", answer: "579", explanation: "Add each place value: 579." },
  { id: "md-2", skillId: "multi-digit-arithmetic", difficulty: "medium", prompt: "34 x 6 = ?", answer: "204", explanation: "34 x 6 = 204 (30x6=180, 4x6=24, 180+24=204)." },
  { id: "md-3", skillId: "multi-digit-arithmetic", difficulty: "hard", prompt: "252 ÷ 6 = ?", answer: "42", explanation: "252 ÷ 6 = 42, since 6 x 42 = 252." },

  // fractions-basics
  { id: "fr-1", skillId: "fractions-basics", difficulty: "easy", prompt: "A pizza is cut into 4 equal slices, you eat 1. What fraction did you eat?", answer: "1/4", explanation: "1 slice out of 4 equal slices is 1/4." },
  { id: "fr-2", skillId: "fractions-basics", difficulty: "medium", prompt: "Which is bigger: 3/4 or 2/3?", choices: ["3/4", "2/3"], answer: "3/4", explanation: "3/4 = 0.75 and 2/3 ≈ 0.67, so 3/4 is bigger." },
  { id: "fr-3", skillId: "fractions-basics", difficulty: "hard", prompt: "Simplify 8/12 to lowest terms.", answer: "2/3", explanation: "Divide numerator and denominator by their GCF, 4, to get 2/3." },

  // fraction-operations
  { id: "fo-1", skillId: "fraction-operations", difficulty: "easy", prompt: "1/4 + 1/4 = ?", answer: "1/2", explanation: "1/4 + 1/4 = 2/4 = 1/2." },
  { id: "fo-2", skillId: "fraction-operations", difficulty: "medium", prompt: "1/2 + 1/3 = ?", answer: "5/6", explanation: "Common denominator 6: 3/6 + 2/6 = 5/6." },
  { id: "fo-3", skillId: "fraction-operations", difficulty: "hard", prompt: "2/3 x 3/4 = ?", answer: "1/2", explanation: "(2x3)/(3x4) = 6/12 = 1/2." },

  // decimals
  { id: "dc-1", skillId: "decimals", difficulty: "easy", prompt: "Write one half as a decimal.", answer: "0.5", explanation: "1/2 = 0.5." },
  { id: "dc-2", skillId: "decimals", difficulty: "medium", prompt: "Which is greater: 0.45 or 0.5?", choices: ["0.45", "0.5"], answer: "0.5", explanation: "0.5 = 0.50, which is greater than 0.45." },
  { id: "dc-3", skillId: "decimals", difficulty: "hard", prompt: "Write 3/8 as a decimal.", answer: "0.375", explanation: "3 ÷ 8 = 0.375." },

  // decimal-operations
  { id: "do-1", skillId: "decimal-operations", difficulty: "easy", prompt: "0.4 + 0.3 = ?", answer: "0.7", explanation: "0.4 + 0.3 = 0.7." },
  { id: "do-2", skillId: "decimal-operations", difficulty: "medium", prompt: "1.25 - 0.6 = ?", answer: "0.65", explanation: "1.25 - 0.60 = 0.65." },
  { id: "do-3", skillId: "decimal-operations", difficulty: "hard", prompt: "2.5 x 0.4 = ?", answer: "1", explanation: "2.5 x 0.4 = 1.0." },

  // percentages
  { id: "pc-1", skillId: "percentages", difficulty: "easy", prompt: "What is 50% of 20?", answer: "10", explanation: "50% is half, so half of 20 is 10." },
  { id: "pc-2", skillId: "percentages", difficulty: "medium", prompt: "What is 25% of 60?", answer: "15", explanation: "25% is a quarter; 60 ÷ 4 = 15." },
  { id: "pc-3", skillId: "percentages", difficulty: "hard", prompt: "A $80 jacket is 15% off. What is the sale price?", answer: "68", explanation: "15% of 80 is 12; 80 - 12 = 68." },

  // ratios-proportions
  { id: "rp-1", skillId: "ratios-proportions", difficulty: "easy", prompt: "A recipe uses 2 cups flour for 1 cup sugar. What's the ratio of flour to sugar?", answer: "2:1", explanation: "2 cups flour to 1 cup sugar is a 2:1 ratio." },
  { id: "rp-2", skillId: "ratios-proportions", difficulty: "medium", prompt: "If 3 pencils cost $1.50, how much do 5 pencils cost?", answer: "2.50", explanation: "Each pencil is $0.50, so 5 pencils cost $2.50." },
  { id: "rp-3", skillId: "ratios-proportions", difficulty: "hard", prompt: "Solve the proportion: 4/5 = x/20", answer: "16", explanation: "20 ÷ 5 = 4, so x = 4 x 4 = 16." },

  // integers-negative-numbers
  { id: "ig-1", skillId: "integers-negative-numbers", difficulty: "easy", prompt: "Which is colder: -5°F or 3°F?", choices: ["-5°F", "3°F"], answer: "-5°F", explanation: "-5 is less than 3, so it's colder." },
  { id: "ig-2", skillId: "integers-negative-numbers", difficulty: "medium", prompt: "-3 + 7 = ?", answer: "4", explanation: "Starting at -3 and moving up 7 lands on 4." },
  { id: "ig-3", skillId: "integers-negative-numbers", difficulty: "hard", prompt: "-8 - (-3) = ?", answer: "-5", explanation: "Subtracting a negative is the same as adding: -8 + 3 = -5." },

  // basic-algebra-expressions
  { id: "ae-1", skillId: "basic-algebra-expressions", difficulty: "easy", prompt: "If x = 3, what is x + 5?", answer: "8", explanation: "3 + 5 = 8." },
  { id: "ae-2", skillId: "basic-algebra-expressions", difficulty: "medium", prompt: "Simplify: 2x + 3x", answer: "5x", explanation: "Combine like terms: 2x + 3x = 5x." },
  { id: "ae-3", skillId: "basic-algebra-expressions", difficulty: "hard", prompt: "Simplify: 4x + 3 - x + 5", answer: "3x + 8", explanation: "Combine x terms (4x - x = 3x) and constants (3 + 5 = 8)." },

  // basic-algebra-equations
  { id: "eq-1", skillId: "basic-algebra-equations", difficulty: "easy", prompt: "Solve: x + 4 = 9", answer: "5", explanation: "Subtract 4 from both sides: x = 5." },
  { id: "eq-2", skillId: "basic-algebra-equations", difficulty: "medium", prompt: "Solve: 3x = 21", answer: "7", explanation: "Divide both sides by 3: x = 7." },
  { id: "eq-3", skillId: "basic-algebra-equations", difficulty: "hard", prompt: "Solve: 2x + 5 = 17", answer: "6", explanation: "Subtract 5 (2x = 12), then divide by 2: x = 6." },

  // geometry-basics
  { id: "gm-1", skillId: "geometry-basics", difficulty: "easy", prompt: "How many sides does a triangle have?", answer: "3", explanation: "A triangle has 3 sides by definition." },
  { id: "gm-2", skillId: "geometry-basics", difficulty: "medium", prompt: "What is the perimeter of a rectangle 5cm by 3cm?", answer: "16", explanation: "Perimeter = 2(5+3) = 16 cm." },
  { id: "gm-3", skillId: "geometry-basics", difficulty: "hard", prompt: "What is the area of a rectangle 7cm by 4cm?", answer: "28", explanation: "Area = length x width = 7 x 4 = 28 cm²." },

  // measurement-basics
  { id: "ms-1", skillId: "measurement-basics", difficulty: "easy", prompt: "How many minutes are in an hour?", answer: "60", explanation: "An hour has 60 minutes." },
  { id: "ms-2", skillId: "measurement-basics", difficulty: "medium", prompt: "How many centimeters are in 1 meter?", answer: "100", explanation: "1 meter = 100 centimeters." },
  { id: "ms-3", skillId: "measurement-basics", difficulty: "hard", prompt: "A recipe needs 750 mL of milk. How many liters is that?", answer: "0.75", explanation: "750 mL ÷ 1000 = 0.75 L." },
];

export function questionsForSkill(skillId: string): Question[] {
  return QUESTION_BANK.filter((q) => q.skillId === skillId);
}
