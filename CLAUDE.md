# CLAUDE.md

## Project

QEONIX — a single-page static marketing site (AI · Robotics · Smart Cities).
No build system and no JS framework: pure HTML with inline CSS and vanilla JS.
Deployed on Netlify; production is https://qeonix.com.

## Structure

Only `site/` is published to Netlify (see `netlify.toml` `publish`), so config,
function source, and docs at the repo root are never served.

- `site/index.html` — the site markup (hero, who-we-are, solutions, approach,
  industries, why, FAQ, contact).
- `site/css/styles.css` — all styles. `site/js/main.js` — all behavior (i18n,
  nav, form submit, hero canvas), loaded at the end of `index.html`. Google
  Fonts (Poppins + Cairo) is the only third-party resource.
- `site/images/` — image assets, incl. `social-preview.png` (OG/Twitter card)
  and `favicon/` (favicon set + `site.webmanifest`).
- `site/robots.txt`, `site/sitemap.xml`, `site/llms.txt`.
- `netlify/functions/zoho-lead.mjs` — serverless proxy that forwards contact-form
  submissions to Zoho Flow CRM (webhook URL in the `ZOHO_FLOW_WEBHOOK_URL` env
  var, set per Netlify deploy context).
- `netlify.toml` — functions directory + security headers (CSP, HSTS, etc.).
- `favicon.svg`, `robots.txt`, `sitemap.xml`.

## Brand

- Accent / electric blue `#0206DB` (the "E" bars in the wordmark). Ink `#111110`
  on a near-white `#F8F8FE` background.

## Contact form

- Submits to Netlify Forms (backup record) *and* forwards to Zoho Flow CRM via
  the serverless proxy at `/api/lead`; the inline success state shows if either
  accepts the lead. Honeypot field is `bot-field`.
- Abuse controls in the function: per-IP rate limit (Netlify Blobs, 10/60s,
  fails open) and hCaptcha verification (enforced only when `HCAPTCHA_SECRET` is
  set). The Netlify edge `rateLimit` in the function config is dormant on the
  Free plan and activates on a paid plan.

## Working on this project

- Nothing to build or compile. Serve `site/` as the web root:
  `python3 -m http.server 8000 -d site`, then open http://localhost:8000.
  Assets use absolute paths (`/css`, `/js`, `/images`), so opening
  `site/index.html` directly via `file://` (or serving the repo root) shows no
  styles — it must be served with `site/` as the document root. `netlify dev`
  also serves `site/` (per `netlify.toml`) and runs the CRM function.
- Honor `prefers-reduced-motion` (already handled) when adding animations.
- The language toggle is hidden (English-only) until the Arabic translation
  ships — remove `hidden` from `#langToggle` to restore it.
