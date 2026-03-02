import { NextResponse } from "next/server";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://appifyglobalbackend-production.up.railway.app";

export async function GET() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/news/sitemap.xml`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error("Sitemap fetch failed");
    const xml = await res.text();
    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control":
          "public, max-age=300, stale-while-revalidate=600",
      },
    });
  } catch (e) {
    console.error("Sitemap error:", e);
    return new NextResponse(
      '<?xml version="1.0"?><error>Sitemap unavailable</error>',
      {
        status: 500,
        headers: { "Content-Type": "application/xml" },
      }
    );
  }
}
