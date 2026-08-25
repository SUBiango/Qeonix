/* Operational product showcases.
   High-fidelity conceptual interfaces built in HTML/CSS/SVG, the point is to
   show the *kind* of operating software Qeonix engineers, not to imitate any
   customer environment. Rules enforced here:
     - Qeonix-branded, neutral environments only (no agency or customer names,
       no real districts, no invented deployments).
     - Every console carries an explicit "conceptual environment" caption.
     - Figures inside a console are illustrative UI state, never company
       metrics; anything resembling a company proof point stays out.
   All strings bilingual; layouts are CSS-grid and re-stack on mobile; the
   whole layer is HTML-first so it mirrors correctly under dir="rtl". */

import { T, tx, t, esc } from "./html.mjs";
import { icon } from "./icons.mjs";

/* Console chrome. Consoles are intentionally dark on any page tone,
   operational software reads as itself, and the contrast gives the page its
   proof moments. */
export function consoleFrame({ name, env, panes, cls = "" }, lang) {
  return `<figure class="qx-console${cls ? " " + cls : ""}" role="img" aria-label="${tx(name, lang)}">
  <div class="qxc-bar">
    <span class="qxc-mark" aria-hidden="true"><i></i><i></i><i></i></span>
    <span class="qxc-name">${tx(name, lang)}</span>
    <span class="qxc-env mono">${tx(env, lang)}</span>
    <span class="qxc-lights" aria-hidden="true"><i></i><i></i><i></i></span>
  </div>
  <div class="qxc-body">${panes}</div>
  <figcaption class="qxc-cap mono">${lang === "ar"
    ? "بيئة منتج توضيحية: واجهة منصّة كيونكس، وبيانات للعرض فقط"
    : "Conceptual product environment: Qeonix platform UI, illustrative data"}</figcaption>
</figure>`;
}

const S = (en, ar) => T(en, ar);

/* ------------------------------------------------------------------
   1 · AGENTIC RUN: an agent completing a piece of work, end to end.
   ------------------------------------------------------------------ */
