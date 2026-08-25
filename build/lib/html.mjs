/* Tiny HTML helpers for the static generator.
   No templating library: pages are plain functions returning strings. */

/** Escape a value for use in HTML text or a double-quoted attribute. */
export function esc(v) {
  if (v == null) return "";
  return String(v)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Escape for a JSON-LD <script> block (only `<` needs neutralizing). */
export function escJsonLd(obj) {
  return JSON.stringify(obj, null, 2).replace(/</g, "\\u003c");
}

/** Join truthy fragments with newlines. */
export function join(...parts) {
  return parts.flat(Infinity).filter(Boolean).join("\n");
}

/** Render `items` with `fn`, joined. */
export function map(items, fn) {
  return (items || []).map(fn).join("\n");
}

/** Build a class attribute from conditional parts. */
export function cx(...parts) {
  return parts.flat(Infinity).filter(Boolean).join(" ");
}

/** Bilingual string literal. */
export function T(en, ar) {
  return { en, ar: ar ?? en };
}

/** Resolve a bilingual node (or plain value) for a language. */
export function t(v, lang) {
  if (v == null) return "";
  if (typeof v === "object" && !Array.isArray(v) && ("en" in v || "ar" in v)) {
    return v[lang] ?? v.en ?? "";
  }
  return v;
}

/** Resolve + escape. The default for anything rendered as text. */
export function tx(v, lang) {
  return esc(t(v, lang));
}

/** Resolve a bilingual node that intentionally contains markup (no escaping). */
export function traw(v, lang) {
  return t(v, lang);
}

/** Deterministic slug for ids. */
export function slug(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/* NOTE: never emit `style="..."` attributes: the CSP has no 'unsafe-inline'
   in style-src. Stagger/index values travel as data attributes instead and are
   read by attribute selectors in the stylesheet. */

/** Split a headline on `|` into staged reveal rows. */
export function lines(value, lang, cls = "hl") {
  return t(value, lang)
    .split("|")
    .map((l, i) => `<span class="${cls}" data-d="${i}">${esc(l.trim())}</span>`)
    .join("");
}
