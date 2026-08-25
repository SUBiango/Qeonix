import { T } from "../../lib/html.mjs";
import { section, secHead, capGrid, faq, trustGrid, statement } from "../../lib/components.mjs";
import { archBoard, matrix, flowStack } from "../../lib/diagrams.mjs";
import { mobilityConsole } from "../../lib/showcase.mjs";
import { heroFor, closer } from "../../lib/page.mjs";

const LABEL = T("Smart Mobility", "التنقل الذكي");

const CAPS = [
  { icon: "route", h: T("Mobility-as-a-Service", "التنقل كخدمة"), p: T("Journey planning, booking and payment across modes in one experience: bus, metro, taxi, micro-mobility and parking treated as one network, not five apps.", "تخطيط الرحلة والحجز والدفع عبر الوسائط في تجربة واحدة: الحافلة والمترو والأجرة والتنقل الخفيف والمواقف كشبكة واحدة، لا خمسة تطبيقات.") },
  { icon: "vehicle", h: T("Fleet orchestration", "تنسيق الأساطيل"), p: T("Telemetry, utilization, condition and predictive maintenance across public and commercial fleets, with dispatch tied to demand.", "القياس والاستخدام والحالة والصيانة التنبؤية عبر الأساطيل العامة والتجارية، مع إرسال مرتبط بالطلب.") },
  { icon: "radar", h: T("Intelligent transportation systems", "أنظمة النقل الذكية"), p: T("Corridor management, signal optimization and incident response built on live network state rather than last year's counts.", "إدارة الممرّات وتحسين الإشارات والاستجابة للحوادث بناءً على حالة الشبكة المباشرة، لا على إحصاءات العام الماضي.") },
  { icon: "city", h: T("Parking & tolling", "المواقف والتعرفة"), p: T("Demand-based parking, enforcement workflows and free-flow tolling with reconciliation and an audit trail the operator can defend.", "مواقف قائمة على الطلب، وسير عمل للمخالفات، وتعرفة انسيابية مع تسويات وسجل تدقيق يمكن للمشغّل الدفاع عنه.") },
  { icon: "spark", h: T("EV ecosystem", "منظومة المركبات الكهربائية"), p: T("Charging network operations, load management against the grid, and the roaming, billing and availability layer drivers actually judge it by.", "تشغيل شبكات الشحن وإدارة الأحمال مع الشبكة الكهربائية، وطبقة التجوال والفوترة والتوافر التي يحكم بها السائقون فعليًا.") },
  { icon: "package", h: T("Logistics mobility", "لوجستيات التنقل"), p: T("Freight movement, last-mile coordination and curb management, where commercial traffic meets city policy.", "حركة الشحن وتنسيق الميل الأخير وإدارة الأرصفة، حيث يلتقي النقل التجاري بسياسة المدينة.") },
];

const STACK = [
  { label: T("Traveler experience", "تجربة المتنقّل"), note: T("The journey as one product.", "الرحلة كمنتج واحد."), items: [T("Journey planning", "تخطيط الرحلات"), T("Booking & ticketing", "الحجز والتذاكر"), T("Unified payment", "الدفع الموحّد"), T("Real-time information", "المعلومات اللحظية"), T("Accessibility", "إمكانية الوصول")] },
  { label: T("Mobility orchestration", "تنسيق التنقل"), note: T("Matching demand to capacity.", "مواءمة الطلب مع الطاقة."), tone: "hi", items: [T("Multimodal routing", "التوجيه متعدّد الوسائط"), T("Demand management", "إدارة الطلب"), T("Disruption handling", "معالجة الاضطرابات"), T("Operator settlement", "تسويات المشغّلين"), T("Policy rules", "قواعد السياسات")] },
  { label: T("Transport intelligence", "ذكاء النقل"), note: T("The network, understood.", "الشبكة، مفهومة."), items: [T("Network state", "حالة الشبكة"), T("Demand forecasting", "التنبؤ بالطلب"), T("Incident detection", "كشف الحوادث"), T("Signal optimization", "تحسين الإشارات"), T("Corridor analytics", "تحليلات الممرّات")] },
  { label: T("Assets & fleets", "الأصول والأساطيل"), note: T("Everything that moves or charges.", "كل ما يتحرّك أو يشحن."), items: [T("Vehicle telemetry", "قياسات المركبات"), T("Predictive maintenance", "الصيانة التنبؤية"), T("Charging infrastructure", "بنية الشحن"), T("Micro-mobility fleets", "أساطيل التنقل الخفيف"), T("Depot operations", "عمليات المستودعات")] },
  { label: T("Integration & control", "التكامل والتحكم"), note: T("Where operators and city meet.", "حيث يلتقي المشغّلون بالمدينة."), items: [T("Operator APIs", "واجهات المشغّلين"), T("Payment providers", "مزوّدو الدفع"), T("City command center", "مركز قيادة المدينة"), T("Enforcement systems", "أنظمة الضبط"), T("Open data", "البيانات المفتوحة")] },
];

