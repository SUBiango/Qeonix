import { T, tx } from "../../lib/html.mjs";
import { section, secHead, btn, capGrid, faq, trustGrid, statement } from "../../lib/components.mjs";
import { archBoard, ladder, deployTiers, matrix, flowStack } from "../../lib/diagrams.mjs";
import { agenticTrace } from "../../lib/showcase.mjs";
import { heroFor, closer } from "../../lib/page.mjs";
import { url } from "../site.mjs";
import { TIERS } from "../shared.mjs";

const LABEL = T("Agentic AI", "الذكاء الاصطناعي الوكيل");

const RUNGS = [
  { label: T("Chatbot", "روبوت محادثة"), note: T("Answers from a script or a document. Cannot change anything.", "يجيب من نص أو مستند. لا يستطيع تغيير أي شيء.") },
  { label: T("Copilot", "مساعد مرافق"), note: T("Drafts and suggests inside a tool. A person still does the work.", "يصوغ ويقترح داخل الأداة. والإنسان هو من ينفّذ.") },
  { label: T("Agent", "وكيل"), note: T("Plans a task, calls approved tools and completes it end to end.", "يخطّط للمهمة ويستدعي أدوات معتمدة وينجزها من طرف إلى طرف.") },
  { label: T("Multi-agent system", "منظومة متعدّدة الوكلاء"), note: T("Specialized agents coordinated by an orchestrator with shared state.", "وكلاء متخصّصون ينسّقهم منظّم واحد بحالة مشتركة.") },
  { label: T("Autonomous operation", "تشغيل ذاتي"), note: T("A whole workflow runs unattended, with humans on the exceptions.", "سير عمل كامل يعمل دون تدخّل، مع تدخّل بشري عند الاستثناءات."), emphasis: true },
];

const STACK = [
  { label: T("Experience", "طبقة التجربة"), note: T("Where the request arrives.", "حيث يصل الطلب."), items: [T("Web & mobile", "الويب والتطبيقات"), T("Contact center", "مركز الاتصال"), T("Internal consoles", "لوحات داخلية"), T("Messaging channels", "قنوات المراسلة"), T("System events", "أحداث الأنظمة")] },
  { label: T("Orchestration", "طبقة التنسيق"), note: T("Intent, planning, routing, state.", "النية والتخطيط والتوجيه والحالة."), tone: "hi", items: [T("Intent resolution", "تحديد النية"), T("Task planning", "تخطيط المهام"), T("Agent routing", "توجيه الوكلاء"), T("Shared memory", "الذاكرة المشتركة"), T("Retry & fallback", "إعادة المحاولة والبدائل"), T("Escalation policy", "سياسة التصعيد")] },
  { label: T("Agents", "الوكلاء"), note: T("Narrow scope. Individually testable.", "نطاق محدود. قابل للاختبار منفردًا."), items: [T("Service agent", "وكيل الخدمة"), T("Operations agent", "وكيل العمليات"), T("Field service agent", "وكيل الخدمة الميدانية"), T("Finance agent", "الوكيل المالي"), T("Procurement agent", "وكيل المشتريات"), T("Analytics agent", "وكيل التحليلات"), T("Knowledge agent", "وكيل المعرفة"), T("Compliance agent", "وكيل الالتزام")] },
  { label: T("Models & knowledge", "النماذج والمعرفة"), note: T("Chosen per workload, not per vendor.", "تُختار حسب العبء، لا حسب المورّد."), items: [T("Open-source models", "نماذج مفتوحة المصدر"), T("Commercial models", "نماذج تجارية"), T("Model routing", "توجيه النماذج"), T("Retrieval & grounding", "الاسترجاع والإسناد"), T("Evaluation sets", "مجموعات التقييم"), T("Guardrails", "ضوابط السلامة")] },
  { label: T("Tools & enterprise systems", "الأدوات والأنظمة المؤسسية"), note: T("Where work actually lands.", "حيث يقع العمل فعليًا."), items: [T("Core systems", "الأنظمة الأساسية"), T("Case management", "إدارة الحالات"), T("Payments", "المدفوعات"), T("Notifications", "الإشعارات"), T("Documents", "المستندات"), T("Internal APIs", "واجهات البرمجة الداخلية"), T("MCP-compatible connectors", "موصّلات متوافقة مع MCP")] },
  { label: T("Control plane", "طبقة التحكم"), note: T("The part that gets audited.", "الجزء الذي يخضع للتدقيق."), items: [T("Identity & roles", "الهوية والأدوار"), T("Scoped permissions", "صلاحيات محدّدة النطاق"), T("Approval checkpoints", "نقاط الموافقة"), T("Full audit trail", "سجل تدقيق كامل"), T("Tracing & observability", "التتبّع وقابلية المراقبة"), T("Cost & rate controls", "ضوابط التكلفة والمعدّل")] },
];

