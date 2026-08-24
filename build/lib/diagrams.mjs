/* System diagrams.
   Deliberate choice: everything that carries words is HTML, not SVG. HTML
   reflows on a 375px phone, mirrors correctly under dir="rtl", stays
   translatable, and is readable by a screen reader. SVG is used only for the
   connective tissue and the hero artwork, where geometry is the content.
   All animation lives in qeonix.css (the CSP forbids inline <style>). */

import { tx, t, esc, map } from "./html.mjs";
import { icon } from "./icons.mjs";

/* ------------------------------------------------------------------
   HERO — "intelligence lattice"
   A deliberate topology, not a particle soup: a core, an orbit of
   specialised nodes, and signals travelling the edges between them.
   ------------------------------------------------------------------ */
const LATTICE_NODES = [
  { x: 500, y: 130, r: 5, k: "s" }, { x: 715, y: 205, r: 7, k: "m" },
  { x: 812, y: 400, r: 5, k: "s" }, { x: 760, y: 620, r: 8, k: "l" },
  { x: 585, y: 762, r: 5, k: "s" }, { x: 372, y: 790, r: 7, k: "m" },
  { x: 196, y: 668, r: 5, k: "s" }, { x: 128, y: 462, r: 8, k: "l" },
  { x: 208, y: 258, r: 5, k: "s" }, { x: 352, y: 148, r: 6, k: "m" },
  { x: 470, y: 330, r: 4, k: "s" }, { x: 640, y: 420, r: 5, k: "m" },
  { x: 540, y: 585, r: 4, k: "s" }, { x: 330, y: 500, r: 5, k: "m" },
  { x: 405, y: 655, r: 4, k: "s" },
];

const LATTICE_EDGES = [
  [0, 9], [9, 8], [8, 7], [7, 6], [6, 5], [5, 4], [4, 3], [3, 2], [2, 1], [1, 0],
  [10, 11], [11, 12], [12, 14], [14, 13], [13, 10],
  [0, 10], [1, 11], [3, 12], [5, 14], [7, 13], [9, 10], [11, 2], [12, 4], [13, 6], [14, 5],
];

const LATTICE_SIGNALS = [
  "M352 148 L470 330 L640 420 L760 620",
  "M128 462 L330 500 L540 585 L585 762",
  "M715 205 L640 420 L405 655 L372 790",
  "M208 258 L470 330 L540 585 L760 620",
];

export function heroLattice() {
  const pt = (i) => LATTICE_NODES[i];
  const edges = LATTICE_EDGES.map(([a, b]) => {
    const p = pt(a), q = pt(b);
    return `<line x1="${p.x}" y1="${p.y}" x2="${q.x}" y2="${q.y}" />`;
  }).join("");

  const nodes = LATTICE_NODES.map((n, i) =>
    `<circle class="lat-n lat-${n.k}" data-d="${i % 8}" cx="${n.x}" cy="${n.y}" r="${n.r}" />`
  ).join("");

  const halos = LATTICE_NODES.filter((n) => n.k === "l").map((n, i) =>
    `<circle class="lat-halo" data-d="${i}" cx="${n.x}" cy="${n.y}" r="${n.r}" />`
  ).join("");

  const signals = LATTICE_SIGNALS.map((d, i) =>
    `<path class="lat-sig" data-d="${i}" d="${d}" />`
  ).join("");

  return `
<div class="lattice" aria-hidden="true">
  <svg class="lattice-svg" viewBox="0 0 940 940" preserveAspectRatio="xMidYMid meet" focusable="false">
    <defs>
      <radialGradient id="latCore" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="var(--accent)" stop-opacity=".30"/>
        <stop offset="55%" stop-color="var(--accent)" stop-opacity=".07"/>
        <stop offset="100%" stop-color="var(--accent)" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="latRing" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="var(--accent)" stop-opacity=".45"/>
        <stop offset="50%" stop-color="var(--accent)" stop-opacity=".05"/>
        <stop offset="100%" stop-color="var(--accent)" stop-opacity=".35"/>
      </linearGradient>
    </defs>

    <circle class="lat-glow" cx="470" cy="470" r="430" fill="url(#latCore)"/>

    <g class="lat-rings">
      <circle class="lat-ring lat-ring-1" cx="470" cy="470" r="404" stroke="url(#latRing)"/>
      <circle class="lat-ring lat-ring-2" cx="470" cy="470" r="318"/>
      <circle class="lat-ring lat-ring-3" cx="470" cy="470" r="196"/>
    </g>

    <g class="lat-edges">${edges}</g>
    <g class="lat-signals">${signals}</g>
    <g class="lat-halos">${halos}</g>
    <g class="lat-nodes">${nodes}</g>

    <g class="lat-core">
      <circle cx="470" cy="470" r="58" class="lat-core-disc"/>
      <g class="lat-core-mark">
        <rect x="446" y="454" width="48" height="6" rx="3"/>
        <rect x="446" y="467" width="34" height="6" rx="3"/>
        <rect x="446" y="480" width="48" height="6" rx="3"/>
      </g>
    </g>

    <g class="lat-ticks">
      <path d="M470 22v34M470 884v34M22 470h34M884 470h34"/>
    </g>
  </svg>
</div>`;
}

