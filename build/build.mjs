#!/usr/bin/env node
/* ==========================================================================
   QEONIX static site generator.

   Renders every route in English and Arabic into `site/`, which is what
   Netlify publishes. The output is committed, so netlify.toml still needs no
   build command and a deploy cannot be broken by this script.

     npm run build        regenerate site/
     npm run check        regenerate + validate output
   ========================================================================== */

import { mkdir, writeFile, rm, readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { renderPage } from "./lib/layout.mjs";
import { t } from "./lib/html.mjs";
import { ORIGIN, LANGS, ROUTES, BRAND, OFFICES, url, canonical } from "./content/site.mjs";

import home from "./content/pages/home.mjs";
import ai from "./content/pages/ai.mjs";
import agentic from "./content/pages/agentic.mjs";
import autonomous from "./content/pages/autonomous.mjs";
import cities from "./content/pages/cities.mjs";
import government from "./content/pages/government.mjs";
import mobility from "./content/pages/mobility.mjs";
import platforms from "./content/pages/platforms.mjs";
import healthcare from "./content/pages/healthcare.mjs";
import industries from "./content/pages/industries.mjs";
import sovereign from "./content/pages/sovereign.mjs";
import about from "./content/pages/about.mjs";
import contact from "./content/pages/contact.mjs";
import notFound from "./content/pages/404.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "site");

const PAGES = {
  home, ai, agentic, autonomous, cities, government,
  mobility, platforms, healthcare, industries, sovereign, about, contact,
};

/* Directories the generator owns. Everything else in site/ (images, css, js,
   favicon) is hand-maintained and must survive a rebuild. */
const GENERATED_DIRS = [...Object.values(ROUTES).map((r) => r.path).filter(Boolean), "ar"];

/* ------------------------------------------------------------- structured data */

function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${ORIGIN}/#organization`,
    name: BRAND.name,
    url: `${ORIGIN}/`,
    logo: `${ORIGIN}/images/qeonix-logo.png`,
    email: BRAND.email,
    slogan: "Live Tomorrow, Today.",
    description:
      "Qeonix designs, engineers and deploys the intelligent systems that governments, cities and enterprises run on: decision intelligence, agentic AI, autonomous systems and connected infrastructure.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Abu Dhabi",
      addressCountry: "AE",
    },
    /* Only the headquarters is asserted as an address. Other locations are
       declared as areas of operation, and the two in progress are omitted
       from structured data until they are trading entities. */
    areaServed: OFFICES.filter((o) => o.status !== "progress").map((o) => ({
      "@type": "Country",
      name: t(o.country, "en"),
    })),
    contactPoint: [{
      "@type": "ContactPoint",
      contactType: "sales",
      email: BRAND.email,
      areaServed: ["AE", "FR"],
      availableLanguage: ["English", "Arabic"],
    }],
    knowsAbout: [
      "Artificial Intelligence", "Agentic AI", "Multi-agent systems", "Generative AI",
      "Computer Vision", "Decision Intelligence", "Sovereign AI", "Enterprise AI",
      "Robotics", "Drone Technology", "Autonomous Systems", "Connected Mobility",
      "Smart Cities", "Smart Government", "Digital Government", "Data Platforms",
      "Systems Integration", "Digital Health Platforms",
    ],
  };
}

function websiteLd(lang) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${ORIGIN}/#website`,
    url: `${ORIGIN}${url("home", lang)}`,
    name: BRAND.name,
    inLanguage: lang,
    publisher: { "@id": `${ORIGIN}/#organization` },
  };
}

function breadcrumbLd(page, lang) {
  if (page.route === "home" || !page.crumbTrail) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: page.crumbTrail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t(c.label, lang),
      item: c.key ? canonical(c.key, lang) : undefined,
    })),
  };
}

/* Only emitted when the questions and answers are the exact strings rendered
   on the page — Google requires the visible content to match. */
function faqLd(page, lang) {
  if (!page.faqSchema || !page.faqSchema.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqSchema.map((f) => ({
      "@type": "Question",
      name: t(f.q, lang),
      acceptedAnswer: { "@type": "Answer", text: t(f.a, lang) },
    })),
  };
}

function serviceLd(page, lang) {
  if (!page.service) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: t(page.service.name, lang),
    serviceType: t(page.service.type, lang),
    description: t(page.description, lang),
    provider: { "@id": `${ORIGIN}/#organization` },
    areaServed: page.service.areaServed || [
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "Country", name: "France" },
    ],
    url: canonical(page.route, lang),
  };
}

/* --------------------------------------------------------------- rendering */

function attachSchema(page, lang) {
  const blocks = [];
  if (page.route === "home") blocks.push(organizationLd(), websiteLd(lang));
  const bc = breadcrumbLd(page, lang);
  if (bc) blocks.push(bc);
  const svc = serviceLd(page, lang);
  if (svc) blocks.push(svc);
  const fq = faqLd(page, lang);
  if (fq) blocks.push(fq);
  return { ...page, jsonld: blocks };
}

async function writeOut(relPath, contents) {
  const abs = join(OUT, relPath);
  await mkdir(dirname(abs), { recursive: true });
  await writeFile(abs, contents, "utf8");
  return abs;
}

/* ------------------------------------------------------------------ assets */

function sitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const priority = { home: "1.0", agentic: "0.9", government: "0.9", cities: "0.9", sovereign: "0.9" };
  const entries = [];
  for (const key of Object.keys(ROUTES)) {
    for (const lang of LANGS) {
      entries.push(`  <url>
    <loc>${canonical(key, lang)}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${canonical(key, "en")}"/>
    <xhtml:link rel="alternate" hreflang="ar" href="${canonical(key, "ar")}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${canonical(key, "en")}"/>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority[key] || "0.7"}</priority>
  </url>`);
    }
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join("\n")}
</urlset>
`;
}

function robots() {
  return `User-agent: *
