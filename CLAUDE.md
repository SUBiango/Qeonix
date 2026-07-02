# CLAUDE.md

## Project

QEONIX — a single-page static marketing site (AI · Robotics · Smart Cities).
No build system and no JS framework: pure HTML with inline CSS and vanilla JS.
Deployed on Netlify; production is https://qeonix.com.

## Structure

- `index.html` — the whole site (hero, who-we-are, solutions, approach,
  industries, why, FAQ, contact). Inline `<style>` in the `<head>` and inline
  `<script>` before `</body>`. Only external resource is Google Fonts
  (Poppins + Cairo).
- `public/` — image assets referenced by `index.html`.
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

- Nothing to build or compile. Preview by opening `index.html` or serving the
  directory (`python3 -m http.server`); the CRM function needs `netlify dev`.
- Honor `prefers-reduced-motion` (already handled) when adding animations.
- The language toggle is hidden (English-only) until the Arabic translation
  ships — remove `hidden` from `#langToggle` to restore it.
