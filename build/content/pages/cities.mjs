import { T } from "../../lib/html.mjs";
import { section, secHead, btn, capGrid, faq, trustGrid, statement } from "../../lib/components.mjs";
import { archBoard, cityMesh, matrix, flowStack } from "../../lib/diagrams.mjs";
import { govOpsConsole, cityTwin } from "../../lib/showcase.mjs";
import { heroFor, closer } from "../../lib/page.mjs";
import { url } from "../site.mjs";

const LABEL = T("Smart Cities", "المدن الذكية");

const CITY_STACK = [
  { label: T("Residents, businesses, visitors", "المتعاملون والأعمال والزوّار"), note: T("Everyone who asks the city for something.", "كل من يطلب من المدينة شيئًا."), items: [T("Service requests", "طلبات الخدمة"), T("Reports & complaints", "البلاغات والشكاوى"), T("Payments", "المدفوعات"), T("Permits", "التصاريح"), T("Journeys", "الرحلات")] },
  { label: T("Digital experience", "التجربة الرقمية"), note: T("One surface across every city service.", "واجهة واحدة لكل خدمات المدينة."), items: [T("City app", "تطبيق المدينة"), T("Web portal", "البوابة الإلكترونية"), T("Contact center", "مركز الاتصال"), T("Kiosks", "الأكشاك"), T("Field mobile", "تطبيقات الميدان")] },
  { label: T("Service orchestration", "تنسيق الخدمات"), note: T("Turning a request into assigned work.", "تحويل الطلب إلى عمل مُسنَد."), tone: "hi", items: [T("Request lifecycle", "دورة حياة الطلب"), T("Routing & SLA", "التوجيه واتفاقيات الخدمة"), T("Work orders", "أوامر العمل"), T("Escalation", "التصعيد"), T("Notifications", "الإشعارات")] },
  { label: T("AI & agents", "الذكاء والوكلاء"), note: T("Triage, prediction, automation.", "الفرز والتنبؤ والأتمتة."), items: [T("Request triage", "فرز الطلبات"), T("Demand forecasting", "التنبؤ بالطلب"), T("Vision on city assets", "الرؤية الحاسوبية لأصول المدينة"), T("Predictive maintenance", "الصيانة التنبؤية"), T("Operations agents", "وكلاء العمليات")] },
  { label: T("City data platform", "منصّة بيانات المدينة"), note: T("One reconciled picture of the city.", "صورة واحدة موحّدة للمدينة."), items: [T("Asset registry", "سجل الأصول"), T("GIS & spatial", "نظم المعلومات الجغرافية"), T("Telemetry store", "مخزن القياسات"), T("Digital twin", "التوأم الرقمي"), T("Interoperability", "قابلية التشغيل البيني")] },
  { label: T("Operation centers", "مراكز العمليات"), note: T("Where the city is actually run.", "حيث تُدار المدينة فعليًا."), items: [T("Command & control", "القيادة والتحكم"), T("Incident management", "إدارة الحوادث"), T("Live operational view", "الصورة التشغيلية المباشرة"), T("Multi-agency coordination", "التنسيق متعدّد الجهات"), T("Emergency support", "دعم الطوارئ")] },
  { label: T("Field operations", "العمليات الميدانية"), note: T("The crews who close the loop.", "الفرق التي تُغلق الحلقة."), items: [T("Crew scheduling", "جدولة الفرق"), T("Mobile work orders", "أوامر العمل المتنقّلة"), T("Evidence capture", "التقاط الأدلّة"), T("Route optimization", "تحسين المسارات"), T("Completion & QA", "الإنجاز وضبط الجودة")] },
  { label: T("Connected infrastructure", "البنية التحتية المتصلة"), note: T("The physical city, instrumented.", "المدينة المادية، مزوّدة بالقياس."), items: [T("IoT sensors", "مستشعرات إنترنت الأشياء"), T("Metering", "القياس"), T("Cameras", "الكاميرات"), T("Traffic systems", "أنظمة المرور"), T("Utility networks", "شبكات المرافق"), T("Autonomous assets", "الأصول ذاتية التشغيل")] },
];

