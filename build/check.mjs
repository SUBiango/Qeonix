#!/usr/bin/env node
/* Output validator. Run after build: checks internal links, asset references,
   duplicate ids, alt text, heading order, aria wiring and JSON-LD parseability
   across every generated page. Exits non-zero on any failure. */

import { readFile, readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const SITE = resolve(dirname(fileURLToPath(import.meta.url)), "..", "site");

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (e.name.endsWith(".html")) yield p;
  }
}

const errors = [];
const warn = [];

function fileFor(href) {
  // strip query/hash
  const clean = href.split("#")[0].split("?")[0];
  if (!clean) return true; // pure-hash link, checked separately
  let p = join(SITE, clean);
  if (clean.endsWith("/")) p = join(p, "index.html");
  else if (!/\.[a-z0-9]+$/i.test(clean)) p = join(p, "index.html");
  return existsSync(p);
}

const pages = [];
for await (const f of walk(SITE)) pages.push(f);

for (const f of pages.sort()) {
  const rel = f.slice(SITE.length + 1).split("\\").join("/");
  const html = await readFile(f, "utf8");

  /* ids present + duplicates */
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  const seen = new Set();
  for (const id of ids) {
    if (seen.has(id)) errors.push(`${rel}: duplicate id "${id}"`);
    seen.add(id);
  }

  /* internal links */
  for (const m of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    const u = m[1];
    if (/^(https?:|mailto:|tel:|data:|#)/.test(u)) {
      if (u.startsWith("#") && u.length > 1 && !seen.has(u.slice(1))) {
        errors.push(`${rel}: broken fragment ${u}`);
      }
      continue;
    }
    if (!u.startsWith("/")) { errors.push(`${rel}: non-root-relative URL "${u}"`); continue; }
    if (!fileFor(u)) errors.push(`${rel}: missing target ${u}`);
    const hash = u.includes("#") ? u.split("#")[1] : null;
    if (hash) {
      const targetFile = (() => {
        let p = join(SITE, u.split("#")[0]);
        if (!/\.[a-z0-9]+$/i.test(p)) p = join(p, "index.html");
        return p;
      })();
      if (existsSync(targetFile)) {
        const t = await readFile(targetFile, "utf8");
        if (!t.includes(`id="${hash}"`)) errors.push(`${rel}: fragment #${hash} not found in ${u}`);
      }
    }
  }

  /* images need alt */
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\salt="/.test(m[0])) errors.push(`${rel}: <img> missing alt`);
  }

  /* single h1 */
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) errors.push(`${rel}: ${h1s} <h1> elements`);

  /* lang/dir sanity */
  const isAr = rel.startsWith("ar/") || rel === "ar/404.html";
  if (isAr && !html.includes('lang="ar" dir="rtl"')) errors.push(`${rel}: missing lang=ar dir=rtl`);
  if (!isAr && !html.includes('lang="en" dir="ltr"')) errors.push(`${rel}: missing lang=en dir=ltr`);

  /* aria-controls must resolve */
  for (const m of html.matchAll(/aria-controls="([^"]+)"/g)) {
    if (!seen.has(m[1])) errors.push(`${rel}: aria-controls -> missing id "${m[1]}"`);
  }
  for (const m of html.matchAll(/aria-labelledby="([^"]+)"/g)) {
    if (!seen.has(m[1])) errors.push(`${rel}: aria-labelledby -> missing id "${m[1]}"`);
  }

  /* JSON-LD parses */
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch (e) { errors.push(`${rel}: invalid JSON-LD (${e.message})`); }
  }

  /* no inline style attributes (CSP has no unsafe-inline for styles) */
  if (/\sstyle="/.test(html)) errors.push(`${rel}: inline style attribute present (CSP violation)`);

  /* buttons carry an explicit type */
  for (const m of html.matchAll(/<button\b[^>]*>/g)) {
    if (!/\stype="/.test(m[0])) errors.push(`${rel}: <button> without type`);
  }
}

/* referenced static assets exist */
const cssPath = join(SITE, "css/qeonix.css");
const jsPath = join(SITE, "js/qeonix.js");
const bootPath = join(SITE, "js/boot.js");
for (const p of [cssPath, jsPath, bootPath]) {
  if (!existsSync(p)) errors.push(`missing asset: ${p.slice(SITE.length + 1)}`);
}

/* og images referenced by pages exist */
for (const f of pages) {
  const html = await readFile(f, "utf8");
  const m = html.match(/property="og:image" content="https:\/\/qeonix\.com(\/[^"]+)"/);
  if (m && !existsSync(join(SITE, m[1]))) {
    errors.push(`${f.slice(SITE.length + 1)}: og image missing ${m[1]}`);
  }
}

console.log(`checked ${pages.length} pages`);
if (warn.length) { console.log(`\n${warn.length} warnings:`); warn.forEach((w) => console.log("  ~ " + w)); }
if (errors.length) {
  console.error(`\n${errors.length} errors:`);
  errors.forEach((e) => console.error("  ✗ " + e));
  process.exit(1);
}
console.log("all checks passed");