const JOURNEY = [
  { label: T("Plan", "التخطيط"), icon: "compass", note: T("One query across every mode, priced and timed honestly.", "استعلام واحد عبر كل الوسائط، بتسعير وتوقيت صادقين.") },
  { label: T("Move", "التنقل"), icon: "route", note: T("Ticketing and access that work across operators without friction.", "تذاكر ووصول يعملان عبر المشغّلين دون احتكاك.") },
  { label: T("Adapt", "التكيّف"), icon: "radar", note: T("Disruption rerouted in minutes, with the traveler told first.", "إعادة توجيه عند الاضطراب خلال دقائق، ويُخطَر المتنقّل أولًا.") },
  { label: T("Settle", "التسوية"), icon: "api", note: T("Revenue apportioned across operators with a defensible audit trail.", "توزيع الإيرادات بين المشغّلين بسجل تدقيق يمكن الدفاع عنه.") },
  { label: T("Learn", "التعلّم"), icon: "graph", note: T("Every journey improves the demand model and the timetable after it.", "كل رحلة تحسّن نموذج الطلب والجدول الذي يليها.") },
];

const PRINCIPLES = [
  { icon: "people", h: T("The traveler is the integration test", "المتنقّل هو اختبار التكامل"), p: T("If a journey needs three apps and two accounts, the architecture has failed regardless of what the diagram says.", "إن احتاجت الرحلة ثلاثة تطبيقات وحسابين، فقد فشلت البنية مهما قال المخطّط.") },
  { icon: "api", h: T("Operators keep their systems", "يحتفظ المشغّلون بأنظمتهم"), p: T("The platform federates ticketing, telemetry and settlement across operators instead of forcing a migration nobody signed up for.", "توحّد المنصّة التذاكر والقياس والتسويات عبر المشغّلين بدل فرض هجرة لم يوافق عليها أحد.") },
  { icon: "eye", h: T("Policy needs evidence", "السياسة تحتاج أدلّة"), p: T("Pricing, access and curb decisions are simulated against real network state before they are imposed on it.", "تُحاكى قرارات التسعير والوصول والأرصفة على حالة الشبكة الحقيقية قبل فرضها عليها.") },
  { icon: "shield", h: T("Payments are audited infrastructure", "المدفوعات بنية خاضعة للتدقيق"), p: T("Multi-operator settlement is treated with the same rigour as the tolling gantry, because a dispute will test both.", "تُعامل التسويات متعدّدة المشغّلين بصرامة بوابة التعرفة نفسها، لأن أي نزاع سيختبر الاثنين.") },
];

