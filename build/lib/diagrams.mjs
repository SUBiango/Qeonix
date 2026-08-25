/* System diagrams.
   Deliberate choice: everything that carries words is HTML, not SVG. HTML
   reflows on a 375px phone, mirrors correctly under dir="rtl", stays
   translatable, and is readable by a screen reader. SVG is used only for the
   connective tissue and the hero artwork, where geometry is the content.
   All animation lives in qeonix.css (the CSP forbids inline <style>). */

import { tx, t, esc, map } from "./html.mjs";
import { icon } from "./icons.mjs";

/* ------------------------------------------------------------------
   HERO: "intelligence lattice"
   A deliberate topology, not a particle soup: a core, an orbit of
   specialized nodes, and signals traveling the edges between them.
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
        <rect x="446" y="452.5" width="48" height="7"/>
        <rect x="446" y="466.5" width="48" height="7"/>
        <rect x="446" y="480.5" width="48" height="7"/>
      </g>
    </g>

    <g class="lat-ticks">
      <path d="M470 22v34M470 884v34M22 470h34M884 470h34"/>
    </g>
  </svg>
</div>`;
}

/* ------------------------------------------------------------------
   FLOW: vertical value chain (DATA -> ... -> OUTCOME)
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
   ARCHITECTURE BOARD: labeled bands of chips, connected by rails.
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
   CYCLE: a closed loop rendered as a row plus an explicit return path.
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
   LADDER: maturity progression (chatbot -> ... -> autonomous operation)
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
   MATRIX: capability domains as a dense technical grid.
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
   DEPLOYMENT TIERS: cloud / private / on-prem / sovereign
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
   CITY MESH: domains orbiting a shared intelligence layer.
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

/* ------------------------------------------------------------------
   PRESENCE MAP: offices plotted on an abstract graticule.
   Real lon/lat, equirectangular projection, no coastlines: geography
   without cartographic clutter, in the lattice's visual language.
   Not mirrored in RTL: maps keep their orientation.
   ------------------------------------------------------------------ */
export function presenceMap(offices, statuses, lang) {
  const ar = lang === "ar";
  /* project lon [-10..68] lat [14..56] into 760x400 */
  const px = (lon) => Math.round(((lon + 10) / 78) * 760);
  const py = (lat) => Math.round(((56 - lat) / 42) * 400);
  const GEO = { auh: [54.4, 24.45], dxb: [55.27, 25.2], par: [2.35, 48.85], mct: [58.4, 23.6], doh: [51.53, 25.29] };
  /* Per-city label placement: the Gulf cluster sits close together, so each
     label takes its own quadrant: AD below, Dubai above, Doha upper-left,
     Muscat right. */
  const LBL = {
    auh: { a: "middle", dx: 0, dy: 34, sdy: 50 },
    dxb: { a: "middle", dx: 4, dy: -16, sdy: -31 },
    par: { a: "middle", dx: 0, dy: -18, sdy: -34 },
    mct: { a: "start", dx: 14, dy: 6, sdy: 21 },
    doh: { a: "end", dx: -14, dy: -20, sdy: -35 },
  };

  const pts = offices.map((o) => {
    const [lon, lat] = GEO[o.id];
    return { ...o, x: px(lon), y: py(lat) };
  });
  const hq = pts.find((p) => p.status === "hq");

  const arcs = pts.filter((p) => p !== hq).map((p, i) => {
    const dist = Math.hypot(p.x - hq.x, p.y - hq.y);
    const lift = Math.max(18, Math.min(78, dist * 0.14) + i * 6);
    const mx = (hq.x + p.x) / 2, my = Math.min(hq.y, p.y) - lift;
    return `<path class="pm-arc${p.status === "progress" ? " is-soon" : ""}" d="M${hq.x} ${hq.y} Q${mx} ${my} ${p.x} ${p.y}"/>`;
  }).join("");

  const nodes = pts.map((p) => {
    const l = LBL[p.id];
    return `
    <g class="pm-node is-${p.status}">
      ${p.status === "hq" ? `<circle class="pm-halo" cx="${p.x}" cy="${p.y}" r="7"/>` : ""}
      <circle class="pm-dot" cx="${p.x}" cy="${p.y}" r="${p.status === "hq" ? 7 : 5}"/>
      <text class="pm-city" x="${p.x + l.dx}" y="${p.y + l.dy}" text-anchor="${l.a}">${esc(t(p.city, lang))}</text>
      <text class="pm-status" x="${p.x + l.dx}" y="${p.y + l.sdy}" text-anchor="${l.a}">${esc(t(statuses[p.status], lang))}</text>
    </g>`;
  }).join("");

  const grat = [
    ...Array.from({ length: 9 }, (_, i) => `<line x1="${i * 95}" y1="0" x2="${i * 95}" y2="400"/>`),
    ...Array.from({ length: 5 }, (_, i) => `<line x1="0" y1="${i * 100}" x2="760" y2="${i * 100}"/>`),
  ].join("");

  return `<figure class="pmap reveal" role="img"
    aria-label="${ar ? "خريطة حضور كيونكس: أبوظبي المقر الرئيسي، باريس مكتب، مسقط والدوحة قريبًا" : "Qeonix presence map: Abu Dhabi headquarters, Paris office, Muscat and Doha soon"}">
  <svg viewBox="0 0 760 400" preserveAspectRatio="xMidYMid meet" focusable="false" aria-hidden="true">
    <g class="pm-grat">${grat}</g>
    ${arcs}
    ${nodes}
  </svg>
  <figcaption class="pm-cap mono">${ar ? "المقر الرئيسي في أبوظبي · أنظمة مصمّمة للنشر الدولي من اليوم الأول" : "Headquartered in Abu Dhabi · systems designed for international deployment from day one"}</figcaption>
</figure>`;
}

/* ------------------------------------------------------------------
   HANDOVER LANES: the traditional delivery chain versus one line.
   HTML bars: responsive, RTL-correct, no SVG needed.
   ------------------------------------------------------------------ */
export function handoverLanes(lang) {
  const ar = lang === "ar";
  const trad = [
    { k: ar ? "استشارات" : "Consultancy", note: ar ? "توصي وترحل" : "recommends, leaves" },
    { k: ar ? "شركة تكامل" : "Systems integrator", note: ar ? "يبني ويسلّم" : "builds, hands over" },
    { k: ar ? "مشغّل" : "Operator", note: ar ? "يرث ويتدبّر" : "inherits, copes" },
  ];
  const lost = ar ? "فقدان السياق" : "context lost";
  return `<div class="lanes reveal">
    <div class="lane lane-trad">
      <p class="lane-tag mono">${ar ? "النموذج المعتاد" : "The usual model"}</p>
      <div class="lane-bars">
        ${trad.map((s, i) => `
          ${i ? `<span class="lane-gap" aria-hidden="true"><i></i><em class="mono">${lost}</em></span>` : ""}
          <span class="lane-seg"><strong>${s.k}</strong><span>${s.note}</span></span>`).join("")}
      </div>
    </div>
    <div class="lane lane-qx">
      <p class="lane-tag mono">${ar ? "نموذج كيونكس" : "The Qeonix model"}</p>
      <div class="lane-bars">
        <span class="lane-seg lane-solid">
          <strong>${ar ? "فريق واحد، مساءلة واحدة" : "One team, one accountability"}</strong>
          <span>${ar ? "البنية ← الهندسة ← التشغيل، دون تسليم" : "architecture → engineering → operations, no handover"}</span>
        </span>
      </div>
    </div>
  </div>`;
}
