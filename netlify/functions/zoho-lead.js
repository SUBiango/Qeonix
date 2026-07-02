// Forwards contact-form submissions to the Zoho Flow webhook (CRM).
// The webhook URL is kept server-side in the ZOHO_FLOW_WEBHOOK_URL env var so
// it is never exposed to the browser. Set it in Netlify:
//   Site settings -> Environment variables -> ZOHO_FLOW_WEBHOOK_URL
const MAX_BODY = 20000; // bytes — reject oversized payloads before parsing

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const webhook = process.env.ZOHO_FLOW_WEBHOOK_URL;
  if (!webhook) {
    return { statusCode: 500, body: "Webhook not configured" };
  }

  if (typeof event.body === "string" && event.body.length > MAX_BODY) {
    return { statusCode: 413, body: "Payload too large" };
  }

  let data;
  try {
    data = JSON.parse(event.body || "{}");
  } catch (e) {
    return { statusCode: 400, body: "Invalid JSON" };
  }
  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    return { statusCode: 400, body: "Invalid payload" };
  }

  // Honeypot: silently accept and drop bot submissions.
  if (data["bot-field"]) {
    return { statusCode: 200, body: "ok" };
  }

  const name = text(data.name, 120);
  const email = text(data.email, 200);
  if (!name) {
    return { statusCode: 400, body: "Name is required" };
  }
  if (!isEmail(email)) {
    return { statusCode: 400, body: "A valid email is required" };
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
      return { statusCode: 502, body: "Upstream error: " + res.status };
    }
    return { statusCode: 200, body: "ok" };
  } catch (e) {
    return { statusCode: 502, body: "Forward failed" };
  }
};

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
