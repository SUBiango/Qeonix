/* Page shell: <head>, header, footer, and the shared closing CTA band. */

import { esc, escJsonLd, tx, t, cx, lines, map } from "./html.mjs";
import { icon } from "./icons.mjs";
import { gridfield, markRule } from "./diagrams.mjs";
import {
  ORIGIN, BRAND, NAV, FOOTER, UI, OFFICES, OFFICE_STATUS, ROUTES, url, canonical,
} from "../content/site.mjs";

/* Inline wordmark. Vector so it stays crisp at any size and can be recoloured
   per surface — replaces a 5500px raster that was rendered 20px tall. */
export function wordmark(cls = "") {
  return `<svg class="${cx("wordmark", cls)}" viewBox="0 0 268 32" role="img" aria-label="QEONIX" focusable="false">
  <path class="wm-l" d="M16.6 0C7.6 0 .9 6.9.9 16s6.7 16 15.7 16c3 0 5.7-.8 8-2.2l3.4 3.4 4.2-4.2-3.2-3.2c2-2.6 3.2-6 3.2-9.8C32.2 6.9 25.5 0 16.6 0Zm0 26.1c-5.5 0-9.5-4.3-9.5-10.1S11.1 5.9 16.6 5.9s9.5 4.3 9.5 10.1c0 2.1-.5 4-1.5 5.5l-4.2-4.2-4.2 4.2 4 4c-1.1.4-2.3.6-3.6.6Z"/>
  <g class="wm-e">
    <rect x="41.6" y="4.2" width="23.6" height="5.6" rx="2.8"/>
    <rect x="41.6" y="13.2" width="16.4" height="5.6" rx="2.8"/>
    <rect x="41.6" y="22.2" width="23.6" height="5.6" rx="2.8"/>
  </g>
  <path class="wm-l" d="M90.6 0C81.6 0 74.9 6.9 74.9 16s6.7 16 15.7 16 15.7-6.9 15.7-16S99.6 0 90.6 0Zm0 26.1c-5.5 0-9.5-4.3-9.5-10.1S85.1 5.9 90.6 5.9s9.5 4.3 9.5 10.1-4 10.1-9.5 10.1Z"/>
  <path class="wm-l" d="M139.2.6v20L124.5.6h-6.2v30.8h6.2v-20l14.7 20h6.2V.6z"/>
  <path class="wm-l" d="M157.8.6h6.3v30.8h-6.3z"/>
  <path class="wm-l" d="M203.2.6h-7.3l-7.1 10.6L181.7.6h-7.4l10.7 15-11 15.8h7.4l7.4-11 7.4 11h7.4l-11-15.8z"/>
</svg>`;
}

function fontHref(lang) {
  const families = [
    "Poppins:wght@400;500;600;700",
    "IBM+Plex+Mono:wght@400;500;600",
    lang === "ar" ? "Cairo:wght@400;500;600;700" : null,
  ].filter(Boolean);
  return `https://fonts.googleapis.com/css2?${families.map((f) => "family=" + f).join("&")}&display=swap`;
}

/* ------------------------------------------------------------------ head */

function head(page, lang) {
  const dir = lang === "ar" ? "rtl" : "ltr";
  const can = canonical(page.route, lang);
  const altEn = canonical(page.route, "en");
  const altAr = canonical(page.route, "ar");
  const ogImage = `${ORIGIN}/images/social/${page.og || "default"}.png`;

  return `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<script src="/js/boot.js"></script>
<title>${tx(page.title, lang)}</title>
<meta name="description" content="${tx(page.description, lang)}">
<link rel="canonical" href="${esc(can)}">
<link rel="alternate" hreflang="en" href="${esc(altEn)}">
<link rel="alternate" hreflang="ar" href="${esc(altAr)}">
<link rel="alternate" hreflang="x-default" href="${esc(altEn)}">
<meta name="theme-color" content="#06070F">
<meta name="author" content="QEONIX">
${page.noindex ? '<meta name="robots" content="noindex,follow">' : '<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1">'}

<link rel="icon" href="/images/favicon/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/images/favicon/favicon-96x96.png" sizes="96x96" type="image/png">
<link rel="shortcut icon" href="/images/favicon/favicon.ico">
<link rel="apple-touch-icon" sizes="180x180" href="/images/favicon/apple-touch-icon.png">
<meta name="apple-mobile-web-app-title" content="QEONIX">
<link rel="manifest" href="/images/favicon/site.webmanifest">

<meta property="og:type" content="website">
<meta property="og:site_name" content="QEONIX">
<meta property="og:locale" content="${lang === "ar" ? "ar_AE" : "en_AE"}">
<meta property="og:locale:alternate" content="${lang === "ar" ? "en_AE" : "ar_AE"}">
<meta property="og:url" content="${esc(can)}">
<meta property="og:title" content="${tx(page.ogTitle || page.title, lang)}">
<meta property="og:description" content="${tx(page.description, lang)}">
<meta property="og:image" content="${esc(ogImage)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${tx(page.ogTitle || page.title, lang)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${tx(page.ogTitle || page.title, lang)}">
<meta name="twitter:description" content="${tx(page.description, lang)}">
<meta name="twitter:image" content="${esc(ogImage)}">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${esc(fontHref(lang))}">
<link rel="stylesheet" href="/css/qeonix.css?v=3">
${(page.jsonld || []).map((b) => `<script type="application/ld+json">${escJsonLd(b)}</script>`).join("\n")}`;
}

