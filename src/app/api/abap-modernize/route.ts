import { NextResponse } from "next/server";
import { SAMPLE_ABAP_PROJECTS } from "@/lib/sap/abap-samples";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { programName } = body;

    const sample =
      SAMPLE_ABAP_PROJECTS.find((p) => p.programName === programName) ||
      SAMPLE_ABAP_PROJECTS[0];

    return NextResponse.json({
      success: true,
      analysis: sample
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
