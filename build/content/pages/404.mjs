import { T, tx } from "../../lib/html.mjs";
import { btn } from "../../lib/components.mjs";
import { url } from "../site.mjs";

export default function notFound(lang) {
  const ar = lang === "ar";
  const body = `
<section class="nf">
  <div class="wrap">
    <p class="nf-code" aria-hidden="true">404</p>
    <h1 class="h2">${ar ? "هذه الصفحة غير موجودة." : "This page does not exist."}</h1>
    <p>${ar
      ? "ربما تغيّر عنوانها، أو أن الرابط الذي وصلت منه لم يعد صحيحًا. كل ما نبنيه متاح من الصفحة الرئيسية."
      : "It may have moved, or the link that brought you here is out of date. Everything we build is reachable from the home page."}</p>
    <p>${btn(ar ? "إلى الصفحة الرئيسية" : "Back to the home page", url("home", lang), { kind: "primary", lang })}</p>
  </div>
</section>`;

  return {
    route: "home", /* canonical + hreflang resolve to the home route */
    solidHeader: false,
    hideCta: true,
    noindex: true,
    title: T("Page not found — Qeonix", "الصفحة غير موجودة — كيونكس"),
    description: T("The page you requested does not exist.", "الصفحة المطلوبة غير موجودة."),
    og: "default",
    body,
  };
}
