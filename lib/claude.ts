import Anthropic from "@anthropic-ai/sdk";
import { getSkill } from "./skill-graph";
import { ScaffoldedLesson } from "./types";

const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-5";

export interface LessonRequest {
  targetSkillId: string;
  masteredSkillIds: string[];
  gapSkillIds: string[];
}

function buildPrompt(req: LessonRequest): string {
  const target = getSkill(req.targetSkillId);
  const masteredLabels = req.masteredSkillIds.map((id) => getSkill(id).label);
  const gapLabels = req.gapSkillIds
    .filter((id) => id !== req.targetSkillId)
    .map((id) => getSkill(id).label);

  return `You are a patient, encouraging math tutor writing a scaffolded lesson for a student.

TARGET SKILL TO TEACH: "${target.label}" — ${target.description}

SKILLS THE STUDENT HAS ALREADY DEMONSTRATED MASTERY OF (build on these, reference them explicitly):
${masteredLabels.length ? masteredLabels.map((l) => `- ${l}`).join("\n") : "- (none confirmed yet — start from the most basic footing)"}

OTHER KNOWN GAPS (avoid assuming these, but you don't need to re-teach them here):
${gapLabels.length ? gapLabels.map((l) => `- ${l}`).join("\n") : "- (none)"}

Write a scaffolded lesson using the "I do, we do, you do" gradual-release model. Explicitly bridge from what the student already knows into the new concept before introducing it. Keep language simple and concrete, use real-world framing where it helps, and keep the whole lesson short enough to complete in about 10 minutes.

Respond with ONLY a JSON object (no markdown fences, no preamble) matching exactly this shape:
{
  "title": string,
  "hook": string (one or two sentences, a concrete real-world scenario to open with),
  "buildOnKnown": string (explicitly connects to the mastered skills listed above),
  "newConcept": string (the core explanation of the target skill, plain language),
  "workedExample": string (one fully worked example, step by step),
  "guidedPractice": string[] (2-3 problems the student tries with hints available),
  "independentPractice": string[] (3-4 problems with no hints),
  "checkForUnderstanding": string (one question that reveals whether the concept landed)
}`;
}

export async function generateLesson(req: LessonRequest): Promise<ScaffoldedLesson> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error(
      "ANTHROPIC_API_KEY is not set. Copy .env.example to .env.local and add your key."
    );
  }

  const client = new Anthropic({ apiKey });
  const target = getSkill(req.targetSkillId);

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 1500,
    messages: [{ role: "user", content: buildPrompt(req) }],
  });

  const textBlock = response.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("Claude did not return a text response.");
  }

  const cleaned = textBlock.text.replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(cleaned);

  return {
    skillId: target.id,
    title: parsed.title,
    hook: parsed.hook,
    buildOnKnown: parsed.buildOnKnown,
    newConcept: parsed.newConcept,
    workedExample: parsed.workedExample,
    guidedPractice: parsed.guidedPractice ?? [],
    independentPractice: parsed.independentPractice ?? [],
    checkForUnderstanding: parsed.checkForUnderstanding,
  };
}
