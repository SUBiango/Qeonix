import { T } from "../../lib/html.mjs";
import { section, secHead, btn, capGrid, faq, trustGrid, statement, approvalSlot } from "../../lib/components.mjs";
import { archBoard, flowStack, matrix, deployTiers } from "../../lib/diagrams.mjs";
import { govOpsConsole } from "../../lib/showcase.mjs";
import { heroFor, closer } from "../../lib/page.mjs";
import { url } from "../site.mjs";
import { TIERS } from "../shared.mjs";

const LABEL = T("Smart Government", "الحكومة الذكية");

const JOURNEY = [
  { label: T("A resident has a need", "لدى المتعامل حاجة"), icon: "people", note: T("Expressed in their own words, on the channel they already use, in Arabic or English.", "يعبّر عنها بكلماته، عبر القناة التي يستخدمها فعلًا، بالعربية أو الإنجليزية.") },
  { label: T("One front door", "باب واحد"), icon: "grid", note: T("A unified digital service surface instead of a directory of departments.", "واجهة خدمات رقمية موحّدة بدل دليل من الإدارات.") },
  { label: T("Identity and eligibility", "الهوية والأهلية"), icon: "key", note: T("Verified once against digital identity, then checked against the record rather than re-asked.", "تحقّق واحد عبر الهوية الرقمية، ثم مطابقة مع السجل بدل إعادة السؤال.") },
  { label: T("Orchestration across agencies", "التنسيق بين الجهات"), icon: "flow", note: T("The case is assembled and routed across every department it actually touches.", "يُجمَّع الملف ويُوجَّه عبر كل إدارة يمسّها فعلًا.") },
  { label: T("Decision and action", "القرار والتنفيذ"), icon: "compass", note: T("Automated where policy allows, escalated where it does not, with the reason recorded.", "أتمتة حيث تسمح السياسة، وتصعيد حيث لا تسمح، مع تسجيل السبب.") },
  { label: T("Payment, permit, dispatch", "الدفع والتصريح والإرسال"), icon: "api", note: T("The transaction completes, or a crew is tasked in the physical world.", "تكتمل المعاملة، أو يُكلَّف فريق في العالم المادي.") },
  { label: T("Closed and evidenced", "إغلاق موثَّق"), icon: "check", note: T("Notification to the resident, an audit trail for the auditor, a metric for the mandate.", "إشعار للمتعامل، وسجل تدقيق للمراجع، ومؤشّر للتكليف.") },
];

const PLATFORMS = [
  { icon: "grid", h: T("Digital government platforms", "منصّات الحكومة الرقمية"), p: T("A unified service layer over departments that were never designed to present a single face, including resident and business super-app experiences.", "طبقة خدمات موحّدة فوق إدارات لم تُصمَّم أصلًا لتقديم واجهة واحدة، بما في ذلك تجارب التطبيقات الشاملة للمتعاملين والأعمال.") },
  { icon: "flow", h: T("Service orchestration", "تنسيق الخدمات"), p: T("Cross-agency workflows that assemble a case, route it, chase it and close it, with SLAs that are measured rather than published.", "سير عمل بين الجهات يجمّع الملف ويوجّهه ويتابعه ويغلقه، باتفاقيات مستوى خدمة تُقاس لا تُعلَن فقط.") },
  { icon: "agent", h: T("Government AI assistants", "المساعدون الحكوميون بالذكاء الاصطناعي"), p: T("Assistants for residents and for case officers, grounded in the actual regulation and the actual record, answering in Arabic and English.", "مساعدون للمتعاملين ولموظفي الحالات، مستندون إلى اللوائح الفعلية والسجل الفعلي، ويجيبون بالعربية والإنجليزية.") },
  { icon: "building", h: T("Permitting and licensing", "التصاريح والتراخيص"), p: T("Application-to-approval journeys with rule evaluation, inspection scheduling, conditional approvals and renewal handled as one lifecycle.", "رحلات من الطلب إلى الموافقة مع تقييم القواعد وجدولة التفتيش والموافقات المشروطة والتجديد كدورة حياة واحدة.") },
  { icon: "package", h: T("Case management", "إدارة الحالات"), p: T("A single case spine across channels and departments, so a resident is not the integration layer between two agencies.", "عمود فقري واحد للحالة عبر القنوات والإدارات، حتى لا يكون المتعامل هو طبقة التكامل بين جهتين.") },
  { icon: "radar", h: T("Government operations", "العمليات الحكومية"), p: T("Operational command over service performance, backlog, field capacity and escalation, the view a director general actually needs.", "قيادة تشغيلية لأداء الخدمة والمتراكم والطاقة الميدانية والتصعيد، الصورة التي يحتاجها المدير العام فعلًا.") },
];