const DOMAINS = [
  { icon: "people", label: T("Citizen services", "خدمات المتعاملين") },
  { icon: "route", label: T("Mobility & traffic", "التنقل والمرور") },
  { icon: "bolt", label: T("Energy & utilities", "الطاقة والمرافق") },
  { icon: "leaf", label: T("Waste & cleansing", "النفايات والنظافة") },
  { icon: "city", label: T("Public realm", "المرافق العامة") },
  { icon: "building", label: T("Permits & inspection", "التصاريح والتفتيش") },
  { icon: "vehicle", label: T("Parking & tolling", "المواقف والتعرفة") },
  { icon: "spark", label: T("EV charging", "شحن المركبات الكهربائية") },
  { icon: "eye", label: T("Environmental sensing", "الرصد البيئي") },
  { icon: "radar", label: T("Command & control", "القيادة والتحكم") },
  { icon: "package", label: T("Field workforce", "القوى العاملة الميدانية") },
  { icon: "shield", label: T("Public safety integration", "التكامل مع السلامة العامة") },
];

const LIFECYCLE = [
  { label: T("A resident reports a fault", "متعامل يبلّغ عن خلل"), icon: "people", note: T("A photo and a location, from the city app or the contact center.", "صورة وموقع، من تطبيق المدينة أو مركز الاتصال.") },
  { label: T("Triage without a queue", "فرز بلا طابور"), icon: "vision", note: T("Vision classifies the fault, matches it to an asset and sets severity.", "الرؤية الحاسوبية تصنّف الخلل وتربطه بالأصل وتحدّد درجة الخطورة.") },
  { label: T("Work order, not a ticket", "أمر عمل، لا بلاغ"), icon: "flow", note: T("The right crew, the right skill, the right parts, sequenced against the day.", "الفريق الصحيح والمهارة الصحيحة وقطع الغيار الصحيحة، مرتّبة وفق اليوم.") },
  { label: T("Closed in the field", "إغلاق في الميدان"), icon: "check", note: T("Completed on a mobile device with photographic evidence attached.", "يُنجز على جهاز محمول مع إرفاق أدلّة مصوّرة.") },
  { label: T("Verified and learned from", "تحقّق وتعلّم"), icon: "graph", note: T("Outcome confirmed, asset history updated, recurrence flagged for planning.", "تأكيد النتيجة وتحديث سجل الأصل ورصد التكرار لأغراض التخطيط.") },
];

const CAPS = [
  { icon: "radar", h: T("City command center", "مركز قيادة المدينة"), p: T("A live operational picture across departments, with incident management and multi-agency coordination rather than eight screens showing eight systems.", "صورة تشغيلية مباشرة عبر الإدارات، مع إدارة الحوادث والتنسيق متعدّد الجهات، بدل ثماني شاشات تعرض ثمانية أنظمة.") },
  { icon: "grid", h: T("Connected infrastructure & IoT", "البنية التحتية المتصلة وإنترنت الأشياء"), p: T("Sensor, meter and camera estates brought into one telemetry layer with device management, health monitoring and a sane data contract.", "منظومات المستشعرات والعدّادات والكاميرات في طبقة قياس واحدة مع إدارة الأجهزة ومراقبة سلامتها وعقد بيانات منضبط.") },
  { icon: "package", h: T("Field operations", "العمليات الميدانية"), p: T("Crew scheduling, mobile work orders, route optimization and evidence capture: the part of a smart city program that is usually left out.", "جدولة الفرق وأوامر العمل المتنقّلة وتحسين المسارات والتقاط الأدلّة: وهو الجزء الذي يُهمَل عادةً في برامج المدن الذكية.") },
  { icon: "leaf", h: T("Environment & sustainability", "البيئة والاستدامة"), p: T("Air quality, noise, water and waste monitored continuously and tied to the operational response, not only to an annual report.", "جودة الهواء والضوضاء والمياه والنفايات تُرصد باستمرار وتُربط بالاستجابة التشغيلية، لا بتقرير سنوي فقط.") },
  { icon: "layers", h: T("Digital twin", "التوأم الرقمي"), p: T("A spatial model of assets and networks used for planning, impact assessment and scenario testing before work is committed.", "نموذج مكاني للأصول والشبكات يُستخدم للتخطيط وتقييم الأثر واختبار السيناريوهات قبل اعتماد الأعمال.") },
  { icon: "vehicle", h: T("Mobility & parking", "التنقل والمواقف"), p: T("Traffic, parking, tolling and EV infrastructure treated as one demand-management problem rather than four procurements.", "المرور والمواقف والتعرفة وبنية شحن المركبات الكهربائية كمسألة إدارة طلب واحدة، لا كأربع مناقصات.") },
];

