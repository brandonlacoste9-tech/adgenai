import { NextResponse } from "next/server";
import { storage } from "@/lib/storage";

export async function GET() {
  return NextResponse.json(storage.getSessions());
}

export async function POST(req: Request) {
  const data = await req.json();
  const session = storage.createSession(data);
  return NextResponse.json(session);
}