const STACK = [
  { label: T("Digital experience", "التجربة الرقمية"), note: T("Resident, business and employee surfaces.", "واجهات المتعاملين والأعمال والموظفين."), items: [T("Portal & super-app", "البوابة والتطبيق الشامل"), T("Mobile", "الهاتف المحمول"), T("Contact center", "مركز الاتصال"), T("Counter & kiosk", "المكاتب والأكشاك"), T("Arabic & English", "العربية والإنجليزية")] },
  { label: T("Service orchestration", "تنسيق الخدمات"), note: T("The layer that makes agencies act as one.", "الطبقة التي تجعل الجهات تعمل ككيان واحد."), tone: "hi", items: [T("Case spine", "العمود الفقري للحالة"), T("Cross-agency routing", "التوجيه بين الجهات"), T("Rule evaluation", "تقييم القواعد"), T("SLA & escalation", "اتفاقيات الخدمة والتصعيد"), T("Notifications", "الإشعارات")] },
  { label: T("Intelligence", "الذكاء"), note: T("Assistants, triage, prediction.", "المساعدون والفرز والتنبؤ."), items: [T("Resident assistant", "مساعد المتعامل"), T("Officer copilot", "مرافق الموظف"), T("Document AI", "ذكاء المستندات"), T("Demand forecasting", "التنبؤ بالطلب"), T("Anomaly & fraud signals", "إشارات الشذوذ والاحتيال")] },
  { label: T("Government data platform", "منصّة البيانات الحكومية"), note: T("One reconciled record.", "سجل واحد موحَّد."), items: [T("Entity resolution", "توحيد الكيانات"), T("Data contracts", "عقود البيانات"), T("Interoperability", "قابلية التشغيل البيني"), T("Master data", "البيانات المرجعية"), T("Reporting & KPIs", "التقارير ومؤشّرات الأداء")] },
  { label: T("Shared services", "الخدمات المشتركة"), note: T("The plumbing every journey needs.", "البنية التي تحتاجها كل رحلة."), items: [T("Digital identity integration", "التكامل مع الهوية الرقمية"), T("Payments", "المدفوعات"), T("Documents & attestation", "المستندات والتصديق"), T("Appointments", "المواعيد"), T("Field dispatch", "الإرسال الميداني")] },
  { label: T("Trust & control", "الثقة والتحكم"), note: T("What the audit office reviews.", "ما يراجعه ديوان الرقابة."), items: [T("Role-based access", "الوصول حسب الدور"), T("Consent & purpose", "الموافقة والغرض"), T("Full audit trail", "سجل تدقيق كامل"), T("Data residency", "إقامة البيانات"), T("Retention policy", "سياسة الاحتفاظ")] },
];

