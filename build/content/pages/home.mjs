import { T, tx, lines } from "../../lib/html.mjs";
import { icon } from "../../lib/icons.mjs";
import {
  section, secHead, btn, capGrid, pillars, industryGrid, faq, statement, factStrip,
} from "../../lib/components.mjs";
import {
  heroLattice, deployTiers, gridfield, markRule, handoverLanes,
} from "../../lib/diagrams.mjs";
import { agenticTrace, govOpsConsole, missionConsole, platformStack } from "../../lib/showcase.mjs";
import { url, ORIGIN, BRAND, UI } from "../site.mjs";
import { INDUSTRIES } from "../shared.mjs";

/* ------------------------------------------------------------------ copy */

const HERO = {
  kicker: T("AI · Autonomous systems · Government technology", "الذكاء الاصطناعي · الأنظمة ذاتية التشغيل · التقنيات الحكومية"),
  h: T("", ""), /* rendered inline below with an accent span */
  lead: T(
    "We engineer the intelligent systems governments, cities and enterprises run on: AI, agentic platforms and autonomous operations.",
    "نهندس الأنظمة الذكية التي تعتمد عليها الحكومات والمدن والمؤسسات: الذكاء الاصطناعي والمنصّات الوكيلة والعمليات ذاتية التشغيل."
  ),
  rail: [
    T("Sovereign deployment options", "خيارات نشر سيادية"),
    T("Engineering-led delivery", "تنفيذ تقوده الهندسة"),
    T("Digital and physical operations", "عمليات رقمية ومادية"),
  ],
};

const BUILD = [
  {
    icon: "chip", href: "ai",
    h: T("Intelligence & AI", "الذكاء الاصطناعي"),
    p: T("Decision intelligence, computer vision, predictive and generative AI applied to operations that already exist, not to a greenfield that does not.", "ذكاء القرار والرؤية الحاسوبية والذكاء التنبؤي والتوليدي، مطبَّقة على عمليات قائمة فعلًا، لا على بيئة مثالية غير موجودة."),
    tags: [T("Computer vision", "الرؤية الحاسوبية"), T("Predictive analytics", "التحليلات التنبؤية"), T("Decision intelligence", "ذكاء القرار"), T("Enterprise AI", "الذكاء المؤسسي")],
  },
  {
    icon: "agent", href: "agentic",
    h: T("Agentic AI", "الذكاء الاصطناعي الوكيل"),
    p: T("Agents that understand a request, reason about it, call real systems and complete the work, with permissions, audit trails and human checkpoints designed in.", "وكلاء يفهمون الطلب ويستنتجون ويستدعون الأنظمة الفعلية وينجزون العمل، بصلاحيات وسجلّات تدقيق ونقاط مراجعة بشرية مصمّمة من الأساس."),
    tags: [T("Multi-agent orchestration", "تنسيق متعدّد الوكلاء"), T("Tools & APIs", "الأدوات وواجهات البرمجة"), T("Human-in-the-loop", "الإنسان ضمن الحلقة"), T("Observability", "قابلية المراقبة")],
  },
  {
    icon: "drone", href: "autonomous",
    h: T("Autonomous Systems", "الأنظمة ذاتية التشغيل"),
    p: T("Physical AI: robotics, drones, autonomous inspection and remote operations that move intelligence off the screen and into the field.", "الذكاء المادي: روبوتات وطائرات مسيّرة وفحص ذاتي وتشغيل عن بُعد تنقل الذكاء من الشاشة إلى الميدان."),
    tags: [T("Aerial intelligence", "الاستطلاع الجوي"), T("Autonomous inspection", "الفحص الذاتي"), T("Fleet intelligence", "ذكاء الأساطيل"), T("Remote operations", "التشغيل عن بُعد")],
  },
  {
    icon: "city", href: "cities",
    h: T("Smart Cities", "المدن الذكية"),
    p: T("A city operating layer that connects services, infrastructure, command centers and field crews, from a resident's request to the crew that closes it.", "طبقة تشغيل للمدينة تربط الخدمات والبنية التحتية ومراكز القيادة والفرق الميدانية، من طلب المتعامل إلى الفريق الذي يُنجزه."),
    tags: [T("Command & control", "القيادة والتحكم"), T("Connected infrastructure", "البنية التحتية المتصلة"), T("Field operations", "العمليات الميدانية"), T("Digital twins", "التوائم الرقمية")],
  },
  {
    icon: "route", href: "mobility",
    h: T("Smart Mobility", "التنقل الذكي"),
    p: T("Transport that behaves as one network: multimodal journeys, fleet orchestration, intelligent traffic, parking, tolling and the EV ecosystem.", "نقل يعمل كشبكة واحدة: رحلات متعدّدة الوسائط وتنسيق الأساطيل والمرور الذكي والمواقف والتعرفة ومنظومة المركبات الكهربائية."),
    tags: [T("Mobility-as-a-Service", "التنقل كخدمة"), T("Fleet orchestration", "تنسيق الأساطيل"), T("Intelligent transport", "النقل الذكي"), T("EV ecosystem", "منظومة المركبات الكهربائية")],
  },
  {
    icon: "layers", href: "platforms",
    h: T("Data & Platforms", "البيانات والمنصّات"),
    p: T("The layer everything else depends on: data platforms, integration, workflow engines, APIs and the cloud-native architecture underneath.", "الطبقة التي يعتمد عليها كل ما سبق: منصّات البيانات والتكامل ومحرّكات سير العمل وواجهات البرمجة والبنية السحابية الأصلية."),
    tags: [T("Data platforms", "منصّات البيانات"), T("Integration layer", "طبقة التكامل"), T("Workflow engines", "محرّكات سير العمل"), T("Digital twins", "التوائم الرقمية")],
  },
];

