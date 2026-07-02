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
- `site/images/` — image assets referenced by the HTML/CSS.
- `site/favicon.svg`, `site/robots.txt`, `site/sitemap.xml`.
- `netlify/functions/zoho-lead.js` — serverless proxy that forwards contact-form
  submissions to Zoho Flow CRM (webhook URL in the `ZOHO_FLOW_WEBHOOK_URL` env
  var, set per Netlify deploy context).
- `netlify.toml` — functions directory + security headers (CSP, HSTS, etc.).
- `favicon.svg`, `robots.txt`, `sitemap.xml`.

## Brand

- Accent / electric blue `#0206DB` (the "E" bars in the wordmark). Ink `#111110`
  on a near-white `#F8F8FE` background.

## Contact form

- Submits to Netlify Forms (backup record) *and* forwards to Zoho Flow CRM via
  the serverless proxy; the inline success state shows if either accepts the
  lead. Honeypot field is `bot-field`.

## Working on this project

- Nothing to build or compile. Preview by opening `site/index.html` or serving
  `site/` (`python3 -m http.server -d site`); the CRM function needs
  `netlify dev` (which serves `site/` per `netlify.toml`).
- Honor `prefers-reduced-motion` (already handled) when adding animations.
- The language toggle is hidden (English-only) until the Arabic translation
  ships — remove `hidden` from `#langToggle` to restore it.
