import { NextResponse } from "next/server";
import { searchKnowledgeBase } from "@/lib/rag/sap-knowledge-base";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { query } = body;

    const results = searchKnowledgeBase(query || "");

    return NextResponse.json({
      success: true,
      query,
      results
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
