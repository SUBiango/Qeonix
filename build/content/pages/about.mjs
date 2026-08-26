import { T, tx } from "../../lib/html.mjs";
import { section, secHead, btn, pillars, factStrip, statement, track, approvalSlot, trustGrid } from "../../lib/components.mjs";
import { heroFor, closer } from "../../lib/page.mjs";
import { officeList } from "../../lib/layout.mjs";
import { presenceMap } from "../../lib/diagrams.mjs";
import { OFFICES, OFFICE_STATUS } from "../site.mjs";
import { url, UI } from "../site.mjs";

const LABEL = T("About Qeonix", "عن كيونيكس");

const FACTS = [
  { k: T("Headquarters", "المقر الرئيسي"), v: T("Abu Dhabi, UAE", "أبوظبي، الإمارات") },
  { k: T("Offices", "المكاتب"), v: T("Dubai · Paris", "دبي · باريس") },
  { k: T("Expanding", "التوسّع"), v: T("Muscat & Doha, soon", "مسقط والدوحة، قريبًا") },
  { k: T("Model", "النموذج"), v: T("Engineering-led, product-oriented", "هندسي القيادة، منتجيّ التوجّه") },
  { k: T("Certified", "الاعتمادات"), v: T("ISO/IEC 27001 · ISO/IEC 42001", "ISO/IEC 27001 · ISO/IEC 42001") },
];

const BELIEFS = [
  { h: T("Build, not broker", "نبني ولا نتوسّط"), p: T("Our value is in what we design, engineer and operate, not in reselling someone else's platform with our logo on the slide.", "قيمتنا فيما نصمّمه ونهندسه ونشغّله، لا في إعادة بيع منصّة غيرنا وشعارنا على العرض.") },
  { h: T("Production is the point", "الإنتاج هو الغاية"), p: T("A capability that exists only in a demo does not exist. We are accountable for what runs, under load, in the second year.", "القدرة الموجودة في عرض تجريبي فقط غير موجودة. نحن مساءلون عمّا يعمل، تحت الحمل، في السنة الثانية.") },
  { h: T("The region is a hard market, deliberately", "المنطقة سوق صعبة، عن قصد"), p: T("Government-grade expectations, sovereignty requirements and Arabic as a first-class language raise the bar. Systems built to clear it travel well.", "توقّعات بمستوى حكومي ومتطلّبات سيادية والعربية كلغة أولى ترفع السقف. والأنظمة المبنية لتجاوزه تسافر جيدًا.") },
  { h: T("The architects stay with the system", "المعماريون يبقون مع النظام"), p: T("Senior technical ownership runs from the first architecture session through production operations: the same accountable engineers, backed by full multidisciplinary delivery.", "تمتد الملكية التقنية الرفيعة من أول جلسة هندسية حتى تشغيل الإنتاج: المهندسون المسؤولون أنفسهم، يسندهم تنفيذ متكامل متعدّد التخصّصات.") },
  { h: T("Honest about autonomy", "صادقون بشأن الاستقلالية"), p: T("We tell clients what should not be automated yet. Trust in the systems depends on candour about their limits.", "نخبر العملاء بما لا ينبغي أتمتته بعد. فالثقة بالأنظمة تقوم على الصراحة بشأن حدودها.") },
  { h: T("Measured, always", "قياس دائم"), p: T("Every engagement carries an operational metric. If the number does not move, the work is not done.", "كل ارتباط يحمل مؤشّرًا تشغيليًا. وإن لم يتحرّك الرقم فالعمل لم يُنجز.") },
];

const WHY_AD = [
  { icon: "building", h: T("Governments moving first", "حكومات تتحرّك أولًا"), p: T("The region's public sector is adopting AI and autonomous systems at a pace most markets are still debating, with the mandate and capital to deploy at national scale.", "يتبنّى القطاع العام في المنطقة الذكاء الاصطناعي والأنظمة ذاتية التشغيل بوتيرة لا تزال معظم الأسواق تناقشها، وبتفويض ورأس مال للنشر على نطاق وطني.") },
  { icon: "city", h: T("Cities as live programs", "مدن كبرامج حيّة"), p: T("Urban intelligence here is not a pilot district; it is operating policy. That produces real requirements, real load and real accountability.", "الذكاء الحضري هنا ليس حيًّا تجريبيًا؛ بل سياسة تشغيل. وهذا يولّد متطلّبات وحملًا ومساءلة حقيقية.") },
  { icon: "shield", h: T("Sovereignty as a requirement", "السيادة كمتطلّب"), p: T("Data residency and controlled deployment are procurement conditions in this region, which forces an architectural discipline most vendors defer.", "إقامة البيانات والنشر المحكوم شرطان في المشتريات بهذه المنطقة، ما يفرض انضباطًا هندسيًا يؤجّله معظم المورّدين.") },
  { icon: "compass", h: T("Built here, aimed outward", "تُبنى هنا، وتتّجه للخارج"), p: T("Abu Dhabi is the headquarters and the standard-setter; Paris extends us into Europe, and Muscat and Doha are in progress. The systems are designed for international deployment from day one.", "أبوظبي هي المقر وواضعة المعيار؛ وباريس تمدّنا نحو أوروبا، ومسقط والدوحة قيد التأسيس. والأنظمة مصمّمة للنشر الدولي من اليوم الأول.") },
];

