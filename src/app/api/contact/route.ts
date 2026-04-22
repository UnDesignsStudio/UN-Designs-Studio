import { NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = "un.studio.rs@gmail.com";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "UN Design <onboarding@resend.dev>";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const message = String(body?.message ?? "").trim();
    const honeypot = String(body?.website ?? "");

    // Honeypot — silently succeed on bots
    if (honeypot) {
      return NextResponse.json({ ok: true });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing fields" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email" },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY not set — cannot send email");
      return NextResponse.json(
        { ok: false, error: "Email service not configured" },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New inquiry from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}\n\n— Sent from undesignsstudio.com`,
      html: `
        <div style="font-family: -apple-system, system-ui, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px;">
          <div style="border-left: 3px solid #e8ff00; padding-left: 16px; margin-bottom: 24px;">
            <p style="margin: 0; color: #666; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase;">New inquiry</p>
            <h1 style="margin: 8px 0 0; font-size: 22px;">${escapeHtml(name)}</h1>
            <p style="margin: 4px 0 0; color: #555;"><a href="mailto:${escapeHtml(email)}" style="color: #222;">${escapeHtml(email)}</a></p>
          </div>
          <div style="white-space: pre-wrap; font-size: 15px; line-height: 1.6; color: #1a1a1a;">${escapeHtml(message)}</div>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 32px 0;" />
          <p style="color: #999; font-size: 12px; margin: 0;">Sent from undesignsstudio.com</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { ok: false, error: "Failed to send" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