const SOVEREIGN_TIERS = [
  { icon: "cloud", label: T("Public cloud", "السحابة العامة"), note: T("Where speed matters more than isolation and the data class allows it.", "حين تكون السرعة أهم من العزل ويسمح تصنيف البيانات بذلك.") },
  { icon: "server", label: T("Private cloud", "السحابة الخاصة"), note: T("Dedicated tenancy under the organization's own controls.", "استضافة مخصّصة تحت ضوابط الجهة نفسها.") },
  { icon: "lock", label: T("On-premise", "داخل المنشأة"), note: T("Inside the customer's own data center and network boundary.", "داخل مركز بيانات الجهة وحدود شبكتها.") },
  { icon: "shield", label: T("Isolated / sovereign", "بيئة معزولة / سيادية"), note: T("Architected for data residency and disconnected environments.", "مصمّمة لإقامة البيانات والبيئات غير المتصلة.") },
];

const WHY = [
  { h: T("Architecture continuity", "استمرارية البنية"), p: "The diagram from the first workshop is the system running in production. Nothing was lost in a handover, because there was none." },
  { h: T("Beyond the demo", "أبعد من العرض التجريبي"), p: "We are judged on what survives production load, integration reality and a second year of operation." },
  { h: T("Digital and physical", "رقمي ومادي"), p: "The same decision layer that answers a resident can dispatch a drone. Most vendors do one or the other." },
  { h: T("Architecture first", "البنية أولًا"), p: "Enterprise and solution architecture precede product design, because retrofitting either is what kills programs." },
  { h: T("Built for the region", "مبنيّة للمنطقة"), p: "Abu Dhabi headquartered, with a working understanding of regional data, procurement and sovereignty realities." },
  { h: T("Outcome-bound", "مرتبطة بالنتيجة"), p: "Every engagement is defined by an operational result, and instrumented so that result can be checked." },
];

/* Arabic for WHY kept alongside for readability of the English block above. */
const WHY_AR = [
  "المخطّط الذي رُسم في أول ورشة هو النظام نفسه العامل في الإنتاج. لم يضِع شيء في تسليم، لأنه لم يكن هناك تسليم.",
  "يُحكم علينا بما يصمد أمام حمل الإنتاج وواقع التكامل وسنة تشغيل ثانية.",
  "طبقة القرار نفسها التي تردّ على المتعامل قادرة على إرسال طائرة مسيّرة. أغلب المورّدين يقدّم أحد الأمرين.",
  "تسبق البنية المؤسسية وبنية الحل تصميمَ المنتج، لأن تعديلهما لاحقًا هو ما يُفشل البرامج.",
  "مقرّها أبوظبي، بفهم عملي لواقع البيانات والمشتريات ومتطلّبات السيادة في المنطقة.",
  "كل ارتباط يُعرَّف بنتيجة تشغيلية، ويُزوَّد بالقياس الذي يسمح بالتحقّق منها.",
];
WHY.forEach((w, i) => { w.p = T(w.p, WHY_AR[i]); });