Allow: /

# Answer engines and AI crawlers are welcome; see /llms.txt for a structured
# summary of what Qeonix does.
User-agent: GPTBot
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Google-Extended
Allow: /

Sitemap: ${ORIGIN}/sitemap.xml
`;
}

function llms() {
  const routeLine = (key, label) => `- [${label}](${canonical(key, "en")})`;
  return `# QEONIX

> Qeonix designs, engineers and deploys the intelligent systems that governments,
> cities and enterprises run on — decision intelligence, agentic AI, autonomous
> systems and connected infrastructure. Headquartered in Abu Dhabi, United Arab
> Emirates. Tagline: "Live Tomorrow, Today."

Qeonix is an engineering and product organisation rather than a reseller or a
pure systems integrator. It architects, builds, deploys and operates the
platforms and intelligence layers its clients run on, and integrates them with
the systems already in place.

## Capabilities
- **Intelligence & AI** — decision intelligence, computer vision, predictive
  analytics, generative AI, enterprise AI applied to existing operations.
- **Agentic AI** — multi-agent orchestration, tool and API calling, enterprise
  integration, human-in-the-loop controls, permissions, observability,
  auditability, model flexibility across open-source and commercial models.
- **Autonomous Systems (Physical AI)** — robotics, drones, autonomous
  inspection, remote operations, aerial intelligence, fleet intelligence.
- **Data & Digital Platforms** — data platforms, integration layers, APIs,
  event-driven systems, workflow engines, digital twins, cloud-native and
  hybrid infrastructure.

## Sectors
- **Smart Government** — digital government platforms, resident super-apps,
  service orchestration, cross-agency workflows, case management, permitting
  and licensing journeys, government AI assistants, payments and digital
  identity integration.
- **Smart Cities** — city operations, command and control centres, utilities,
  waste, mobility, parking, tolling, EV charging, public transport, IoT and
  asset management, environmental monitoring, field operations.
- **Connected Mobility** — mobility-as-a-service, multimodal journeys, fleet
  orchestration, intelligent transportation, connected vehicles, transport
  intelligence.
- **Healthcare** — digital health platforms, patient journeys, provider
  ecosystems, care orchestration, insurance intelligence, healthcare analytics.
- Also energy and utilities, industrial and manufacturing, logistics and supply
  chain, aviation and aerospace, real estate and urban development.

## Deployment and sovereignty
Qeonix systems are architected so that deployment topology is a design decision:
public cloud, dedicated private cloud, on-premise inside the customer's data
centre, or isolated environments designed to support data residency
requirements. Identity and role-based access, permissions, audit trails,
observability, human oversight and controlled model access are part of the
architecture. Qeonix does not claim third-party certifications on this site.

## Locations
- Abu Dhabi, United Arab Emirates — headquarters
- Paris, France — office
- Muscat, Oman — in progress
- Doha, Qatar — in progress

## Contact
- Website: ${ORIGIN}/
- Email: ${BRAND.email}

## Key pages
${routeLine("home", "Home")}
${routeLine("ai", "Intelligence & AI")}
${routeLine("agentic", "Agentic AI")}
${routeLine("autonomous", "Autonomous Systems")}
${routeLine("cities", "Smart Cities")}
${routeLine("government", "Smart Government")}
${routeLine("mobility", "Connected Mobility")}
${routeLine("platforms", "Data & Platforms")}
${routeLine("healthcare", "Healthcare")}
${routeLine("industries", "Industries")}
${routeLine("sovereign", "Sovereign AI")}
${routeLine("about", "About Qeonix")}
${routeLine("contact", "Contact")}

Arabic versions of every page are available under ${ORIGIN}/ar/.
`;
}

/* -------------------------------------------------------------------- main */

async function clean() {
  for (const dir of GENERATED_DIRS) {
    const abs = join(OUT, dir);
    if (existsSync(abs)) await rm(abs, { recursive: true, force: true });
  }
}

async function main() {
  await clean();
  const written = [];

  for (const lang of LANGS) {
    for (const [key, factory] of Object.entries(PAGES)) {
      const page = attachSchema(factory(lang), lang);
      if (page.route !== key) throw new Error(`page "${key}" declares route "${page.route}"`);
      const rel = (lang === "ar" ? "ar/" : "") + ROUTES[key].file;
      await writeOut(rel, renderPage(page, lang));
      written.push(rel);
    }
  }

  /* 404 is served by Netlify from the site root for both languages. */
  const nf = attachSchema(notFound("en"), "en");
  await writeOut("404.html", renderPage(nf, "en"));
  written.push("404.html");
  const nfAr = attachSchema(notFound("ar"), "ar");
  await writeOut("ar/404.html", renderPage(nfAr, "ar"));
  written.push("ar/404.html");

  await writeOut("sitemap.xml", sitemap());
  await writeOut("robots.txt", robots());
  await writeOut("llms.txt", llms());
  written.push("sitemap.xml", "robots.txt", "llms.txt");

  const bytes = await Promise.all(
    written.map(async (f) => (await stat(join(OUT, f))).size)
  );
  const total = bytes.reduce((a, b) => a + b, 0);
  console.log(`built ${written.length} files · ${(total / 1024).toFixed(0)} KB total HTML+assets`);
  for (const [i, f] of written.entries()) {
    console.log(`  ${f.padEnd(38)} ${(bytes[i] / 1024).toFixed(1)} KB`);
  }
}

main().catch((err) => {
  console.error("\nBUILD FAILED\n");
  console.error(err);
  process.exit(1);
});
