import { T } from "../../lib/html.mjs";
import { section, secHead, btn, capGrid, faq, trustGrid, statement, picture, featureRow } from "../../lib/components.mjs";
import { cycle, matrix, archBoard } from "../../lib/diagrams.mjs";
import { missionConsole } from "../../lib/showcase.mjs";
import { heroFor, closer } from "../../lib/page.mjs";
import { url } from "../site.mjs";

const LABEL = T("Autonomous Systems", "الأنظمة ذاتية التشغيل");

const LOOP = [
  { label: T("Sense", "الاستشعار"), icon: "radar", note: T("Cameras, lidar, thermal, telemetry and field reports on one clock.", "كاميرات وليدار وتصوير حراري وقياس عن بُعد وتقارير ميدانية على توقيت واحد.") },
  { label: T("Understand", "الفهم"), icon: "vision", note: T("Vision models classify condition, defect, obstruction and change.", "نماذج رؤية تصنّف الحالة والعيب والإعاقة والتغيّر.") },
  { label: T("Decide", "القرار"), icon: "compass", note: T("Severity, risk threshold and standing authority determine the response.", "الخطورة وحدّ المخاطر والصلاحية القائمة تحدّد الاستجابة.") },
  { label: T("Act", "التنفيذ"), icon: "robot", note: T("A mission launches, a crew is tasked, an asset is taken out of service.", "تُطلق مهمة أو يُكلَّف فريق أو يُسحب أصل من الخدمة.") },
  { label: T("Learn", "التعلّم"), icon: "graph", note: T("Confirmed outcomes retrain the model and adjust the threshold.", "النتائج المؤكَّدة تعيد تدريب النموذج وتضبط الحدود.") },
];

const PLATFORMS = [
  { icon: "drone", h: T("Aerial intelligence", "الاستطلاع الجوي"), p: T("Programmed drone missions over sites, corridors and coastlines, producing a comparable survey every cycle instead of a one-off photo set.", "مهام مبرمجة للطائرات المسيّرة فوق المواقع والممرّات والسواحل، تُنتج مسحًا قابلًا للمقارنة في كل دورة بدل مجموعة صور لمرة واحدة.") },
  { icon: "robot", h: T("Ground robotics", "الروبوتات الأرضية"), p: T("Inspection and material-handling robots for industrial floors, utility corridors and environments where a repeated human pass is expensive or hazardous.", "روبوتات للفحص ومناولة المواد في الأرضيات الصناعية وممرّات المرافق والبيئات التي يكون فيها المرور البشري المتكرّر مكلفًا أو خطرًا.") },
  { icon: "vision", h: T("Autonomous inspection", "الفحص الذاتي"), p: T("Defect detection and condition scoring on assets (structures, pavements, networks, plant), with change tracked between passes.", "كشف العيوب وتقييم الحالة على الأصول (المنشآت والأرصفة والشبكات والمعامل)، مع تتبّع التغيّر بين الجولات.") },
  { icon: "radar", h: T("Remote operations", "التشغيل عن بُعد"), p: T("Supervised control from an operations center, with tele-operation for the exceptions the autonomy stack is not cleared to handle.", "تحكّم مُشرَف عليه من مركز العمليات، مع تشغيل عن بُعد للحالات الاستثنائية غير المصرَّح لطبقة الاستقلالية بمعالجتها.") },
  { icon: "vehicle", h: T("Fleet intelligence", "ذكاء الأساطيل"), p: T("Vehicle and asset telemetry turned into utilization, condition and predictive maintenance rather than a map of dots.", "تحويل قياسات المركبات والأصول إلى معدّلات استخدام وحالة وصيانة تنبؤية، لا إلى خريطة نقاط.") },
  { icon: "factory", h: T("Industrial automation", "الأتمتة الصناعية"), p: T("Vision-guided quality, throughput and safety systems integrated with the control systems already on the line.", "أنظمة جودة وإنتاجية وسلامة موجَّهة بالرؤية الحاسوبية، مدمجة مع أنظمة التحكّم القائمة على الخط.") },
];

