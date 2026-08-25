import { T, tx, esc } from "../../lib/html.mjs";
import { icon } from "../../lib/icons.mjs";
import { section, secHead, faq, statement } from "../../lib/components.mjs";
import { markRule } from "../../lib/diagrams.mjs";
import { heroFor, closer } from "../../lib/page.mjs";
import { url } from "../site.mjs";

const LABEL = T("Industries", "القطاعات");

/* Each industry: what we see, what we build there, what it links to. */
const SECTORS = [
  {
    id: "government", icon: "building",
    h: T("Government & Public Sector", "الحكومة والقطاع العام"),
    see: T("Cases that restart at every departmental boundary, and service standards measured after the fact.", "معاملات تبدأ من جديد عند كل حدود إدارية، ومعايير خدمة تُقاس بعد فوات الأوان."),
    build: [T("Unified service platforms", "منصّات خدمات موحّدة"), T("Cross-agency orchestration", "التنسيق بين الجهات"), T("Government AI assistants", "المساعدون الحكوميون"), T("Command & operations", "القيادة والعمليات")],
    href: "government",
  },
  {
    id: "transport", icon: "route",
    h: T("Transportation & Mobility", "النقل والتنقل"),
    see: T("Operators optimizing their own slice of a journey nobody owns end to end.", "مشغّلون يحسّن كلٌّ منهم جزءه من رحلة لا يملكها أحد من طرف إلى طرف."),
    build: [T("Multimodal journey platforms", "منصّات الرحلات متعدّدة الوسائط"), T("Fleet orchestration", "تنسيق الأساطيل"), T("Network intelligence", "ذكاء الشبكة"), T("Parking, tolling & EV", "المواقف والتعرفة والمركبات الكهربائية")],
    href: "mobility",
  },
  {
    id: "energy", icon: "bolt",
    h: T("Energy & Utilities", "الطاقة والمرافق"),
    see: T("Critical networks inspected on a calendar instead of on condition, and losses found in the reconciliation.", "شبكات حيوية تُفحص وفق تقويم لا وفق الحالة، وفاقد يُكتشف عند التسويات."),
    build: [T("Network monitoring & analytics", "مراقبة الشبكات وتحليلاتها"), T("Predictive maintenance", "الصيانة التنبؤية"), T("Autonomous inspection", "الفحص الذاتي"), T("Outage & field response", "الاستجابة للانقطاعات والميدان")],
    href: "autonomous",
  },
  {
    id: "industrial", icon: "factory",
    h: T("Industrial & Manufacturing", "الصناعة والتصنيع"),
    see: T("Quality discovered at the end of the line, and safety dependent on constant human vigilance.", "جودة تُكتشف في نهاية الخط، وسلامة تعتمد على يقظة بشرية دائمة."),
    build: [T("Vision-based quality", "الجودة بالرؤية الحاسوبية"), T("Industrial automation", "الأتمتة الصناعية"), T("Robotics integration", "تكامل الروبوتات"), T("Operational analytics", "التحليلات التشغيلية")],
    href: "autonomous",
  },
  {
    id: "logistics", icon: "package",
    h: T("Logistics & Supply Chain", "اللوجستيات وسلاسل الإمداد"),
    see: T("Visibility that ends at each hand-off, and exceptions managed over the phone.", "رؤية تنتهي عند كل تسليم، واستثناءات تُدار عبر الهاتف."),
    build: [T("Asset & shipment visibility", "رؤية الأصول والشحنات"), T("Warehouse intelligence", "ذكاء المستودعات"), T("Fleet & yard operations", "عمليات الأساطيل والساحات"), T("Exception automation", "أتمتة الاستثناءات")],
    href: "platforms",
  },
  {
    id: "aviation", icon: "plane",
    h: T("Aviation & Aerospace", "الطيران والفضاء"),
    see: T("Airside operations rich in data and poor in shared, real-time state.", "عمليات ساحة جوية غنيّة بالبيانات وفقيرة بحالة مشتركة لحظية."),
    build: [T("Airside operations intelligence", "ذكاء عمليات الساحة الجوية"), T("Autonomous inspection", "الفحص الذاتي"), T("Asset & turnaround analytics", "تحليلات الأصول والمناوبة"), T("Ground infrastructure IoT", "إنترنت الأشياء للبنية الأرضية")],
    href: "autonomous",
  },
  {
    id: "health", icon: "health",
    h: T("Healthcare", "الرعاية الصحية"),
    see: T("Clinical excellence surrounded by administrative friction that patients experience as the system.", "تميّز سريري تحيط به عوائق إدارية يختبرها المرضى بوصفها النظام نفسه."),
    build: [T("Digital health platforms", "منصّات الصحة الرقمية"), T("Care orchestration", "تنسيق الرعاية"), T("Administrative AI assistants", "المساعدون الإداريون"), T("Healthcare analytics", "التحليلات الصحية")],
    href: "healthcare",
  },
  {
    id: "realestate", icon: "city",
    h: T("Real Estate & Urban Development", "العقارات والتطوير العمراني"),
    see: T("Districts handed over as buildings, with the operating model designed afterwards.", "مناطق تُسلَّم كمبانٍ، ويُصمَّم نموذج تشغيلها لاحقًا."),
    build: [T("District operating platforms", "منصّات تشغيل المناطق"), T("Building & community services", "خدمات المباني والمجتمعات"), T("Asset management", "إدارة الأصول"), T("Digital twins", "التوائم الرقمية")],
    href: "cities",
  },
];