const DELIVERY = [
  { h: T("Strategy", "الاستراتيجية"), p: T("Product strategy and the operating case, stated in numbers.", "استراتيجية المنتج وجدوى التشغيل، بالأرقام.") },
  { h: T("Architecture", "البنية"), p: T("Enterprise and solution architecture as the contract for everything after.", "البنية المؤسسية وبنية الحلول كعقد لكل ما يليها.") },
  { h: T("Product & design", "المنتج والتصميم"), p: T("UX and interfaces designed for operators, residents and field crews.", "تجربة وواجهات مصمّمة للمشغّلين والمتعاملين والفرق الميدانية.") },
  { h: T("Engineering", "الهندسة"), p: T("AI, software, data and cybersecurity engineering in one team.", "هندسة الذكاء الاصطناعي والبرمجيات والبيانات والأمن في فريق واحد.") },
  { h: T("Integration", "التكامل"), p: T("Into the estate that exists, under its identity and its constraints.", "مع المنظومة القائمة، تحت هويتها وقيودها.") },
  { h: T("Deployment", "النشر"), p: T("Cloud, private, on-premise or sovereign, fixed at design time.", "سحابي أو خاص أو داخل المنشأة أو سيادي، يُثبَّت عند التصميم.") },
  { h: T("Operations", "التشغيل"), p: T("DevOps, MLOps and support, run by the people who built it.", "عمليات التطوير والتعلّم الآلي والدعم، بأيدي من بناه.") },
  { h: T("Evolution", "التطوير"), p: T("Measured, tuned and extended as the mandate grows.", "قياس وضبط وتوسيع مع نموّ التكليف.") },
];

const FAQS = [];

