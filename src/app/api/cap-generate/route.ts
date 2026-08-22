import { NextResponse } from "next/server";
import { CAP_STARTER_PROJECTS } from "@/lib/sap/cap-templates";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { projectId } = body;

    const project =
      CAP_STARTER_PROJECTS[projectId] || CAP_STARTER_PROJECTS.leave_management;

    return NextResponse.json({
      success: true,
      project
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
