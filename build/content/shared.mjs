/* Content shared across more than one route. */

import { T } from "../lib/html.mjs";

export const INDUSTRIES = [
  {
    id: "government", icon: "building",
    h: T("Government & Public Sector", "الحكومة والقطاع العام"),
    p: T("Service delivery, cross-agency workflows and operational command.", "تقديم الخدمات وسير العمل بين الجهات والقيادة التشغيلية."),
  },
  {
    id: "transport", icon: "route",
    h: T("Transportation & Mobility", "النقل والتنقل"),
    p: T("Networks, fleets, vehicles and the movement of people and goods.", "الشبكات والأساطيل والمركبات وحركة الأشخاص والبضائع."),
  },
  {
    id: "energy", icon: "bolt",
    h: T("Energy & Utilities", "الطاقة والمرافق"),
    p: T("Monitoring, optimisation and response across critical infrastructure.", "المراقبة والتحسين والاستجابة عبر البنية التحتية الحيوية."),
  },
  {
    id: "industrial", icon: "factory",
    h: T("Industrial & Manufacturing", "الصناعة والتصنيع"),
    p: T("Automation, robotics and vision for throughput, precision and safety.", "الأتمتة والروبوتات والرؤية الحاسوبية للإنتاجية والدقة والسلامة."),
  },
  {
    id: "logistics", icon: "package",
    h: T("Logistics & Supply Chain", "اللوجستيات وسلاسل الإمداد"),
    p: T("Visibility and control across assets, warehouses and distribution.", "الوضوح والتحكّم عبر الأصول والمستودعات والتوزيع."),
  },
  {
    id: "aviation", icon: "plane",
    h: T("Aviation & Aerospace", "الطيران والفضاء"),
    p: T("Autonomous inspection, airside operations and ground infrastructure.", "الفحص الذاتي وعمليات الساحة الجوية والبنية التحتية الأرضية."),
  },
  {
    id: "health", icon: "health",
    h: T("Healthcare", "الرعاية الصحية"),
    p: T("Digital health platforms, care orchestration and operational analytics.", "منصّات الصحة الرقمية وتنسيق الرعاية والتحليلات التشغيلية."),
  },
  {
    id: "realestate", icon: "city",
    h: T("Real Estate & Urban Development", "العقارات والتطوير العمراني"),
    p: T("Smarter buildings, communities and connected urban environments.", "مبانٍ ومجتمعات وبيئات حضرية متصلة وأكثر ذكاءً."),
  },
];

/* Deployment tiers reused on several capability pages. */
export const TIERS = [
  { icon: "cloud", label: T("Public cloud", "السحابة العامة"), note: T("Fastest path where the data class allows it.", "أسرع مسار حين يسمح تصنيف البيانات بذلك.") },
  { icon: "server", label: T("Private cloud", "السحابة الخاصة"), note: T("Dedicated tenancy under your own controls.", "استضافة مخصّصة تحت ضوابطكم.") },
  { icon: "lock", label: T("On-premise", "داخل المنشأة"), note: T("Inside your data centre and network boundary.", "داخل مركز بياناتكم وحدود شبكتكم.") },
  { icon: "shield", label: T("Isolated / sovereign", "بيئة معزولة / سيادية"), note: T("Architected for residency and disconnected operation.", "مصمّمة لإقامة البيانات والتشغيل غير المتصل.") },
];