const STACK = [
  { label: T("Platform", "المنصّة"), note: T("The machine and its payload.", "الآلة وحمولتها."), items: [T("UAV / drone", "طائرة مسيّرة"), T("Ground robot", "روبوت أرضي"), T("Fixed sensor", "مستشعر ثابت"), T("Vehicle-mounted rig", "منظومة على مركبة")] },
  { label: T("Autonomy", "الاستقلالية"), note: T("What it can do without an operator.", "ما يمكنه فعله دون مشغّل."), tone: "hi", items: [T("Mission planning", "تخطيط المهام"), T("Navigation", "الملاحة"), T("Obstacle handling", "التعامل مع العوائق"), T("Fail-safe behavior", "سلوك الأمان عند الفشل"), T("Return-to-base logic", "منطق العودة إلى القاعدة")] },
  { label: T("Perception", "الإدراك"), note: T("Turning capture into meaning.", "تحويل الالتقاط إلى معنى."), items: [T("Detection & classification", "الكشف والتصنيف"), T("Condition scoring", "تقييم الحالة"), T("Change detection", "كشف التغيّر"), T("Geo-referencing", "الإسناد الجغرافي")] },
  { label: T("Operations", "التشغيل"), note: T("Where a human stays in charge.", "حيث تبقى السلطة للإنسان."), items: [T("Mission console", "لوحة المهام"), T("Live supervision", "الإشراف المباشر"), T("Exception handling", "معالجة الاستثناءات"), T("Evidence archive", "أرشيف الأدلّة"), T("Dispatch integration", "التكامل مع الإرسال")] },
  { label: T("Assurance", "الضمان"), note: T("The part regulators ask about.", "الجزء الذي تسأل عنه الجهات التنظيمية."), items: [T("Flight & operating logs", "سجلّات التشغيل والطيران"), T("Airspace compliance", "الالتزام بالمجال الجوي"), T("Operator certification", "اعتماد المشغّلين"), T("Maintenance records", "سجلّات الصيانة"), T("Incident review", "مراجعة الحوادث")] },
];

const SAFETY = [
  { icon: "people", h: T("Supervised by default", "الإشراف هو الأصل"), p: T("Autonomy handles the routine pass. A qualified operator holds authority over anything outside the cleared envelope.", "تتولّى الاستقلالية الجولة الروتينية. وتبقى السلطة لمشغّل مؤهّل في كل ما يخرج عن النطاق المصرَّح به.") },
  { icon: "shield", h: T("Fail-safe behavior", "سلوك الأمان عند الفشل"), p: T("Loss of link, low power and sensor failure have defined, tested responses, not emergent ones.", "فقد الاتصال وانخفاض الطاقة وعطل المستشعر لها استجابات محدّدة ومُختبَرة، لا استجابات ارتجالية.") },
  { icon: "eye", h: T("Evidence, not assertions", "أدلّة لا ادّعاءات"), p: T("Every mission produces a retained, timestamped, geo-referenced record that can be reviewed after the fact.", "كل مهمة تُنتج سجلًا محفوظًا مؤرَّخًا ومُسندًا جغرافيًا يمكن مراجعته لاحقًا.") },
  { icon: "lock", h: T("Operating within the rules", "العمل ضمن القواعد"), p: T("Missions are designed around the airspace, site and permitting regime that applies, established with the operator before flight.", "تُصمَّم المهام وفق نظام المجال الجوي والموقع والتصاريح المعمول به، يُحدَّد مع المشغّل قبل الإقلاع.") },
];

const SCOPE = [
  { label: T("Sectors", "القطاعات"), items: [T("Energy & utilities", "الطاقة والمرافق"), T("Industrial sites", "المواقع الصناعية"), T("Aviation & airside", "الطيران والساحة الجوية"), T("Construction", "الإنشاءات"), T("Ports & logistics", "الموانئ واللوجستيات"), T("Municipal assets", "الأصول البلدية")] },
  { label: T("Missions", "المهام"), items: [T("Asset inspection", "فحص الأصول"), T("Perimeter monitoring", "مراقبة النطاق"), T("Stockpile & volume survey", "مسح المخزون والأحجام"), T("Thermal survey", "المسح الحراري"), T("Incident assessment", "تقييم الحوادث"), T("Progress monitoring", "متابعة الإنجاز")] },
  { label: T("Outputs", "المخرجات"), items: [T("Defect register", "سجل العيوب"), T("Condition index", "مؤشّر الحالة"), T("Change report", "تقرير التغيّر"), T("Work orders", "أوامر العمل"), T("Evidence pack", "حزمة الأدلّة"), T("3D / orthomosaic", "نماذج ثلاثية / فسيفساء جوية")] },
  { label: T("Integration", "التكامل"), items: [T("Asset management", "إدارة الأصول"), T("Maintenance systems", "أنظمة الصيانة"), T("GIS", "نظم المعلومات الجغرافية"), T("Command center", "مركز القيادة"), T("Field mobile apps", "تطبيقات الميدان"), T("Digital twin", "التوأم الرقمي")] },
];

