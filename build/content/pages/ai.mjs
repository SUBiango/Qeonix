import { T } from "../../lib/html.mjs";
import { section, secHead, btn, capGrid, faq, pillars, statement } from "../../lib/components.mjs";
import { matrix, flowStack, deployTiers } from "../../lib/diagrams.mjs";
import { heroFor, closer } from "../../lib/page.mjs";
import { url } from "../site.mjs";
import { TIERS } from "../shared.mjs";

const LABEL = T("Intelligence & AI", "الذكاء الاصطناعي");

const DOMAINS = [
  { icon: "compass", h: T("Decision intelligence", "ذكاء القرار"), p: T("Models wrapped in the context, thresholds and authority structure of the decision they support, so a recommendation arrives with the reason and the owner attached.", "نماذج مغلَّفة بسياق القرار وحدوده وهيكل الصلاحية الخاص به، لتصل التوصية مصحوبة بالسبب والمسؤول.") },
  { icon: "vision", h: T("Computer vision", "الرؤية الحاسوبية"), p: T("Detection, classification and change monitoring on fixed cameras, vehicle-mounted sensors and aerial imagery, tuned against the site rather than a public dataset.", "الكشف والتصنيف ورصد التغيّر عبر الكاميرات الثابتة والمستشعرات المركّبة على المركبات والصور الجوية، مضبوطة على الموقع لا على مجموعة بيانات عامة.") },
  { icon: "graph", h: T("Predictive analytics", "التحليلات التنبؤية"), p: T("Failure, demand and load forecasting built on the operator's own history, and re-scored as reality diverges from the training window.", "التنبؤ بالأعطال والطلب والأحمال بناءً على سجل المشغّل نفسه، مع إعادة تقييم مستمرة كلما ابتعد الواقع عن نافذة التدريب.") },
  { icon: "spark", h: T("Generative AI", "الذكاء التوليدي"), p: T("Drafting, summarization, translation and knowledge retrieval grounded in governed sources, with citations back to the record.", "الصياغة والتلخيص والترجمة واسترجاع المعرفة من مصادر محكومة، مع إسناد مرجعي إلى السجل الأصلي.") },
  { icon: "layers", h: T("Data intelligence", "ذكاء البيانات"), p: T("Entity resolution, quality scoring and lineage: the unglamorous work that determines whether any of the above is trustworthy.", "توحيد الكيانات وتقييم الجودة وتتبّع المنشأ: العمل غير اللافت الذي يحدّد ما إذا كان أيٌّ مما سبق جديرًا بالثقة.") },
  { icon: "chip", h: T("Enterprise AI", "الذكاء المؤسسي"), p: T("AI delivered as a governed capability across an organization, not as a series of disconnected pilots each with its own key and its own risk.", "ذكاء اصطناعي يُقدَّم كقدرة محكومة على مستوى المؤسسة، لا كسلسلة تجارب منفصلة لكلٍّ مفتاحها ومخاطرها.") },
];

const PIPELINE = [
  { label: T("Establish the ground truth", "ترسيخ المرجعية"), icon: "layers", note: T("Sources, ownership, quality and the lineage that lets an answer be defended.", "المصادر والملكية والجودة ومسار المنشأ الذي يسمح بالدفاع عن أي إجابة.") },
  { label: T("Frame the decision", "تأطير القرار"), icon: "compass", note: T("What is being decided, by whom, on what evidence, against which threshold.", "ما الذي يُقرَّر، ومن يقرّره، وبأي أدلّة، ووفق أي حدّ.") },
  { label: T("Build and evaluate", "البناء والتقييم"), icon: "target", note: T("Trained or selected against the operator's own cases, scored before deployment.", "تدريب أو اختيار وفق حالات المشغّل نفسه، بتقييم سابق للنشر.") },
  { label: T("Integrate into the workflow", "الدمج في سير العمل"), icon: "flow", note: T("Delivered where the work already happens, not as another screen to check.", "تُقدَّم حيث يجري العمل فعلًا، لا كشاشة إضافية للمراجعة.") },
  { label: T("Monitor and re-score", "المراقبة وإعادة التقييم"), icon: "eye", note: T("Drift, override rates and outcome quality tracked as first-class metrics.", "الانحراف ومعدّلات التجاوز وجودة النتائج تُتابَع كمؤشّرات أساسية.") },
];

