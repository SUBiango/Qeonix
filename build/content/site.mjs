/* Global site content: brand, routes, navigation, footer, offices.
   Every user-visible string is bilingual via T(en, ar). */

import { T } from "../lib/html.mjs";

export const ORIGIN = "https://qeonix.com";
export const LANGS = ["en", "ar"];

export const BRAND = {
  name: "QEONIX",
  legal: "QEONIX",
  tagline: T("Live Tomorrow, Today.", "عِش الغد، اليوم."),
  email: "info@qeonix.com",
  hq: T("Abu Dhabi, United Arab Emirates", "أبوظبي، الإمارات العربية المتحدة"),
};

/* Canonical route table. `key` is used for nav highlighting and hreflang. */
export const ROUTES = {
  home: { path: "", file: "index.html" },
  ai: { path: "ai/", file: "ai/index.html" },
  agentic: { path: "agentic-ai/", file: "agentic-ai/index.html" },
  autonomous: { path: "autonomous-systems/", file: "autonomous-systems/index.html" },
  cities: { path: "smart-cities/", file: "smart-cities/index.html" },
  government: { path: "smart-government/", file: "smart-government/index.html" },
  mobility: { path: "mobility/", file: "mobility/index.html" },
  platforms: { path: "data-platforms/", file: "data-platforms/index.html" },
  healthcare: { path: "healthcare/", file: "healthcare/index.html" },
  industries: { path: "industries/", file: "industries/index.html" },
  sovereign: { path: "sovereign-ai/", file: "sovereign-ai/index.html" },
  about: { path: "about/", file: "about/index.html" },
  contact: { path: "contact/", file: "contact/index.html" },
};

/** Absolute in-site href for a route key in a given language. */
export function url(key, lang) {
  const r = ROUTES[key];
  if (!r) throw new Error(`url(): unknown route "${key}"`);
  const prefix = lang === "ar" ? "/ar/" : "/";
  return prefix + r.path;
}

/** Absolute canonical URL. */
export function canonical(key, lang) {
  return ORIGIN + url(key, lang);
}

/* ---------------- navigation ---------------- */

export const NAV = [
  {
    id: "capabilities",
    label: T("Capabilities", "القدرات"),
    note: T("What Qeonix designs, engineers and operates.", "ما تصمّمه كيونكس وتهندسه وتشغّله."),
    children: [
      { key: "ai", label: T("Intelligence & AI", "الذكاء الاصطناعي"), note: T("Decision intelligence, computer vision, enterprise AI.", "ذكاء القرار، والرؤية الحاسوبية، والذكاء الاصطناعي المؤسسي."), icon: "chip" },
      { key: "agentic", label: T("Agentic AI", "الذكاء الاصطناعي الوكيل"), note: T("Agents that reason, act and stay under control.", "وكلاء يستنتجون وينفّذون تحت رقابة كاملة."), icon: "agent", featured: true },
      { key: "autonomous", label: T("Autonomous Systems", "الأنظمة ذاتية التشغيل"), note: T("Physical AI: robotics, drones, remote operations.", "الذكاء المادي: الروبوتات والطائرات المسيّرة والتشغيل عن بُعد."), icon: "drone" },
      { key: "cities", label: T("Smart Cities", "المدن الذكية"), note: T("A city operating layer, from resident to field crew.", "طبقة تشغيل للمدينة، من المتعامل حتى الفريق الميداني."), icon: "city" },
      { key: "mobility", label: T("Smart Mobility", "التنقل الذكي"), note: T("Transport that behaves as one network.", "نقل يعمل كشبكة واحدة."), icon: "route" },
      { key: "platforms", label: T("Data & Platforms", "البيانات والمنصّات"), note: T("The data, integration and workflow layer underneath.", "طبقة البيانات والتكامل وسير العمل التي تسند كل ما سبق."), icon: "layers" },
    ],
  },
  {
    id: "sectors",
    label: T("Sectors", "القطاعات"),
    note: T("Where these systems go into live operation.", "حيث تدخل هذه الأنظمة الخدمة الفعلية."),
    children: [
      { key: "government", label: T("Smart Government", "الحكومة الذكية"), note: T("Digital services, orchestration, government AI.", "الخدمات الرقمية والتنسيق والذكاء الاصطناعي الحكومي."), icon: "building", featured: true },
      { key: "healthcare", label: T("Healthcare", "الرعاية الصحية"), note: T("Digital health platforms and care orchestration.", "منصّات الصحة الرقمية وتنسيق الرعاية."), icon: "health" },
      { key: "industries", label: T("All industries", "جميع القطاعات"), note: T("Energy, industrial, logistics, aviation, real estate.", "الطاقة والصناعة واللوجستيات والطيران والعقارات."), icon: "grid" },
    ],
  },
  { key: "sovereign", label: T("Sovereign AI", "الذكاء السيادي") },
  { key: "about", label: T("About", "عن كيونكس") },
];