/* ------------------------------------------------------------------
   FLOW — vertical value chain (DATA -> ... -> OUTCOME)
   steps: [{ k: 'DATA', label, note, icon }]
   ------------------------------------------------------------------ */
export function flowStack(steps, lang, { id = "flow", dense = false } = {}) {
  const rows = steps.map((s, i) => `
    <li class="flow-step${dense ? " is-dense" : ""}" data-d="${i}">
      <div class="flow-rail" aria-hidden="true"><span class="flow-dot"></span><span class="flow-line"></span></div>
      <div class="flow-body">
        <div class="flow-head">
          <span class="flow-ix mono">${String(i + 1).padStart(2, "0")}</span>
          <h3 class="flow-key">${tx(s.label, lang)}</h3>
        </div>
        ${s.note ? `<p class="flow-note">${tx(s.note, lang)}</p>` : ""}
      </div>
      ${s.icon ? `<div class="flow-ico" aria-hidden="true">${icon(s.icon)}</div>` : ""}
    </li>`).join("");

  return `<ol class="flow reveal" id="${esc(id)}">${rows}</ol>`;
}

/* ------------------------------------------------------------------
   ARCHITECTURE BOARD — labelled bands of chips, connected by rails.
   bands: [{ label, note, tone, items: [string] }]
   Reads as a real architecture diagram and survives 375px + RTL.
   ------------------------------------------------------------------ */
export function archBoard(bands, lang, { id = "arch", legend } = {}) {
  const rows = bands.map((b, i) => `
    <div class="arch-band${b.tone ? " tone-" + b.tone : ""}" data-d="${i}">
      <div class="arch-meta">
        <span class="arch-ix mono">${String(i + 1).padStart(2, "0")}</span>
        <h3 class="arch-label">${tx(b.label, lang)}</h3>
        ${b.note ? `<p class="arch-note">${tx(b.note, lang)}</p>` : ""}
      </div>
      <ul class="arch-chips">
        ${b.items.map((it) => `<li class="chip">${tx(it, lang)}</li>`).join("")}
      </ul>
    </div>
    ${i < bands.length - 1 ? '<div class="arch-link" aria-hidden="true"><span></span><span></span><span></span></div>' : ""}
  `).join("");

  return `<div class="arch reveal" id="${esc(id)}">
    ${rows}
    ${legend ? `<p class="arch-legend mono">${tx(legend, lang)}</p>` : ""}
  </div>`;
}

/* ------------------------------------------------------------------
   CYCLE — a closed loop rendered as a row plus an explicit return path.
   A ring breaks below 900px; a row + return rail never does.
   ------------------------------------------------------------------ */
export function cycle(steps, lang, { id = "cycle", returnLabel } = {}) {
  const items = steps.map((s, i) => `
    <li class="cyc-step" data-d="${i}">
      <span class="cyc-ix mono">${String(i + 1).padStart(2, "0")}</span>
      <span class="cyc-ico" aria-hidden="true">${icon(s.icon)}</span>
      <h3 class="cyc-key">${tx(s.label, lang)}</h3>
      <p class="cyc-note">${tx(s.note, lang)}</p>
    </li>`).join("");

  return `<div class="cyc reveal" id="${esc(id)}">
    <ol class="cyc-row">${items}</ol>
    <div class="cyc-return" aria-hidden="true">
      <svg viewBox="0 0 1200 60" preserveAspectRatio="none" focusable="false">
        <path class="cyc-path" d="M1188 4v26a18 18 0 0 1-18 18H30a18 18 0 0 1-18-18V4"/>
      </svg>
      ${returnLabel ? `<span class="cyc-return-label mono">${tx(returnLabel, lang)}</span>` : ""}
    </div>
  </div>`;
}