const STACK = [
  { label: T("Perception", "الإدراك"), items: [T("Object detection", "كشف الأجسام"), T("Segmentation", "التجزئة"), T("Change detection", "كشف التغيّر"), T("OCR & document AI", "التعرّف الضوئي وذكاء المستندات"), T("Audio & signal", "الصوت والإشارة")] },
  { label: T("Reasoning", "الاستدلال"), items: [T("Forecasting", "التنبؤ"), T("Optimization", "التحسين"), T("Anomaly detection", "كشف الشذوذ"), T("Retrieval & grounding", "الاسترجاع والإسناد"), T("Simulation", "المحاكاة")] },
  { label: T("Delivery", "التقديم"), items: [T("Operational dashboards", "لوحات تشغيلية"), T("Alerts & thresholds", "التنبيهات والحدود"), T("Embedded in core systems", "مدمج في الأنظمة الأساسية"), T("Assistants & copilots", "المساعدون والمرافقون"), T("APIs", "واجهات البرمجة")] },
  { label: T("Assurance", "الضمان"), items: [T("Evaluation sets", "مجموعات التقييم"), T("Drift monitoring", "مراقبة الانحراف"), T("Bias review", "مراجعة التحيّز"), T("Model registry", "سجل النماذج"), T("MLOps pipelines", "مسارات عمليات التعلّم الآلي")] },
];

const PRINCIPLES = [
  { h: T("No model without a decision", "لا نموذج بلا قرار"), p: T("If we cannot name the decision a model improves and who owns it, we do not build the model.", "إن لم نستطع تسمية القرار الذي يحسّنه النموذج ومَن يملكه، فلن نبني النموذج.") },
  { h: T("Accuracy is not the metric", "الدقة ليست المقياس"), p: T("Override rate, time-to-action and outcome quality tell you whether an operator actually trusts it.", "معدّل التجاوز وزمن الاستجابة وجودة النتيجة هي ما يخبرك إن كان المشغّل يثق بها فعلًا.") },
  { h: T("Grounded or silent", "مُسنَد أو صامت"), p: T("A generative answer cites its source or declines. Confident invention is worse than no answer.", "الإجابة التوليدية تستشهد بمصدرها أو تمتنع. والاختلاق الواثق أسوأ من غياب الإجابة.") },
  { h: T("Built on the operator's data", "مبنيّة على بيانات المشغّل"), p: T("Site conditions, local naming and edge cases matter more than benchmark scores.", "ظروف الموقع والتسميات المحلية والحالات الحدّية أهم من درجات المعايير القياسية.") },
  { h: T("Portable by design", "قابلة للنقل بالتصميم"), p: T("Model choice is an implementation detail we keep replaceable, not an architectural commitment.", "اختيار النموذج تفصيل تنفيذي نُبقيه قابلًا للاستبدال، لا التزامًا بنيويًا.") },
  { h: T("Instrumented from day one", "مزوّدة بالقياس منذ اليوم الأول"), p: T("A model with no monitoring is an unowned liability the moment reality shifts.", "النموذج بلا مراقبة التزام بلا مالك لحظة تغيّر الواقع.") },
];

const FAQS = [
  {
    q: T("Do you build models or use existing ones?", "هل تبنون النماذج أم تستخدمون القائم منها؟"),
    a: T("Both, chosen on merit. Perception and forecasting problems specific to a site are usually trained or fine-tuned on the operator's own data. Language and reasoning workloads generally use existing open-source or commercial models, routed per task. What we always build is the layer around them: grounding, evaluation, integration and governance.", "الاثنان معًا، بحسب الجدارة. مسائل الإدراك والتنبؤ الخاصة بموقع معيّن تُدرَّب أو تُضبط عادةً على بيانات المشغّل نفسه. أما أعباء اللغة والاستدلال فتستخدم عمومًا نماذج قائمة مفتوحة المصدر أو تجارية، تُوجَّه لكل مهمة. والذي نبنيه دائمًا هو الطبقة المحيطة بها: الإسناد والتقييم والتكامل والحوكمة."),
  },
  {
    q: T("How do you handle data that cannot leave our environment?", "كيف تتعاملون مع بيانات لا يمكن أن تغادر بيئتنا؟"),
    a: T("The architecture assumes that constraint rather than working around it. Training, inference and retrieval can all be constrained to your own environment using models that can be hosted there, with the deployment topology fixed at design time.", "تفترض البنية هذا القيد بدل الالتفاف عليه. يمكن حصر التدريب والاستدلال والاسترجاع جميعًا داخل بيئتكم باستخدام نماذج قابلة للاستضافة هناك، مع تثبيت بنية النشر في مرحلة التصميم."),
  },
  {
    q: T("What is a realistic first project?", "ما المشروع الأول الواقعي؟"),
    a: T("One decision that is currently made late, made inconsistently, or made by reading three systems at once. We instrument the current baseline first, so the improvement can be measured rather than asserted.", "قرار واحد يُتّخذ حاليًا متأخّرًا، أو بتفاوت، أو بعد قراءة ثلاثة أنظمة في آن. نقيس الوضع الحالي أولًا، ليكون التحسّن قابلًا للقياس لا للادّعاء."),
  },
];