const FAQS = [
  {
    q: T("What does Qeonix actually build?", "ماذا تبني كيونكس فعليًا؟"),
    a: T("Intelligent systems that run in live operation: decision intelligence and computer vision, agentic AI platforms, autonomous systems such as robotics and drones, and the data, integration and workflow platforms underneath them. We architect, engineer and deploy them, and we operate them once they are carrying load.", "أنظمة ذكية تعمل في التشغيل الفعلي: ذكاء القرار والرؤية الحاسوبية، ومنصّات الذكاء الاصطناعي الوكيل، والأنظمة ذاتية التشغيل كالروبوتات والطائرات المسيّرة، ومنصّات البيانات والتكامل وسير العمل التي تسندها. نصمّم بنيتها ونهندسها وننشرها، ونشغّلها بعد دخولها الخدمة."),
  },
  {
    q: T("Is Qeonix a systems integrator?", "هل كيونكس شركة تكامل أنظمة؟"),
    a: T("Integration is part of what we do, because nothing useful gets deployed into an empty environment. But we are an engineering and product organization first: we design and build the platform and the intelligence layer, then integrate them with what is already running.", "التكامل جزء من عملنا، لأن لا شيء نافع يُنشر في بيئة فارغة. لكننا في المقام الأول شركة هندسة ومنتجات: نصمّم ونبني المنصّة وطبقة الذكاء، ثم ندمجها مع ما هو قائم بالفعل."),
  },
  {
    q: T("Can Qeonix systems be deployed in a sovereign or on-premise environment?", "هل يمكن نشر أنظمة كيونكس في بيئة سيادية أو داخل المنشأة؟"),
    a: T("Yes, deployment topology is an architectural decision we take with you at the start. Options include public cloud, dedicated private cloud, on-premise inside your own data center, and isolated environments designed for data residency requirements. Model access and inference can be constrained to the same boundary.", "نعم، فبنية النشر قرار هندسي نتّخذه معكم منذ البداية. تشمل الخيارات السحابة العامة، والسحابة الخاصة المخصّصة، والنشر داخل مركز بياناتكم، وبيئات معزولة مصمّمة لمتطلّبات إقامة البيانات. ويمكن حصر الوصول إلى النماذج والاستدلال داخل الحدود نفسها."),
  },
  {
    q: T("How do you keep agentic systems under control?", "كيف تُبقون الأنظمة الوكيلة تحت السيطرة؟"),
    a: T("Agents run under an identity with scoped permissions, call an explicit set of approved tools, and log their inputs, reasoning steps and actions. Consequential actions pause at a human checkpoint. Autonomy is granted per workflow rather than assumed, and can be narrowed at any time.", "يعمل الوكلاء تحت هوية بصلاحيات محدّدة النطاق، ويستدعون مجموعة معتمدة صراحةً من الأدوات، ويسجّلون مدخلاتهم وخطوات استدلالهم وإجراءاتهم. وتتوقّف الإجراءات ذات الأثر عند نقطة مراجعة بشرية. تُمنح الاستقلالية لكل سير عمل على حدة، لا بشكل مفترض، ويمكن تضييقها في أي وقت."),
  },
  {
    q: T("Do you work with our existing systems and vendors?", "هل تعملون مع أنظمتنا ومورّدينا الحاليين؟"),
    a: T("Yes. Every engagement starts from the estate that exists: core systems, identity, networks, data contracts and the vendors already under contract. The architecture is designed around those constraints rather than assuming a replacement program.", "نعم. يبدأ كل ارتباط من المنظومة القائمة فعلًا: الأنظمة الأساسية والهوية والشبكات وعقود البيانات والمورّدون المتعاقَد معهم. وتُصمَّم البنية حول هذه القيود، لا بافتراض برنامج استبدال شامل."),
  },
  {
    q: T("Where is Qeonix based?", "أين مقر كيونكس؟"),
    a: T("Headquarters are in Abu Dhabi, United Arab Emirates, with a presence in Paris, France. Offices in Muscat, Oman and Doha, Qatar are in progress.", "المقر الرئيسي في أبوظبي بالإمارات العربية المتحدة، مع حضور في باريس بفرنسا. ومكتبا مسقط في سلطنة عُمان والدوحة في قطر قيد التأسيس."),
  },
];