export function agenticTrace(lang, { interactive = false } = {}) {
  const steps = [
    { t: "00.0", actor: S("Request", "الطلب"), kind: "in", text: S("Resident asks to transfer a trade license to a new address", "متعامل يطلب نقل رخصة تجارية إلى عنوان جديد"), status: "done" },
    { t: "00.4", actor: S("Orchestrator", "المنسّق"), kind: "core", text: S("Intent resolved → plan: verify, check premises, draft case", "تحديد النية → الخطة: تحقّق، فحص العقار، إعداد الملف"), status: "done" },
    { t: "01.1", actor: S("Service agent", "وكيل الخدمة"), kind: "agent", text: S("Identity verified via digital ID · license record retrieved", "التحقّق من الهوية عبر الهوية الرقمية · استرجاع سجل الرخصة"), tool: S("Registry API", "واجهة السجل"), status: "done" },
    { t: "02.3", actor: S("Policy agent", "وكيل السياسات"), kind: "agent", text: S("New premises zoning checked against license activity class", "فحص تنظيم العقار الجديد مقابل فئة نشاط الرخصة"), tool: S("Zoning rules", "قواعد التنظيم"), status: "done" },
    { t: "02.9", actor: S("Service agent", "وكيل الخدمة"), kind: "agent", text: S("Case assembled · fees computed · payment link prepared", "تجميع الملف · احتساب الرسوم · تجهيز رابط الدفع"), tool: S("Case + payments", "الحالات والمدفوعات"), status: "done" },
    { t: "03.2", actor: S("Human checkpoint", "نقطة المراجعة البشرية"), kind: "human", text: S("Address change on an active license → routed to duty officer", "تغيير عنوان على رخصة فعّالة → إحالة إلى الموظف المناوب"), status: "wait" },
    { t: "–", actor: S("Audit", "التدقيق"), kind: "audit", text: S("Full trace retained: inputs, retrievals, tool calls, approver", "الاحتفاظ بالأثر كاملًا: المدخلات والاسترجاعات واستدعاءات الأدوات والمعتمِد"), status: "log" },
  ];

  const rows = steps.map((s2) => `
    <li class="qxr is-${s2.kind}" data-s="${s2.status}">
      <span class="qxr-t mono">${esc(s2.t)}</span>
      <span class="qxr-actor">${tx(s2.actor, lang)}</span>
      <span class="qxr-text">${tx(s2.text, lang)}${s2.tool ? ` <em class="qxr-tool mono">${tx(s2.tool, lang)}</em>` : ""}</span>
      <span class="qxr-s mono" data-s="${s2.status}">${
        s2.status === "done" ? (lang === "ar" ? "تم" : "done")
        : s2.status === "wait" ? (lang === "ar" ? "بانتظار الاعتماد" : "awaiting approval")
        : (lang === "ar" ? "سجل" : "record")}</span>${
        s2.status === "wait" ? `<span class="qxr-s qxr-s-ok mono" data-s="done" hidden>${lang === "ar" ? "تمت الموافقة" : "approved"}</span>` : ""}
    </li>`).join("");

  const context = [
    [S("Run ID", "معرّف التشغيل"), "QX-RUN-58F2C1"],
    [S("Permissions", "الصلاحيات"), lang === "ar" ? "قراءة السجل · إنشاء حالة · لا مدفوعات" : "registry read · case create · no payments"],
    [S("Model route", "مسار النموذج"), lang === "ar" ? "استدلال داخل الحدود" : "in-boundary inference"],
    [S("Tools allowed", "الأدوات المتاحة"), "4 / 31"],
    [S("Escalation", "التصعيد"), lang === "ar" ? "موظف مناوب: قسم التراخيص" : "duty officer: licensing"],
  ].map(([k, v]) => `<div class="qxk"><span class="qxk-k mono">${tx(k, lang)}</span><span class="qxk-v">${esc(t(v, lang))}</span></div>`).join("");

  const controls = interactive ? `
    <div class="steprun-controls">
      <button type="button" class="btn btn-primary steprun-run">
        <span data-when="idle">${lang === "ar" ? "شغّل الطلب" : "Run the request"}</span>
        <span data-when="done" hidden>${lang === "ar" ? "أعد التشغيل" : "Replay"}</span>
      </button>
      <button type="button" class="btn btn-invert steprun-approve" hidden>
        <span>${lang === "ar" ? "اعتمد وتابع" : "Approve and continue"}</span>
      </button>
      <p class="steprun-hint mono">${lang === "ar" ? "أنت نقطة المراجعة البشرية في هذا التشغيل." : "You are the human checkpoint in this run."}</p>
    </div>` : "";

  const panes = `
  <section class="qxp qxp-main">
    <h4 class="qxp-h mono">${lang === "ar" ? "تشغيل وكيل · مباشر" : "Agent run · live"}</h4>
    ${controls}
    <ol class="qx-trace"${interactive ? ' aria-live="polite"' : ""}>${rows}</ol>
  </section>
  <aside class="qxp qxp-side">
    <h4 class="qxp-h mono">${lang === "ar" ? "سياق التشغيل" : "Run context"}</h4>
    ${context}
    <div class="qxk qxk-note"><span class="qxk-k mono">${lang === "ar" ? "الحوكمة" : "Governance"}</span>
    <span class="qxk-v">${lang === "ar" ? "كل خطوة أعلاه قابلة للتتبّع والإلغاء والتدقيق." : "Every step above is traceable, revocable and auditable."}</span></div>
  </aside>`;

  return consoleFrame({
    name: S("Qeonix Agentic Platform: Operations Console", "منصّة كيونكس الوكيلة: لوحة العمليات"),
    env: S("Sovereign deployment", "نشر سيادي"),
    panes, cls: interactive ? "qx-agentic is-steprun" : "qx-agentic",
  }, lang);
}

/* ------------------------------------------------------------------
   2 · GOVERNMENT / CITY OPERATIONS: the command view.
   ------------------------------------------------------------------ */
