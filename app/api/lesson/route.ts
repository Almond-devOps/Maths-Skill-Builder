import { NextRequest, NextResponse } from "next/server";
import { generateLesson, LessonRequest } from "@/lib/claude";

export async function POST(req: NextRequest) {
  let body: LessonRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.targetSkillId) {
    return NextResponse.json({ error: "targetSkillId is required" }, { status: 400 });
  }

  try {
    const lesson = await generateLesson({
      targetSkillId: body.targetSkillId,
      masteredSkillIds: body.masteredSkillIds ?? [],
      gapSkillIds: body.gapSkillIds ?? [],
    });
    return NextResponse.json({ lesson });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to generate lesson";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