const AGENTS = [
  { icon: "building", h: T("Government service agent", "وكيل الخدمة الحكومية"), p: T("Takes a resident request in plain language, checks eligibility against the record, assembles the case and moves it into the responsible department's queue.", "يستقبل طلب المتعامل بلغة طبيعية، ويتحقّق من الأهلية وفق السجل، ويجمّع الملف ويحيله إلى قائمة عمل الإدارة المختصّة.") },
  { icon: "flow", h: T("Operations agent", "وكيل العمليات"), p: T("Watches operational signals, correlates them against thresholds and standing procedure, and opens the right ticket with the right priority before anyone calls.", "يراقب الإشارات التشغيلية، ويربطها بالحدود والإجراءات المعتمدة، ويفتح البلاغ الصحيح بالأولوية الصحيحة قبل أن يتّصل أحد.") },
  { icon: "package", h: T("Field service agent", "وكيل الخدمة الميدانية"), p: T("Sequences jobs against crew skills, location and SLA, then keeps the schedule honest as the day degrades.", "يرتّب المهام وفق مهارات الفرق والموقع واتفاقية مستوى الخدمة، ثم يُبقي الجدول واقعيًا مع تغيّر ظروف اليوم.") },
  { icon: "graph", h: T("Analytics agent", "وكيل التحليلات"), p: T("Answers operational questions against governed data, shows the query it ran, and refuses politely when the data does not support the answer.", "يجيب عن الأسئلة التشغيلية من بيانات محكومة، ويعرض الاستعلام الذي نفّذه، ويمتنع بأدب حين لا تدعم البيانات الإجابة.") },
  { icon: "api", h: T("Procurement agent", "وكيل المشتريات"), p: T("Drafts requisitions, checks them against framework agreements and policy, and routes for the signature the policy actually requires.", "يصوغ طلبات الشراء، ويقارنها بالاتفاقيات الإطارية والسياسات، ويوجّهها للتوقيع الذي تتطلّبه السياسة فعلًا.") },
  { icon: "shield", h: T("Compliance agent", "وكيل الالتزام"), p: T("Reads what the other agents did, tests it against the control set, and flags the exceptions for a human reviewer.", "يقرأ ما فعله بقية الوكلاء، ويختبره وفق منظومة الضوابط، ويرفع الاستثناءات إلى مراجع بشري.") },
];

