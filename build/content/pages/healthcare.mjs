import { T } from "../../lib/html.mjs";
import { section, secHead, capGrid, faq, trustGrid, statement } from "../../lib/components.mjs";
import { archBoard, flowStack } from "../../lib/diagrams.mjs";
import { healthConsole } from "../../lib/showcase.mjs";
import { heroFor, closer } from "../../lib/page.mjs";

const LABEL = T("Healthcare", "الرعاية الصحية");

const CAPS = [
  { icon: "health", h: T("Digital health platforms", "منصّات الصحة الرقمية"), p: T("Patient-facing portals and apps across appointments, records access, referrals and follow-up, one journey rather than a portal per provider.", "بوابات وتطبيقات للمرضى تشمل المواعيد والاطلاع على السجلّات والإحالات والمتابعة، رحلة واحدة لا بوابة لكل مزوّد.") },
  { icon: "flow", h: T("Care orchestration", "تنسيق الرعاية"), p: T("Referral, follow-up and care-pathway coordination across providers, so a patient's next step never depends on them chasing it.", "تنسيق الإحالات والمتابعة ومسارات الرعاية بين المزوّدين، حتى لا تعتمد خطوة المريض التالية على ملاحقته لها.") },
  { icon: "agent", h: T("AI healthcare assistants", "المساعدون الصحيون بالذكاء الاصطناعي"), p: T("Assistants for scheduling, preparation, navigation and administrative questions, grounded in the provider's own information, with clinical questions routed to clinicians.", "مساعدون للجدولة والتحضير والإرشاد والأسئلة الإدارية، مستندون إلى معلومات المزوّد نفسه، مع توجيه الأسئلة السريرية إلى الأطباء.") },
  { icon: "people", h: T("Provider ecosystems", "منظومات المزوّدين"), p: T("Appointment and service marketplaces connecting payers, providers and patients with availability, eligibility and pricing in one place.", "أسواق مواعيد وخدمات تربط الجهات الممولة والمزوّدين والمرضى بالتوافر والأهلية والتسعير في مكان واحد.") },
  { icon: "shield", h: T("Insurance intelligence", "ذكاء التأمين"), p: T("Eligibility, prior authorization and claims workflows with anomaly signals, reducing the paperwork between a patient and an approval.", "سير عمل للأهلية والموافقات المسبقة والمطالبات مع إشارات الشذوذ، بما يقلّص الأوراق بين المريض والموافقة.") },
  { icon: "graph", h: T("Healthcare analytics", "التحليلات الصحية"), p: T("Capacity, flow and operational analytics for hospital groups and health authorities: the operational side of care, measured.", "تحليلات السعة والتدفّق والتشغيل لمجموعات المستشفيات والهيئات الصحية: الجانب التشغيلي للرعاية، مقيسًا.") },
];

const STACK = [
  { label: T("Patient experience", "تجربة المريض"), note: T("Every channel a patient uses.", "كل قناة يستخدمها المريض."), items: [T("Web & mobile", "الويب والهاتف"), T("Appointments", "المواعيد"), T("Reminders & prep", "التذكير والتحضير"), T("Records access", "الاطلاع على السجلّات"), T("Arabic & English", "العربية والإنجليزية")] },
  { label: T("Care orchestration", "تنسيق الرعاية"), note: T("The journey between providers.", "الرحلة بين المزوّدين."), tone: "hi", items: [T("Referral routing", "توجيه الإحالات"), T("Care pathways", "مسارات الرعاية"), T("Follow-up tracking", "تتبّع المتابعة"), T("Waitlist management", "إدارة قوائم الانتظار"), T("Escalation", "التصعيد")] },
  { label: T("Intelligence", "الذكاء"), note: T("Administrative, not diagnostic.", "إداري لا تشخيصي."), items: [T("Scheduling optimization", "تحسين الجدولة"), T("No-show prediction", "التنبؤ بعدم الحضور"), T("Document processing", "معالجة المستندات"), T("Demand forecasting", "التنبؤ بالطلب"), T("Assistant workflows", "مسارات المساعدين")] },
  { label: T("Interoperability", "قابلية التشغيل البيني"), note: T("Where health data actually lives.", "حيث تعيش البيانات الصحية فعلًا."), items: [T("EHR integrations", "التكامل مع السجلّات الإلكترونية"), T("HL7 / FHIR interfaces", "واجهات HL7 / FHIR"), T("Payer connections", "الربط مع الجهات الممولة"), T("Lab & imaging feeds", "تغذية المختبرات والأشعة"), T("National platforms", "المنصّات الوطنية")] },
  { label: T("Trust & safety", "الثقة والسلامة"), note: T("Non-negotiable in health.", "غير قابلة للتفاوض في الصحة."), items: [T("Consent management", "إدارة الموافقات"), T("Role-based access", "الوصول حسب الدور"), T("Audit trail", "سجل التدقيق"), T("Data residency", "إقامة البيانات"), T("Clinical escalation rules", "قواعد التصعيد السريري")] },
];