const REALITY = [
  { icon: "flow", h: T("Start with a service, not a sensor", "ابدأ من خدمة لا من مستشعر"), p: T("Instrumentation without a closed operational loop produces dashboards nobody opens. We start from a request type with a queue behind it.", "القياس بلا حلقة تشغيل مغلقة يُنتج لوحات لا يفتحها أحد. نبدأ من نوع طلب له قائمة عمل خلفه.") },
  { icon: "api", h: T("Assume the estate is mixed", "افترض تنوّع المنظومة"), p: T("Cities run twenty vendors across three decades. The integration layer is designed for that, not for a clean-sheet replacement.", "تشغّل المدن عشرين مورّدًا عبر ثلاثة عقود. وتُصمَّم طبقة التكامل لهذا الواقع، لا لاستبدال شامل من الصفر.") },
  { icon: "people", h: T("Design for the crew", "صمّم للفريق الميداني"), p: T("If the mobile work order is worse than the paper it replaced, the program fails in the field regardless of the platform.", "إن كان أمر العمل المتنقّل أسوأ من الورقة التي حلّ محلّها، فسيفشل البرنامج في الميدان مهما كانت المنصّة.") },
  { icon: "eye", h: T("Measure the loop, not the launch", "قِس الحلقة لا الإطلاق"), p: T("Time-to-close, repeat-fault rate and first-time-fix are the metrics that show whether the city actually got better.", "زمن الإغلاق ومعدّل تكرار العطل والإصلاح من المرة الأولى هي المؤشّرات التي تُظهر إن كانت المدينة قد تحسّنت فعلًا.") },
];

const COVERAGE = [
  { label: T("Utilities", "المرافق"), items: [T("Network monitoring", "مراقبة الشبكات"), T("Smart metering", "القياس الذكي"), T("Leak & loss detection", "كشف التسرّب والفاقد"), T("Outage response", "الاستجابة للانقطاعات"), T("Demand management", "إدارة الطلب")] },
  { label: T("Waste & cleansing", "النفايات والنظافة"), items: [T("Bin & route optimization", "تحسين الحاويات والمسارات"), T("Fill-level sensing", "استشعار مستوى الامتلاء"), T("Fleet tracking", "تتبّع الأسطول"), T("Contractor SLA", "اتفاقيات المقاولين"), T("Cleanliness indexing", "مؤشّر النظافة")] },
  { label: T("Public realm", "المرافق العامة"), items: [T("Street lighting", "إنارة الشوارع"), T("Parks & landscaping", "الحدائق والتشجير"), T("Signage & furniture", "اللافتات والأثاث"), T("Condition surveys", "مسوح الحالة"), T("Event operations", "عمليات الفعاليات")] },
  { label: T("Safety & resilience", "السلامة والجاهزية"), items: [T("Incident coordination", "تنسيق الحوادث"), T("Multi-agency comms", "الاتصال متعدّد الجهات"), T("Flood & weather response", "الاستجابة للفيضانات والطقس"), T("Crowd operations", "إدارة الحشود"), T("Business continuity", "استمرارية الأعمال")] },
];