export function govOpsConsole(lang) {
  const ar = lang === "ar";
  const kpis = [
    [S("Open requests", "طلبات مفتوحة"), "1,284", null],
    [S("Median resolution", "متوسط الإنجاز"), ar ? "٢٫١ يوم" : "2.1 days", "good"],
    [S("First-time fix", "إصلاح من أول زيارة"), "87%", "good"],
    [S("SLA at risk", "اتفاقيات معرّضة"), "17", "warn"],
  ].map(([k, v, tone]) => `<div class="qxt${tone ? " is-" + tone : ""}"><span class="qxt-v">${esc(v)}</span><span class="qxt-k mono">${tx(k, lang)}</span></div>`).join("");

  const queue = [
    [S("Streetlight fault · Zone 4", "عطل إنارة · المنطقة ٤"), S("Crew assigned", "فريق مُكلَّف"), "ok"],
    [S("License transfer · commercial", "نقل رخصة · تجاري"), S("Awaiting approval", "بانتظار الاعتماد"), "wait"],
    [S("Water pressure report · Zone 2", "بلاغ ضغط مياه · المنطقة ٢"), S("Triage: vision match 0.94", "فرز: تطابق رؤية ٠٫٩٤"), "ok"],
    [S("Illegal dumping · camera event", "رمي مخلفات · حدث كاميرا"), S("Work order created", "أُنشئ أمر عمل"), "ok"],
    [S("Permit inspection · site 8", "تفتيش تصريح · موقع ٨"), S("SLA at risk: 4h left", "اتفاقية معرّضة: ٤ ساعات"), "warn"],
  ].map(([a, b, s2]) => `<li class="qxq" data-s="${s2}"><span class="qxq-t">${tx(a, lang)}</span><span class="qxq-s mono">${tx(b, lang)}</span></li>`).join("");

  const health = [
    [S("Digital identity", "الهوية الرقمية"), "ok"], [S("Payments", "المدفوعات"), "ok"],
    [S("Notifications", "الإشعارات"), "ok"], [S("GIS / spatial", "نظم جغرافية"), "ok"],
    [S("Legacy permits system", "نظام التصاريح القديم"), "warn"], [S("Field mobile", "تطبيق الميدان"), "ok"],
  ].map(([k, s2]) => `<li class="qxh" data-s="${s2}"><i aria-hidden="true"></i><span>${tx(k, lang)}</span><span class="qxh-s mono">${s2 === "ok" ? (ar ? "سليم" : "healthy") : (ar ? "متأخر" : "degraded")}</span></li>`).join("");

  const field = [
    [S("Crew 12 · electrical", "فريق ١٢ · كهرباء"), S("En route · 14 min", "في الطريق · ١٤ دقيقة")],
    [S("Crew 05 · water", "فريق ٥ · مياه"), S("On site", "في الموقع")],
    [S("Inspector 3 · permits", "مفتش ٣ · تصاريح"), S("2 visits queued", "زيارتان مجدولتان")],
  ].map(([k, v]) => `<li class="qxf"><span>${tx(k, lang)}</span><span class="qxf-s mono">${tx(v, lang)}</span></li>`).join("");

  const panes = `
  <div class="qxp qxp-strip">${kpis}</div>
  <section class="qxp qxp-main">
    <h4 class="qxp-h mono">${ar ? "قائمة الخدمة · مباشر" : "Service queue · live"}</h4>
    <ul class="qx-queue">${queue}</ul>
  </section>
  <aside class="qxp qxp-side">
    <h4 class="qxp-h mono">${ar ? "صحة التكامل" : "Integration health"}</h4>
    <ul class="qx-health">${health}</ul>
    <h4 class="qxp-h mono">${ar ? "الميدان" : "Field workforce"}</h4>
    <ul class="qx-field">${field}</ul>
  </aside>`;

  return consoleFrame({
    name: S("Qeonix Government Platform: City Operations", "منصّة كيونكس الحكومية: عمليات المدينة"),
    env: S("Government cloud", "سحابة حكومية"),
    panes, cls: "qx-gov",
  }, lang);
}

/* ------------------------------------------------------------------
   3 · AUTONOMOUS MISSION: sense → detect → decide → dispatch.
   ------------------------------------------------------------------ */
export function missionConsole(lang) {
  const ar = lang === "ar";
  const map = `
  <svg class="qx-map" viewBox="0 0 520 300" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
    <g class="qxm-grid">${Array.from({ length: 9 }, (_, i) => `<line x1="${i * 65}" y1="0" x2="${i * 65}" y2="300"/>`).join("")}
      ${Array.from({ length: 5 }, (_, i) => `<line x1="0" y1="${i * 75}" x2="520" y2="${i * 75}"/>`).join("")}</g>
    <path class="qxm-asset" d="M20 240 C120 235 150 150 250 145 S 420 90 500 70"/>
    <path class="qxm-path" d="M20 250 C120 245 150 160 250 155 S 420 100 500 80"/>
    <g class="qxm-wp">${[[20,250],[140,213],[250,155],[380,122],[500,80]].map(([x,y]) => `<circle cx="${x}" cy="${y}" r="4"/>`).join("")}</g>
    <g class="qxm-det qxm-det-1"><circle cx="205" cy="168" r="7"/><circle class="qxm-ping" cx="205" cy="168" r="7"/></g>
    <g class="qxm-det qxm-det-2"><circle cx="415" cy="108" r="7"/><circle class="qxm-ping" cx="415" cy="108" r="7"/></g>
    <g class="qxm-drone"><path d="M-7 -7h5v5h-5zM2 -7h5v5h-5zM-7 2h5v5h-5zM2 2h5v5h-5z"/></g>
  </svg>`;

  const feed = [
    [S("Corridor scan 7 of 12 · thermal + visual", "مسح الممر ٧ من ١٢ · حراري وبصري"), S("in progress", "قيد التنفيذ"), "ok"],
    [S("Detection · joint corrosion, segment K-4", "رصد · تآكل وصلة، المقطع K-4"), S("severity 3 / 5", "الخطورة ٣/٥"), "warn"],
    [S("Decision · within response threshold", "قرار · ضمن حدّ الاستجابة"), S("auto", "آلي"), "ok"],
    [S("Work order dispatched to maintenance", "أمر عمل أُرسل إلى الصيانة"), S("WO-2418", "WO-2418"), "ok"],
    [S("Evidence pack archived · geo-tagged", "حزمة أدلّة مؤرشفة · بإسناد جغرافي"), S("record", "سجل"), "log"],
  ].map(([a, b, s2]) => `<li class="qxq" data-s="${s2}"><span class="qxq-t">${tx(a, lang)}</span><span class="qxq-s mono">${tx(b, lang)}</span></li>`).join("");

  const panes = `
  <section class="qxp qxp-main qxp-map">
    <h4 class="qxp-h mono">${ar ? "المهمة · ممر خطوط الخدمات" : "Mission · utility corridor"}</h4>
    ${map}
  </section>
  <aside class="qxp qxp-side">
    <h4 class="qxp-h mono">${ar ? "بث الرصد" : "Detection feed"}</h4>
    <ul class="qx-queue qx-feed">${feed}</ul>
    <div class="qxk"><span class="qxk-k mono">${ar ? "الصلاحية" : "Authority"}</span>
    <span class="qxk-v">${ar ? "استقلالية مُشرَف عليها: المشغّل يملك القرار خارج النطاق المصرَّح." : "Supervised autonomy: the operator owns anything outside the cleared envelope."}</span></div>
  </aside>`;

  return consoleFrame({
    name: S("Qeonix Autonomy: Mission Control", "استقلالية كيونكس: قيادة المهام"),
    env: S("On-premise", "داخل المنشأة"),
    panes, cls: "qx-mission",
  }, lang);
}