const FAQS = [
  {
    q: T("Do you manufacture the hardware?", "هل تصنّعون العتاد؟"),
    a: T("We select and integrate proven platforms rather than manufacture airframes. What Qeonix builds is the layer that makes a fleet of them useful: mission planning, perception, the operations console, the evidence trail and the integration into asset and maintenance systems.", "نختار منصّات مثبَتة وندمجها بدل تصنيع الهياكل. ما تبنيه كيونكس هو الطبقة التي تجعل أسطولًا منها ذا فائدة: تخطيط المهام والإدراك ولوحة العمليات ومسار الأدلّة والتكامل مع أنظمة الأصول والصيانة."),
  },
  {
    q: T("How autonomous is autonomous?", "ما مدى استقلالية هذه الأنظمة؟"),
    a: T("Autonomy is granted per mission type, not as a general property. A repeated inspection pass over a known site with a cleared route is a good candidate. Anything novel, congested or safety-critical stays under direct supervision with defined fail-safe behavior.", "تُمنح الاستقلالية لكل نوع مهمة على حدة، لا كخاصية عامة. فالجولة التفتيشية المتكرّرة فوق موقع معروف بمسار معتمد مرشّحة جيدة. أما كل ما هو جديد أو مزدحم أو حسّاس للسلامة فيبقى تحت إشراف مباشر بسلوك أمان محدّد."),
  },
  {
    q: T("What about airspace approvals?", "ماذا عن موافقات المجال الجوي؟"),
    a: T("Operating approvals are held by the operating party and are established for each site and mission profile with the relevant authority. We design mission profiles and record-keeping to fit that regime, and we do not fly outside it.", "تكون موافقات التشغيل بيد الجهة المشغّلة وتُستصدر لكل موقع ونمط مهمة مع الجهة المختصّة. ونصمّم أنماط المهام وحفظ السجلّات بما يوافق ذلك النظام، ولا نعمل خارجه."),
  },
];