export default function about(lang) {
  const ar = lang === "ar";
  const hero = heroFor({
    route: "about",
    label: LABEL,
    kicker: T("The company", "الشركة"),
    h: T("An engineering company|in a market that demands one.", "شركة هندسية|في سوق يشترط ذلك."),
    lead: T(
      "Qeonix was built in Abu Dhabi to do one thing well: turn emerging technology into systems that governments, cities and enterprises can actually run, and stand behind them in production.",
      "أُسّست كيونيكس في أبوظبي لتُتقن أمرًا واحدًا: تحويل التقنيات الناشئة إلى أنظمة تستطيع الحكومات والمدن والمؤسسات تشغيلها فعلًا، والوقوف خلفها في الإنتاج."
    ),
    meta: [
      { k: T("Identity", "الهوية"), v: T("Abu Dhabi-born, globally ambitious", "وُلدت في أبوظبي، بطموح عالمي") },
      { k: T("Discipline", "الانضباط"), v: T("Product and engineering first", "المنتج والهندسة أولًا") },
      { k: T("Standard", "المعيار"), v: T("Beyond the demo", "أبعد من العرض التجريبي") },
    ],
  }, lang);

  const body = `
${hero.html}

${section(`
  ${factStrip(FACTS, lang)}
`, { tone: "light", cls: "sec-tight" })}

${section(`
  ${secHead({
    kicker: T("What we believe", "ما نؤمن به"),
    h: T("Six working principles.", "ستة مبادئ عمل."),
    lead: T("Written down because they cost us business occasionally, and earn it back with interest.", "دوّنّاها لأنها تكلّفنا صفقة أحيانًا، وتعيدها مع فائدة."),
  }, lang)}
  ${pillars(BELIEFS, lang)}
`, { tone: "paper" })}

${section(`
  ${secHead({
    kicker: T("Why Abu Dhabi", "لماذا أبوظبي"),
    h: T("Headquartered here|on purpose.", "المقر هنا|عن قصد."),
    lead: T("Not as a flag of convenience, because this is where the hardest, most consequential versions of our problems are being solved first.", "ليس كعنوان شكلي، بل لأن أصعب نسخ مشكلاتنا وأكثرها أثرًا تُحَل هنا أولًا."),
  }, lang)}
  ${trustGrid(WHY_AD, lang)}
  <div class="u-mt">${presenceMap(OFFICES, OFFICE_STATUS, lang)}</div>
`, { tone: "deep", grid: true })}

${section(`
  ${secHead({
    kicker: T("Provenance", "الجذور"),
    h: T("Built on experience.|Aimed at what comes next.", "مبنيّة على الخبرة.|ومتّجهة إلى ما هو قادم."),
    lead: T("The teams behind Qeonix have spent their careers building enterprise platforms, AI systems and national-scale digital services. Qeonix brings that experience under one roof, one architecture and one standard.", "أمضت الفرق التي تقف خلف كيونيكس مسيرتها المهنية في بناء المنصّات المؤسسية وأنظمة الذكاء الاصطناعي والخدمات الرقمية واسعة النطاق. وتجمع كيونيكس تلك الخبرة تحت سقف واحد وبنية واحدة ومعيار واحد."),
  }, lang)}
  <!-- HERITAGE / PROOF POINTS: insert only management-approved facts here.
       Candidates awaiting approval (do NOT publish without sign-off):
         - founding team backgrounds and prior organizations
         - collective years of engineering / delivery experience
         - count of platforms or systems previously delivered by the team
         - named markets or sectors previously served
         - team size and engineering headcount
         - investors or group affiliation, if disclosable
       Format when approved: factStrip([{k,v},...]) or a short paragraph. -->
`, { tone: "paper", cls: "sec-tight" })}

${section(`
  ${secHead({
    kicker: T("How we deliver", "كيف ننفّذ"),
    h: T("One team,|strategy through operations.", "فريق واحد،|من الاستراتيجية إلى التشغيل."),
  }, lang)}
  ${track(DELIVERY, lang)}
`, { id: "delivery", tone: "light" })}

${section(`
  ${secHead({
    kicker: T("Offices", "المكاتب"),
    h: T("Where we are,|and where we are going.", "أين نحن،|وإلى أين نتّجه."),
  }, lang)}
  ${officeList(lang)}
`, { tone: "paper" })}

${section(`
  ${secHead({
    kicker: T("Careers", "الوظائف"),
    h: T("Work on systems|people will depend on.", "اعمل على أنظمة|سيعتمد عليها الناس."),
    lead: T(
      "We hire engineers, architects, designers and product leaders who want their work deployed, not archived. If national-scale platforms, agentic systems and physical AI sound like your kind of problem, write to us.",
      "نوظّف مهندسين ومعماريين ومصمّمين وقادة منتجات يريدون لعملهم أن يُنشر لا أن يُؤرشف. إن كانت المنصّات الوطنية والأنظمة الوكيلة والذكاء المادي مشكلتك المفضّلة، فاكتب لنا."
    ),
  }, lang)}
  <p>${btn(ar ? "راسلنا: info@qeonix.com" : "Write to us: info@qeonix.com", "mailto:info@qeonix.com", { kind: "primary", lang, arrow: false })}</p>
  <div class="u-mt">${approvalSlot(T(
    "Open roles will be listed here. Until then, a short note about what you have built is the best application.",
    "ستُدرج الوظائف الشاغرة هنا. وحتى ذلك الحين، فإن رسالة قصيرة عمّا بنيته هي أفضل طلب توظيف."
  ), lang)}</div>
`, { id: "careers", tone: "light" })}

${section(statement({
  text: T("Live Tomorrow,|Today.", "عِش الغد،|اليوم."),
  attribution: T("Qeonix", "كيونيكس"),
}, lang), { tone: "accent", cls: "sec-tight" })}

${closer("about", lang)}
`;

  return {
    route: "about",
    solidHeader: true,
    crumbTrail: hero.crumbTrail,
    title: T(
      "About Qeonix: AI & Intelligent Systems Company, Abu Dhabi",
      "عن كيونيكس: شركة الذكاء الاصطناعي والأنظمة الذكية، أبوظبي"
    ),
    description: T(
      "Qeonix is an Abu Dhabi-headquartered engineering company building AI, agentic systems, autonomous technology and smart city platforms for governments and enterprises, with a presence in Paris and offices in Muscat and Doha in progress.",
      "كيونيكس شركة هندسية مقرّها أبوظبي تبني الذكاء الاصطناعي والأنظمة الوكيلة والتقنيات ذاتية التشغيل ومنصّات المدن الذكية للحكومات والمؤسسات، مع حضور في باريس ومكتبين قيد التأسيس في مسقط والدوحة."
    ),
    og: "about",
    body,
  };
}
