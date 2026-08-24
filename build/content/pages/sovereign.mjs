import { T } from "../../lib/html.mjs";
import { section, secHead, faq, trustGrid, statement, pillars } from "../../lib/components.mjs";
import { archBoard, deployTiers, flowStack } from "../../lib/diagrams.mjs";
import { boundaryMatrix } from "../../lib/showcase.mjs";
import { heroFor, closer } from "../../lib/page.mjs";
import { TIERS } from "../shared.mjs";

const LABEL = T("Sovereign AI", "الذكاء الاصطناعي السيادي");

const CONTROLS = [
  { icon: "pin", h: T("Data residency", "إقامة البيانات"), p: T("Storage, processing and model inference architected to remain inside the jurisdiction or facility the mandate names — verifiable at the network level, not asserted in a slide.", "التخزين والمعالجة واستدلال النماذج مصمّمة للبقاء داخل النطاق أو المنشأة التي يسمّيها التكليف — بتحقّق على مستوى الشبكة، لا بادّعاء في عرض تقديمي.") },
  { icon: "lock", h: T("Isolated environments", "البيئات المعزولة"), p: T("Designed to operate in restricted and disconnected environments where required: updates, model weights and telemetry all follow a controlled transfer process.", "مصمّمة للعمل في بيئات مقيّدة وغير متصلة عند الاقتضاء: التحديثات وأوزان النماذج والقياسات كلها تتبع عملية نقل محكومة.") },
  { icon: "model", h: T("Controlled model access", "وصول محكوم للنماذج"), p: T("Models that can be hosted inside the boundary, routed per workload. External model calls, where permitted at all, are explicit, logged and classified by data sensitivity.", "نماذج قابلة للاستضافة داخل الحدود، بتوجيه لكل عبء. أما الاستدعاءات الخارجية، حيثما سُمح بها أصلًا، فصريحة ومسجّلة ومصنّفة وفق حساسية البيانات.") },
  { icon: "key", h: T("Identity and access", "الهوية والوصول"), p: T("Role-based access for people, services and agents, integrated with the organisation's own identity provider — never a parallel account system.", "وصول حسب الدور للأشخاص والخدمات والوكلاء، بتكامل مع مزوّد هوية الجهة نفسها — لا نظام حسابات موازٍ أبدًا.") },
  { icon: "eye", h: T("Auditability", "قابلية التدقيق"), p: T("Configuration, access, actions and model decisions logged in a form an internal auditor or regulator can actually work with.", "الإعدادات والوصول والإجراءات وقرارات النماذج تُسجَّل بصيغة يستطيع المدقّق الداخلي أو المنظّم العمل بها فعلًا.") },
  { icon: "shield", h: T("Cybersecurity engineering", "هندسة الأمن السيبراني"), p: T("Threat modelling, hardening, secrets management and secure development practice applied through the build — aligned with the customer's own security requirements.", "نمذجة التهديدات والتحصين وإدارة الأسرار وممارسات التطوير الآمن مطبَّقة عبر مراحل البناء — بما يتوافق مع متطلّبات أمن الجهة نفسها.") },
];