/* ---------------- offices ---------------- */
/* status: hq | active | progress. Street addresses are intentionally omitted —
   only the HQ city is asserted in structured data. */
export const OFFICES = [
  {
    city: T("Abu Dhabi", "أبوظبي"),
    country: T("United Arab Emirates", "الإمارات العربية المتحدة"),
    cc: "AE",
    status: "hq",
    note: T("Headquarters. Engineering, product and delivery.", "المقر الرئيسي. الهندسة والمنتج والتنفيذ."),
  },
  {
    city: T("Paris", "باريس"),
    country: T("France", "فرنسا"),
    cc: "FR",
    status: "active",
    note: T("European presence for research partnerships and clients.", "الحضور الأوروبي لشراكات البحث والعملاء."),
  },
  {
    city: T("Muscat", "مسقط"),
    country: T("Oman", "عُمان"),
    cc: "OM",
    status: "progress",
    note: T("Establishing in-country presence.", "قيد التأسيس داخل السلطنة."),
  },
  {
    city: T("Doha", "الدوحة"),
    country: T("Qatar", "قطر"),
    cc: "QA",
    status: "progress",
    note: T("Establishing in-country presence.", "قيد التأسيس داخل الدولة."),
  },
];

export const OFFICE_STATUS = {
  hq: T("Headquarters", "المقر الرئيسي"),
  active: T("Office", "مكتب"),
  progress: T("Soon", "قريبًا"),
};

/* ---------------- footer ---------------- */

export const FOOTER = {
  blurb: T(
    "Qeonix designs, engineers and deploys the intelligent systems that governments, cities and enterprises run on, from decision intelligence and agentic AI to autonomous operations and connected infrastructure.",
    "تصمّم كيونكس وتهندس وتنشر الأنظمة الذكية التي تعتمد عليها الحكومات والمدن والمؤسسات، من ذكاء القرار والذكاء الاصطناعي الوكيل إلى العمليات ذاتية التشغيل والبنية التحتية المتصلة."
  ),
  columns: [
    {
      h: T("Capabilities", "القدرات"),
      links: [
        { key: "ai", label: T("Intelligence & AI", "الذكاء الاصطناعي") },
        { key: "agentic", label: T("Agentic AI", "الذكاء الاصطناعي الوكيل") },
        { key: "autonomous", label: T("Autonomous Systems", "الأنظمة ذاتية التشغيل") },
        { key: "cities", label: T("Smart Cities", "المدن الذكية") },
        { key: "mobility", label: T("Smart Mobility", "التنقل الذكي") },
        { key: "platforms", label: T("Data & Platforms", "البيانات والمنصّات") },
      ],
    },
    {
      h: T("Sectors", "القطاعات"),
      links: [
        { key: "government", label: T("Smart Government", "الحكومة الذكية") },
        { key: "healthcare", label: T("Healthcare", "الرعاية الصحية") },
        { key: "industries", label: T("Industries", "القطاعات") },
        { key: "sovereign", label: T("Sovereign AI", "الذكاء السيادي") },
      ],
    },
    {
      h: T("Company", "الشركة"),
      links: [
        { key: "about", label: T("About Qeonix", "عن كيونكس") },
        { key: "contact", label: T("Contact", "تواصل معنا") },
        { key: "about", hash: "#delivery", label: T("How we deliver", "كيف ننفّذ") },
        { key: "about", hash: "#careers", label: T("Careers", "الوظائف") },
      ],
    },
  ],
  rights: T("All rights reserved.", "جميع الحقوق محفوظة."),
  motto: T("Intelligence, Innovation, Impact.", "الذكاء، الابتكار، الأثر."),
};

/* ---------------- shared UI strings ---------------- */

export const UI = {
  skip: T("Skip to content", "تخطَّ إلى المحتوى"),
  menu: T("Menu", "القائمة"),
  close: T("Close", "إغلاق"),
  primaryNav: T("Primary", "التنقل الرئيسي"),
  home: T("Home", "الرئيسية"),
  contactCta: T("Start a conversation", "ابدأ محادثة"),
  exploreCta: T("Explore Qeonix", "استكشف كيونكس"),
  langSwitch: { en: "عربي", ar: "English" },
  langSwitchAria: T("Switch to Arabic", "التبديل إلى الإنجليزية"),
  offices: T("Offices", "المكاتب"),
  nextUp: T("Continue", "تابع"),
};