/* ------------------------------------------------------------------
   4 · MOBILITY NETWORK: one network, rebalanced live.
   ------------------------------------------------------------------ */
export function mobilityConsole(lang) {
  const ar = lang === "ar";
  const modes = [
    [S("Metro line A", "خط المترو أ"), S("2-min headway", "تواتر دقيقتين"), "ok"],
    [S("Bus network", "شبكة الحافلات"), S("94% on time", "٩٤٪ في الموعد"), "ok"],
    [S("Corridor 5 · road", "الممر ٥ · طرق"), S("incident: rerouting", "حادث: إعادة توجيه"), "warn"],
    [S("Parking · district core", "المواقف · قلب المدينة"), S("81% occupied", "إشغال ٨١٪"), "ok"],
    [S("EV charging", "شحن المركبات"), S("312 / 340 online", "٣١٢/٣٤٠ متاح"), "ok"],
  ].map(([k, v, s2]) => `<li class="qxh" data-s="${s2}"><i aria-hidden="true"></i><span>${tx(k, lang)}</span><span class="qxh-s mono">${tx(v, lang)}</span></li>`).join("");

  const actions = [
    [S("Demand spike forecast · stadium event 18:30", "توقّع ذروة طلب · فعالية الاستاد ١٨:٣٠"), S("forecast", "تنبؤ"), "ok"],
    [S("6 additional buses staged on corridor 5", "تجهيز ٦ حافلات إضافية على الممر ٥"), S("dispatched", "أُرسلت"), "ok"],
    [S("Journey planner rerouted around incident", "أعاد مخطّط الرحلات التوجيه حول الحادث"), S("auto", "آلي"), "ok"],
    [S("Dynamic parking price applied · zone P-2", "تسعير مواقف ديناميكي · النطاق P-2"), S("policy", "سياسة"), "log"],
  ].map(([a, b, s2]) => `<li class="qxq" data-s="${s2}"><span class="qxq-t">${tx(a, lang)}</span><span class="qxq-s mono">${tx(b, lang)}</span></li>`).join("");

  const panes = `
  <section class="qxp qxp-main">
    <h4 class="qxp-h mono">${ar ? "استجابة الشبكة · مباشر" : "Network response · live"}</h4>
    <ul class="qx-queue">${actions}</ul>
  </section>
  <aside class="qxp qxp-side">
    <h4 class="qxp-h mono">${ar ? "حالة الوسائط" : "Mode status"}</h4>
    <ul class="qx-health">${modes}</ul>
  </aside>`;

  return consoleFrame({
    name: S("Qeonix Mobility: Network Operations", "تنقل كيونكس: عمليات الشبكة"),
    env: S("Private cloud", "سحابة خاصة"),
    panes, cls: "qx-mobility",
  }, lang);
}

/* ------------------------------------------------------------------
   PLATFORM STACK: the signature construct.
   The three bars of the Qeonix "E", read as the operating stack:
   interfaces / domain platforms / intelligence foundation.
   ------------------------------------------------------------------ */
