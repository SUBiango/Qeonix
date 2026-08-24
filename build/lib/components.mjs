/* Reusable page sections. Every section is a pure function of (content, lang). */

import { tx, t, esc, cx, lines } from "./html.mjs";
import { icon } from "./icons.mjs";
import { gridfield, markRule } from "./diagrams.mjs";

/* ---------------- primitives ---------------- */

export function section(inner, { id, tone = "light", cls = "", grid = false, wide = false } = {}) {
  return `<section class="${cx("sec", `tone-${tone}`, cls)}"${id ? ` id="${esc(id)}"` : ""}>
  ${grid ? gridfield() : ""}
  <div class="${wide ? "wrap wrap-wide" : "wrap"}">${inner}</div>
</section>`;
}

export function secHead({ kicker, h, lead, align = "start", size = "" }, lang) {
  return `<header class="${cx("sec-head", `al-${align}`, size && `sh-${size}`)} reveal">
    ${kicker ? `<p class="kicker mono">${markRule()}<span>${tx(kicker, lang)}</span></p>` : ""}
    ${h ? `<h2 class="h2">${lines(h, lang)}</h2>` : ""}
    ${lead ? `<p class="lead">${tx(lead, lang)}</p>` : ""}
  </header>`;
}

export function btn(label, href, { kind = "primary", lang = "en", arrow = true, attrs = "" } = {}) {
  return `<a class="btn btn-${kind}" href="${esc(href)}"${attrs ? " " + attrs : ""}>
    <span>${tx(label, lang)}</span>${arrow ? `<span class="btn-arr" aria-hidden="true">${icon("arrow")}</span>` : ""}
  </a>`;
}

/* ---------------- page hero (interior routes) ---------------- */

export function pageHero({ kicker, h, lead, meta = [], cta, crumbs }, lang) {
  return `<section class="phero tone-deep">
  ${gridfield("gf-hero")}
  <div class="wrap">
    ${crumbs || ""}
    <div class="phero-grid">
      <div class="phero-copy">
        <p class="kicker mono reveal">${markRule()}<span>${tx(kicker, lang)}</span></p>
        <h1 class="h1 reveal" data-d="1">${lines(h, lang)}</h1>
        <p class="lead lead-lg reveal" data-d="2">${tx(lead, lang)}</p>
        ${cta ? `<div class="phero-cta reveal" data-d="3">${cta}</div>` : ""}
      </div>
      ${meta.length ? `<ul class="phero-meta reveal" data-d="2">
        ${meta.map((m) => `<li><span class="mono pm-k">${tx(m.k, lang)}</span><span class="pm-v">${tx(m.v, lang)}</span></li>`).join("")}
      </ul>` : ""}
    </div>
  </div>
</section>`;
}

export function breadcrumbs(trail, lang) {
  return `<nav class="crumbs" aria-label="${lang === "ar" ? "مسار التصفح" : "Breadcrumb"}">
    <ol>${trail.map((c, i) => `<li>${c.href
      ? `<a href="${esc(c.href)}">${tx(c.label, lang)}</a>`
      : `<span aria-current="page">${tx(c.label, lang)}</span>`}</li>`).join("")}</ol>
  </nav>`;
}

/* ---------------- capability cards ---------------- */

export function capGrid(items, lang, { cols = 3, tone = "" } = {}) {
  return `<ul class="${cx("capgrid", `cg-${cols}`, tone && `cg-${tone}`)}">
    ${items.map((c, i) => {
      const inner = `
        <span class="cap-ico" aria-hidden="true">${icon(c.icon)}</span>
        <h3 class="cap-h">${tx(c.h, lang)}</h3>
        <p class="cap-p">${tx(c.p, lang)}</p>
        ${c.tags ? `<ul class="cap-tags">${c.tags.map((x) => `<li>${tx(x, lang)}</li>`).join("")}</ul>` : ""}
        ${c.href ? `<span class="cap-go mono" aria-hidden="true">${lang === "ar" ? "استكشاف" : "Explore"} ${icon("arrow")}</span>` : ""}
        <span class="cap-ix mono" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>`;
      return `<li class="cap reveal" data-d="${i % 3}">${c.href
        ? `<a class="cap-in" href="${esc(c.href)}">${inner}</a>`
        : `<div class="cap-in">${inner}</div>`}</li>`;
    }).join("")}
  </ul>`;
}

/* ---------------- feature rows (alternating, image or diagram) ---------------- */

export function featureRow({ kicker, h, p, points = [], media, href, cta, flip }, lang, i = 0) {
  return `<div class="${cx("frow", flip && "is-flip")} reveal" data-d="${i % 2}">
    <div class="frow-copy">
      ${kicker ? `<p class="kicker mono">${markRule()}<span>${tx(kicker, lang)}</span></p>` : ""}
      <h3 class="h3">${tx(h, lang)}</h3>
      <p class="frow-p">${tx(p, lang)}</p>
      ${points.length ? `<ul class="ticks">${points.map((x) => `<li>${icon("check")}<span>${tx(x, lang)}</span></li>`).join("")}</ul>` : ""}
      ${href ? `<p class="frow-cta">${btn(cta || (lang === "ar" ? "تفاصيل أكثر" : "Read more"), href, { kind: "ghost", lang })}</p>` : ""}
    </div>
    <div class="frow-media">${media}</div>
  </div>`;
}

