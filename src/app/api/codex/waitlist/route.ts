import { NextRequest, NextResponse } from "next/server";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_LIST_ID = process.env.BREVO_CODEX_LIST_ID;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

async function notifyTelegram(message: string): Promise<void> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return;
  try {
    await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          disable_web_page_preview: true,
        }),
      },
    );
  } catch {
    // swallow — primary path is waitlist recording, notification is best-effort
  }
}

async function addToBrevoList(email: string, source: string): Promise<boolean> {
  if (!BREVO_API_KEY || !BREVO_LIST_ID) return false;
  try {
    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": BREVO_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        listIds: [Number(BREVO_LIST_ID)],
        updateEnabled: true,
        attributes: { SOURCE: source, SIGNUP_PAGE: "codex" },
      }),
    });
    return res.ok || res.status === 400; // 400 = already exists, treat as success
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  let body: { email?: string; source?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }
  const email = (body.email ?? "").trim().toLowerCase();
  const source = (body.source ?? "codex").slice(0, 40);

  if (!EMAIL_RE.test(email) || email.length > 200) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const brevoOk = await addToBrevoList(email, source);
  await notifyTelegram(
    `🎯 Codex waitlist signup\nEmail: ${email}\nSource: ${source}\nBrevo: ${brevoOk ? "added" : "skipped"}`,
  );

  return NextResponse.json({ ok: true, brevo: brevoOk });
}
