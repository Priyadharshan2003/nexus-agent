import { NextResponse } from "next/server";
import { createInitialWorkflow, executeNextStep } from "@/lib/agents/langgraph-runner";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { templateId, prompt, targetSystem, stepIndex } = body;

    let workflow = createInitialWorkflow(
      templateId || "wf_ecc_to_s4_migration",
      prompt,
      targetSystem
    );

    if (stepIndex !== undefined) {
      const stepRes = executeNextStep(workflow, stepIndex);
      return NextResponse.json(stepRes);
    }

    return NextResponse.json({ workflow });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
