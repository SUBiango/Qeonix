// Forwards contact-form submissions to the Zoho Flow webhook (CRM).
// The webhook URL is kept server-side in the ZOHO_FLOW_WEBHOOK_URL env var so
// it is never exposed to the browser. Set it in Netlify:
//   Site settings -> Environment variables -> ZOHO_FLOW_WEBHOOK_URL
exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const webhook = process.env.ZOHO_FLOW_WEBHOOK_URL;
  if (!webhook) {
    return { statusCode: 500, body: "Webhook not configured" };
  }

  let data;
  try {
    data = JSON.parse(event.body || "{}");
  } catch (e) {
    return { statusCode: 400, body: "Invalid JSON" };
  }

  // Honeypot: silently accept bot submissions without forwarding.
  if (data["bot-field"]) {
    return { statusCode: 200, body: "ok" };
  }

  const payload = {
    name: data.name || "",
    email: data.email || "",
    phone: data.phone || "",
    company: data.company || "",
    industry: data.industry || "",
    message: data.message || "",
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