const STACK = [
  { label: T("Governance", "الحوكمة"), note: T("Who decides, and how it is proven.", "من يقرّر، وكيف يُثبَت ذلك."), items: [T("Policy definition", "تعريف السياسات"), T("Approval authorities", "جهات الاعتماد"), T("Audit & reporting", "التدقيق والتقارير"), T("Data classification", "تصنيف البيانات")] },
  { label: T("Applications & agents", "التطبيقات والوكلاء"), note: T("The intelligence being governed.", "الذكاء الخاضع للحوكمة."), tone: "hi", items: [T("AI applications", "تطبيقات الذكاء الاصطناعي"), T("Agentic workflows", "سير العمل الوكيل"), T("Assistants", "المساعدون"), T("Analytics", "التحليلات")] },
  { label: T("Model layer", "طبقة النماذج"), note: T("Hosted where the data lives.", "مستضافة حيث تعيش البيانات."), items: [T("Self-hosted open models", "نماذج مفتوحة مستضافة ذاتيًا"), T("Licensed commercial models", "نماذج تجارية مرخّصة"), T("Model registry", "سجل النماذج"), T("Evaluation & guardrails", "التقييم وضوابط السلامة")] },
  { label: T("Data layer", "طبقة البيانات"), note: T("The asset being protected.", "الأصل الخاضع للحماية."), items: [T("Governed data platform", "منصّة بيانات محكومة"), T("Retrieval indices", "فهارس الاسترجاع"), T("Lineage & quality", "المنشأ والجودة"), T("Retention & disposal", "الاحتفاظ والإتلاف")] },
  { label: T("Infrastructure", "البنية التحتية"), note: T("The boundary itself.", "الحدود ذاتها."), items: [T("Government / private cloud", "سحابة حكومية / خاصة"), T("On-premise clusters", "عناقيد داخل المنشأة"), T("Isolated enclaves", "بيئات معزولة"), T("Controlled transfer", "النقل المحكوم"), T("Key management", "إدارة المفاتيح")] },
];

const PROCESS = [
  { label: T("Classify", "التصنيف"), icon: "layers", note: T("Data classes, threat model and the regulatory obligations that actually apply.", "فئات البيانات ونموذج التهديد والالتزامات التنظيمية المنطبقة فعلًا.") },
  { label: T("Set the boundary", "رسم الحدود"), icon: "shield", note: T("Deployment topology chosen and fixed as an architectural constraint.", "تُختار بنية النشر وتُثبَّت كقيد هندسي.") },
  { label: T("Select within it", "الاختيار ضمنها"), icon: "model", note: T("Models, components and vendors that can genuinely operate inside that boundary.", "نماذج ومكوّنات ومورّدون قادرون فعلًا على العمل داخل تلك الحدود.") },
  { label: T("Build with evidence", "بناء بالأدلّة"), icon: "eye", note: T("Controls implemented as code and configuration, testable from day one.", "ضوابط تُنفَّذ كتعليمات برمجية وإعدادات، قابلة للاختبار من اليوم الأول.") },
  { label: T("Operate accountably", "تشغيل خاضع للمساءلة"), icon: "check", note: T("Access reviews, audit exports and incident process running as routine, not exception.", "مراجعات الوصول وتصدير التدقيق وإجراءات الحوادث كعمل روتيني لا استثنائي.") },
];

const LANGUAGE = [
  { h: T("“Designed for”", "«مصمَّمة لـ»"), p: T("We describe what the architecture is designed for and can be deployed within. We do not claim certifications this site has not verified.", "نصف ما صُمِّمت له البنية وما يمكن نشرها ضمنه. ولا ندّعي شهادات لم يجرِ التحقّق منها.") },
  { h: T("Verified, then stated", "تحقّق ثم تصريح"), p: T("Compliance claims are made in a due-diligence process against your framework — where they can be evidenced — not in marketing copy.", "تُقدَّم ادّعاءات الالتزام في عملية عناية واجبة وفق إطاركم — حيث يمكن إثباتها — لا في نص تسويقي.") },
  { h: T("Your framework leads", "إطاركم هو المرجع"), p: T("Government and enterprise customers bring their own security and data frameworks. Our architectures are built to be assessed against them.", "تأتي الجهات الحكومية والمؤسسات بأطرها الأمنية والبياناتية. وتُبنى بنانا لتُقيَّم وفقها.") },
];

