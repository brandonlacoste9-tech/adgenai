import { NextResponse } from "next/server";
import { getGitHubToken } from "@/lib/github-token";

export async function POST(req: Request) {
  const token = await getGitHubToken();
  if (!token) return NextResponse.json({ error: "Not connected" }, { status: 401 });

  const { repoFullName, code, fileName, commitMessage } = await req.json();
  if (!repoFullName || !code) return NextResponse.json({ error: "repoFullName and code required" }, { status: 400 });

  const headers = {
    Authorization: `Bearer ${token.accessToken}`,
    "User-Agent": "adgenai",
    "Content-Type": "application/json",
  };

  const filePath = fileName || "src/Component.tsx";
  const content = Buffer.from(code).toString("base64");

  try {
    // Check if file exists to get sha
    let sha: string | undefined;
    const existRes = await fetch(`https://api.github.com/repos/${repoFullName}/contents/${filePath}`, { headers });
    if (existRes.ok) {
      const existData = (await existRes.json()) as { sha: string };
      sha = existData.sha;
    }

    const pushRes = await fetch(`https://api.github.com/repos/${repoFullName}/contents/${filePath}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({
        message: commitMessage || "Update component from adgenai",
        content,
        ...(sha ? { sha } : {}),
      }),
    });

    if (!pushRes.ok) {
      const pushErr = (await pushRes.json()) as { message?: string };
      return NextResponse.json({ error: pushErr.message || "Failed to push" }, { status: pushRes.status });
    }

    const result = (await pushRes.json()) as { content?: { html_url?: string; sha?: string } };
    return NextResponse.json({
      url: result.content?.html_url || `https://github.com/${repoFullName}`,
      sha: result.content?.sha,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
