import { NextResponse } from "next/server";
import { storage } from "@/lib/storage";

export async function GET() {
  const token = storage.getGitHubToken();
  if (token) {
    return NextResponse.json({ connected: true, username: token.username, avatarUrl: token.avatarUrl });
  }
  return NextResponse.json({ connected: false });
}