const JOURNEY = [
  { label: T("A patient needs care", "مريض يحتاج رعاية"), icon: "people", note: T("Symptom, referral or routine follow-up, expressed in their own language.", "عارض أو إحالة أو متابعة دورية، بلغتهم.") },
  { label: T("Finding the right door", "إيجاد الباب الصحيح"), icon: "compass", note: T("Availability, eligibility and coverage resolved before the visit, not at the desk.", "يُحسم التوافر والأهلية والتغطية قبل الزيارة، لا عند المكتب.") },
  { label: T("The visit, prepared", "زيارة مُحضَّرة"), icon: "check", note: T("Documents, history and approvals assembled so clinical time is spent clinically.", "تُجمَّع المستندات والتاريخ والموافقات ليُصرف الوقت السريري سريريًا.") },
  { label: T("What happens next", "ما يلي الزيارة"), icon: "flow", note: T("Referrals, results and follow-ups tracked to completion across providers.", "تُتابَع الإحالات والنتائج والمواعيد اللاحقة حتى الإنجاز عبر المزوّدين.") },
  { label: T("The system learns", "النظام يتعلّم"), icon: "graph", note: T("Capacity, no-shows and bottlenecks feed operational planning.", "السعة وعدم الحضور والاختناقات تغذّي التخطيط التشغيلي.") },
];

const BOUNDARIES = [
  { icon: "shield", h: T("Administrative AI, clinical humans", "ذكاء إداري وبشر سريريون"), p: T("Our systems optimize scheduling, coordination, documents and operations. Diagnosis and treatment decisions belong to clinicians, and the architecture enforces that boundary.", "تُحسّن أنظمتنا الجدولة والتنسيق والمستندات والعمليات. أما قرارات التشخيص والعلاج فللأطباء، والبنية تفرض هذا الحدّ.") },
  { icon: "key", h: T("Consent is architecture", "الموافقة بنية"), p: T("Who may see what, for which purpose, for how long: modeled explicitly and enforced at the access layer, not in a policy document.", "من يرى ماذا، ولأي غرض، ولأي مدة: يُنمذج صراحةً ويُفرض عند طبقة الوصول، لا في وثيقة سياسات.") },
  { icon: "pin", h: T("Health data stays put", "البيانات الصحية تبقى في مكانها"), p: T("Deployments are architected for the residency and localization obligations that apply to health data in the jurisdiction.", "تُصمَّم عمليات النشر وفق التزامات الإقامة والتوطين المطبَّقة على البيانات الصحية في النطاق القضائي.") },
  { icon: "eye", h: T("Every access is accountable", "كل وصول مُساءَل"), p: T("Access to a record is logged, attributable and reviewable, including access by an AI assistant acting for a staff member.", "كل اطلاع على سجل مُسجَّل ومنسوب وقابل للمراجعة، بما في ذلك اطلاع مساعد ذكاء اصطناعي يعمل لموظف.") },
];

const FAQS = [
  {
    q: T("Does Qeonix build diagnostic AI?", "هل تبني كيونكس ذكاءً تشخيصيًا؟"),
    a: T("No. We build the administrative and operational layer of healthcare: scheduling, orchestration, document processing, analytics and patient experience. Clinical decision-making stays with clinicians, and our assistants are designed to route clinical questions to them rather than answer them.", "لا. نبني الطبقة الإدارية والتشغيلية للرعاية الصحية: الجدولة والتنسيق ومعالجة المستندات والتحليلات وتجربة المريض. يبقى القرار السريري للأطباء، ومساعدونا مصمّمون لتوجيه الأسئلة السريرية إليهم لا للإجابة عنها."),
  },
  {
    q: T("Can you integrate with our EHR and national health platforms?", "هل تتكاملون مع سجلّنا الإلكتروني والمنصّات الصحية الوطنية؟"),
    a: T("Integration with electronic health records and payer systems over standards such as HL7 and FHIR is the assumed starting point. We build against the interfaces the estate exposes, with data contracts and consent enforced at the boundary.", "التكامل مع السجلّات الصحية الإلكترونية وأنظمة الجهات الممولة عبر معايير مثل HL7 وFHIR هو نقطة البداية المفترضة. نبني وفق الواجهات التي تتيحها المنظومة، مع فرض عقود البيانات والموافقة عند الحدود."),
  },
  {
    q: T("Where does AI genuinely help in healthcare operations?", "أين يفيد الذكاء الاصطناعي حقًا في العمليات الصحية؟"),
    a: T("In the unglamorous load: scheduling against capacity, predicting no-shows, processing referral documents, assembling prior authorizations and answering the administrative questions that consume contact-center hours. That is where hours are lost today, and where automation is safe to apply.", "في العبء غير اللافت: الجدولة وفق السعة، والتنبؤ بعدم الحضور، ومعالجة مستندات الإحالة، وتجميع الموافقات المسبقة، والإجابة عن الأسئلة الإدارية التي تستهلك ساعات مراكز الاتصال. هناك تُهدر الساعات اليوم، وهناك تكون الأتمتة آمنة التطبيق."),
  },
];

