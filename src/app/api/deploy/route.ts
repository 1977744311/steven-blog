import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { secret } = await request.json();

    if (secret !== process.env.DEPLOY_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const hookUrl = process.env.VERCEL_DEPLOY_HOOK;
    if (!hookUrl) {
      return NextResponse.json(
        { error: "Deploy hook not configured" },
        { status: 500 }
      );
    }

    const response = await fetch(hookUrl, { method: "POST" });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to trigger deploy" },
        { status: 502 }
      );
    }

    return NextResponse.json({ message: "Deploy triggered successfully" });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