/* ------------------------------------------------------------------
   LADDER — maturity progression (chatbot -> ... -> autonomous operation)
   ------------------------------------------------------------------ */
export function ladder(rungs, lang, { id = "ladder" } = {}) {
  return `<ol class="ladder reveal" id="${esc(id)}">
    ${rungs.map((r, i) => `
      <li class="rung${r.emphasis ? " is-peak" : ""}" data-d="${i}">
        <span class="rung-bar" aria-hidden="true"></span>
        <span class="rung-ix mono">0${i + 1}</span>
        <h3 class="rung-key">${tx(r.label, lang)}</h3>
        <p class="rung-note">${tx(r.note, lang)}</p>
      </li>`).join("")}
  </ol>`;
}

/* ------------------------------------------------------------------
   MATRIX — capability domains as a dense technical grid.
   groups: [{ label, items: [string] }]
   ------------------------------------------------------------------ */
export function matrix(groups, lang, { id = "matrix" } = {}) {
  return `<div class="matrix reveal" id="${esc(id)}">
    ${groups.map((g, i) => `
      <section class="matrix-col" data-d="${i % 4}">
        <h3 class="matrix-h mono">${tx(g.label, lang)}</h3>
        <ul class="matrix-list">
          ${g.items.map((it) => `<li>${tx(it, lang)}</li>`).join("")}
        </ul>
      </section>`).join("")}
  </div>`;
}

/* ------------------------------------------------------------------
   DEPLOYMENT TIERS — cloud / private / on-prem / sovereign
   ------------------------------------------------------------------ */
export function deployTiers(tiers, lang) {
  return `<ul class="tiers reveal">
    ${tiers.map((d, i) => `
      <li class="tier" data-d="${i}">
        <span class="tier-ico" aria-hidden="true">${icon(d.icon)}</span>
        <h3 class="tier-h">${tx(d.label, lang)}</h3>
        <p class="tier-note">${tx(d.note, lang)}</p>
        <span class="tier-ix mono" aria-hidden="true">0${i + 1}</span>
      </li>`).join("")}
  </ul>`;
}

/* ------------------------------------------------------------------
   CITY MESH — domains orbiting a shared intelligence layer.
   Rendered as a grid of domain tiles around a central band.
   ------------------------------------------------------------------ */
export function cityMesh(domains, lang, centre) {
  const half = Math.ceil(domains.length / 2);
  const tile = (d, i) => `
    <li class="mesh-tile" data-d="${i % 6}">
      <span class="mesh-ico" aria-hidden="true">${icon(d.icon)}</span>
      <span class="mesh-label">${tx(d.label, lang)}</span>
    </li>`;

  return `<div class="mesh reveal">
    <ul class="mesh-row mesh-top">${domains.slice(0, half).map(tile).join("")}</ul>
    <div class="mesh-core">
      <span class="mesh-core-rule" aria-hidden="true"></span>
      <div class="mesh-core-body">
        <span class="mono mesh-core-kicker">${tx(centre.kicker, lang)}</span>
        <strong class="mesh-core-h">${tx(centre.label, lang)}</strong>
        <span class="mesh-core-note">${tx(centre.note, lang)}</span>
      </div>
      <span class="mesh-core-rule" aria-hidden="true"></span>
    </div>
    <ul class="mesh-row mesh-bottom">${domains.slice(half).map(tile).join("")}</ul>
  </div>`;
}

/* ------------------------------------------------------------------
   Decorative architectural grid for dark sections.
   ------------------------------------------------------------------ */
export function gridfield(cls = "") {
  return `<div class="gridfield${cls ? " " + cls : ""}" aria-hidden="true"></div>`;
}

/* Three-bar brand mark used as a section marker. */
export function markRule() {
  return '<span class="markrule" aria-hidden="true"><i></i><i></i><i></i></span>';
}
