import { NextResponse } from "next/server";
import { storage } from "@/lib/storage";

export async function DELETE() {
  storage.clearGitHubToken();
  return NextResponse.json({ ok: true });
}