export function platformStack(lang) {
  const ar = lang === "ar";
  const tiers = [
    {
      k: S("Operational interfaces", "الواجهات التشغيلية"),
      note: S("Where people and machines meet the system", "حيث يلتقي الأشخاص والآلات بالنظام"),
      items: [S("Residents", "المتعاملون"), S("Operators", "المشغّلون"), S("Field teams", "الفرق الميدانية"), S("Decision makers", "صنّاع القرار"), S("Machines & fleets", "الآلات والأساطيل")],
    },
    {
      k: S("Domain platforms", "منصّات المجالات"),
      note: S("Vertical systems assembled on the same foundation", "أنظمة قطاعية تُبنى على الأساس نفسه"),
      items: [S("Government", "الحكومة"), S("Cities", "المدن"), S("Mobility", "التنقل"), S("Healthcare", "الرعاية الصحية"), S("Autonomous operations", "العمليات ذاتية التشغيل")],
    },
    {
      k: S("Qeonix intelligence foundation", "أساس كيونكس الذكي"),
      note: S("Reusable, governed, deployable inside your boundary", "قابل لإعادة الاستخدام، محكوم، وقابل للنشر داخل حدودكم"),
      items: [S("AI & vision", "الذكاء والرؤية"), S("Agents & orchestration", "الوكلاء والتنسيق"), S("Data", "البيانات"), S("Identity", "الهوية"), S("Workflow", "سير العمل"), S("Integration", "التكامل"), S("Observability", "قابلية المراقبة"), S("Security", "الأمن")],
    },
  ];

  const bars = tiers.map((tier, i) => `
    <div class="stk-bar" data-d="${i}">
      <div class="stk-meta">
        <span class="stk-ix mono">${ar ? ["٠١", "٠٢", "٠٣"][i] : "0" + (i + 1)}</span>
        <h3 class="stk-k">${tx(tier.k, lang)}</h3>
        <p class="stk-note">${tx(tier.note, lang)}</p>
      </div>
      <ul class="stk-items">${tier.items.map((it) => `<li>${tx(it, lang)}</li>`).join("")}</ul>
    </div>
    ${i < 2 ? `<div class="stk-gap" aria-hidden="true"><span></span><span></span><span></span></div>` : ""}`).join("");

  return `<div class="stack reveal" aria-label="${ar ? "منظومة التشغيل من كيونكس" : "The Qeonix operating stack"}">
  <div class="stk-legend" aria-hidden="true">
    <span class="stk-e"><i></i><i></i><i></i></span>
    <span class="stk-cap mono">${ar ? "الأشرطة الثلاثة" : "The three bars"}</span>
  </div>
  <div class="stk-bars">${bars}</div>
</div>`;
}

/* ------------------------------------------------------------------
   SOVEREIGN BOUNDARY: where things run, stay and stop.
   ------------------------------------------------------------------ */
export function boundaryMatrix(lang) {
  const ar = lang === "ar";
  const cols = [
    S("Public cloud", "سحابة عامة"),
    S("Private cloud", "سحابة خاصة"),
    S("Customer data center", "مركز بيانات العميل"),
    S("Isolated environment", "بيئة معزولة"),
  ];
  /* cell values: in = inside boundary · ctl = customer-controlled · x = unavailable/blocked */
  const rows = [
    { k: S("Where the model runs", "أين يعمل النموذج"), v: [S("Provider or hosted", "لدى المزوّد أو مستضاف"), S("Dedicated tenancy", "استضافة مخصّصة"), S("Inside your racks", "داخل أجهزتكم"), S("Inside the enclave", "داخل البيئة المعزولة")], tone: ["mix", "in", "in", "in"] },
    { k: S("Where the data stays", "أين تبقى البيانات"), v: [S("Region-pinned", "مثبّتة في الإقليم"), S("Your tenancy", "استضافتكم"), S("Your facility", "منشأتكم"), S("Never leaves", "لا تغادر أبدًا")], tone: ["mix", "in", "in", "in"] },
    { k: S("Who controls access", "من يتحكم بالوصول"), v: [S("Shared model", "نموذج مشترك"), S("Your IAM", "إدارة هويتكم"), S("Your IAM", "إدارة هويتكم"), S("Your IAM only", "إدارة هويتكم فقط")], tone: ["mix", "ctl", "ctl", "ctl"] },
    { k: S("External model calls", "الاستدعاءات الخارجية للنماذج"), v: [S("Permitted per policy", "مسموحة وفق السياسة"), S("Logged, per data class", "مسجّلة حسب تصنيف البيانات"), S("Explicit allow-list", "قائمة سماح صريحة"), S("Blocked", "محجوبة")], tone: ["mix", "mix", "ctl", "x"] },
    { k: S("Agent governance", "حوكمة الوكلاء"), v: [S("Full control plane", "طبقة تحكم كاملة"), S("Full control plane", "طبقة تحكم كاملة"), S("Full control plane", "طبقة تحكم كاملة"), S("Full + offline audit", "كاملة مع تدقيق دون اتصال")], tone: ["ctl", "ctl", "ctl", "ctl"] },
  ];

  const head = `<tr><th class="bnd-corner" scope="col"><span class="vh">${ar ? "البُعد" : "Dimension"}</span></th>${cols.map((c) => `<th scope="col">${tx(c, lang)}</th>`).join("")}</tr>`;
  const body = rows.map((r) => `<tr><th scope="row">${tx(r.k, lang)}</th>${r.v.map((v, i) => `<td data-tone="${r.tone[i]}"><span>${tx(v, lang)}</span></td>`).join("")}</tr>`).join("");

  return `<div class="bnd reveal">
  <div class="bnd-scroll" role="region" aria-label="${ar ? "مصفوفة حدود النشر" : "Deployment boundary matrix"}" tabindex="0">
    <table class="bnd-table">
      <thead>${head}</thead>
      <tbody>${body}</tbody>
    </table>
  </div>
  <p class="bnd-legend mono">
    <span data-tone="in">${ar ? "داخل حدودكم" : "inside your boundary"}</span>
    <span data-tone="ctl">${ar ? "تحت تحكمكم" : "under your control"}</span>
    <span data-tone="mix">${ar ? "حسب السياسة" : "policy-dependent"}</span>
    <span data-tone="x">${ar ? "محجوب بالتصميم" : "blocked by design"}</span>
  </p>
</div>`;
}