/* ---------------- picture (responsive, art-directed) ---------------- */

export function picture(name, alt, lang, { w = 1200, h = 800, sizes = "(max-width:900px) 100vw, 50vw", cls = "", eager = false } = {}) {
  const base = `/images/${name}`;
  return `<picture class="${cx("pic", cls)}">
    <source type="image/webp" srcset="${base}-640.webp 640w, ${base}-1024.webp 1024w, ${base}-1600.webp 1600w" sizes="${esc(sizes)}">
    <img src="${base}-1024.jpg" width="${w}" height="${h}" alt="${esc(t(alt, lang))}"
      ${eager ? 'fetchpriority="high"' : 'loading="lazy" decoding="async"'}>
  </picture>`;
}

/* ---------------- statement band ---------------- */

export function statement({ text, attribution }, lang) {
  return `<div class="statement reveal">
    <p class="statement-t">${lines(text, lang, "sl")}</p>
    ${attribution ? `<p class="statement-a mono">${tx(attribution, lang)}</p>` : ""}
  </div>`;
}

/* ---------------- pillars ---------------- */

export function pillars(items, lang) {
  return `<ul class="pillars">
    ${items.map((p, i) => `
      <li class="pillar reveal" data-d="${i % 3}">
        <span class="pillar-ix mono">${String(i + 1).padStart(2, "0")}</span>
        <h3 class="pillar-h">${tx(p.h, lang)}</h3>
        <p class="pillar-p">${tx(p.p, lang)}</p>
      </li>`).join("")}
  </ul>`;
}

/* ---------------- fact strip ---------------- */

export function factStrip(facts, lang) {
  return `<ul class="facts reveal">
    ${facts.map((f, i) => `
      <li class="fact" data-d="${i}">
        <span class="fact-k mono">${tx(f.k, lang)}</span>
        <span class="fact-v">${tx(f.v, lang)}</span>
      </li>`).join("")}
  </ul>`;
}

/* ---------------- industries ---------------- */

export function industryGrid(items, lang) {
  return `<ul class="inds">
    ${items.map((s, i) => `
      <li class="ind reveal" data-d="${i % 4}">
        <a class="ind-in" href="${esc(s.href)}">
          <span class="ind-ix mono">${String(i + 1).padStart(2, "0")}</span>
          <span class="ind-ico" aria-hidden="true">${icon(s.icon)}</span>
          <h3 class="ind-h">${tx(s.h, lang)}</h3>
          <p class="ind-p">${tx(s.p, lang)}</p>
          <span class="ind-arr" aria-hidden="true">${icon("arrow")}</span>
        </a>
      </li>`).join("")}
  </ul>`;
}

/* ---------------- FAQ (accessible disclosure) ---------------- */

export function faq(items, lang, idPrefix = "faq") {
  return `<div class="faq reveal">
    ${items.map((f, i) => {
      const id = `${idPrefix}-${i + 1}`;
      return `<div class="faq-item">
        <h3 class="faq-hd">
          <button class="faq-q" type="button" id="${id}-b" aria-expanded="false" aria-controls="${id}-p">
            <span>${tx(f.q, lang)}</span>
            <span class="faq-pm" aria-hidden="true"></span>
          </button>
        </h3>
        <div class="faq-a" id="${id}-p" role="region" aria-labelledby="${id}-b" hidden>
          <p>${tx(f.a, lang)}</p>
        </div>
      </div>`;
    }).join("")}
  </div>`;
}

/* ---------------- trust / sovereign strip ---------------- */

export function trustGrid(items, lang) {
  return `<ul class="trust">
    ${items.map((x, i) => `
      <li class="trust-i reveal" data-d="${i % 3}">
        <span class="trust-ico" aria-hidden="true">${icon(x.icon)}</span>
        <h3 class="trust-h">${tx(x.h, lang)}</h3>
        <p class="trust-p">${tx(x.p, lang)}</p>
      </li>`).join("")}
  </ul>`;
}

/* ---------------- delivery track ---------------- */

export function track(steps, lang) {
  return `<ol class="track reveal">
    ${steps.map((s, i) => `
      <li class="track-s" data-d="${i}">
        <span class="track-ix mono">${String(i + 1).padStart(2, "0")}</span>
        <span class="track-mark" aria-hidden="true"></span>
        <h3 class="track-h">${tx(s.h, lang)}</h3>
        <p class="track-p">${tx(s.p, lang)}</p>
      </li>`).join("")}
  </ol>`;
}

/* ---------------- related routes ---------------- */

export function nextUp(items, lang, heading) {
  return `<div class="nextup reveal">
    <h2 class="nextup-h mono">${tx(heading, lang)}</h2>
    <ul>
      ${items.map((r) => `<li><a href="${esc(r.href)}">
        <span class="nu-k">${tx(r.label, lang)}</span>
        <span class="nu-p">${tx(r.note, lang)}</span>
        <span class="nu-arr" aria-hidden="true">${icon("arrow")}</span>
      </a></li>`).join("")}
    </ul>
  </div>`;
}

/* ---------------- placeholder awaiting approved content ---------------- */

export function approvalSlot(label, lang) {
  return `<div class="slot" data-approval-required="true">
    <span class="mono slot-tag">${lang === "ar" ? "مساحة محجوزة" : "Reserved"}</span>
    <p>${tx(label, lang)}</p>
  </div>`;
}