const OUTCOMES = [
  { icon: "clock", h: T("Fewer steps for the resident", "خطوات أقل للمتعامل"), p: T("Documents already held by government are not requested again. Eligibility is checked against the record, not the applicant's memory.", "لا يُطلب مجدّدًا ما تملكه الحكومة من مستندات. وتُفحص الأهلية وفق السجل، لا وفق ذاكرة مقدّم الطلب.") },
  { icon: "flow", h: T("Fewer hand-offs between agencies", "تسليمات أقل بين الجهات"), p: T("A case moves as one object with one history, instead of restarting each time it crosses a departmental boundary.", "تتحرّك الحالة ككيان واحد بتاريخ واحد، بدل أن تبدأ من جديد كلما عبرت حدود إدارة.") },
  { icon: "eye", h: T("Visible operational truth", "حقيقة تشغيلية ظاهرة"), p: T("Backlog, cycle time and field capacity are visible while they can still be changed, not in next quarter's report.", "المتراكم وزمن الدورة والطاقة الميدانية مرئية بينما لا يزال بالإمكان تغييرها، لا في تقرير الربع القادم.") },
  { icon: "shield", h: T("Defensible decisions", "قرارات قابلة للدفاع عنها"), p: T("Every automated or assisted decision carries the rule applied, the data used and the officer who approved it.", "كل قرار مؤتمت أو مدعوم يحمل القاعدة المطبَّقة والبيانات المستخدمة والموظف الذي اعتمده.") },
  { icon: "people", h: T("Capacity where it is scarce", "طاقة حيث تشحّ"), p: T("Routine volume is absorbed by the platform so scarce specialist time goes to the cases that need judgment.", "تستوعب المنصّة الحجم الروتيني ليذهب وقت المختصّين النادر إلى الحالات التي تحتاج تقديرًا.") },
  { icon: "pin", h: T("Sovereignty preserved", "سيادة محفوظة"), p: T("Resident data stays inside the deployment boundary the mandate requires, including in disconnected environments.", "تبقى بيانات المتعاملين داخل حدود النشر التي يتطلّبها التكليف، بما في ذلك البيئات غير المتصلة.") },
];

const DOMAINS = [
  { label: T("Citizen & business", "المتعاملون والأعمال"), items: [T("Unified digital services", "خدمات رقمية موحّدة"), T("Super-app experiences", "تجارب التطبيق الشامل"), T("Appointments", "المواعيد"), T("Service requests", "طلبات الخدمة"), T("Complaints & feedback", "الشكاوى والملاحظات"), T("Notifications", "الإشعارات")] },
  { label: T("Regulatory journeys", "الرحلات التنظيمية"), items: [T("Permitting", "التصاريح"), T("Licensing", "التراخيص"), T("Inspections", "التفتيش"), T("Compliance cases", "حالات الالتزام"), T("Renewals", "التجديدات"), T("Appeals", "التظلّمات")] },
  { label: T("Operations", "العمليات"), items: [T("Command & control", "القيادة والتحكم"), T("Field dispatch", "الإرسال الميداني"), T("Workforce scheduling", "جدولة القوى العاملة"), T("Asset & maintenance", "الأصول والصيانة"), T("Emergency coordination", "تنسيق الطوارئ"), T("Performance reporting", "تقارير الأداء")] },
  { label: T("Shared platform", "المنصّة المشتركة"), items: [T("Digital identity integration", "التكامل مع الهوية الرقمية"), T("Payments", "المدفوعات"), T("Document services", "خدمات المستندات"), T("Interoperability layer", "طبقة التشغيل البيني"), T("Master data", "البيانات المرجعية"), T("Analytics", "التحليلات")] },
];

