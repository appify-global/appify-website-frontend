import { NextResponse } from "next/server";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://appify-backend-production-5a98.up.railway.app";

export async function GET() {
  const results: Record<string, unknown> = {
    API_BASE_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL ?? "(not set)",
    NEXT_PUBLIC_USE_STATIC_DATA: process.env.NEXT_PUBLIC_USE_STATIC_DATA ?? "(not set)",
  };

  try {
    const start = Date.now();
    const res = await fetch(
      `${API_BASE_URL}/api/news?status=published&limit=3`,
      {
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      }
    );
    const elapsed = Date.now() - start;
    const body = await res.text();

    results.fetchStatus = res.status;
    results.fetchTimeMs = elapsed;
    results.responseLength = body.length;
    results.responsePreview = body.substring(0, 500);
  } catch (err: unknown) {
    results.fetchError = err instanceof Error ? err.message : String(err);
    results.fetchErrorStack = err instanceof Error ? err.stack : undefined;
  }

  return NextResponse.json(results, { status: 200 });
}