const FAQS = [
  {
    q: T("Do you specialize in one industry?", "هل تتخصّصون في قطاع واحد؟"),
    a: T("We specialize in a pattern: dense physical operations, fragmented data and decisions made later than they should be. The platform capabilities, intelligence, agents, autonomy, data, are common; the domain models, integrations and operating constraints are what change per sector.", "نتخصّص في نمط: عمليات مادية كثيفة وبيانات مبعثرة وقرارات تُتّخذ متأخّرة. القدرات المنصّية، الذكاء والوكلاء والاستقلالية والبيانات، مشتركة؛ أما نماذج المجال والتكاملات وقيود التشغيل فهي ما يتغيّر بين القطاعات."),
  },
  {
    q: T("What if our sector is not listed?", "ماذا لو لم يكن قطاعنا مذكورًا؟"),
    a: T("The list is where the pattern shows up most often, not a boundary. If your operation involves physical assets, field teams and decisions built on fragmented data, the same architecture applies. Start a conversation and we will tell you honestly whether we are the right fit.", "القائمة هي حيث يظهر النمط غالبًا، لا حدودًا. إن كانت عملياتكم تشمل أصولًا مادية وفرقًا ميدانية وقرارات مبنية على بيانات مبعثرة، فالبنية نفسها تنطبق. ابدأوا محادثة وسنخبركم بصدق إن كنّا الجهة المناسبة."),
  },
];

function sectorRow(s, lang, i) {
  return `<article class="frow${i % 2 ? " is-flip" : ""} reveal" id="${esc(s.id)}">
    <div class="frow-copy">
      <p class="kicker mono">${markRule()}<span class="mono">${String(i + 1).padStart(2, "0")}</span></p>
      <h3 class="h3">${tx(s.h, lang)}</h3>
      <p class="frow-p">${tx(s.see, lang)}</p>
      <p class="frow-cta"><a class="btn btn-ghost" href="${esc(url(s.href, lang))}"><span>${lang === "ar" ? "القدرة ذات الصلة" : "Related capability"}</span></a></p>
    </div>
    <div class="frow-media">
      <ul class="ticks">
        ${s.build.map((b) => `<li>${icon("check")}<span>${tx(b, lang)}</span></li>`).join("")}
      </ul>
    </div>
  </article>`;
}

export default function industries(lang) {
  const hero = heroFor({
    route: "industries",
    label: LABEL,
    kicker: T("Sectors", "القطاعات"),
    h: T("One pattern,|eight operating realities.", "نمط واحد،|وثماني بيئات تشغيل."),
    lead: T(
      "Every sector we work in shares the same underlying problem: a physical operation generating more signal than its systems can turn into action. What differs is the domain, and the domain is where the engineering care goes.",
      "تشترك القطاعات التي نعمل فيها في المشكلة الأساسية نفسها: عملية مادية تولّد إشارات تفوق قدرة أنظمتها على تحويلها إلى فعل. والمختلف هو المجال، وإليه تتّجه العناية الهندسية."
    ),
    meta: [
      { k: T("Sectors", "القطاعات"), v: T("Eight, sharing one platform architecture", "ثمانية، ببنية منصّية واحدة") },
      { k: T("Approach", "المنهج"), v: T("Domain models over generic dashboards", "نماذج مجال لا لوحات عامة") },
    ],
  }, lang);

  const body = `
${hero.html}

${section(`
  ${SECTORS.map((s, i) => sectorRow(s, lang, i)).join("")}
`, { tone: "light" })}

${section(statement({
  text: T("The sector changes.|The pattern does not.", "يتغيّر القطاع.|ولا يتغيّر النمط."),
}, lang), { tone: "accent", cls: "sec-tight" })}

${section(`
  ${secHead({ kicker: T("Questions", "أسئلة"), h: T("Industries, answered.", "القطاعات، بإجابات مباشرة.") }, lang)}
  <div class="u-narrow-c">${faq(FAQS, lang, "ind-faq")}</div>
`, { tone: "paper" })}

${closer("industries", lang)}
`;

  return {
    route: "industries",
    solidHeader: true,
    crumbTrail: hero.crumbTrail,
    title: T(
      "Industries: AI & Intelligent Systems by Sector | Qeonix",
      "القطاعات: الذكاء الاصطناعي والأنظمة الذكية حسب القطاع | كيونكس"
    ),
    description: T(
      "Where Qeonix systems operate: government, transportation, energy and utilities, industrial and manufacturing, logistics, aviation and aerospace, healthcare, and real estate and urban development.",
      "حيث تعمل أنظمة كيونكس: الحكومة والنقل والطاقة والمرافق والصناعة والتصنيع واللوجستيات والطيران والفضاء والرعاية الصحية والعقارات والتطوير العمراني."
    ),
    og: "industries",
    faqSchema: FAQS,
    body,
  };
}