/* Cross-links shown at the foot of interior pages. */
export const RELATED = {
  agentic: [
    { key: "ai", label: T("Intelligence & AI", "الذكاء الاصطناعي"), note: T("The models and vision underneath the agents.", "النماذج والرؤية الحاسوبية التي تسند الوكلاء.") },
    { key: "government", label: T("Smart Government", "الحكومة الذكية"), note: T("Where agentic workflows meet public service delivery.", "حيث يلتقي سير العمل الوكيل بتقديم الخدمة العامة.") },
    { key: "sovereign", label: T("Sovereign AI", "الذكاء السيادي"), note: T("Running all of it inside your own boundary.", "تشغيل ذلك كلّه داخل حدودكم.") },
  ],
  ai: [
    { key: "agentic", label: T("Agentic AI", "الذكاء الاصطناعي الوكيل"), note: T("From insight to action, under governance.", "من الاستنتاج إلى التنفيذ، تحت الحوكمة.") },
    { key: "platforms", label: T("Data & Platforms", "البيانات والمنصّات"), note: T("The data layer any model depends on.", "طبقة البيانات التي يعتمد عليها أي نموذج.") },
    { key: "autonomous", label: T("Autonomous Systems", "الأنظمة ذاتية التشغيل"), note: T("Vision and decisioning in the physical world.", "الرؤية واتخاذ القرار في العالم المادي.") },
  ],
  autonomous: [
    { key: "mobility", label: T("Smart Mobility", "التنقل الذكي"), note: T("Fleets, corridors and transport operations.", "الأساطيل والممرّات وعمليات النقل.") },
    { key: "cities", label: T("Smart Cities", "المدن الذكية"), note: T("Field operations tied to city command.", "العمليات الميدانية مرتبطة بقيادة المدينة.") },
    { key: "ai", label: T("Intelligence & AI", "الذكاء الاصطناعي"), note: T("The perception and decision layer.", "طبقة الإدراك واتخاذ القرار.") },
  ],
  cities: [
    { key: "government", label: T("Smart Government", "الحكومة الذكية"), note: T("The service side of the same operating layer.", "الجانب الخدمي من طبقة التشغيل نفسها.") },
    { key: "mobility", label: T("Smart Mobility", "التنقل الذكي"), note: T("Movement across the city, coordinated.", "الحركة عبر المدينة، بتنسيق واحد.") },
    { key: "autonomous", label: T("Autonomous Systems", "الأنظمة ذاتية التشغيل"), note: T("Inspection and response in the field.", "الفحص والاستجابة في الميدان.") },
  ],
  government: [
    { key: "agentic", label: T("Agentic AI", "الذكاء الاصطناعي الوكيل"), note: T("Assistants and workflows that complete work.", "مساعدون وسير عمل يُنجزون المهام.") },
    { key: "cities", label: T("Smart Cities", "المدن الذكية"), note: T("The operational side of the city.", "الجانب التشغيلي للمدينة.") },
    { key: "sovereign", label: T("Sovereign AI", "الذكاء السيادي"), note: T("Residency, isolation and controlled model access.", "إقامة البيانات والعزل والوصول المحكوم للنماذج.") },
  ],
  mobility: [
    { key: "cities", label: T("Smart Cities", "المدن الذكية"), note: T("Mobility inside the wider city operation.", "التنقل ضمن عملية المدينة الأوسع.") },
    { key: "autonomous", label: T("Autonomous Systems", "الأنظمة ذاتية التشغيل"), note: T("Vision, inspection and fleet autonomy.", "الرؤية والفحص واستقلالية الأساطيل.") },
    { key: "platforms", label: T("Data & Platforms", "البيانات والمنصّات"), note: T("The integration layer behind multimodal journeys.", "طبقة التكامل خلف الرحلات متعدّدة الوسائط.") },
  ],
  platforms: [
    { key: "ai", label: T("Intelligence & AI", "الذكاء الاصطناعي"), note: T("What the platform is built to serve.", "ما بُنيت المنصّة لخدمته.") },
    { key: "agentic", label: T("Agentic AI", "الذكاء الاصطناعي الوكيل"), note: T("Agents calling those APIs and workflows.", "وكلاء يستدعون تلك الواجهات وسير العمل.") },
    { key: "sovereign", label: T("Sovereign AI", "الذكاء السيادي"), note: T("Where and how the platform is deployed.", "أين تُنشر المنصّة وكيف.") },
  ],
  healthcare: [
    { key: "agentic", label: T("Agentic AI", "الذكاء الاصطناعي الوكيل"), note: T("Administrative and coordination workflows.", "سير العمل الإداري والتنسيقي.") },
    { key: "platforms", label: T("Data & Platforms", "البيانات والمنصّات"), note: T("Interoperability and integration.", "قابلية التشغيل البيني والتكامل.") },
    { key: "government", label: T("Smart Government", "الحكومة الذكية"), note: T("Public health service delivery.", "تقديم خدمات الصحة العامة.") },
  ],
  sovereign: [
    { key: "agentic", label: T("Agentic AI", "الذكاء الاصطناعي الوكيل"), note: T("The control plane this section describes.", "طبقة التحكم التي يصفها هذا القسم.") },
    { key: "platforms", label: T("Data & Platforms", "البيانات والمنصّات"), note: T("The infrastructure it is deployed on.", "البنية التي يُنشر عليها.") },
    { key: "government", label: T("Smart Government", "الحكومة الذكية"), note: T("The buyers who ask for it first.", "الجهات التي تطلبه أولًا.") },
  ],
  industries: [
    { key: "agentic", label: T("Agentic AI", "الذكاء الاصطناعي الوكيل"), note: T("The workflow engine across every sector.", "محرّك سير العمل عبر كل قطاع.") },
    { key: "autonomous", label: T("Autonomous Systems", "الأنظمة ذاتية التشغيل"), note: T("Physical operations, instrumented.", "عمليات مادية مزوّدة بالقياس.") },
    { key: "platforms", label: T("Data & Platforms", "البيانات والمنصّات"), note: T("The common layer underneath.", "الطبقة المشتركة في الأساس.") },
  ],
  about: [
    { key: "sovereign", label: T("Sovereign AI", "الذكاء السيادي"), note: T("How we deploy in regulated environments.", "كيف ننشر في البيئات المنظَّمة.") },
    { key: "agentic", label: T("Agentic AI", "الذكاء الاصطناعي الوكيل"), note: T("Our most differentiated capability.", "أكثر قدراتنا تميّزًا.") },
    { key: "contact", label: T("Contact", "تواصل معنا"), note: T("Start a conversation with the team.", "ابدأ محادثة مع الفريق.") },
  ],
};