const FAQS = [
  {
    q: T("What makes this different from a smart city dashboard?", "ما الفرق بين هذا ولوحة معلومات مدينة ذكية؟"),
    a: T("A dashboard shows you a problem. This closes it. The platform turns a signal into a classified work order, assigns it to a crew with the right skills and parts, and confirms completion with evidence. The dashboard is a by-product, not the deliverable.", "اللوحة تُريك المشكلة. أما هذا فيُغلقها. تحوّل المنصّة الإشارة إلى أمر عمل مصنَّف، وتُسنده إلى فريق بالمهارة وقطع الغيار المناسبة، وتؤكّد الإنجاز بالأدلّة. واللوحة نتيجة جانبية، لا المُخرَج."),
  },
  {
    q: T("We already have systems from several vendors. Does that block this?", "لدينا أنظمة من عدّة مورّدين. هل يعيق ذلك المشروع؟"),
    a: T("No, it is the normal starting condition. The integration and data layer is designed around a mixed estate with different ages, protocols and data quality. Replacing everything is almost never the right first move.", "لا، بل هذه هي الحالة الطبيعية للانطلاق. تُصمَّم طبقة التكامل والبيانات حول منظومة متنوّعة بأعمار وبروتوكولات وجودة بيانات مختلفة. واستبدال كل شيء نادرًا ما يكون الخطوة الأولى الصحيحة."),
  },
  {
    q: T("How long before something is running?", "كم يستغرق الأمر قبل تشغيل شيء فعلي؟"),
    a: T("We scope a first domain, typically one high-volume request type with a field crew behind it, and take it end to end. That establishes the request lifecycle, the asset link and the field application under real conditions, and becomes the pattern the other domains reuse.", "نحدّد مجالًا أولًا، عادةً نوع طلب عالي الحجم يقف خلفه فريق ميداني، ونأخذه من طرف إلى طرف. فيرسّخ ذلك دورة حياة الطلب والربط بالأصل والتطبيق الميداني في ظروف حقيقية، ويصبح النمط الذي تعيد بقية المجالات استخدامه."),
  },
];