const FAQS = [
  {
    q: T("What does “sovereign AI” mean in practice?", "ماذا يعني «الذكاء الاصطناعي السيادي» عمليًا؟"),
    a: T("That an organisation can run meaningful AI — including modern language models and agentic workflows — while its data, model inference and operational control remain inside infrastructure it governs. In practice it is a set of architectural decisions about hosting, model access, identity and audit, taken at the start.", "أن تتمكّن الجهة من تشغيل ذكاء اصطناعي حقيقي — بما فيه نماذج اللغة الحديثة وسير العمل الوكيل — بينما تبقى بياناتها واستدلال نماذجها وتحكّمها التشغيلي داخل بنية تخضع لحوكمتها. وهو عمليًا مجموعة قرارات هندسية حول الاستضافة والوصول إلى النماذج والهوية والتدقيق، تُتّخذ في البداية."),
  },
  {
    q: T("Does sovereignty mean weaker AI?", "هل تعني السيادة ذكاءً أضعف؟"),
    a: T("Less than it used to. Self-hostable models have closed much of the gap for a large share of enterprise workloads, and routing lets each task use the strongest model permitted for its data class. The trade-off is engineering effort, which is exactly the part we take on.", "أقل مما كانت تعنيه. فقد قلّصت النماذج القابلة للاستضافة الذاتية معظم الفجوة لشريحة واسعة من الأعباء المؤسسية، ويتيح التوجيه لكل مهمة استخدام أقوى نموذج مسموح به لفئة بياناتها. أما الثمن فهو جهد هندسي، وهو تحديدًا الجزء الذي نتولّاه."),
  },
  {
    q: T("Is Qeonix certified against specific security standards?", "هل كيونكس معتمدة وفق معايير أمنية محدّدة؟"),
    a: T("We do not publish certification claims on this site. Security and compliance posture is shared and evidenced directly in a due-diligence process against the framework your organisation applies.", "لا ننشر ادّعاءات اعتماد على هذا الموقع. تُعرض حالة الأمن والالتزام وتُثبَت مباشرةً في عملية عناية واجبة وفق الإطار الذي تطبّقه جهتكم."),
  },
  {
    q: T("Can an agentic system really run disconnected?", "هل يمكن لنظام وكيل أن يعمل فعلًا دون اتصال؟"),
    a: T("Yes, when it is designed for it: models hosted inside the enclave, retrieval over internal indices, tools that call internal systems only, and a controlled transfer process for updates. What changes is the operating model around the system, and that has to be designed rather than improvised.", "نعم، حين يُصمَّم لذلك: نماذج مستضافة داخل البيئة المعزولة، واسترجاع من فهارس داخلية، وأدوات تستدعي أنظمة داخلية فقط، وعملية نقل محكومة للتحديثات. ما يتغيّر هو نموذج التشغيل المحيط بالنظام، وذلك يُصمَّم ولا يُرتجَل."),
  },
];