/* ---------------------------------------------------------------- header */

function navItem(item, lang, current) {
  if (item.children) {
    const isCurrent = item.children.some((c) => c.key === current);
    return `<li class="nav-i has-menu">
      <button class="nav-b" type="button" aria-expanded="false" aria-controls="menu-${item.id}"${isCurrent ? ' data-current="true"' : ""}>
        <span>${tx(item.label, lang)}</span>
        <span class="nav-chev" aria-hidden="true"></span>
      </button>
      <div class="megamenu" id="menu-${item.id}" hidden>
        <div class="mega-in">
          <p class="mega-note mono">${tx(item.note, lang)}</p>
          <ul class="mega-list">
            ${item.children.map((c) => `<li${c.featured ? ' class="is-featured"' : ""}>
              <a href="${esc(url(c.key, lang))}"${c.key === current ? ' aria-current="page"' : ""}>
                <span class="mega-ico" aria-hidden="true">${icon(c.icon)}</span>
                <span class="mega-txt">
                  <strong>${tx(c.label, lang)}</strong>
                  <span>${tx(c.note, lang)}</span>
                </span>
              </a>
            </li>`).join("")}
          </ul>
        </div>
      </div>
    </li>`;
  }
  return `<li class="nav-i">
    <a class="nav-a" href="${esc(url(item.key, lang))}"${item.key === current ? ' aria-current="page"' : ""}>${tx(item.label, lang)}</a>
  </li>`;
}

function header(page, lang) {
  const other = lang === "ar" ? "en" : "ar";
  return `<a class="skip" href="#main">${tx(UI.skip, lang)}</a>
<header class="hdr" id="hdr" data-solid="${page.solidHeader ? "true" : "false"}">
  <div class="wrap hdr-in">
    <a class="hdr-logo" href="${esc(url("home", lang))}" aria-label="${tx(BRAND.name, lang)} — ${tx(UI.home, lang)}">${wordmark()}</a>

    <nav class="nav" id="nav" aria-label="${tx(UI.primaryNav, lang)}">
      <ul class="nav-list">
        ${NAV.map((i) => navItem(i, lang, page.route)).join("")}
      </ul>
      <div class="nav-foot">
        ${officeList(lang, true)}
      </div>
    </nav>

    <div class="hdr-right">
      <a class="langsw mono" href="${esc(url(page.route, other))}" lang="${other}" hreflang="${other}"
         aria-label="${tx(UI.langSwitchAria, lang)}">${esc(UI.langSwitch[lang])}</a>
      <a class="btn btn-primary hdr-cta" href="${esc(url("contact", lang))}">
        <span>${tx(UI.contactCta, lang)}</span><span class="btn-arr" aria-hidden="true">${icon("arrow")}</span>
      </a>
      <button class="burger" id="burger" type="button" aria-expanded="false" aria-controls="nav" aria-label="${tx(UI.menu, lang)}">
        <span aria-hidden="true"><i></i><i></i><i></i></span>
      </button>
    </div>
  </div>
  <span class="hdr-rule" aria-hidden="true"></span>
</header>
<div class="nav-scrim" id="navScrim" hidden></div>`;
}

/* ---------------------------------------------------------------- offices */

