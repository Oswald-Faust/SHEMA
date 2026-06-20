import { NextRequest, NextResponse } from "next/server";
import { computeScore } from "@/lib/scoring";
import { Answers } from "@/lib/scoring";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const answers: Answers = body.answers;

    if (!answers || typeof answers !== "object") {
      return NextResponse.json({ error: "Réponses invalides" }, { status: 400 });
    }

    const result = computeScore(answers);
    return NextResponse.json({ result });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
