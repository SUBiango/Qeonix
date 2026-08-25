/* Proof components: metrics, logos, screenshots, quotes.
   POLICY: every component returns "" unless it receives real, approved data.
   Nothing here may render placeholders publicly. Populate only with
   management-approved facts, then wire into the relevant page.

   Usage examples (do not enable without approval):
     metricStrip([{ n: "…", label: T(…), context: T(…) }], lang)
     logoStrip([{ src: "/images/logos/x.svg", name: "…" }], lang)
     screenshotFigure({ src, w, h, caption: T(…), context: T(…) }, lang)
     quoteBlock({ text: T(…), by: T(…), role: T(…), approved: true }, lang)
   Case studies: see build/lib/casestudy.mjs (throws unless approved).      */

import { T, tx, t, esc } from "./html.mjs";

/** Approved metrics: [{ n, label, context? }], where n is the approved figure. */
export function metricStrip(metrics, lang) {
  if (!Array.isArray(metrics) || !metrics.length) return "";
  return `<ul class="metrics reveal">
    ${metrics.map((m, i) => `
      <li class="metric" data-d="${i}">
        <span class="metric-n">${esc(t(m.n, lang))}</span>
        <span class="metric-l">${tx(m.label, lang)}</span>
        ${m.context ? `<span class="metric-c mono">${tx(m.context, lang)}</span>` : ""}
      </li>`).join("")}
  </ul>`;
}

/** Approved reference logos: [{ src, name, href? }]. Monochrome row. */
export function logoStrip(logos, lang, { heading } = {}) {
  if (!Array.isArray(logos) || !logos.length) return "";
  return `<div class="logostrip reveal">
    ${heading ? `<p class="logostrip-h mono">${tx(heading, lang)}</p>` : ""}
    <ul>
      ${logos.map((l) => `<li>${l.href ? `<a href="${esc(l.href)}" rel="noopener">` : ""}
        <img src="${esc(l.src)}" alt="${esc(t(l.name, lang))}" loading="lazy" height="28">
      ${l.href ? "</a>" : ""}</li>`).join("")}
    </ul>
  </div>`;
}

/** Approved product screenshot with caption + context. */
export function screenshotFigure(shot, lang) {
  if (!shot || !shot.src) return "";
  return `<figure class="shot reveal">
    <img src="${esc(shot.src)}" width="${shot.w || 1600}" height="${shot.h || 1000}"
      alt="${esc(t(shot.caption, lang))}" loading="lazy" decoding="async">
    <figcaption>
      <span>${tx(shot.caption, lang)}</span>
      ${shot.context ? `<span class="mono">${tx(shot.context, lang)}</span>` : ""}
    </figcaption>
  </figure>`;
}

/** Approved customer quote. Refuses to render without approval flag. */
export function quoteBlock(q, lang) {
  if (!q || !q.approved || !q.text) return "";
  return `<blockquote class="pquote reveal">
    <p>${tx(q.text, lang)}</p>
    <footer><cite>${tx(q.by, lang)}</cite>${q.role ? `, ${tx(q.role, lang)}` : ""}</footer>
  </blockquote>`;
}
