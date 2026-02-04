import { Resend } from "resend";

export const prerender = false;

const MINIMUM_FORM_TIME_MS = 1500;
const MAX_MESSAGE_LENGTH = 5000;

const jsonResponse = (body: Record<string, any>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store"
    }
  });

export async function POST({ request }: { request: Request }) {
  let payload: any;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid payload" }, 400);
  }

  const name = String(payload?.name || "").trim();
  const email = String(payload?.email || "").trim();
  const message = String(payload?.message || "").trim();
  const botField = String(payload?.["bot-field"] || "").trim();
  const formStart = Number(payload?.formStart || 0);

  if (botField) {
    return jsonResponse({ ok: true });
  }

  if (
    !Number.isFinite(formStart) ||
    Date.now() - formStart < MINIMUM_FORM_TIME_MS
  ) {
    return jsonResponse({ error: "Bot verification failed" }, 400);
  }

  if (!name || !email || !message) {
    return jsonResponse({ error: "Missing required fields" }, 400);
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonResponse({ error: "Invalid email" }, 400);
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return jsonResponse({ error: "Message too long" }, 400);
  }

  const apiKey = import.meta.env.RESEND_API_KEY ?? process.env.RESEND_API_KEY;
  const from = import.meta.env.CONTACT_FROM ?? process.env.CONTACT_FROM;
  const to = import.meta.env.CONTACT_TO ?? process.env.CONTACT_TO;

  if (!apiKey || !from || !to) {
    return jsonResponse({ error: "Missing email configuration" }, 500);
  }

  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send({
    from,
    to: [to],
    subject: `New contact form submission from ${name}`,
    reply_to: email,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`
  });

  if (error) {
    return jsonResponse({ error: error.message }, 500);
  }

  return jsonResponse({ ok: true, id: data?.id });
}
