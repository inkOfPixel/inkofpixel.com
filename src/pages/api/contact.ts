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

const redirectResponse = (location: string, status = 303) =>
  new Response(null, {
    status,
    headers: {
      Location: location,
      "Cache-Control": "no-store"
    }
  });

export async function POST({ request }: { request: Request }) {
  let payload: Record<string, any> = {};
  const contentType = request.headers.get("content-type") || "";
  const wantsJson = contentType.includes("application/json");
  if (wantsJson) {
    try {
      payload = await request.json();
    } catch {
      return jsonResponse({ error: "Invalid payload" }, 400);
    }
  } else {
    try {
      const form = await request.formData();
      payload = Object.fromEntries(form.entries());
    } catch {
      return jsonResponse({ error: "Invalid payload" }, 400);
    }
  }

  const name = String(payload?.name || "").trim();
  const email = String(payload?.email || "").trim();
  const message = String(payload?.message || "").trim();
  const botField = String(payload?.["bot-field"] || payload?.hp || "").trim();
  const formStart = Number(payload?.formStart || payload?.ts || 0);
  const redirectTarget =
    typeof payload?.redirect === "string" && payload.redirect.trim()
      ? payload.redirect.trim()
      : "/contacts";

  if (botField) {
    return wantsJson
      ? jsonResponse({ ok: true })
      : redirectResponse(`${redirectTarget}?sent=1`);
  }

  if (
    !Number.isFinite(formStart) ||
    Date.now() - formStart < MINIMUM_FORM_TIME_MS
  ) {
    return wantsJson
      ? jsonResponse({ error: "Bot verification failed" }, 400)
      : redirectResponse(`${redirectTarget}?sent=0`);
  }

  if (!name || !email || !message) {
    return wantsJson
      ? jsonResponse({ error: "Missing required fields" }, 400)
      : redirectResponse(`${redirectTarget}?sent=0`);
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return wantsJson
      ? jsonResponse({ error: "Invalid email" }, 400)
      : redirectResponse(`${redirectTarget}?sent=0`);
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return wantsJson
      ? jsonResponse({ error: "Message too long" }, 400)
      : redirectResponse(`${redirectTarget}?sent=0`);
  }

  const apiKey = import.meta.env.RESEND_API_KEY ?? process.env.RESEND_API_KEY;
  const from = import.meta.env.CONTACT_FROM ?? process.env.CONTACT_FROM;
  const to = import.meta.env.CONTACT_TO ?? process.env.CONTACT_TO;

  if (!apiKey || !from || !to) {
    return wantsJson
      ? jsonResponse({ error: "Missing email configuration" }, 500)
      : redirectResponse(`${redirectTarget}?sent=0`);
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
    return wantsJson
      ? jsonResponse({ error: error.message }, 500)
      : redirectResponse(`${redirectTarget}?sent=0`);
  }

  return wantsJson
    ? jsonResponse({ ok: true, id: data?.id })
    : redirectResponse(`${redirectTarget}?sent=1`);
}
