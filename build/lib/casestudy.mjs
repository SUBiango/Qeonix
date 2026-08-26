/* Case study template, intentionally NOT wired into any route.
   When management approves a reference, create build/content/pages/case-<slug>.mjs
   that calls caseStudy() with approved content only, register the route in
   content/site.mjs, and link it from the relevant sector page.

   Publication rules:
     - `approval.status` must be "approved" or the build refuses to render it.
     - No customer name, quote, metric or imagery may appear unless it is part
       of the approved payload.                                                */

import { T, tx, esc } from "./html.mjs";
import { section, secHead, factStrip, statement } from "./components.mjs";
import { markRule } from "./diagrams.mjs";

export function caseStudy(cs, lang) {
  if (!cs.approval || cs.approval.status !== "approved") {
    throw new Error(`caseStudy(): "${cs.slug}" is not approved for publication (status: ${cs.approval && cs.approval.status})`);
  }

  const block = (kicker, h, body) => section(`
    ${secHead({ kicker, h }, lang)}
    ${body}
  `, { tone: "light" });

  return `
${block(T("The challenge", "التحدي"), cs.challenge.h, `<p class="lead">${tx(cs.challenge.p, lang)}</p>`)}
${block(T("Operating environment", "بيئة التشغيل"), cs.environment.h, `<p class="lead">${tx(cs.environment.p, lang)}</p>`)}
${block(T("Architecture & Qeonix role", "البنية ودور كيونيكس"), cs.role.h, `
  <p class="lead">${tx(cs.role.p, lang)}</p>
  ${cs.technology ? `<ul class="cap-tags u-mt-s">${cs.technology.map((x) => `<li>${tx(x, lang)}</li>`).join("")}</ul>` : ""}
`)}
${cs.deployment ? block(T("Deployment model", "نموذج النشر"), cs.deployment.h, `<p class="lead">${tx(cs.deployment.p, lang)}</p>`) : ""}
${cs.outcomes ? section(factStrip(cs.outcomes, lang), { tone: "paper", cls: "sec-tight" }) : ""}
${cs.quote ? section(statement({ text: cs.quote.text, attribution: cs.quote.by }, lang), { tone: "accent", cls: "sec-tight" }) : ""}
`;
}