const FAQS = [
  {
    q: T("Do you replace our existing government systems?", "هل تستبدلون أنظمتنا الحكومية القائمة؟"),
    a: T("No. Core registries and departmental systems usually stay. What is typically missing is the layer above them: the case spine, the orchestration, the shared services and the single service surface. That is what we build, integrated with what already runs.", "لا. تبقى السجلّات الأساسية والأنظمة الإدارية عادةً. والمفقود غالبًا هو الطبقة التي فوقها: العمود الفقري للحالة والتنسيق والخدمات المشتركة وواجهة الخدمة الموحّدة. وهذا ما نبنيه، بتكامل مع القائم فعلًا."),
  },
  {
    q: T("Can resident data stay inside the country?", "هل يمكن أن تبقى بيانات المتعاملين داخل الدولة؟"),
    a: T("Yes. Deployment topology is fixed at design time and can be constrained to a government cloud, a private environment or on-premise infrastructure, including isolated environments. Model inference can be held inside the same boundary.", "نعم. تُثبَّت بنية النشر في مرحلة التصميم ويمكن حصرها في سحابة حكومية أو بيئة خاصة أو بنية داخل المنشأة، بما في ذلك البيئات المعزولة. ويمكن إبقاء استدلال النماذج داخل الحدود نفسها."),
  },
  {
    q: T("How is Arabic handled?", "كيف تُعالَج اللغة العربية؟"),
    a: T("As a first-class language, not a translation pass. Interfaces are designed right-to-left from the start, assistants are evaluated on Arabic cases, and official terminology is agreed with the entity rather than machine-translated.", "بوصفها لغة من الدرجة الأولى، لا مجرّد ترجمة لاحقة. تُصمَّم الواجهات من اليمين إلى اليسار منذ البداية، ويُقيَّم المساعدون على حالات عربية، وتُعتمد المصطلحات الرسمية بالاتفاق مع الجهة لا بالترجمة الآلية."),
  },
  {
    q: T("Where do you start with an entity that has many services?", "من أين تبدأون مع جهة لديها خدمات كثيرة؟"),
    a: T("With one high-volume journey that crosses at least two departments. That proves the case spine, the identity integration and the orchestration under real load, and produces a reusable pattern for the rest of the catalog.", "من رحلة واحدة عالية الحجم تعبر إدارتين على الأقل. فذلك يُثبت العمود الفقري للحالة والتكامل مع الهوية والتنسيق تحت حمل حقيقي، وينتج نمطًا قابلًا لإعادة الاستخدام لبقية دليل الخدمات."),
  },
];