const CONTROLS = [
  { icon: "key", h: T("Scoped permissions", "صلاحيات محدّدة النطاق"), p: T("An agent is granted named tools and named data, not a role that happens to be broad. Scope is reviewable and revocable at any time.", "يُمنح الوكيل أدوات محدّدة وبيانات محدّدة بالاسم، لا دورًا واسعًا بالصدفة. والنطاق قابل للمراجعة والسحب في أي وقت.") },
  { icon: "people", h: T("Human-in-the-loop", "الإنسان ضمن الحلقة"), p: T("Consequential steps: money, personal data, a physical dispatch, an irreversible status change, stop for a named approver.", "الخطوات ذات الأثر: المال والبيانات الشخصية والإرسال الميداني وأي تغيير غير قابل للعكس، تتوقّف عند مُعتمِد محدّد بالاسم.") },
  { icon: "eye", h: T("Traceable reasoning", "استدلال قابل للتتبّع"), p: T("Inputs, retrieved context, tool calls and outputs are recorded so a reviewer can reconstruct a decision months later.", "تُسجَّل المدخلات والسياق المسترجَع واستدعاءات الأدوات والمخرجات، ليتمكّن المراجع من إعادة بناء القرار بعد أشهر.") },
  { icon: "model", h: T("Model flexibility", "مرونة النماذج"), p: T("Workloads route to open-source or commercial models on merit. No single provider becomes a structural dependency.", "تُوجَّه الأعباء إلى نماذج مفتوحة أو تجارية بحسب الجدارة. ولا يتحوّل أي مزوّد إلى اعتماد بنيوي.") },
  { icon: "target", h: T("Evaluation before rollout", "تقييم قبل الإطلاق"), p: T("Agents ship against evaluation sets built from real cases, and regressions are caught before a workflow is widened.", "تُطلق الوكلاء وفق مجموعات تقييم مبنية على حالات حقيقية، وتُلتقط الانحدارات قبل توسيع أي سير عمل.") },
  { icon: "lock", h: T("Deployment boundary", "حدود النشر"), p: T("The whole stack can run inside a private or sovereign environment, with inference constrained to the same boundary.", "يمكن تشغيل المنظومة كاملة داخل بيئة خاصة أو سيادية، مع حصر الاستدلال ضمن الحدود نفسها.") },
];

const LIFECYCLE = [
  { label: T("Scope a workflow, not a chatbot", "تحديد سير عمل، لا روبوت محادثة"), icon: "target", note: T("We start from a process with a measurable cost, a queue and an owner.", "نبدأ من عملية لها تكلفة قابلة للقياس وقائمة عمل ومالك محدّد.") },
  { label: T("Ground it in real data", "إسناده إلى بيانات حقيقية"), icon: "layers", note: T("Retrieval, permissions and data contracts before any prompt engineering.", "الاسترجاع والصلاحيات وعقود البيانات قبل أي هندسة للتوجيهات.") },
  { label: T("Give it real tools", "منحه أدوات حقيقية"), icon: "api", note: T("Explicit, versioned tool definitions against the systems that hold the truth.", "تعريفات أدوات صريحة ومُصدَّرة بإصدارات، موجّهة للأنظمة التي تحمل الحقيقة.") },
  { label: T("Constrain the autonomy", "تقييد الاستقلالية"), icon: "shield", note: T("Approval gates set per action class, tightened or relaxed after evidence.", "بوابات موافقة تُضبط لكل فئة إجراء، وتُشدَّد أو تُخفَّف بناءً على الأدلّة.") },
  { label: T("Instrument everything", "قياس كل شيء"), icon: "eye", note: T("Traces, evaluation scores, cost per task and human-override rate.", "آثار التنفيذ ودرجات التقييم وتكلفة المهمة ومعدّل التدخّل البشري.") },
  { label: T("Widen once it earns it", "التوسّع بعد الاستحقاق"), icon: "graph", note: T("Scope grows on measured performance, never on enthusiasm.", "يتوسّع النطاق بناءً على أداء مقيس، لا على الحماس.") },
];

const CAPABILITY_MATRIX = [
  { label: T("Reasoning", "الاستدلال"), items: [T("Task decomposition", "تفكيك المهام"), T("Multi-step planning", "التخطيط متعدّد الخطوات"), T("Tool selection", "اختيار الأدوات"), T("Self-correction", "التصحيح الذاتي"), T("Confidence handling", "التعامل مع درجة الثقة")] },
  { label: T("Integration", "التكامل"), items: [T("REST & GraphQL APIs", "واجهات REST وGraphQL"), T("Event streams", "تدفّقات الأحداث"), T("MCP-compatible connectors", "موصّلات متوافقة مع MCP"), T("Legacy adapters", "محوّلات الأنظمة القديمة"), T("Document pipelines", "مسارات المستندات")] },
  { label: T("Governance", "الحوكمة"), items: [T("Role-based access", "الوصول حسب الدور"), T("Approval workflows", "مسارات الموافقة"), T("Audit export", "تصدير سجل التدقيق"), T("Data classification", "تصنيف البيانات"), T("Retention policy", "سياسة الاحتفاظ")] },
  { label: T("Operations", "التشغيل"), items: [T("Tracing & replay", "التتبّع وإعادة التشغيل"), T("Evaluation harness", "منظومة التقييم"), T("Cost controls", "ضوابط التكلفة"), T("Rate limiting", "تحديد المعدّل"), T("Incident runbooks", "أدلّة معالجة الحوادث")] },
];