/* ------------------------------------------------------------------
   INTERACTIVE DIGITAL TWIN: a playable district.
   Three scripted scenarios; the visitor causes something and watches the
   sense → decide → dispatch → resolve loop close. All narrative rows are
   prerendered per language (JS only reveals them), KPI values are encoded
   as data attributes at build time, so the runtime script is string-free,
   CSP-safe and identical for both languages. The map is intentionally NOT
   mirrored in RTL: operational maps keep their geography.
   ------------------------------------------------------------------ */
export function cityTwin(lang) {
  const ar = lang === "ar";

  /* ---- scenario definitions ---- */
  const SCN = [
    {
      k: "incident", icon: "vehicle",
      label: S("Road incident", "حادث طريق"),
      sub: S("Corridor blocked at peak", "إغلاق ممر في الذروة"),
      kpi: { flow: ar ? "٨٤٪" : "84%", crews: ar ? "٣" : "3", events: ar ? "١" : "1" },
      rows: [
        [S("Collision reported · main corridor, mid-section", "بلاغ تصادم · الممر الرئيسي، المقطع الأوسط"), S("camera event", "حدث كاميرا"), "warn"],
        [S("Signal plan switched · traffic rerouted via north loop", "تبديل خطة الإشارات · تحويل المرور عبر الحلقة الشمالية"), S("auto", "آلي"), "ok"],
        [S("Journey planners and signage updated in real time", "تحديث مخطّطات الرحلات واللوحات آنيًا", ), S("auto", "آلي"), "ok"],
        [S("Response crew dispatched from depot", "إرسال فريق استجابة من المستودع"), S("dispatched", "أُرسل"), "ok"],
        [S("Lane cleared · corridor restored · report archived", "إخلاء المسار · استعادة الممر · أرشفة التقرير"), S("resolved", "أُنجز"), "log"],
      ],
    },
    {
      k: "fault", icon: "bolt",
      label: S("Asset fault", "عطل أصل"),
      sub: S("District lighting failure", "عطل إنارة في الحي"),
      kpi: { flow: ar ? "٩٦٪" : "96%", crews: ar ? "٣" : "3", events: ar ? "١" : "1" },
      rows: [
        [S("Telemetry drop · lighting segment, north district", "انقطاع قياس · قطاع الإنارة، الحي الشمالي"), S("sensor", "مستشعر"), "warn"],
        [S("Fault matched to asset record · warranty checked", "مطابقة العطل بسجل الأصل · فحص الضمان"), S("auto", "آلي"), "ok"],
        [S("Work order created with parts and access requirements", "إنشاء أمر عمل بقطع الغيار ومتطلبات الوصول"), S("WO-1093", "WO-1093"), "ok"],
        [S("Electrical crew routed · residents notified of works", "توجيه فريق الكهرباء · إشعار السكان بالأعمال"), S("dispatched", "أُرسل"), "ok"],
        [S("Segment restored · asset history updated", "استعادة القطاع · تحديث سجل الأصل"), S("resolved", "أُنجز"), "log"],
      ],
    },
    {
      k: "event", icon: "people",
      label: S("Stadium event", "فعالية الاستاد"),
      sub: S("40,000 people, one evening", "٤٠ ألف شخص في أمسية واحدة"),
      kpi: { flow: ar ? "٩١٪" : "91%", crews: ar ? "٣" : "3", events: ar ? "١" : "1" },
      rows: [
        [S("Demand forecast · stadium event confirmed for 19:00", "توقّع طلب · تأكيد فعالية الاستاد للسابعة مساءً"), S("forecast", "تنبؤ"), "ok"],
        [S("Extra transit capacity staged on the east corridor", "تجهيز سعة نقل إضافية على الممر الشرقي"), S("dispatched", "أُرسل"), "ok"],
        [S("Dynamic parking pricing applied around the venue", "تطبيق تسعير مواقف ديناميكي حول الموقع"), S("policy", "سياسة"), "ok"],
        [S("Crowd egress plan pushed to operations and field teams", "إرسال خطة المغادرة إلى العمليات والفرق الميدانية"), S("auto", "آلي"), "ok"],
        [S("Event closed · network back to baseline", "إغلاق الفعالية · عودة الشبكة لوضعها الأساسي"), S("resolved", "أُنجز"), "log"],
      ],
    },
  ];

  const KPIS = [
    { id: "flow", label: S("Network flow", "تدفق الشبكة"), idle: ar ? "٩٨٪" : "98%" },
    { id: "crews", label: S("Crews available", "فرق متاحة"), idle: ar ? "٤" : "4" },
    { id: "events", label: S("Open events", "أحداث مفتوحة"), idle: ar ? "٠" : "0" },
  ];

  /* ---- map ---- */
  const label = (x, y, en2, ar2, anchor = "middle") =>
    `<text x="${x}" y="${y}" text-anchor="${anchor}" class="twm-label">${esc(ar ? ar2 : en2)}</text>`;

  const map = `
  <svg class="qx-map twin-map" viewBox="0 0 760 480" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
    <g class="qxm-grid">${Array.from({ length: 13 }, (_, i) => `<line x1="${i * 63}" y1="0" x2="${i * 63}" y2="480"/>`).join("")}
      ${Array.from({ length: 9 }, (_, i) => `<line x1="0" y1="${i * 60}" x2="760" y2="${i * 60}"/>`).join("")}</g>

    <g class="twm-blocks">
      <rect x="250" y="60" width="120" height="80" rx="6"/>
      <rect x="420" y="220" width="90" height="60" rx="6"/>
      <rect x="90" y="340" width="130" height="80" rx="6"/>
      <rect x="300" y="350" width="110" height="70" rx="6"/>
    </g>

    <path class="twm-road" d="M200 20V460M560 20V460M40 100H720M40 380H720"/>
    <path class="twm-artery" d="M40 300H720"/>
    <path class="twm-flow" d="M40 300H720"/>
    <path class="twm-alt" d="M200 300V180H560V300"/>
    <path class="twm-altflow" d="M40 300H200V180H560V300H720"/>

    <g class="twm-depot">
      <rect x="46" y="66" width="52" height="40" rx="7"/>
      <path d="M58 86h28M58 94h18" class="twm-depot-mark"/>
      ${label(72, 126, "Depot", "المستودع")}
    </g>

    <g class="twm-light">
      <circle cx="620" cy="80" r="9"/>
      <path class="twm-rays" d="M620 62v-8M620 106v-8M602 80h-8M646 80h-8M633 67l6-6M607 93l-6 6M607 67l-6-6M633 93l6 6"/>
      ${label(620, 126, "District lights", "إنارة الحي")}
    </g>

    <g class="twm-stadium">
      <ellipse cx="648" cy="424" rx="46" ry="26"/>
      <ellipse cx="648" cy="424" rx="24" ry="12"/>
      ${label(648, 470, "Stadium", "الاستاد")}
    </g>

    <g class="twm-inc" aria-hidden="true">
      <circle cx="380" cy="300" r="12"/>
      <path d="M375 295l10 10M385 295l-10 10"/>
    </g>

    ${label(72, 292, "Main corridor", "الممر الرئيسي", ar ? "middle" : "start")}
    <circle class="twm-crew" cx="0" cy="0" r="7"/>
  </svg>`;

  /* ---- controls + log ---- */
  const controls = SCN.map((s2) => `
    <button type="button" class="twin-btn" data-twin-btn="${s2.k}" aria-pressed="false"
      data-kpi-flow="${esc(s2.kpi.flow)}" data-kpi-crews="${esc(s2.kpi.crews)}" data-kpi-events="${esc(s2.kpi.events)}">
      <span class="twin-btn-ico" aria-hidden="true">${icon(s2.icon)}</span>
      <span class="twin-btn-tx"><strong>${tx(s2.label, lang)}</strong><span>${tx(s2.sub, lang)}</span></span>
    </button>`).join("");

  const logRows = SCN.map((s2) => s2.rows.map((r, i) => `
    <li class="qxq twin-row" data-scn="${s2.k}" data-step="${i}" data-s="${r[2]}" hidden>
      <span class="qxq-t">${tx(r[0], lang)}</span>
      <span class="qxq-s mono">${tx(r[1], lang)}</span>
    </li>`).join("")).join("");

  const kpis = KPIS.map((k) => `
    <div class="qxt"><span class="qxt-v" data-twin-kpi="${k.id}" data-idle="${esc(k.idle)}">${esc(k.idle)}</span>
    <span class="qxt-k mono">${tx(k.label, lang)}</span></div>`).join("");

  const panes = `
  <div class="qxp qxp-strip twin-strip">${kpis}</div>
  <section class="qxp qxp-main qxp-map">
    <h4 class="qxp-h mono">${ar ? "منطقة المحاكاة · مباشر" : "Simulated district · live"}</h4>
    ${map}
  </section>
  <aside class="qxp qxp-side">
    <h4 class="qxp-h mono">${ar ? "جرّب سيناريو" : "Run a scenario"}</h4>
    <div class="twin-controls" role="group" aria-label="${ar ? "سيناريوهات المحاكاة" : "Simulation scenarios"}">${controls}</div>
    <h4 class="qxp-h mono">${ar ? "استجابة النظام" : "System response"}</h4>
    <ol class="qx-queue twin-log" aria-live="polite">
      <li class="qxq twin-idle" data-s="log"><span class="qxq-t">${ar ? "اختر سيناريو أعلاه، ثم راقب الحلقة وهي تُغلق." : "Pick a scenario above, then watch the loop close."}</span></li>
      ${logRows}
    </ol>
  </aside>`;

  return consoleFrame({
    name: S("Qeonix Digital Twin: District Simulation", "التوأم الرقمي من كيونكس: محاكاة حي"),
    env: S("Interactive demo", "عرض تفاعلي"),
    panes, cls: "qx-twin",
  }, lang);
}