export default function government(lang) {
  const ar = lang === "ar";
  const hero = heroFor({
    route: "government",
    label: LABEL,
    kicker: T("Sector · Government & public sector", "قطاع · الحكومة والقطاع العام"),
    h: T("Government that behaves|like one organization.", "حكومة تتصرّف|كمؤسسة واحدة."),
    lead: T(
      "Residents do not experience departments; they experience a wait. Qeonix builds the orchestration, intelligence and shared services that let a public entity present one front door and close cases behind it.",
      "لا يختبر المتعاملون الإدارات، بل يختبرون الانتظار. تبني كيونيكس طبقة التنسيق والذكاء والخدمات المشتركة التي تتيح للجهة العامة تقديم باب واحد وإغلاق المعاملات خلفه."
    ),
    meta: [
      { k: T("Scope", "النطاق"), v: T("Services, orchestration, operations", "الخدمات والتنسيق والعمليات") },
      { k: T("Languages", "اللغات"), v: T("Arabic and English, first-class", "العربية والإنجليزية، بمستوى واحد") },
      { k: T("Deployment", "النشر"), v: T("Government cloud, private, on-premise", "سحابة حكومية أو خاصة أو داخل المنشأة") },
    ],
  }, lang);

  const body = `
${hero.html}

${section(`
  ${secHead({
    kicker: T("The journey", "الرحلة"),
    h: T("Seven steps between a need|and a closed case.", "سبع خطوات بين الحاجة|والمعاملة المنجَزة."),
    lead: T("In most entities, four of these steps are where the time goes, and none of them are the decision itself.", "في أغلب الجهات، أربع من هذه الخطوات هي حيث يضيع الوقت، ولا واحدة منها هي القرار نفسه."),
  }, lang)}
  ${flowStack(JOURNEY, lang, { id: "gov-journey", dense: true })}
`, { tone: "light" })}

${section(`
  ${secHead({
    kicker: T("The operating environment", "بيئة التشغيل"),
    h: T("This is the software|behind that journey.", "هذه هي البرمجيات|خلف تلك الرحلة."),
    lead: T("The view a service director actually runs the day from: the live queue, the SLAs under pressure, the health of every integration, and the crews closing the loop in the field.", "الشاشة التي يدير منها مدير الخدمة يومه فعلًا: قائمة العمل المباشرة، والاتفاقيات تحت الضغط، وصحة كل تكامل، والفرق التي تُغلق الحلقة في الميدان."),
  }, lang)}
  <div class="reveal" data-d="1">${govOpsConsole(lang)}</div>
`, { tone: "paper" })}

${section(`
  ${secHead({ kicker: T("What we build", "ما نبنيه"), h: T("Six platform capabilities.", "ست قدرات منصّية.") }, lang)}
  ${capGrid(PLATFORMS, lang, { cols: 3 })}
`, { tone: "paper" })}

${section(`
  ${secHead({
    kicker: T("Reference architecture", "بنية مرجعية"),
    h: T("A government operating layer.", "طبقة تشغيل حكومية."),
    lead: T("Six bands, each of which can be procured, governed and audited independently, which is how a multi-year program survives a change of leadership.", "ست طبقات، يمكن شراء كلٍّ منها وحوكمتها وتدقيقها بشكل مستقل، وهكذا يصمد برنامج متعدّد السنوات أمام تغيّر القيادة."),
  }, lang)}
  ${archBoard(STACK, lang, { id: "gov-stack" })}
`, { tone: "deep", grid: true })}

${section(`
  ${secHead({ kicker: T("Outcomes", "النتائج"), h: T("What changes for the entity.", "ما الذي يتغيّر بالنسبة للجهة.") }, lang)}
  ${trustGrid(OUTCOMES, lang)}
`, { tone: "light" })}

${section(`
  ${secHead({ kicker: T("Coverage", "التغطية"), h: T("Service domains.", "مجالات الخدمة.") }, lang)}
  ${matrix(DOMAINS, lang)}
  <div class="u-mt">${approvalSlot(T(
    "Public-sector references and program names will be published here once the relevant entities have approved disclosure.",
    "ستُنشر هنا المراجع الحكومية وأسماء البرامج فور اعتماد الجهات المعنية للإفصاح عنها."
  ), lang)}</div>
`, { tone: "paper" })}

${section(`
  ${secHead({
    kicker: T("Deployment", "النشر"),
    h: T("Inside the boundary the mandate defines.", "داخل الحدود التي يعرّفها التكليف."),
    align: "center",
  }, lang)}
  ${deployTiers(TIERS, lang)}
  <p class="u-mt u-center">${btn(ar ? "الذكاء الاصطناعي السيادي" : "Sovereign AI", url("sovereign", lang), { kind: "ghost", lang })}</p>
`, { tone: "deep", grid: true })}

${section(statement({
  text: T("A resident should never be|the integration layer.", "لا ينبغي أبدًا أن يكون المتعامل|هو طبقة التكامل."),
}, lang), { tone: "accent", cls: "sec-tight" })}

${section(`
  ${secHead({ kicker: T("Questions", "أسئلة"), h: T("Smart government, answered.", "الحكومة الذكية، بإجابات مباشرة.") }, lang)}
  <div class="u-narrow-c">${faq(FAQS, lang, "gov-faq")}</div>
`, { tone: "light" })}

${closer("government", lang)}
`;

  return {
    route: "government",
    solidHeader: true,
    crumbTrail: hero.crumbTrail,
    title: T(
      "Smart Government & Digital Government Platforms | Qeonix",
      "منصّات الحكومة الذكية والحكومة الرقمية | كيونيكس"
    ),
    description: T(
      "Digital government platforms from Qeonix: unified service surfaces and super-apps, cross-agency orchestration, government AI assistants, permitting and licensing journeys, case management, payments and digital identity integration, deployable in government cloud or on-premise.",
      "منصّات حكومة رقمية من كيونيكس: واجهات خدمات موحّدة وتطبيقات شاملة، وتنسيق بين الجهات، ومساعدون حكوميون بالذكاء الاصطناعي، ورحلات التصاريح والتراخيص، وإدارة الحالات، والمدفوعات والتكامل مع الهوية الرقمية، قابلة للنشر في سحابة حكومية أو داخل المنشأة."
    ),
    og: "government",
    service: { name: LABEL, type: T("Digital government platform engineering", "هندسة منصّات الحكومة الرقمية") },
    faqSchema: FAQS,
    body,
  };
}
