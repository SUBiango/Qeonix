import { T } from "../../lib/html.mjs";
import { section, secHead, capGrid, faq, pillars, statement } from "../../lib/components.mjs";
import { archBoard, matrix, deployTiers } from "../../lib/diagrams.mjs";
import { heroFor, closer } from "../../lib/page.mjs";
import { TIERS } from "../shared.mjs";

const LABEL = T("Data & Platforms", "البيانات والمنصّات");

const CAPS = [
  { icon: "layers", h: T("Data platforms", "منصّات البيانات"), p: T("Ingestion, modelling, quality and governance for operational and analytical workloads — engineered so the AI on top of it has something honest to stand on.", "الاستيعاب والنمذجة والجودة والحوكمة للأعباء التشغيلية والتحليلية — مهندَسة ليقف الذكاء فوقها على أساس صادق.") },
  { icon: "api", h: T("Integration & APIs", "التكامل وواجهات البرمجة"), p: T("The connective layer across a mixed estate: API design, event streams, legacy adapters and the data contracts that keep them from decaying.", "الطبقة الرابطة عبر منظومة متنوّعة: تصميم الواجهات وتدفّقات الأحداث ومحوّلات الأنظمة القديمة وعقود البيانات التي تحميها من التآكل.") },
  { icon: "flow", h: T("Workflow engines", "محرّكات سير العمل"), p: T("Long-running processes with state, retries, human steps and SLAs — the machinery underneath case management and orchestration.", "عمليات طويلة الأمد بحالة وإعادات محاولة وخطوات بشرية واتفاقيات خدمة — الآلية التي تسند إدارة الحالات والتنسيق.") },
  { icon: "cloud", h: T("Cloud-native & hybrid", "السحابة الأصلية والهجينة"), p: T("Containerised, infrastructure-as-code platforms that run the same way in public cloud, private cloud or an isolated site.", "منصّات حاويات وبنية-كتعليمات-برمجية تعمل بالطريقة نفسها في السحابة العامة أو الخاصة أو موقع معزول.") },
  { icon: "eye", h: T("Operational dashboards", "اللوحات التشغيلية"), p: T("Command views built on governed metrics with drill-down to the record — designed for the person on shift, not the steering committee.", "شاشات قيادة مبنية على مؤشّرات محكومة مع تفصيل حتى السجل — مصمّمة لمن هو في الوردية، لا للجنة التوجيهية.") },
  { icon: "grid", h: T("Digital twins", "التوائم الرقمية"), p: T("Spatial and network models of physical estates, kept live by telemetry, used for planning and scenario testing before committing work.", "نماذج مكانية وشبكية للأصول المادية تُبقيها القياسات حيّة، وتُستخدم للتخطيط واختبار السيناريوهات قبل اعتماد الأعمال.") },
];

const STACK = [
  { label: T("Experience & delivery", "التجربة والتقديم"), note: T("Where users and systems consume it.", "حيث يستهلكها المستخدمون والأنظمة."), items: [T("Web & mobile apps", "تطبيقات الويب والهاتف"), T("Dashboards", "اللوحات"), T("Public APIs", "الواجهات العامة"), T("Partner integrations", "تكاملات الشركاء")] },
  { label: T("Application platform", "منصّة التطبيقات"), note: T("Where the products run.", "حيث تعمل المنتجات."), tone: "hi", items: [T("Microservices", "الخدمات المصغّرة"), T("Workflow engine", "محرّك سير العمل"), T("Rules & policy", "القواعد والسياسات"), T("Identity & access", "الهوية والوصول"), T("Notifications", "الإشعارات")] },
  { label: T("Data platform", "منصّة البيانات"), note: T("The reconciled record.", "السجل الموحَّد."), items: [T("Ingestion & pipelines", "الاستيعاب والمسارات"), T("Modelling & contracts", "النمذجة والعقود"), T("Quality & lineage", "الجودة والمنشأ"), T("Master data", "البيانات المرجعية"), T("Feature store", "مخزن الخصائص")] },
  { label: T("Event backbone", "العمود الفقري للأحداث"), note: T("How systems find out.", "كيف تعلم الأنظمة بما جرى."), items: [T("Event streams", "تدفّقات الأحداث"), T("Change data capture", "التقاط تغيّر البيانات"), T("Queues & retries", "الطوابير وإعادة المحاولة"), T("Schema registry", "سجل المخطّطات")] },
  { label: T("Infrastructure", "البنية التحتية"), note: T("Anywhere the mandate requires.", "أينما اقتضى التكليف."), items: [T("Kubernetes", "كوبرنيتيس"), T("Infrastructure as code", "البنية كتعليمات برمجية"), T("Observability", "قابلية المراقبة"), T("Secrets & keys", "الأسرار والمفاتيح"), T("Backup & recovery", "النسخ والاستعادة")] },
];