export default function ai(lang) {
  const ar = lang === "ar";
  const hero = heroFor({
    route: "ai",
    label: LABEL,
    kicker: T("Capability · Intelligence & AI", "قدرة · الذكاء الاصطناعي"),
    h: T("Applied AI for operations|that already exist.", "ذكاء اصطناعي تطبيقي لعمليات|قائمة بالفعل."),
    lead: T(
      "Most organizations do not need a new AI strategy. They need three decisions made earlier, more consistently, and with the evidence attached, inside the systems their teams already work in.",
      "أغلب المؤسسات لا تحتاج استراتيجية ذكاء اصطناعي جديدة. تحتاج ثلاثة قرارات تُتّخذ أبكر وبثبات أكبر ومع الأدلّة، داخل الأنظمة التي تعمل فيها فرقها بالفعل."
    ),
    meta: [
      { k: T("Applied to", "تُطبَّق على"), v: T("Live operations, not pilots", "عمليات فعلية، لا تجارب") },
      { k: T("Measured by", "تُقاس بـ"), v: T("Override rate and time-to-action", "معدّل التجاوز وزمن الاستجابة") },
      { k: T("Model policy", "سياسة النماذج"), v: T("Portable, routed per workload", "قابلة للنقل، بتوجيه حسب العبء") },
    ],
  }, lang);

  const body = `
${hero.html}

${section(`
  ${secHead({
    kicker: T("Domains", "المجالات"),
    h: T("Six things we are asked for,|and one thing they have in common.", "ستة أمور يُطلب منّا تنفيذها،|وأمر واحد يجمعها."),
    lead: T("Every one of them fails the same way: a model that is technically correct and operationally ignored. We design against that failure first.", "كلها تفشل بالطريقة نفسها: نموذج صحيح تقنيًا ومُهمَل تشغيليًا. ونصمّم ضد هذا الفشل أولًا."),
  }, lang)}
  ${capGrid(DOMAINS, lang, { cols: 3 })}
`, { tone: "light" })}

${section(`
  ${secHead({
    kicker: T("Method", "المنهج"),
    h: T("From ground truth|to a decision someone acts on.", "من المرجعية|إلى قرار يتصرّف أحدهم بناءً عليه."),
  }, lang)}
  ${flowStack(PIPELINE, lang, { id: "ai-method", dense: true })}
`, { tone: "deep", grid: true })}

${section(`
  ${secHead({ kicker: T("Technical scope", "النطاق التقني"), h: T("What we work with.", "ما نعمل به.") }, lang)}
  ${matrix(STACK, lang)}
`, { tone: "paper" })}

${section(`
  ${secHead({ kicker: T("Principles", "مبادئ"), h: T("How we decide what not to build.", "كيف نقرّر ما لا نبنيه.") }, lang)}
  ${pillars(PRINCIPLES, lang)}
`, { tone: "light" })}

${section(`
  ${secHead({
    kicker: T("Deployment", "النشر"),
    h: T("Including where the data cannot move.", "بما في ذلك حيث لا يمكن نقل البيانات."),
    align: "center",
  }, lang)}
  ${deployTiers(TIERS, lang)}
  <p class="u-mt u-center">${btn(ar ? "الذكاء الاصطناعي السيادي" : "Sovereign AI", url("sovereign", lang), { kind: "ghost", lang })}</p>
`, { tone: "deep", grid: true })}

${section(statement({
  text: T("A model nobody acts on|is an expensive opinion.", "النموذج الذي لا يتصرّف أحد بناءً عليه|رأيٌ باهظ الثمن."),
}, lang), { tone: "accent", cls: "sec-tight" })}

${section(`
  ${secHead({ kicker: T("Questions", "أسئلة"), h: T("Applied AI, answered.", "الذكاء التطبيقي، بإجابات مباشرة.") }, lang)}
  <div class="u-narrow-c">${faq(FAQS, lang, "ai-faq")}</div>
`, { tone: "paper" })}

${closer("ai", lang)}
`;

  return {
    route: "ai",
    solidHeader: true,
    crumbTrail: hero.crumbTrail,
    title: T(
      "Artificial Intelligence & Decision Intelligence | Qeonix Abu Dhabi",
      "الذكاء الاصطناعي وذكاء القرار | كيونكس أبوظبي"
    ),
    description: T(
      "Applied AI for live operations: decision intelligence, computer vision, predictive analytics, generative AI and enterprise AI. Engineered on your own data, integrated into existing workflows, and deployable inside your own environment.",
      "ذكاء اصطناعي تطبيقي للعمليات الفعلية: ذكاء القرار والرؤية الحاسوبية والتحليلات التنبؤية والذكاء التوليدي والذكاء المؤسسي. مهندَس على بياناتكم، ومدمج في سير عملكم القائم، وقابل للنشر داخل بيئتكم."
    ),
    og: "ai",
    service: { name: LABEL, type: T("Artificial intelligence engineering", "هندسة الذكاء الاصطناعي") },
    faqSchema: FAQS,
    body,
  };
}
