/* Shared scaffolding for interior routes: breadcrumb trail, hero and closer. */

import { T } from "./html.mjs";
import { section, pageHero, breadcrumbs, nextUp, btn } from "./components.mjs";
import { url, UI } from "../content/site.mjs";
import { RELATED } from "../content/shared.mjs";

/** Breadcrumb trail: Home / <this page>. Also feeds BreadcrumbList schema. */
export function trail(routeKey, label) {
  return [{ key: "home", label: UI.home }, { key: routeKey, label }];
}

export function crumbsFor(trailArr, lang) {
  return breadcrumbs(
    trailArr.map((c, i) => ({
      label: c.label,
      href: i < trailArr.length - 1 ? url(c.key, lang) : null,
    })),
    lang
  );
}

/** Standard interior hero with breadcrumbs, a lead and a meta rail. */
export function heroFor({ route, label, kicker, h, lead, meta, primaryCta }, lang) {
  const t = trail(route, label);
  return {
    crumbTrail: t,
    html: pageHero({
      kicker, h, lead, meta,
      crumbs: crumbsFor(t, lang),
      cta: `${btn(UI.contactCta, url("contact", lang), { kind: "primary", lang })}
            ${primaryCta || ""}`,
    }, lang),
  };
}

/** Cross-links closing an interior page. */
export function closer(key, lang) {
  const items = (RELATED[key] || []).map((r) => ({
    href: url(r.key, lang),
    label: r.label,
    note: r.note,
  }));
  if (!items.length) return "";
  return section(nextUp(items, lang, UI.nextUp), { tone: "light", cls: "sec-tight" });
}