const COVERAGE = [
  { label: T("Public transport", "النقل العام"), items: [T("Bus & metro operations", "تشغيل الحافلات والمترو"), T("Real-time passenger info", "معلومات الركّاب اللحظية"), T("Timetable optimization", "تحسين الجداول"), T("On-demand transit", "النقل عند الطلب")] },
  { label: T("Road network", "شبكة الطرق"), items: [T("Traffic management", "إدارة المرور"), T("Incident response", "الاستجابة للحوادث"), T("Tolling", "التعرفة"), T("Connected vehicles", "المركبات المتصلة")] },
  { label: T("Curb & parking", "الرصيف والمواقف"), items: [T("Smart parking", "المواقف الذكية"), T("Enforcement", "الضبط المروري"), T("Loading zones", "مناطق التحميل"), T("Dynamic pricing", "التسعير الديناميكي")] },
  { label: T("New mobility", "التنقل الجديد"), items: [T("EV charging networks", "شبكات شحن المركبات الكهربائية"), T("Micro-mobility", "التنقل الخفيف"), T("MaaS platforms", "منصّات التنقل كخدمة"), T("Logistics & last mile", "اللوجستيات والميل الأخير")] },
];

const FAQS = [
  {
    q: T("Is this a consumer app or an operations platform?", "هل هذا تطبيق للمستهلك أم منصّة تشغيل؟"),
    a: T("Both ends of the same system. The traveler-facing experience is only as good as the orchestration, settlement and network intelligence behind it, so we build them as one architecture rather than a front end looking for a back end.", "طرفان لنظام واحد. فتجربة المتنقّل لا تكون أفضل من طبقة التنسيق والتسويات وذكاء الشبكة خلفها، لذلك نبنيها كبنية واحدة، لا كواجهة تبحث عن نظام خلفي."),
  },
  {
    q: T("Can you work with our existing operators and vendors?", "هل تعملون مع مشغّلينا ومورّدينا الحاليين؟"),
    a: T("Yes: that is the design assumption. Operators keep their fleet, ticketing and depot systems; the platform federates across them through APIs and agreed data contracts, and adds the layers that none of them individually own: the journey, the settlement and the network view.", "نعم، وهذا هو الافتراض التصميمي. يحتفظ المشغّلون بأنظمة أساطيلهم وتذاكرهم ومستودعاتهم؛ وتوحّد المنصّة بينها عبر واجهات وعقود بيانات متّفق عليها، وتضيف الطبقات التي لا يملكها أيٌّ منهم منفردًا: الرحلة والتسوية وصورة الشبكة."),
  },
  {
    q: T("Where does AI actually help in mobility?", "أين يفيد الذكاء الاصطناعي فعليًا في التنقل؟"),
    a: T("Where the network state changes faster than a human control room can react: demand forecasting, disruption rerouting, incident detection from camera and sensor feeds, predictive maintenance on fleets and charging assets, and signal optimization on congested corridors.", "حيث تتغيّر حالة الشبكة أسرع من قدرة غرفة تحكم بشرية على التفاعل: التنبؤ بالطلب، وإعادة التوجيه عند الاضطراب، وكشف الحوادث من الكاميرات والمستشعرات، والصيانة التنبؤية للأساطيل وأصول الشحن، وتحسين الإشارات في الممرّات المزدحمة."),
  },
];