/* ------------------------------------------------------------------ page */

export default function home(lang) {
  const L = (k) => url(k, lang);
  const ar = lang === "ar";

  const body = `
<span id="who" class="vh" aria-hidden="true"></span>
<section class="hero is-light" id="top">
  <div class="hero-bg" aria-hidden="true">
    <div class="hero-wash"></div>
    ${gridfield("gf-hero")}
    <div class="hero-fade"></div>
  </div>
  <div class="wrap">
    <div class="hero-grid">
      <div class="hero-copy">
        <p class="kicker mono reveal">${markRule()}<span>${tx(HERO.kicker, lang)}</span></p>
        <h1 class="display reveal" data-d="1">${ar ? 'المستقبل <span class="accent-t">بين يديك</span>.' : 'Live <span class="accent-t">Tomorrow,</span> Today.'}</h1>
        <p class="hero-lead reveal" data-d="2">${tx(HERO.lead, lang)}</p>
        <div class="hero-act reveal" data-d="3">
          ${btn(ar ? "استكشف ما نبنيه" : "Explore what we build", "#build", { kind: "primary", lang })}
          ${btn(UI.contactCta, L("contact"), { kind: "ghost", lang, arrow: false })}
        </div>
        <ul class="hero-rail mono reveal" data-d="4">
          ${HERO.rail.map((r) => `<li>${tx(r, lang)}</li>`).join("")}
        </ul>
      </div>
      ${heroLattice()}
    </div>
  </div>
</section>

${section(`
  ${secHead({
    kicker: T("The Qeonix stack", "منظومة كيونكس"),
    h: T("Three bars.|One system.", "ثلاثة أشرطة.|نظام واحد."),
    lead: T("Our mark is our architecture: a reusable intelligence foundation, the domain platforms built on it, and the interfaces people and machines actually use. It is why complex systems ship in months, not years.", "شعارنا هو بنيتنا: أساس ذكي قابل لإعادة الاستخدام، ومنصّات قطاعية مبنية عليه، وواجهات يستخدمها الأشخاص والآلات فعلًا. ولهذا تُنجَز الأنظمة المعقّدة في شهور لا سنوات."),
  }, lang)}
  ${platformStack(lang)}
  <div class="u-mt">${factStrip([
    { k: T("First-class languages", "لغات من الدرجة الأولى"), v: T("2: Arabic and English", "٢: العربية والإنجليزية") },
    { k: T("Deployment topologies", "بنى النشر"), v: T("4: cloud through sovereign", "٤: من السحابة إلى السيادية") },
    { k: T("Agent actions audited", "إجراءات الوكلاء المدقَّقة"), v: T("100%: by architecture", "١٠٠٪: بحكم البنية") },
    { k: T("Trackers on this site", "المتتبّعات في هذا الموقع"), v: T("0: we practice what we sell", "٠: نطبّق ما نقدّمه") },
    { k: T("Certified", "الاعتمادات"), v: T("ISO/IEC 27001 · 42001", "ISO/IEC 27001 · 42001") },
  ], lang)}</div>
`, { id: "stack", tone: "paper" })}

<span id="solutions" class="vh" aria-hidden="true"></span>
${section(`
  ${secHead({
    kicker: T("What we build", "ما نبنيه"),
    h: T("Six capabilities,|engineered as one system.", "ست قدرات،|مهندَسة كنظام واحد."),
    lead: T("They are sold separately and almost never deployed that way. The value is in the seams between them.", "تُقدَّم منفصلة، ولا تُنشر كذلك تقريبًا أبدًا. القيمة تكمن في نقاط الوصل بينها."),
  }, lang)}
  ${capGrid(BUILD.map((b) => ({ ...b, href: L(b.href) })), lang, { cols: 3 })}
`, { id: "build", tone: "light" })}

${section(`
  ${secHead({
    kicker: T("Technology in operation", "التقنية أثناء التشغيل"),
    h: T("Enough architecture.|This is what the software looks like.", "يكفي حديثًا عن البنية.|هكذا تبدو البرمجيات فعلًا."),
    lead: T("Three Qeonix-engineered operating environments, the consoles residents never see and operators live in. Conceptual environments, real engineering.", "ثلاث بيئات تشغيل من هندسة كيونكس، اللوحات التي لا يراها المتعاملون ويعيش فيها المشغّلون. بيئات توضيحية، وهندسة حقيقية."),
  }, lang)}

  <div class="show reveal">
    <div class="show-copy">
      <p class="kicker mono">${markRule()}<span>01 · ${ar ? "المنصّة الوكيلة" : "Agentic platform"}</span></p>
      <h3 class="h3">${ar ? "وكيل يُنجز معاملة، لا محادثة." : "An agent finishing a case, not a chat."}</h3>
      <p>${ar ? "طلب حقيقي يتحوّل إلى خطة، فاستدعاءات أدوات، فنقطة اعتماد بشرية، فسجل تدقيق، تحت صلاحيات محدّدة النطاق." : "A request becomes a plan, tool calls, a human checkpoint and an audit record, under scoped permissions the whole way."}</p>
      <p class="show-cta">${btn(ar ? "الذكاء الاصطناعي الوكيل" : "Agentic AI", L("agentic"), { kind: "ghost", lang })}</p>
    </div>
    <div class="show-ui">${agenticTrace(lang)}</div>
  </div>

  <div class="show is-flip reveal">
    <div class="show-copy">
      <p class="kicker mono">${markRule()}<span>02 · ${ar ? "منصّة الحكومة والمدينة" : "Government & city platform"}</span></p>
      <h3 class="h3">${ar ? "المدينة كقائمة عمل واحدة." : "The city as one queue of work."}</h3>
      <p>${ar ? "طلبات الخدمة واتفاقيات المستوى وصحة التكامل والفرق الميدانية، في صورة تشغيلية واحدة تُدار منها المدينة." : "Service requests, SLAs, integration health and field crews, one operational picture the city is actually run from."}</p>
      <p class="show-cta">${btn(ar ? "الحكومة الذكية" : "Smart Government", L("government"), { kind: "ghost", lang })}
      ${btn(ar ? "جرّب التوأم الرقمي التفاعلي" : "Try the interactive city twin", L("cities") + "#twin", { kind: "quiet", lang })}</p>
    </div>
    <div class="show-ui">${govOpsConsole(lang)}</div>
  </div>

  <div class="show reveal">
    <div class="show-copy">
      <p class="kicker mono">${markRule()}<span>03 · ${ar ? "الاستقلالية" : "Autonomy"}</span></p>
      <h3 class="h3">${ar ? "من الرصد إلى أمر عمل." : "From a detection to a work order."}</h3>
      <p>${ar ? "مهمة فحص مُشرَف عليها: استشعار، رصد، قرار ضمن الحدود المصرَّح بها، إرسال، وأدلّة مؤرشفة." : "A supervised inspection mission: sense, detect, decide inside the cleared envelope, dispatch, and archive the evidence."}</p>
      <p class="show-cta">${btn(ar ? "الأنظمة ذاتية التشغيل" : "Autonomous systems", L("autonomous"), { kind: "ghost", lang })}</p>
    </div>
    <div class="show-ui">${missionConsole(lang)}</div>
  </div>

`, { id: "operation", tone: "paper" })}

${section(statement({
  text: T("Designed to work|beyond the demo.", "مصمّمة لتعمل|أبعد من العرض التجريبي."),
  attribution: T("The standard every Qeonix system is held to", "المعيار الذي يُحاكم إليه كل نظام تبنيه كيونكس"),
}, lang), { tone: "accent", cls: "sec-tight" })}

${section(`
  ${secHead({
    kicker: T("Industries", "القطاعات"),
    h: T("Where these systems go to work.", "حيث تدخل هذه الأنظمة الخدمة."),
    lead: T("The pattern repeats across sectors: a dense physical operation, fragmented data, and decisions being made later than they should be.", "النمط يتكرّر عبر القطاعات: عملية مادية كثيفة، وبيانات مبعثرة، وقرارات تُتّخذ متأخّرة عمّا ينبغي."),
  }, lang)}
  ${industryGrid(INDUSTRIES.map((i) => ({ ...i, href: L("industries") + "#" + i.id })), lang)}
`, { id: "industries", tone: "light" })}

<span id="approach" class="vh" aria-hidden="true"></span>
${section(`
  ${secHead({
    kicker: T("Sovereign by design", "سيادية بالتصميم"),
    h: T("Deployment is an architectural decision,|not a hosting invoice.", "النشر قرار هندسي،|لا فاتورة استضافة."),
    lead: T("For government and regulated operators, where the system runs and who can reach the data is part of the design brief. We treat it that way from the first architecture session.", "بالنسبة للجهات الحكومية والقطاعات المنظَّمة، فإن مكان تشغيل النظام ومن يمكنه الوصول إلى البيانات جزء من متطلّبات التصميم. ونتعامل معه على هذا الأساس منذ أول جلسة هندسية."),
  }, lang)}
  ${deployTiers(SOVEREIGN_TIERS, lang)}
  <p class="u-mt-s">${btn(ar ? "الذكاء الاصطناعي السيادي" : "Sovereign AI", L("sovereign"), { kind: "ghost", lang })}</p>
`, { id: "sovereign", tone: "paper", grid: true })}

${section(`
  ${secHead({
    kicker: T("Built differently", "مبنيّة بطريقة مختلفة"),
    h: T("What changes when one team|owns the whole system.", "ما الذي يتغيّر حين يملك فريق واحد|النظام بأكمله."),
    lead: T("Not a list of virtues, a list of consequences. Each of these is what an operator inherits because architecture, engineering and operations never changed hands.", "ليست قائمة فضائل، بل قائمة نتائج. كلٌّ ممّا يلي هو ما يرثه المشغّل لأن البنية والهندسة والتشغيل لم تنتقل بين أيدٍ متعدّدة."),
  }, lang)}
  ${handoverLanes(lang)}
  <div class="u-mt">${pillars(WHY, lang)}</div>
`, { id: "why", tone: "light" })}

${section(`
  <div class="frow">
    <div class="frow-copy">
      ${secHead({
        kicker: T("Questions", "أسئلة"),
        h: T("Straight answers.", "إجابات مباشرة."),
        lead: T("The questions procurement teams and CTOs actually open with.", "الأسئلة التي تبدأ بها فرق المشتريات ومدراء التقنية فعليًا."),
      }, lang)}
    </div>
    <div class="frow-media">${faq(FAQS, lang, "home-faq")}</div>
  </div>
`, { id: "faq", tone: "paper" })}
`;

  return {
    route: "home",
    solidHeader: false,
    bodyClass: "has-light-top",
    title: T(
      "Qeonix: AI, Autonomous Systems & Smart Government Technology | Abu Dhabi",
      "كيونكس: الذكاء الاصطناعي والأنظمة ذاتية التشغيل وتقنيات الحكومة الذكية | أبوظبي"
    ),
    ogTitle: T("Qeonix: Live Tomorrow, Today.", "كيونكس: المستقبل بين يديك."),
    description: T(
      "Qeonix designs, engineers and deploys the intelligent systems governments, cities and enterprises run on: decision intelligence, agentic AI, autonomous systems and connected infrastructure. Headquartered in Abu Dhabi.",
      "تصمّم كيونكس وتهندس وتنشر الأنظمة الذكية التي تعتمد عليها الحكومات والمدن والمؤسسات: ذكاء القرار والذكاء الاصطناعي الوكيل والأنظمة ذاتية التشغيل والبنية التحتية المتصلة. المقر الرئيسي في أبوظبي."
    ),
    og: "home",
    faqSchema: FAQS,
    body,
  };
}