const FAQS = [
  {
    q: T("What makes an agent different from a chatbot?", "ما الفرق بين الوكيل وروبوت المحادثة؟"),
    a: T("A chatbot produces text. An agent produces a change in a system: it plans a task, calls approved tools against real enterprise systems, handles failure and reports what it did. That difference is why the engineering effort sits in permissions, tool definitions and audit rather than in conversation design.", "روبوت المحادثة يُنتج نصًا. أما الوكيل فيُنتج تغييرًا في نظام: يخطّط للمهمة، ويستدعي أدوات معتمدة على أنظمة مؤسسية حقيقية، ويتعامل مع الإخفاق، ويقرّر بما فعله. ولهذا الفرق تحديدًا يتركّز الجهد الهندسي في الصلاحيات وتعريفات الأدوات والتدقيق، لا في تصميم المحادثة."),
  },
  {
    q: T("Which models does Qeonix use?", "أي النماذج تستخدمها كيونكس؟"),
    a: T("Whichever fits the workload and the deployment constraint. We design for model flexibility across open-source and commercial models, with routing per task, so an organization is not structurally dependent on one provider and can move as the market moves.", "ما يناسب العبء وقيد النشر. نصمّم على أساس مرونة النماذج بين المفتوحة المصدر والتجارية، مع توجيه لكل مهمة، حتى لا ترتبط الجهة بنيويًا بمزوّد واحد وتتمكّن من التحرّك مع تحرّك السوق."),
  },
  {
    q: T("Can this run without sending data to a third-party model provider?", "هل يمكن تشغيل ذلك دون إرسال البيانات إلى مزوّد نماذج خارجي؟"),
    a: T("Yes. Where the data class requires it, the platform is architected to run inside a private or sovereign environment with inference constrained to the same boundary, using models that can be hosted there. That is a design decision taken at the start, because retrofitting it is expensive.", "نعم. حين يتطلّب تصنيف البيانات ذلك، تُصمَّم المنصّة للعمل داخل بيئة خاصة أو سيادية مع حصر الاستدلال ضمن الحدود نفسها، باستخدام نماذج يمكن استضافتها هناك. وهذا قرار تصميمي يُتّخذ في البداية، لأن تعديله لاحقًا مكلف."),
  },
  {
    q: T("How do you stop an agent doing something it should not?", "كيف تمنعون الوكيل من فعل ما لا ينبغي؟"),
    a: T("Three layers. The agent can only call an explicit, versioned set of tools. It acts under an identity with scoped permissions on data and actions. And any action class marked consequential stops at a named human approver before it executes. Autonomy is widened only after measured performance, per workflow.", "ثلاث طبقات. لا يستطيع الوكيل استدعاء سوى مجموعة أدوات صريحة ومحدّدة الإصدار. ويعمل تحت هوية بصلاحيات محدّدة النطاق على البيانات والإجراءات. وأي فئة إجراء مصنّفة ذات أثر تتوقّف عند مُعتمِد بشري محدّد قبل التنفيذ. ولا تتوسّع الاستقلالية إلا بعد أداء مقيس، ولكل سير عمل على حدة."),
  },
  {
    q: T("What does a first engagement look like?", "كيف يبدو أول ارتباط؟"),
    a: T("A single workflow with a measurable cost and a clear owner, taken from scoping to production. That gives the organization a working system, a real integration path and honest numbers on cost per task and human-override rate before anything is widened.", "سير عمل واحد له تكلفة قابلة للقياس ومالك واضح، يُؤخذ من التحديد إلى الإنتاج. وهذا يمنح الجهة نظامًا عاملًا ومسار تكامل حقيقيًا وأرقامًا صادقة عن تكلفة المهمة ومعدّل التدخّل البشري قبل أي توسيع."),
  },
];

