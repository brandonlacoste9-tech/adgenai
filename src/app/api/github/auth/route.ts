import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json(
      { error: "GitHub OAuth not configured. Set GITHUB_CLIENT_ID env var." },
      { status: 500 }
    );
  }

  const url = new URL(req.url);
  const redirectUri = `${url.origin}/api/github/callback`;
  const scope = "repo,user";
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}`;

  return NextResponse.json({ url: authUrl });
}
