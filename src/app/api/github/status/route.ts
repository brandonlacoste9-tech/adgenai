import { NextResponse } from "next/server";
import { getGitHubToken } from "@/lib/github-token";

export async function GET() {
  const token = await getGitHubToken();
  if (token) {
    return NextResponse.json({ connected: true, username: token.username, avatarUrl: token.avatarUrl });
  }
  return NextResponse.json({ connected: false });
}
