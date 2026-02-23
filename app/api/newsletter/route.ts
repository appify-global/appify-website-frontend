import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_NEWSLETTER_API_KEY;
    const audienceId = process.env.RESEND_AUDIENCE_ID;

    if (!apiKey || !audienceId) {
      console.warn("[Newsletter] RESEND_NEWSLETTER_API_KEY or RESEND_AUDIENCE_ID not set; skipping add.");
      return NextResponse.json(
        { error: "Newsletter signup is not configured. Please try again later." },
        { status: 503 }
      );
    }

    const resend = new Resend(apiKey);
    const { data, error } = await resend.contacts.create({
      audienceId,
      email,
      unsubscribed: false,
    });

    if (error) {
      const msg = typeof error === "object" && error !== null && "message" in error
        ? String((error as { message?: unknown }).message)
        : String(error);
      console.error("[Newsletter] Resend error:", msg, error);
      // Duplicate / already in audience often returns a specific error
      if (msg.toLowerCase().includes("already") || msg.toLowerCase().includes("exist")) {
        return NextResponse.json({ success: true, message: "You're already subscribed." });
      }
      const isDev = process.env.NODE_ENV === "development";
      return NextResponse.json(
        {
          error: isDev ? `Resend: ${msg}` : "Something went wrong. Please try again later.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, message: "Thanks for subscribing!" });
  } catch (e) {
    console.error("[Newsletter] API error:", e);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