export default function sovereign(lang) {
  const hero = heroFor({
    route: "sovereign",
    label: LABEL,
    kicker: T("Sovereign by design", "سيادية بالتصميم"),
    h: T("Serious AI,|inside your own boundary.", "ذكاء اصطناعي جادّ،|داخل حدودكم."),
    lead: T(
      "For governments and regulated operators, where a system runs and who can reach its data is part of the design brief. Qeonix architects AI platforms that can be deployed within sovereign, private and isolated environments — without giving up the capability that made them worth building.",
      "بالنسبة للحكومات والمشغّلين الخاضعين للتنظيم، فإن مكان تشغيل النظام ومن يصل إلى بياناته جزء من متطلّبات التصميم. تصمّم كيونكس منصّات ذكاء اصطناعي قابلة للنشر في بيئات سيادية وخاصة ومعزولة — دون التخلّي عن القدرة التي جعلتها جديرة بالبناء."
    ),
    meta: [
      { k: T("Residency", "الإقامة"), v: T("UAE and regional deployment options", "خيارات نشر في الإمارات والمنطقة") },
      { k: T("Boundary", "الحدود"), v: T("Government cloud to disconnected enclave", "من السحابة الحكومية إلى البيئة غير المتصلة") },
      { k: T("Claims policy", "سياسة الادّعاءات"), v: T("Evidenced in due diligence, not marketing", "تُثبَت في العناية الواجبة لا في التسويق") },
    ],
  }, lang);

  const body = `
${hero.html}

${section(`
  ${secHead({
    kicker: T("Deployment spectrum", "طيف النشر"),
    h: T("Four tiers,|one platform definition.", "أربعة مستويات،|تعريف منصّة واحد."),
    lead: T("The same system definition deploys across all four. Moving down the spectrum changes the operating model, not the product.", "تعريف النظام نفسه يُنشر عبر المستويات الأربعة. والانتقال عبر الطيف يغيّر نموذج التشغيل، لا المنتج."),
  }, lang)}
  ${deployTiers(TIERS, lang)}
  <div class="u-mt">
    ${secHead({
      kicker: T("Control boundaries", "حدود التحكم"),
      h: T("Where things run, stay|and stop.", "أين تعمل الأشياء، وأين تبقى،|وأين تتوقّف."),
      lead: T("The same five questions, answered per topology — including the one most vendors avoid: whether an external model can be reached at all.", "الأسئلة الخمسة نفسها، مُجابة لكل بنية نشر — بما فيها السؤال الذي يتجنّبه أغلب المورّدين: هل يمكن الوصول إلى نموذج خارجي أصلًا."),
    }, lang)}
    ${boundaryMatrix(lang)}
  </div>
`, { tone: "light" })}

${section(`
  ${secHead({
    kicker: T("Controls", "الضوابط"),
    h: T("What sovereignty is actually made of.", "ممَّ تتكوّن السيادة فعليًا."),
  }, lang)}
  ${trustGrid(CONTROLS, lang)}
`, { tone: "deep", grid: true })}

${section(`
  ${secHead({
    kicker: T("Architecture", "البنية"),
    h: T("The sovereign stack.", "المنظومة السيادية."),
    lead: T("Governance on top and the boundary at the bottom, with everything between designed to be assessed.", "الحوكمة في الأعلى والحدود في الأسفل، وكل ما بينهما مصمَّم ليُقيَّم."),
  }, lang)}
  ${archBoard(STACK, lang, { id: "sov-stack" })}
`, { tone: "paper" })}

${section(`
  ${secHead({ kicker: T("Method", "المنهج"), h: T("How a sovereign build runs.", "كيف يجري بناء سيادي.") }, lang)}
  ${flowStack(PROCESS, lang, { id: "sov-process", dense: true })}
`, { tone: "light" })}

${section(`
  ${secHead({
    kicker: T("A note on claims", "ملاحظة حول الادّعاءات"),
    h: T("We say “designed for”|and we mean it precisely.", "نقول «مصمَّمة لـ»|ونعنيها بدقّة."),
  }, lang)}
  ${pillars(LANGUAGE, lang)}
`, { tone: "paper" })}

${section(statement({
  text: T("Sovereignty is architecture.|Everything else is a promise.", "السيادة بنية هندسية.|وكل ما عداها وعود."),
}, lang), { tone: "accent", cls: "sec-tight" })}

${section(`
  ${secHead({ kicker: T("Questions", "أسئلة"), h: T("Sovereign AI, answered.", "الذكاء السيادي، بإجابات مباشرة.") }, lang)}
  <div class="u-narrow-c">${faq(FAQS, lang, "sov-faq")}</div>
`, { tone: "light" })}

${closer("sovereign", lang)}
`;

  return {
    route: "sovereign",
    solidHeader: true,
    crumbTrail: hero.crumbTrail,
    title: T(
      "Sovereign AI & Private AI Deployment | Qeonix",
      "الذكاء الاصطناعي السيادي والنشر الخاص | كيونكس"
    ),
    description: T(
      "Sovereign AI from Qeonix: AI platforms architected for UAE and regional data residency, government and private cloud, on-premise and isolated environments — with controlled model access, identity and role-based access, auditability and human oversight.",
      "الذكاء السيادي من كيونكس: منصّات ذكاء اصطناعي مصمّمة لإقامة البيانات في الإمارات والمنطقة، والسحابة الحكومية والخاصة، والنشر داخل المنشأة والبيئات المعزولة — مع وصول محكوم للنماذج والهوية والوصول حسب الدور وقابلية التدقيق والرقابة البشرية."
    ),
    og: "sovereign",
    service: { name: LABEL, type: T("Sovereign AI architecture and deployment", "بنية الذكاء الاصطناعي السيادي ونشره") },
    faqSchema: FAQS,
    body,
  };
}
