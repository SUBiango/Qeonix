// Forwards contact-form submissions to the Zoho Flow webhook (CRM).
// The webhook URL is kept server-side in the ZOHO_FLOW_WEBHOOK_URL env var so
// it is never exposed to the browser. Netlify v2 function: exposed at /api/lead.
// Abuse controls: a per-IP rate limiter (Netlify Blobs, works on all plans) and
// the dormant edge rateLimit in the exported config (activates on a paid plan).
import { getStore } from "@netlify/blobs";

const MAX_BODY = 20000; // bytes — reject oversized payloads before parsing
const RL_WINDOW_MS = 60000; // per-IP window
const RL_MAX = 10; // max requests per window

export default async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const ip =
    req.headers.get("x-nf-client-connection-ip") ||
    (req.headers.get("x-forwarded-for") || "").split(",")[0].trim();
  if (await isRateLimited(ip)) {
    return new Response("Too Many Requests", { status: 429 });
  }

  const webhook = process.env.ZOHO_FLOW_WEBHOOK_URL;
  if (!webhook) {
    return new Response("Webhook not configured", { status: 500 });
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY) {
    return new Response("Payload too large", { status: 413 });
  }

  let data;
  try {
    data = JSON.parse(raw || "{}");
  } catch (e) {
    return new Response("Invalid JSON", { status: 400 });
  }
  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    return new Response("Invalid payload", { status: 400 });
  }

  // Honeypot: silently accept and drop bot submissions.
  if (data["bot-field"]) {
    return new Response("ok", { status: 200 });
  }

  const name = text(data.name, 120);
  const email = text(data.email, 200);
  if (!name) {
    return new Response("Name is required", { status: 400 });
  }
  if (!isEmail(email)) {
    return new Response("A valid email is required", { status: 400 });
  }

  const payload = {
    name,
    email,
    phone: phone(data.phone, 40),
    company: text(data.company, 160),
    industry: text(data.industry, 80),
    message: multiline(data.message, 4000),
    source: "qeonix.com contact form",
    submittedAt: new Date().toISOString(),
  };

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      return new Response("Upstream error: " + res.status, { status: 502 });
    }
    return new Response("ok", { status: 200 });
  } catch (e) {
    return new Response("Forward failed", { status: 502 });
  }
};

// Netlify serves this function at /api/lead and rate-limits it at the edge:
// max 10 requests per 60s per IP (+domain), then 429.
export const config = {
  path: "/api/lead",
  rateLimit: {
    windowSize: 60,
    windowLimit: 10,
    aggregateBy: ["ip", "domain"],
    action: "block",
  },
};

// Per-IP rate limit backed by Netlify Blobs. Best-effort (get/set isn't atomic)
// and fails OPEN — a storage hiccup must never block the contact form.
async function isRateLimited(ip) {
  if (!ip) return false;
  try {
    const store = getStore("contact-ratelimit");
    const key = ip.replace(/[^a-zA-Z0-9:._-]/g, "_");
    const now = Date.now();
    const rec = (await store.get(key, { type: "json" })) || { count: 0, reset: now + RL_WINDOW_MS };
    if (now > rec.reset) {
      rec.count = 0;
      rec.reset = now + RL_WINDOW_MS;
    }
    rec.count += 1;
    await store.setJSON(key, rec);
    return rec.count > RL_MAX;
  } catch (e) {
    return false;
  }
}

// A valid email can't start with a spreadsheet formula character, so this also
// guards the email field against CSV/formula injection.
function isEmail(s) {
  return /^[^\s@=+\-][^\s@]*@[^\s@]+\.[^\s@]+$/.test(s);
}

// Single-line text: strip control chars, collapse whitespace, trim, cap length,
// and neutralize a leading formula character (CSV/formula injection in exports).
function text(v, max) {
  if (v == null) return "";
  let s = String(v).replace(/[\x00-\x1F\x7F]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

// Message: keep newlines but drop other control chars; same formula guard.
function multiline(v, max) {
  if (v == null) return "";
  let s = String(v).replace(/[\x00-\x09\x0B-\x1F\x7F]/g, "").trim().slice(0, max);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

// Phone: keep only phone characters (also prevents formula injection).
function phone(v, max) {
  if (v == null) return "";
  return String(v).replace(/[^\d+()\-\s]/g, "").replace(/\s+/g, " ").trim().slice(0, max);
}
