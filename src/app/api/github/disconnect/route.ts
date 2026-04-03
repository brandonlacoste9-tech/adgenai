import { NextResponse } from "next/server";
import { clearGitHubToken } from "@/lib/github-token";

export async function DELETE() {
  await clearGitHubToken();
  return NextResponse.json({ ok: true });
}
