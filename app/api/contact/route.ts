import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export type ContactBody = {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  nda: "yes" | "no";
  message?: string;
};

function validate(body: unknown): body is ContactBody {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.firstName === "string" &&
    b.firstName.trim().length > 0 &&
    typeof b.lastName === "string" &&
    b.lastName.trim().length > 0 &&
    typeof b.email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email.trim()) &&
    (b.company === undefined || typeof b.company === "string") &&
    (b.nda === "yes" || b.nda === "no") &&
    (b.message === undefined || typeof b.message === "string")
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!validate(body)) {
      return NextResponse.json(
        { error: "Invalid or missing fields (firstName, lastName, email, nda required)." },
        { status: 400 }
      );
    }

    const { firstName, lastName, email, company, nda, message } = body as ContactBody;

    const apiKey = process.env.RESEND_API_KEY;
    const toEmailRaw = process.env.CONTACT_TO_EMAIL || process.env.RESEND_TO_EMAIL;
    const toEmails = toEmailRaw
      ? toEmailRaw.split(",").map((e) => e.trim()).filter(Boolean)
      : [];
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

    if (apiKey && toEmails.length > 0) {
      const resend = new Resend(apiKey);

      const text = [
        `First name: ${firstName}`,
        `Last name: ${lastName}`,
        `Email: ${email}`,
        `Company: ${company ?? "(not provided)"}`,
        `NDA: ${nda}`,
        message ? `Message: ${message}` : "",
      ]
        .filter(Boolean)
        .join("\n");

      const { error } = await resend.emails.send({
        from: fromEmail,
        to: toEmails,
        subject: `Inquiry from ${firstName} ${lastName}`,
        text,
        html: `<pre>${text.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre>`,
      });

      if (error) {
        const resendMessage = typeof error === "object" && error !== null && "message" in error
          ? String((error as { message?: unknown }).message)
          : String(error);
        console.error("Resend error:", resendMessage, error);
        const isDev = process.env.NODE_ENV === "development";
        return NextResponse.json(
          {
            error: isDev
              ? `Resend: ${resendMessage}`
              : "Failed to send message. Please try again or email us directly.",
          },
          { status: 502 }
        );
      }
    } else {
      console.log("[Contact form submission]", { firstName, lastName, email, company, nda, message });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Contact API error:", e);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