export default function mobility(lang) {
  const hero = heroFor({
    route: "mobility",
    label: LABEL,
    kicker: T("Sector · Transport & mobility", "قطاع · النقل والتنقل"),
    h: T("The journey is the product.|Everything else is plumbing.", "الرحلة هي المنتج.|وكل ما عداها بنية تحتية."),
    lead: T(
      "Qeonix builds mobility platforms where modes, operators and infrastructure behave as one network, from journey planning and payment to fleet orchestration, tolling and the EV ecosystem.",
      "تبني كيونكس منصّات تنقل تجعل الوسائط والمشغّلين والبنية التحتية تعمل كشبكة واحدة، من تخطيط الرحلة والدفع إلى تنسيق الأساطيل والتعرفة ومنظومة المركبات الكهربائية."
    ),
    meta: [
      { k: T("Span", "المدى"), v: T("Traveler, operator, network, curb", "المتنقّل والمشغّل والشبكة والرصيف") },
      { k: T("Approach", "المنهج"), v: T("Federate operators, don't replace them", "توحيد المشغّلين لا استبدالهم") },
      { k: T("Intelligence", "الذكاء"), v: T("Live network state, not annual counts", "حالة شبكة مباشرة، لا إحصاءات سنوية") },
    ],
  }, lang);

  const body = `
${hero.html}

${section(`
  ${secHead({ kicker: T("Capabilities", "القدرات"), h: T("Six mobility problems we build for.", "ست مسائل تنقل نبني لأجلها.") }, lang)}
  ${capGrid(CAPS, lang, { cols: 3 })}
`, { tone: "light" })}

${section(`
  ${secHead({
    kicker: T("In operation", "أثناء التشغيل"),
    h: T("The network, run as one system.", "الشبكة، تُدار كنظام واحد."),
    lead: T("A stadium event, an incident on a corridor, an EV network at load, and the platform rebalancing all three while the control room supervises.", "فعالية في الاستاد، وحادث على ممر، وشبكة شحن تحت الحمل، والمنصّة تعيد التوازن للثلاثة بينما تشرف غرفة التحكم."),
  }, lang)}
  <div class="reveal" data-d="1">${mobilityConsole(lang)}</div>
`, { tone: "paper" })}

${section(`
  ${secHead({
    kicker: T("Reference architecture", "بنية مرجعية"),
    h: T("One network,|five layers.", "شبكة واحدة،|خمس طبقات."),
  }, lang)}
  ${archBoard(STACK, lang, { id: "mob-stack" })}
`, { tone: "deep", grid: true })}

${section(`
  ${secHead({ kicker: T("The loop", "الحلقة"), h: T("Plan, move, adapt, settle, learn.", "تخطيط، تنقل، تكيّف، تسوية، تعلّم.") }, lang)}
  ${flowStack(JOURNEY, lang, { id: "mob-journey", dense: true })}
`, { tone: "paper" })}

${section(`
  ${secHead({ kicker: T("Principles", "مبادئ"), h: T("What keeps mobility programs honest.", "ما يُبقي برامج التنقل صادقة.") }, lang)}
  ${trustGrid(PRINCIPLES, lang)}
`, { tone: "light" })}

${section(`
  ${secHead({ kicker: T("Coverage", "التغطية"), h: T("Across the network.", "عبر الشبكة.") }, lang)}
  ${matrix(COVERAGE, lang)}
`, { tone: "paper" })}

${section(statement({
  text: T("Nobody wants five apps.|They want to arrive.", "لا أحد يريد خمسة تطبيقات.|يريدون الوصول."),
}, lang), { tone: "accent", cls: "sec-tight" })}

${section(`
  ${secHead({ kicker: T("Questions", "أسئلة"), h: T("Connected mobility, answered.", "التنقل المتصل، بإجابات مباشرة.") }, lang)}
  <div class="u-narrow-c">${faq(FAQS, lang, "mob-faq")}</div>
`, { tone: "light" })}

${closer("mobility", lang)}
`;

  return {
    route: "mobility",
    solidHeader: true,
    crumbTrail: hero.crumbTrail,
    title: T(
      "Smart Mobility & Intelligent Transportation | Qeonix",
      "التنقل المتصل وأنظمة النقل الذكية | كيونكس"
    ),
    description: T(
      "Mobility platforms from Qeonix: Mobility-as-a-Service, multimodal journey planning, fleet orchestration, intelligent transportation systems, parking and tolling, EV charging ecosystems and logistics mobility, federated across existing operators.",
      "منصّات تنقل من كيونكس: التنقل كخدمة، وتخطيط الرحلات متعدّد الوسائط، وتنسيق الأساطيل، وأنظمة النقل الذكية، والمواقف والتعرفة، ومنظومات شحن المركبات الكهربائية ولوجستيات التنقل، بتوحيد عبر المشغّلين القائمين."
    ),
    og: "mobility",
    service: { name: LABEL, type: T("Mobility platform engineering", "هندسة منصّات التنقل") },
    faqSchema: FAQS,
    body,
  };
}