const PRACTICES = [
  { h: T("Contracts before pipelines", "العقود قبل المسارات"), p: T("Every dataset gets an owner, a schema and a change process before anything consumes it. Integration debt is mostly broken promises about data.", "لكل مجموعة بيانات مالك ومخطّط وآلية تغيير قبل أن يستهلكها أي شيء. فديون التكامل في معظمها وعود بيانات منكوثة.") },
  { h: T("Events over polling", "الأحداث لا الاستطلاع"), p: T("Systems learn about change by being told, not by asking every minute. It is the difference between a live operation and a nightly batch.", "تعلم الأنظمة بالتغيير بالإبلاغ، لا بالسؤال كل دقيقة. وهذا هو الفرق بين عملية حيّة ودفعة ليلية.") },
  { h: T("Boring where it counts", "تقليدية حيث يجب"), p: T("Databases, queues and identity use proven components. Novelty is spent on the problem, not the plumbing.", "قواعد البيانات والطوابير والهوية بمكوّنات مثبتة. ويُدَّخر الجديد للمشكلة، لا للبنية.") },
  { h: T("Observable by default", "قابلة للمراقبة افتراضيًا"), p: T("Tracing, metrics and structured logs ship with the first release, because they cannot be retrofitted during an incident.", "يُشحن التتبّع والمؤشّرات والسجلّات المهيكلة مع الإصدار الأول، لأنها لا تُضاف أثناء الحادث.") },
  { h: T("Portable across boundaries", "قابلة للنقل عبر الحدود"), p: T("The same platform definition deploys to public cloud, private cloud or an isolated site — sovereignty must not require a rewrite.", "تعريف المنصّة نفسه يُنشر في سحابة عامة أو خاصة أو موقع معزول — فالسيادة يجب ألا تتطلّب إعادة كتابة.") },
  { h: T("Run by the builders", "يشغّلها من بناها"), p: T("The team that designs the platform carries it in production. It is remarkable what that does to design decisions.", "الفريق الذي يصمّم المنصّة يتولّاها في الإنتاج. ومدهشٌ ما يفعله ذلك بقرارات التصميم.") },
];

const SCOPE = [
  { label: T("Engineering", "الهندسة"), items: [T("Software engineering", "هندسة البرمجيات"), T("Data engineering", "هندسة البيانات"), T("AI engineering", "هندسة الذكاء الاصطناعي"), T("Platform engineering", "هندسة المنصّات"), T("Cybersecurity engineering", "هندسة الأمن السيبراني")] },
  { label: T("Architecture", "البنية"), items: [T("Enterprise architecture", "البنية المؤسسية"), T("Solution architecture", "بنية الحلول"), T("Data architecture", "بنية البيانات"), T("Integration architecture", "بنية التكامل")] },
  { label: T("Operations", "التشغيل"), items: [T("DevOps", "عمليات التطوير"), T("MLOps", "عمليات التعلّم الآلي"), T("SRE & reliability", "هندسة الموثوقية"), T("Incident management", "إدارة الحوادث"), T("Capacity planning", "تخطيط السعة")] },
  { label: T("Delivery", "التنفيذ"), items: [T("Product strategy", "استراتيجية المنتج"), T("UX & UI design", "تصميم التجربة والواجهات"), T("Quality engineering", "هندسة الجودة"), T("Deployment & cutover", "النشر والانتقال"), T("Operational support", "الدعم التشغيلي")] },
];

const FAQS = [
  {
    q: T("Why does a data platform matter for AI projects?", "لماذا تهمّ منصّة البيانات لمشاريع الذكاء الاصطناعي؟"),
    a: T("Because every AI failure we are asked to rescue is a data failure wearing a model's name. Grounding, evaluation and retraining all depend on governed, owned, quality-scored data — which is platform work, done before the model is chosen.", "لأن كل إخفاق ذكاء اصطناعي يُطلب منّا إنقاذه هو إخفاق بيانات يحمل اسم نموذج. فالإسناد والتقييم وإعادة التدريب كلها تعتمد على بيانات محكومة ومملوكة ومقيَّمة الجودة — وذلك عملُ منصّةٍ يسبق اختيار النموذج."),
  },
  {
    q: T("Do you take over existing platforms or only build new ones?", "هل تتولّون منصّات قائمة أم تبنون الجديد فقط؟"),
    a: T("Both. A common engagement is stabilising and instrumenting an existing estate — contracts, observability, event backbone — and then extending it, rather than proposing a rebuild the organisation neither needs nor wants.", "الاثنان. من الارتباطات الشائعة تثبيت منظومة قائمة وتزويدها بالقياس — العقود وقابلية المراقبة والعمود الفقري للأحداث — ثم توسيعها، بدل اقتراح إعادة بناء لا تحتاجها الجهة ولا تريدها."),
  },
  {
    q: T("Which technologies do you use?", "أي التقنيات تستخدمون؟"),
    a: T("Proven, widely-operable components chosen against the constraint set — cloud-native where possible, self-hostable where the deployment boundary requires it. We avoid anything that would make an isolated deployment impossible, and anything only we could operate.", "مكوّنات مثبتة وواسعة التشغيل تُختار وفق مجموعة القيود — سحابية أصلية حيث أمكن، وقابلة للاستضافة الذاتية حيث تقتضي حدود النشر. ونتجنّب ما يجعل النشر المعزول مستحيلًا، وما لا يستطيع تشغيله غيرنا."),
  },
];