export default function agentic(lang) {
  const ar = lang === "ar";
  const hero = heroFor({
    route: "agentic",
    label: LABEL,
    kicker: T("Qeonix Intelligence · Agentic AI", "ذكاء كيونكس · الذكاء الاصطناعي الوكيل"),
    h: T("The AI operating layer|for work that has consequences.", "طبقة تشغيل الذكاء الاصطناعي|للأعمال ذات الأثر."),
    lead: T(
      "Agents that understand a request, reason about it, call your real systems and finish the job, inside permissions your security team set, with an audit trail your regulator can read.",
      "وكلاء يفهمون الطلب ويستنتجون ويستدعون أنظمتكم الفعلية وينجزون العمل، ضمن صلاحيات يضعها فريق الأمن لديكم، وبسجل تدقيق يستطيع جهاتكم الرقابية قراءته."
    ),
    meta: [
      { k: T("Deployment", "النشر"), v: T("Cloud, private, on-premise, sovereign", "سحابة عامة أو خاصة أو داخل المنشأة أو سيادية") },
      { k: T("Models", "النماذج"), v: T("Open-source and commercial, routed per task", "مفتوحة المصدر وتجارية، بتوجيه لكل مهمة") },
      { k: T("Control", "التحكم"), v: T("Scoped permissions, approvals, full audit", "صلاحيات محدّدة وموافقات وتدقيق كامل") },
    ],
  }, lang);

  const body = `
${hero.html}

${section(`
  ${secHead({
    kicker: T("The distinction", "الفارق"),
    h: T("Everyone has a chatbot.|The question is what happens next.", "لدى الجميع روبوت محادثة.|السؤال هو ما الذي يحدث بعده."),
    lead: T("Each rung adds capability and removes a human from a step. Each one also raises the bar on governance, which is the part most programs discover late.", "كل درجة تضيف قدرة وتزيح إنسانًا عن خطوة. وكل درجة ترفع أيضًا سقف الحوكمة، وهو ما تكتشفه أغلب البرامج متأخّرًا."),
  }, lang)}
  ${ladder(RUNGS, lang)}
`, { tone: "light" })}

${section(`
  ${secHead({
    kicker: T("In operation", "أثناء التشغيل"),
    h: T("What a run actually looks like.", "كيف يبدو التشغيل فعليًا."),
    lead: T("Run the request yourself. The plan forms, tools fire, and then the system stops, because the consequential step waits for you. That pause is the entire governance model, and you are about to feel it.", "شغّل الطلب بنفسك. تتشكّل الخطة وتُستدعى الأدوات ثم يتوقّف النظام، لأن الخطوة ذات الأثر تنتظرك أنت. تلك الوقفة هي نموذج الحوكمة بأكمله، وستلمسها بنفسك الآن."),
  }, lang)}
  <div class="reveal" data-d="1">${agenticTrace(lang, { interactive: true })}</div>
`, { tone: "paper" })}

${section(`
  ${secHead({
    kicker: T("Architecture", "البنية"),
    h: T("Six layers.|Every one of them governable.", "ست طبقات.|كل واحدة منها قابلة للحوكمة."),
    lead: T("This is the shape of a Qeonix agentic deployment. The model is one band out of six, which is roughly its share of the actual engineering.", "هذا هو شكل النشر الوكيل لدى كيونكس. النموذج طبقة واحدة من ست، وهي تقريبًا حصّته الفعلية من الجهد الهندسي."),
  }, lang)}
  ${archBoard(STACK, lang, {
    id: "agentic-stack",
    legend: T("Read top to bottom for the request path; bottom to top for the accountability path.", "اقرأها من الأعلى للأسفل لمسار الطلب، ومن الأسفل للأعلى لمسار المساءلة."),
  })}
`, { tone: "deep", grid: true })}

${section(`
  ${secHead({
    kicker: T("Agents in service", "وكلاء في الخدمة"),
    h: T("Narrow agents beat one|that claims to do everything.", "الوكلاء محدودو النطاق أفضل من واحد|يدّعي القيام بكل شيء."),
    lead: T("Each of these has a defined scope, its own evaluation set and its own permission envelope. That is what makes them testable, and replaceable.", "لكل من هؤلاء نطاق محدّد ومجموعة تقييم خاصة وغلاف صلاحيات خاص. وهذا ما يجعلهم قابلين للاختبار، وللاستبدال."),
  }, lang)}
  ${capGrid(AGENTS, lang, { cols: 3 })}
`, { tone: "paper" })}

${section(`
  ${secHead({
    kicker: T("Control plane", "طبقة التحكم"),
    h: T("The six questions|a CISO asks first.", "الأسئلة الستة|التي يبدأ بها مسؤول أمن المعلومات."),
  }, lang)}
  ${trustGrid(CONTROLS, lang)}
`, { tone: "light" })}

${section(`
  ${secHead({
    kicker: T("How we take it live", "كيف ندخل به الخدمة"),
    h: T("Autonomy is earned,|one workflow at a time.", "الاستقلالية تُكتسب،|سير عمل تلو الآخر."),
    lead: T("We do not switch an organization to agentic operation. We move one workflow, instrument it honestly, and let the numbers decide the next one.", "لا ننقل الجهة دفعة واحدة إلى التشغيل الوكيل. ننقل سير عمل واحدًا، ونقيسه بصدق، ونترك الأرقام تحدّد التالي."),
  }, lang)}
  ${flowStack(LIFECYCLE, lang, { id: "agentic-lifecycle", dense: true })}
`, { tone: "paper" })}

${section(`
  ${secHead({
    kicker: T("Platform capability", "قدرات المنصّة"),
    h: T("What is in the box.", "ما الذي تحتويه المنصّة."),
  }, lang)}
  ${matrix(CAPABILITY_MATRIX, lang)}
`, { tone: "light" })}

${section(`
  ${secHead({
    kicker: T("Deployment", "النشر"),
    h: T("Run it where the mandate says.", "شغّلها حيث يقتضي التكليف."),
    lead: T("Topology is chosen against data classification and regulatory obligation, then held as an architectural constraint through the whole build.", "تُختار البنية وفق تصنيف البيانات والالتزام التنظيمي، ثم تُثبَّت كقيد هندسي طوال مراحل البناء."),
    align: "center",
  }, lang)}
  ${deployTiers(TIERS, lang)}
  <p class="u-mt u-center">${btn(ar ? "الذكاء الاصطناعي السيادي" : "Sovereign AI in detail", url("sovereign", lang), { kind: "ghost", lang })}</p>
`, { tone: "deep", grid: true })}

${section(statement({
  text: T("An agent you cannot audit|is a liability, not a capability.", "الوكيل الذي لا يمكن تدقيقه|التزامٌ لا قدرة."),
}, lang), { tone: "accent", cls: "sec-tight" })}

${section(`
  ${secHead({ kicker: T("Questions", "أسئلة"), h: T("Agentic AI, answered.", "الذكاء الاصطناعي الوكيل، بإجابات مباشرة.") }, lang)}
  <div class="u-narrow-c">${faq(FAQS, lang, "agentic-faq")}</div>
`, { tone: "light" })}

${closer("agentic", lang)}
`;

  return {
    route: "agentic",
    solidHeader: true,
    crumbTrail: hero.crumbTrail,
    title: T(
      "Agentic AI Platform for Government & Enterprise | Qeonix",
      "منصّة الذكاء الاصطناعي الوكيل للحكومات والمؤسسات | كيونكس"
    ),
    description: T(
      "Enterprise and government-grade agentic AI: multi-agent orchestration, tool and API calling, human-in-the-loop controls, scoped permissions, observability and audit, deployable in cloud, private, on-premise or sovereign environments.",
      "ذكاء اصطناعي وكيل بمستوى المؤسسات والجهات الحكومية: تنسيق متعدّد الوكلاء، واستدعاء الأدوات وواجهات البرمجة، وضوابط الإنسان ضمن الحلقة، وصلاحيات محدّدة النطاق، وقابلية مراقبة وتدقيق، قابل للنشر في السحابة أو بيئة خاصة أو داخل المنشأة أو بيئة سيادية."
    ),
    og: "agentic",
    service: { name: LABEL, type: T("Agentic AI platform engineering", "هندسة منصّات الذكاء الاصطناعي الوكيل") },
    faqSchema: FAQS,
    body,
  };
}
