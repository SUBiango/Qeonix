# CLAUDE.md

## Project

QEONIX — a single-page static "Coming Soon" landing page. No build system and no
JS dependencies/framework. Pure HTML with inline CSS.

## Structure

- `index.html` — the entire page: inline `<style>` in the `<head>`, no JS.
  The only external resource is Google Fonts (Poppins). Headings (`h1`) are
  Poppins 700 at 48px desktop / 32px min on mobile (`clamp(2rem,6vw,3rem)`),
  line-height 1.1.
- `assets/` — image assets.
  - `qeonix-hd-logo.png` — high-res wordmark, used by `index.html` as the hero logo.
  - `qeonix-logo.png` — older logo (includes a tagline); no longer referenced.

## Brand

- Accent color is electric blue `#0a0aff` (the "E" bars in the wordmark);
  ink/text is `#0a0a0f` on a near-white `#fafafb` background.
- Headline: "Live tomorrow, today".

## Working on this project

- Nothing to build or compile. Preview by opening `index.html` in a browser
  (`open index.html`) or serving the directory (`python3 -m http.server`).
- Keep CSS inline in `index.html` to match the single-file approach unless the
  page grows enough to justify splitting it out.
- Honor `prefers-reduced-motion` (already handled) when adding animations.