export default function platforms(lang) {
  const hero = heroFor({
    route: "platforms",
    label: LABEL,
    kicker: T("Capability · Data & digital platforms", "قدرة · البيانات والمنصّات الرقمية"),
    h: T("The layer everything else|is standing on.", "الطبقة التي يقف عليها|كل شيء آخر."),
    lead: T(
      "Agents, models, dashboards and city platforms are only as good as the data, integration and workflow layer underneath them. We treat that layer as the product it is.",
      "الوكلاء والنماذج واللوحات ومنصّات المدن لا تكون أفضل من طبقة البيانات والتكامل وسير العمل تحتها. ونحن نتعامل مع تلك الطبقة كمنتج بحدّ ذاته."
    ),
    meta: [
      { k: T("Discipline", "الانضباط"), v: T("Contracts, events, observability", "عقود وأحداث وقابلية مراقبة") },
      { k: T("Portability", "قابلية النقل"), v: T("Cloud, hybrid, isolated — same definition", "سحابية أو هجينة أو معزولة — بتعريف واحد") },
      { k: T("Operated", "التشغيل"), v: T("By the team that built it", "بالفريق الذي بناها") },
    ],
  }, lang);

  const body = `
${hero.html}

${section(`
  ${secHead({ kicker: T("Capabilities", "القدرات"), h: T("Six platform disciplines.", "ست قدرات منصّية.") }, lang)}
  ${capGrid(CAPS, lang, { cols: 3 })}
`, { tone: "light" })}

${section(`
  ${secHead({
    kicker: T("Reference architecture", "بنية مرجعية"),
    h: T("Five bands,|one operating platform.", "خمس طبقات،|منصّة تشغيل واحدة."),
  }, lang)}
  ${archBoard(STACK, lang, { id: "plat-stack" })}
`, { tone: "deep", grid: true })}

${section(`
  ${secHead({ kicker: T("Engineering practice", "الممارسة الهندسية"), h: T("How we keep platforms boring|in the right places.", "كيف نُبقي المنصّات تقليدية|في المواضع الصحيحة.") }, lang)}
  ${pillars(PRACTICES, lang)}
`, { tone: "paper" })}

${section(`
  ${secHead({ kicker: T("Full delivery scope", "نطاق التنفيذ الكامل"), h: T("Strategy to operations,|one organisation.", "من الاستراتيجية إلى التشغيل،|جهة واحدة.") }, lang)}
  ${matrix(SCOPE, lang)}
`, { tone: "light" })}

${section(`
  ${secHead({ kicker: T("Deployment", "النشر"), h: T("Anywhere the mandate requires.", "أينما اقتضى التكليف."), align: "center" }, lang)}
  ${deployTiers(TIERS, lang)}
`, { tone: "deep", grid: true })}

${section(statement({
  text: T("There are no AI companies|without a data platform underneath.", "لا وجود لشركات ذكاء اصطناعي|دون منصّة بيانات تحتها."),
}, lang), { tone: "accent", cls: "sec-tight" })}

${section(`
  ${secHead({ kicker: T("Questions", "أسئلة"), h: T("Platforms, answered.", "المنصّات، بإجابات مباشرة.") }, lang)}
  <div class="u-narrow-c">${faq(FAQS, lang, "plat-faq")}</div>
`, { tone: "paper" })}

${closer("platforms", lang)}
`;

  return {
    route: "platforms",
    solidHeader: true,
    crumbTrail: hero.crumbTrail,
    title: T(
      "Data Platforms, Integration & Digital Platform Engineering | Qeonix",
      "منصّات البيانات والتكامل وهندسة المنصّات الرقمية | كيونكس"
    ),
    description: T(
      "Platform engineering from Qeonix: data platforms, integration layers and APIs, event-driven systems, workflow engines, operational dashboards, digital twins and cloud-native or hybrid infrastructure — portable across public cloud, private cloud and isolated environments.",
      "هندسة المنصّات من كيونكس: منصّات البيانات وطبقات التكامل وواجهات البرمجة والأنظمة القائمة على الأحداث ومحرّكات سير العمل واللوحات التشغيلية والتوائم الرقمية والبنية السحابية الأصلية أو الهجينة — قابلة للنقل بين السحابة العامة والخاصة والبيئات المعزولة."
    ),
    og: "platforms",
    service: { name: LABEL, type: T("Data and digital platform engineering", "هندسة منصّات البيانات والمنصّات الرقمية") },
    faqSchema: FAQS,
    body,
  };
}