/* ------------------------------------------------------------------
   5 · HEALTHCARE: care orchestration, strictly administrative.
   No clinical decision-making is depicted: the console coordinates
   referrals, eligibility, scheduling and follow-up: the operational
   layer of care, not the medicine.
   ------------------------------------------------------------------ */
export function healthConsole(lang) {
  const ar = lang === "ar";
  const kpis = [
    [S("Appointments today", "مواعيد اليوم"), ar ? "٦٤٢" : "642", null],
    [S("Referral turnaround", "زمن معالجة الإحالة"), ar ? "١٫٤ يوم" : "1.4 days", "good"],
    [S("Follow-ups on track", "متابعات ملتزمة"), ar ? "٩٣٪" : "93%", "good"],
    [S("Slots at risk", "مواعيد معرّضة"), ar ? "٩" : "9", "warn"],
  ].map(([k, v, tone]) => `<div class="qxt${tone ? " is-" + tone : ""}"><span class="qxt-v">${esc(v)}</span><span class="qxt-k mono">${tx(k, lang)}</span></div>`).join("");

  const journey = [
    [S("Referral received · imaging, routine priority", "إحالة واردة · تصوير، أولوية اعتيادية"), S("routed", "وُجّهت"), "ok"],
    [S("Eligibility and insurance pre-check completed", "اكتمال التحقّق المسبق من الأهلية والتأمين"), S("auto", "آلي"), "ok"],
    [S("Appointment offered · nearest suitable slot, 2 sites", "عرض موعد · أقرب موعد مناسب في موقعين"), S("booked", "حُجز"), "ok"],
    [S("Pre-visit instructions sent in patient's language", "إرسال تعليمات ما قبل الزيارة بلغة المريض"), S("notified", "أُشعر"), "ok"],
    [S("No-show risk flagged · reminder sequence adjusted", "رصد احتمال تغيّب · تعديل تسلسل التذكير"), S("policy", "سياسة"), "warn"],
    [S("Visit summary routed to referring provider", "إحالة ملخّص الزيارة إلى المزوّد المُحيل"), S("record", "سجل"), "log"],
  ].map(([a, b, s2]) => `<li class="qxq" data-s="${s2}"><span class="qxq-t">${tx(a, lang)}</span><span class="qxq-s mono">${tx(b, lang)}</span></li>`).join("");

  const health = [
    [S("EHR / clinical record", "السجل الصحي الإلكتروني"), "ok"],
    [S("Insurance / claims", "التأمين والمطالبات"), "ok"],
    [S("Appointments", "المواعيد"), "ok"],
    [S("Patient notifications", "إشعارات المرضى"), "ok"],
    [S("Lab & imaging systems", "أنظمة المختبر والتصوير"), "ok"],
    [S("Referral network", "شبكة الإحالات"), "warn"],
  ].map(([k, s2]) => `<li class="qxh" data-s="${s2}"><i aria-hidden="true"></i><span>${tx(k, lang)}</span><span class="qxh-s mono">${s2 === "ok" ? (ar ? "سليم" : "healthy") : (ar ? "متأخر" : "degraded")}</span></li>`).join("");

  const panes = `
  <div class="qxp qxp-strip">${kpis}</div>
  <section class="qxp qxp-main">
    <h4 class="qxp-h mono">${ar ? "تنسيق الرعاية · مباشر" : "Care orchestration · live"}</h4>
    <ul class="qx-queue">${journey}</ul>
    <div class="qxk qxk-note"><span class="qxk-k mono">${ar ? "النطاق" : "Scope"}</span>
    <span class="qxk-v">${ar ? "تنسيق إداري وتشغيلي فقط: القرار السريري يبقى للممارسين المرخّصين." : "Administrative and operational coordination only: clinical decisions remain with licensed practitioners."}</span></div>
  </section>
  <aside class="qxp qxp-side">
    <h4 class="qxp-h mono">${ar ? "صحة التكامل" : "Integration health"}</h4>
    <ul class="qx-health">${health}</ul>
  </aside>`;

  return consoleFrame({
    name: S("Qeonix Health: Care Orchestration", "صحة كيونكس: تنسيق الرعاية"),
    env: S("Private cloud", "سحابة خاصة"),
    panes, cls: "qx-health-console",
  }, lang);
}