export default function autonomous(lang) {
  const ar = lang === "ar";
  const hero = heroFor({
    route: "autonomous",
    label: LABEL,
    kicker: T("Capability · Physical AI", "قدرة · الذكاء المادي"),
    h: T("When intelligence|leaves the screen.", "حين يغادر الذكاء|الشاشة."),
    lead: T(
      "Inspection, monitoring and response carried out by machines that see, decide and act: supervised, on a schedule, in places where a repeated human pass is expensive, slow or unsafe.",
      "فحص ومراقبة واستجابة تنفّذها آلات ترى وتقرّر وتنفّذ: تحت إشراف، ووفق جدول، في أماكن يكون فيها المرور البشري المتكرّر مكلفًا أو بطيئًا أو غير آمن."
    ),
    meta: [
      { k: T("Modalities", "الوسائط"), v: T("Aerial, ground, fixed, vehicle-mounted", "جوية وأرضية وثابتة ومركّبة على المركبات") },
      { k: T("Authority", "الصلاحية"), v: T("Supervised autonomy, per mission type", "استقلالية مُشرَف عليها، لكل نوع مهمة") },
      { k: T("Output", "المخرجات"), v: T("Work orders and evidence, not footage", "أوامر عمل وأدلّة، لا لقطات") },
    ],
  }, lang);

  const body = `
${hero.html}

${section(`
  ${secHead({
    kicker: T("The chain", "السلسلة"),
    h: T("Sense, understand, decide, act, learn.", "استشعار، فهم، قرار، تنفيذ، تعلّم."),
    lead: T("Physical AI is not a robot. It is a closed loop, and the value is in closing it: most deployments stop at capture and never reach a work order.", "الذكاء المادي ليس روبوتًا. إنه حلقة مغلقة، والقيمة في إغلاقها: إذ تتوقّف أغلب عمليات النشر عند الالتقاط ولا تصل إلى أمر عمل."),
    align: "center",
  }, lang)}
  ${cycle(LOOP, lang, { id: "auto-loop", returnLabel: T("Confirmed outcomes retrain the model", "النتائج المؤكَّدة تعيد تدريب النموذج") })}
`, { tone: "light" })}

${section(`
  ${secHead({
    kicker: T("In operation", "أثناء التشغيل"),
    h: T("Mission control,|not a video feed.", "قيادة مهام،|لا بثّ فيديو."),
    lead: T("A corridor scan in progress: the detection, the decision inside the cleared envelope, the dispatched work order and the archived evidence. The operator supervises; the loop closes itself.", "مسح ممر قيد التنفيذ: الرصد، والقرار ضمن النطاق المصرَّح، وأمر العمل المُرسل، والأدلّة المؤرشفة. المشغّل يشرف؛ والحلقة تُغلق نفسها."),
  }, lang)}
  <div class="reveal" data-d="1">${missionConsole(lang)}</div>
`, { tone: "paper" })}

${section(`
  ${secHead({ kicker: T("Platforms", "المنصّات"), h: T("Six ways we put it in the field.", "ستّ طرق لإنزاله إلى الميدان.") }, lang)}
  ${capGrid(PLATFORMS, lang, { cols: 3 })}
`, { tone: "paper" })}

${section(`
  ${secHead({
    kicker: T("Architecture", "البنية"),
    h: T("A fleet is only as good|as the console behind it.", "لا يساوي الأسطول أكثر|من اللوحة التي تديره."),
    lead: T("The hardware is the least differentiated part of an autonomous program. Everything that determines whether it survives its second year sits in the four bands underneath it.", "العتاد أقلّ أجزاء البرنامج ذاتي التشغيل تميّزًا. وكل ما يحدّد صموده في سنته الثانية يقع في الطبقات الأربع تحته."),
  }, lang)}
  ${archBoard(STACK, lang, { id: "auto-stack" })}
`, { tone: "deep", grid: true })}

${section(`
  ${secHead({ kicker: T("Safety and assurance", "السلامة والضمان"), h: T("Autonomy under authority.", "استقلالية تحت سلطة.") }, lang)}
  ${trustGrid(SAFETY, lang)}
`, { tone: "light" })}

${section(`
  ${secHead({ kicker: T("Scope", "النطاق"), h: T("Where it is deployed, and what comes out.", "أين يُنشر، وما الذي ينتج عنه.") }, lang)}
  ${matrix(SCOPE, lang)}
`, { tone: "paper" })}

${section(statement({
  text: T("A camera produces footage.|A system produces a work order.", "الكاميرا تُنتج لقطات.|أما النظام فيُنتج أمر عمل."),
}, lang), { tone: "accent", cls: "sec-tight" })}

${section(`
  ${secHead({ kicker: T("Questions", "أسئلة"), h: T("Autonomous systems, answered.", "الأنظمة ذاتية التشغيل، بإجابات مباشرة.") }, lang)}
  <div class="u-narrow-c">${faq(FAQS, lang, "auto-faq")}</div>
`, { tone: "light" })}

${closer("autonomous", lang)}
`;

  return {
    route: "autonomous",
    solidHeader: true,
    crumbTrail: hero.crumbTrail,
    title: T(
      "Autonomous Systems, Robotics & Drone Technology | Qeonix",
      "الأنظمة ذاتية التشغيل والروبوتات وتقنيات الطائرات المسيّرة | كيونكس"
    ),
    description: T(
      "Physical AI from Qeonix: aerial intelligence, ground robotics, autonomous inspection, remote operations and fleet intelligence. Supervised autonomy that produces work orders and auditable evidence, integrated with asset and maintenance systems.",
      "الذكاء المادي من كيونكس: الاستطلاع الجوي والروبوتات الأرضية والفحص الذاتي والتشغيل عن بُعد وذكاء الأساطيل. استقلالية مُشرَف عليها تُنتج أوامر عمل وأدلّة قابلة للتدقيق، بتكامل مع أنظمة الأصول والصيانة."
    ),
    og: "autonomous",
    service: { name: LABEL, type: T("Autonomous systems engineering", "هندسة الأنظمة ذاتية التشغيل") },
    faqSchema: FAQS,
    body,
  };
}