export default function healthcare(lang) {
  const hero = heroFor({
    route: "healthcare",
    label: LABEL,
    kicker: T("Sector · Healthcare", "قطاع · الرعاية الصحية"),
    h: T("Care is clinical.|Everything around it is a system.", "الرعاية سريرية.|وكل ما حولها نظام."),
    lead: T(
      "Qeonix builds the operational layer of healthcare: patient journeys, care orchestration, provider ecosystems and insurance workflows, so clinical time is spent on care, not coordination.",
      "تبني كيونكس الطبقة التشغيلية للرعاية الصحية: رحلات المرضى وتنسيق الرعاية ومنظومات المزوّدين وسير عمل التأمين، ليُصرف الوقت السريري على الرعاية لا التنسيق."
    ),
    meta: [
      { k: T("Scope", "النطاق"), v: T("Administrative and operational, not diagnostic", "إداري وتشغيلي، لا تشخيصي") },
      { k: T("Interoperability", "التشغيل البيني"), v: T("EHR, HL7 / FHIR, payer systems", "السجلّات الإلكترونية وHL7 / FHIR وأنظمة الممولين") },
      { k: T("Data", "البيانات"), v: T("Residency-aware by design", "مراعية لإقامة البيانات بالتصميم") },
    ],
  }, lang);

  const body = `
${hero.html}

${section(`
  ${secHead({ kicker: T("Capabilities", "القدرات"), h: T("Six things we build in health.", "ستة أشياء نبنيها في الصحة.") }, lang)}
  ${capGrid(CAPS, lang, { cols: 3 })}
`, { tone: "light" })}

${section(`
  ${secHead({
    kicker: T("In operation", "أثناء التشغيل"),
    h: T("The journey, coordinated|end to end.", "الرحلة، منسَّقة|من طرف إلى طرف."),
    lead: T("One referral traced through the platform: eligibility, scheduling, instructions, risk flags and the summary back to the referrer: the administrative layer that decides whether care feels coordinated or chaotic.", "إحالة واحدة مُتتبَّعة عبر المنصّة: الأهلية والجدولة والتعليمات ومؤشّرات الخطر والملخّص العائد إلى المُحيل: الطبقة الإدارية التي تحدّد ما إذا كانت الرعاية ستبدو منسَّقة أم فوضوية."),
  }, lang)}
  <div class="reveal" data-d="1">${healthConsole(lang)}</div>
`, { tone: "paper" })}

${section(`
  ${secHead({
    kicker: T("Reference architecture", "بنية مرجعية"),
    h: T("The operational spine of care.", "العمود الفقري التشغيلي للرعاية."),
  }, lang)}
  ${archBoard(STACK, lang, { id: "health-stack" })}
`, { tone: "deep", grid: true })}

${section(`
  ${secHead({ kicker: T("The journey", "الرحلة"), h: T("A patient journey,|coordinated end to end.", "رحلة مريض|منسّقة من طرف إلى طرف.") }, lang)}
  ${flowStack(JOURNEY, lang, { id: "health-journey", dense: true })}
`, { tone: "paper" })}

${section(`
  ${secHead({ kicker: T("Boundaries", "الحدود"), h: T("The lines we hold in healthcare.", "الخطوط التي نلتزمها في الصحة.") }, lang)}
  ${trustGrid(BOUNDARIES, lang)}
`, { tone: "light" })}

${section(statement({
  text: T("Clinical time should go to patients,|not to coordination.", "الوقت السريري للمرضى،|لا للتنسيق."),
}, lang), { tone: "accent", cls: "sec-tight" })}

${section(`
  ${secHead({ kicker: T("Questions", "أسئلة"), h: T("Healthcare, answered.", "الرعاية الصحية، بإجابات مباشرة.") }, lang)}
  <div class="u-narrow-c">${faq(FAQS, lang, "health-faq")}</div>
`, { tone: "paper" })}

${closer("healthcare", lang)}
`;

  return {
    route: "healthcare",
    solidHeader: true,
    crumbTrail: hero.crumbTrail,
    title: T(
      "Digital Health Platforms & Care Orchestration | Qeonix",
      "منصّات الصحة الرقمية وتنسيق الرعاية | كيونكس"
    ),
    description: T(
      "Healthcare platforms from Qeonix: digital health platforms, patient journeys, provider ecosystems, appointment marketplaces, AI healthcare assistants for administrative work, insurance intelligence, EHR and FHIR interoperability, and healthcare analytics.",
      "منصّات صحية من كيونكس: منصّات الصحة الرقمية ورحلات المرضى ومنظومات المزوّدين وأسواق المواعيد والمساعدون الصحيون بالذكاء الاصطناعي للأعمال الإدارية وذكاء التأمين والتشغيل البيني مع السجلّات الإلكترونية وFHIR والتحليلات الصحية."
    ),
    og: "healthcare",
    service: { name: LABEL, type: T("Digital health platform engineering", "هندسة منصّات الصحة الرقمية") },
    faqSchema: FAQS,
    body,
  };
}