export function officeList(lang, compact = false) {
  return `<ul class="${compact ? "offices offices-compact" : "offices"}">
    ${OFFICES.map((o) => `<li class="office is-${o.status}">
      <span class="office-city">${tx(o.city, lang)}</span>
      <span class="office-country">${tx(o.country, lang)}</span>
      <span class="office-status mono">${tx(OFFICE_STATUS[o.status], lang)}</span>
    </li>`).join("")}
  </ul>`;
}

/* --------------------------------------------------------------- CTA band */

export function ctaBand(lang, copy = {}) {
  const h = copy.h || {
    en: "Build the system|others will depend on.",
    ar: "ابنِ النظام|الذي سيعتمد عليه الآخرون.",
  };
  const lead = copy.lead || {
    en: "Tell us what has to work — the operating reality, the constraints, the outcome. We will come back with an architecture, not a brochure.",
    ar: "أخبرنا بما يجب أن يعمل فعليًا — واقع التشغيل والقيود والنتيجة المطلوبة. سنعود إليك ببنية هندسية، لا بكتيّب تعريفي.",
  };
  return `<section class="ctaband tone-accent" id="cta"><span id="contact" class="vh" aria-hidden="true"></span>
  ${gridfield("gf-cta")}
  <div class="wrap ctaband-in">
    <div class="ctaband-copy reveal">
      <p class="kicker mono">${markRule()}<span>${lang === "ar" ? "الخطوة التالية" : "Next step"}</span></p>
      <h2 class="h2">${lines(h, lang)}</h2>
      <p class="lead">${tx(lead, lang)}</p>
    </div>
    <div class="ctaband-act reveal" data-d="1">
      <a class="btn btn-invert" href="${esc(url("contact", lang))}">
        <span>${tx(UI.contactCta, lang)}</span><span class="btn-arr" aria-hidden="true">${icon("arrow")}</span>
      </a>
      <a class="btn btn-quiet" href="${esc(url("agentic", lang))}">
        <span>${lang === "ar" ? "استكشف القدرات" : "Explore capabilities"}</span>
      </a>
      <p class="ctaband-mail"><a href="mailto:${BRAND.email}">${BRAND.email}</a></p>
    </div>
  </div>
</section>`;
}

/* ---------------------------------------------------------------- footer */

function footer(page, lang) {
  const year = new Date().getUTCFullYear();
  const other = lang === "ar" ? "en" : "ar";
  return `<footer class="ftr">
  <div class="wrap">
    <div class="ftr-top">
      <div class="ftr-brand">
        <a class="ftr-logo" href="${esc(url("home", lang))}" aria-label="${tx(BRAND.name, lang)}">${wordmark("wm-invert")}</a>
        <p class="ftr-blurb">${tx(FOOTER.blurb, lang)}</p>
        <p class="ftr-mail"><a href="mailto:${BRAND.email}">${BRAND.email}</a></p>
      </div>
      ${FOOTER.columns.map((c) => `<nav class="ftr-col" aria-label="${tx(c.h, lang)}">
        <h2 class="ftr-h mono">${tx(c.h, lang)}</h2>
        <ul>${c.links.map((l) => `<li><a href="${esc(url(l.key, lang) + (l.hash || ""))}">${tx(l.label, lang)}</a></li>`).join("")}</ul>
      </nav>`).join("")}
    </div>

    <div class="ftr-offices">
      <h2 class="ftr-h mono">${tx(UI.offices, lang)}</h2>
      ${officeList(lang)}
    </div>

    <div class="ftr-bot">
      <p>© ${year} ${tx(BRAND.name, lang)}. ${tx(FOOTER.rights, lang)}</p>
      <p class="ftr-motto mono">${tx(FOOTER.motto, lang)}</p>
      <a class="ftr-lang mono" href="${esc(url(page.route, other))}" lang="${other}" hreflang="${other}">${esc(UI.langSwitch[lang])}</a>
    </div>
  </div>
</footer>`;
}

/* ------------------------------------------------------------------ shell */

export function renderPage(page, lang) {
  const dir = lang === "ar" ? "rtl" : "ltr";
  return `<!doctype html>
<html lang="${lang}" dir="${dir}" class="no-js">
<head>
${head(page, lang)}
</head>
<body class="${cx("page", `p-${page.route}`, page.bodyClass)}">
${header(page, lang)}
<main id="main">
${page.body}
</main>
${page.hideCta ? "" : ctaBand(lang, page.cta)}
${footer(page, lang)}
<script src="/js/qeonix.js?v=3" defer></script>
</body>
</html>
`;
}