export default function cities(lang) {
  const ar = lang === "ar";
  const hero = heroFor({
    route: "cities",
    label: LABEL,
    kicker: T("Sector · Cities & urban operations", "قطاع · المدن والعمليات الحضرية"),
    h: T("A city is not twelve systems.|It is one operation.", "المدينة ليست اثني عشر نظامًا.|إنها عملية واحدة."),
    lead: T(
      "Services, mobility, utilities, waste, permits and field crews usually meet only in a monthly report. Qeonix builds the layer where they meet in real time: from a resident's request to the crew that closes it.",
      "الخدمات والتنقل والمرافق والنفايات والتصاريح والفرق الميدانية لا تلتقي عادةً إلا في تقرير شهري. تبني كيونكس الطبقة التي تلتقي فيها آنيًّا: من طلب المتعامل إلى الفريق الذي يُنجزه."
    ),
    meta: [
      { k: T("Span", "المدى"), v: T("Citizen to field crew, one loop", "من المتعامل إلى الفريق الميداني، حلقة واحدة") },
      { k: T("Estate", "المنظومة"), v: T("Designed for mixed, multi-vendor", "مصمّمة لبيئة متعدّدة المورّدين") },
      { k: T("Measured by", "تُقاس بـ"), v: T("Time-to-close and first-time-fix", "زمن الإغلاق والإصلاح من المرة الأولى") },
    ],
  }, lang);

  const body = `
${hero.html}

${section(`
  ${secHead({
    kicker: T("The city operating layer", "طبقة تشغيل المدينة"),
    h: T("Every domain, one spine.", "كل المجالات، عمود فقري واحد."),
    lead: T("These are the systems a city already owns. What is missing is almost always the layer that lets them share a picture, a queue and an audit trail.", "هذه هي الأنظمة التي تملكها المدينة أصلًا. والمفقود دائمًا تقريبًا هو الطبقة التي تتيح لها صورة وقائمة عمل وسجل تدقيق مشتركة."),
  }, lang)}
  ${cityMesh(DOMAINS, lang, {
    kicker: T("Qeonix layer", "طبقة كيونكس"),
    label: T("Shared data · shared identity · shared orchestration", "بيانات مشتركة · هوية مشتركة · تنسيق مشترك"),
    note: T("One picture of the city, one queue of work, one audit trail.", "صورة واحدة للمدينة، وقائمة عمل واحدة، وسجل تدقيق واحد."),
  })}
`, { tone: "light" })}

${section(`
  ${secHead({
    kicker: T("Reference architecture", "بنية مرجعية"),
    h: T("From the resident|to the physical city.", "من المتعامل|إلى المدينة المادية."),
    lead: T("Read it downward as a request traveling to the street, and upward as evidence traveling back to the record.", "اقرأها نزولًا كطلب ينتقل إلى الشارع، وصعودًا كأدلّة تعود إلى السجل."),
  }, lang)}
  ${archBoard(CITY_STACK, lang, { id: "city-stack" })}
`, { tone: "deep", grid: true })}

${section(`
  ${secHead({
    kicker: T("One request, end to end", "طلب واحد، من طرف إلى طرف"),
    h: T("What closing the loop|actually looks like.", "كيف يبدو إغلاق الحلقة|في الواقع."),
  }, lang)}
  ${flowStack(LIFECYCLE, lang, { id: "city-lifecycle", dense: true })}
`, { tone: "paper" })}

${section(`
  ${secHead({
    kicker: T("The operating environment", "بيئة التشغيل"),
    h: T("The console the city|is run from.", "اللوحة التي تُدار|منها المدينة."),
    lead: T("Requests, SLAs, integrations and field crews on one screen, because closing the loop is an operations discipline, not a dashboard feature.", "الطلبات والاتفاقيات والتكاملات والفرق الميدانية في شاشة واحدة، لأن إغلاق الحلقة انضباط تشغيلي، لا خاصية في لوحة."),
  }, lang)}
  <div class="reveal" data-d="1">${govOpsConsole(lang)}</div>
`, { tone: "light" })}

${section(`
  ${secHead({
    kicker: T("Interactive", "تفاعلي"),
    h: T("Break something.|Watch the city fix it.", "عطّل شيئًا.|وراقب المدينة وهي تصلحه."),
    lead: T("A live, playable district. Trigger a road incident, an asset fault or a stadium crowd, then watch sense, decide, dispatch and resolve happen in front of you. This is the loop every Qeonix city system is built around.", "حيّ حي وقابل للتجربة. أطلق حادث طريق أو عطل أصل أو حشد استاد، ثم راقب الاستشعار والقرار والإرسال والإنجاز تحدث أمامك. هذه هي الحلقة التي يُبنى حولها كل نظام مدن من كيونكس."),
  }, lang)}
  <div class="reveal" data-d="1">${cityTwin(lang)}</div>
`, { id: "twin", tone: "paper" })}

${section(`
  ${secHead({ kicker: T("Capabilities", "القدرات"), h: T("Six places we do the work.", "ستة مواضع نؤدّي فيها العمل.") }, lang)}
  ${capGrid(CAPS, lang, { cols: 3 })}
`, { tone: "light" })}

${section(`
  ${secHead({ kicker: T("What we have learned", "ما تعلّمناه"), h: T("Why smart city programs stall.", "لماذا تتعثّر برامج المدن الذكية.") }, lang)}
  ${trustGrid(REALITY, lang)}
`, { tone: "paper" })}

${section(`
  ${secHead({ kicker: T("Coverage", "التغطية"), h: T("Operational domains.", "المجالات التشغيلية.") }, lang)}
  ${matrix(COVERAGE, lang)}
`, { tone: "light" })}

${section(statement({
  text: T("A dashboard shows a problem.|An operation closes it.", "اللوحة تُظهر المشكلة.|أما العملية فتُغلقها."),
}, lang), { tone: "accent", cls: "sec-tight" })}

${section(`
  ${secHead({ kicker: T("Questions", "أسئلة"), h: T("Smart cities, answered.", "المدن الذكية، بإجابات مباشرة.") }, lang)}
  <div class="u-narrow-c">${faq(FAQS, lang, "city-faq")}</div>
`, { tone: "paper" })}

${closer("cities", lang)}
`;

  return {
    route: "cities",
    solidHeader: true,
    crumbTrail: hero.crumbTrail,
    title: T(
      "Smart City Platforms & City Operations | Qeonix",
      "منصّات المدن الذكية وعمليات المدينة | كيونكس"
    ),
    description: T(
      "A city operating layer from Qeonix: command and control centers, connected infrastructure and IoT, service request lifecycle, field operations, utilities, waste, mobility, parking, EV, environmental monitoring and digital twins, integrated across a mixed multi-vendor estate.",
      "طبقة تشغيل للمدينة من كيونكس: مراكز القيادة والتحكم، والبنية التحتية المتصلة وإنترنت الأشياء، ودورة حياة طلبات الخدمة، والعمليات الميدانية، والمرافق والنفايات والتنقل والمواقف والمركبات الكهربائية والرصد البيئي والتوائم الرقمية، بتكامل عبر منظومة متعدّدة المورّدين."
    ),
    og: "cities",
    service: { name: LABEL, type: T("Smart city platform engineering", "هندسة منصّات المدن الذكية") },
    faqSchema: FAQS,
    body,
  };
}
