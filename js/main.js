(function(){
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ============================================================
     i18n — English / Arabic (Arabic typeface: Cairo, RTL — per
     QEONIX branding guideline, Typography · Arabic)
     ============================================================ */
  var I18N = {
    en: {
      "meta.title":"QEONIX — Live Tomorrow, Today.",
      "meta.desc":"QEONIX brings the physical and digital worlds together to create smarter, more responsive systems for governments, organizations, and cities. AI · Robotics · Smart Cities · Future Technologies.",
      "nav.solutions":"Solutions","nav.industries":"Industries","nav.approach":"Approach","nav.why":"Why Qeonix","nav.contact":"Contact us",
      "hero.eyebrow":"AI · Autonomous Systems · Smart Environments",
      "hero.h1":'Live<br><span class="accent">Tomorrow,</span><br>Today.',
      "hero.lead":"We bring the physical and digital worlds together to create smarter, more responsive systems for governments, organizations, and cities.",
      "hero.cta1":"Explore Our Capabilities","hero.cta2":"How we work","hero.scroll":"Scroll",
      "mq1":"Artificial Intelligence","mq2":"Generative & Agentic AI","mq3":"Robotics","mq4":"Drone Technology","mq5":"Smart Cities","mq6":"IoT","mq7":"Connected Mobility","mq8":"Data & Analytics","mq9":"Connected Infrastructure",
      "who.eyebrow":"Who We Are",
      "who.h2":"Engineering intelligent systems for the world ahead.",
      "who.lead":"QEONIX works with governments and enterprises to turn emerging technology into practical, secure, and scalable systems built for real-world performance. From AI and robotics to smart city infrastructure, we design, engineer, and deploy solutions that organizations can rely on.",
      "who.f1k":"Headquartered","who.f1v":"Abu Dhabi, UAE","who.f2k":"Designed for","who.f2v":"Real-world operations","who.f3k":"Built to","who.f3v":"Perform, scale, and evolve","who.tag":"Intelligence in motion",
      "sol.eyebrow":"Our Solutions","sol.h2":"Three ways we bring intelligence into operation.",
      "sol.ai.h":"Intelligence & AI","sol.ai.p":"Turn fragmented information into clear decisions, automated workflows, and actionable operational insight.","sol.ai.1":"Artificial Intelligence","sol.ai.2":"Generative & Agentic AI","sol.ai.3":"Data & Analytics",
      "sol.auto.h":"Autonomous Systems","sol.auto.p":"Bring intelligence into physical operations through robotics, drones, and connected mobility systems.",
      "sol.env.h":"Smart Environments","sol.env.p":"Connect infrastructure, services, and operational systems to improve visibility, coordination, and response across cities and large-scale environments.","sol.env.t1":"Smart Cities","sol.env.t2":"IoT","sol.env.t3":"Connected Infrastructure",
      "sol.gen.h":"Generative & Agentic AI","sol.gen.p":"Deploy intelligent agents that support teams, coordinate tasks, and execute complex workflows.",
      "sol.rob.h":"Robotics & Drone Technology","sol.rob.p":"Improve precision, safety, and operational reach across industrial, commercial, and hard-to-access environments.",
      "sol.mob.h":"Connected Mobility","sol.mob.p":"Improve the coordination and movement of people, vehicles, fleets, and goods through connected transport systems.",
      "ap.eyebrow":"Our Approach","ap.h2":"From complex challenge to operational capability. ","ap.lead":"Every engagement begins with the environment in which technology must perform. We align technical design with operational requirements, existing systems and the people who will use the solution.",
      "ap.s1h":"UNDERSTAND","ap.s1p":"Define the challenge, operating context, priorities and measures of success.",
      "ap.s2h":"DESIGN","ap.s2p":"Shape the solution architecture, experience and technical direction.",
      "ap.s3h":"ENGINEER","ap.s3p":"Build the technologies, platforms and systems required.",
      "ap.s4h":"INTEGRATE","ap.s4p":"Connect the solution with existing infrastructure and operations.",
      "ap.s5h":"DEPLOY","ap.s5p":"Implement, validate and prepare the solution for live use.",
      "ap.s6h":"EVOLVE","ap.s6p":"Optimize performance and scale the solution as needs change.",
      "ind.eyebrow":"Industries We Serve","ind.h2":"Built for the industries shaping what comes next.","ind.lead":"Qeonix applies intelligence, automation, and connected systems where performance, safety, and operational control matter most.",
      "ind.c1h":"Transportation & Mobility","ind.c1p":"Intelligent systems for networks, fleets, vehicles, people, and goods.",
      "ind.c2h":"Energy & Utilities","ind.c2p":"Monitoring, management, and optimization for critical infrastructure.",
      "ind.c3h":"Industrial & Manufacturing","ind.c3p":"Automation and robotics for productivity, precision, and safety.",
      "ind.c4h":"Logistics & Supply Chain","ind.c4p":"Visibility and control across assets, warehouses, and distribution.",
      "ind.c5h":"Aviation & Aerospace","ind.c5p":"Intelligent and autonomous solutions for operations and infrastructure.",
      "ind.c6h":"Construction & Infrastructure","ind.c6p":"Connected project monitoring, asset management, and performance.",
      "ind.c7h":"Healthcare","ind.c7p":"Intelligent platforms supporting efficient, informed operations.",
      "ind.c8h":"Real Estate & Urban Development","ind.c8p":"Smarter buildings, communities, and urban environments.",
      "why.eyebrow":"Why Qeonix","why.h2":"Designed to work beyond the demo.","why.lead":"We combine engineering depth, connected capabilities, and regional understanding to build systems that perform in real operating environments and scale as needs change.",
      "why.p1h":"Engineering Depth","why.p1p":"Strong architecture, disciplined engineering, and reliable performance from design through deployment.",
      "why.p2h":"Connected Capabilities","why.p2p":"AI, autonomous systems, and infrastructure brought together within one integrated approach.",
      "why.p3h":"Real-World Design","why.p3p":"Solutions shaped around actual operating conditions, existing systems, and the people who use them.",
      "why.p4h":"Secure & Scalable","why.p4p":"Technology built for demanding operations, long-term adoption, and future expansion.",
      "why.p5h":"Regional Understanding","why.p5p":"A UAE-based team with a clear understanding of regional priorities and operating environments.",
      "why.p6h":"Outcome Focus","why.p6p":"Every solution is developed around the practical result it needs to deliver.",
      "faq.eyebrow":"FAQs","faq.h2":"Your Questions,<br>Answered.",
      "faq.q1":"Where is Qeonix based?","faq.a1":"We're headquartered in Abu Dhabi, UAE, working with governments and enterprises across the region and beyond—with a clear understanding of regional priorities and operating environments.",
      "faq.q2":"What does Qeonix actually build?","faq.a2":"AI and analytics, autonomous systems like robotics and drones, and smart, connected infrastructure—delivered as integrated, real-world systems rather than isolated tools.",
      "faq.q3":"Do you work with our existing systems?","faq.a3":"Yes. Every solution is designed around your existing infrastructure, operating conditions, and the people who use it—so it fits the reality of your operations.",
      "faq.q4":"How do you handle security and scale?","faq.a4":"Our systems are engineered for demanding operations, long-term adoption, and future expansion. Security and scalability are designed in from architecture through deployment.",
      "faq.q5":"Which industries do you serve?","faq.a5":"Transportation & mobility, energy & utilities, industrial & manufacturing, logistics, aviation & aerospace, construction, healthcare, and real estate & urban development.",
      "faq.q6":"How do we get started?","faq.a6":"It starts with a short discovery conversation to map your operating reality and define the outcome you need. From there, we architect, engineer, and deploy.",
      "cta.eyebrow":"Build What’s Next.","cta.h2":"Let's Build<br>Intelligent Systems<br>Together.","cta.p":"Discover how Qeonix can help your organization deploy AI, robotics, and connected systems across real-world operations","cta.btn":"Start the Conversation",
      "cta.form.name":"Full name","cta.form.email":"Email address","cta.form.phone":"Phone number","cta.form.company":"Company / Organization","cta.form.industry":"Industry","cta.form.industryph":"Select your industry","cta.form.gov":"Government & Public Sector","cta.form.other":"Other","cta.form.msg":"How can we help?","cta.form.msgph":"Tell us briefly about your project or challenge…","cta.form.send":"Discuss Your Project","cta.form.privacy":"We’ll only use your details to respond to your enquiry.","cta.form.okh":"Thank you — message received.","cta.form.okp":"Our team will get back to you shortly.",
      "ft.brand":"Bringing the physical and digital worlds together to create smarter, more responsive systems for governments, organizations, and cities.",
      "ft.explore":"Explore","ft.cap":"Capabilities","ft.contact":"Contact","ft.faq":"FAQs",
      "ft.copy":'© <span id="yr"></span> QEONIX. All rights reserved.',"ft.tag":"Intelligence, Innovation, Impact."
    },
    ar: {
      "meta.title":"كيونكس — عِش الغد، اليوم.",
      "meta.desc":"تُوحّد كيونكس بين العالمين المادي والرقمي لبناء أنظمة أذكى وأكثر استجابة للحكومات والمؤسسات والمدن. الذكاء الاصطناعي · الروبوتات · المدن الذكية · تقنيات المستقبل.",
      "nav.solutions":"الحلول","nav.industries":"القطاعات","nav.approach":"منهجيتنا","nav.why":"لماذا كيونكس","nav.contact":"تواصل معنا",
      "hero.eyebrow":"الذكاء الاصطناعي · الأنظمة ذاتية التشغيل · البيئات الذكية",
      "hero.h1":'عِش<br><span class="accent">الغد،</span><br>اليوم.',
      "hero.lead":"نُوحّد بين العالمين المادي والرقمي لبناء أنظمة أذكى وأكثر استجابة للحكومات والمؤسسات والمدن.",
      "hero.cta1":"استكشف قدراتنا","hero.cta2":"كيف نعمل","hero.scroll":"مرّر للأسفل",
      "mq1":"الذكاء الاصطناعي","mq2":"الذكاء التوليدي والوكيل","mq3":"الروبوتات","mq4":"تقنية الطائرات المسيّرة","mq5":"المدن الذكية","mq6":"إنترنت الأشياء","mq7":"التنقل المتصل","mq8":"البيانات والتحليلات","mq9":"البنية التحتية المتصلة",
      "who.eyebrow":"من نحن",
      "who.h2":"نُهندس أنظمة ذكية لعالم الغد.",
      "who.lead":"تعمل كيونكس مع الحكومات والمؤسسات لتحويل التقنيات الناشئة إلى أنظمة عملية وآمنة وقابلة للتوسّع، مصمّمة للأداء في الواقع. من الذكاء الاصطناعي والروبوتات إلى البنية التحتية للمدن الذكية، نُصمّم ونُهندس وننشر حلولًا يمكن للمؤسسات الاعتماد عليها.",
      "who.f1k":"المقر الرئيسي","who.f1v":"أبوظبي، الإمارات","who.f2k":"مصمّمة لـ","who.f2v":"العمليات الواقعية","who.f3k":"مبنية لـ","who.f3v":"الأداء والتوسّع والتطوّر","who.tag":"الذكاء في حركة",
      "sol.eyebrow":"حلولنا","sol.h2":"ثلاث طرق نُدخل بها الذكاء إلى التشغيل.",
      "sol.ai.h":"الذكاء والذكاء الاصطناعي","sol.ai.p":"نُحوّل المعلومات المتفرقة إلى قرارات واضحة وسير عمل آلي ورؤى تشغيلية قابلة للتنفيذ.","sol.ai.1":"الذكاء الاصطناعي","sol.ai.2":"الذكاء التوليدي والوكيل","sol.ai.3":"البيانات والتحليلات",
      "sol.auto.h":"الأنظمة ذاتية التشغيل","sol.auto.p":"نُدخل الذكاء إلى العمليات المادية عبر الروبوتات والطائرات المسيّرة وأنظمة التنقل المتصل.",
      "sol.env.h":"البيئات الذكية","sol.env.p":"نربط البنية التحتية والخدمات والأنظمة التشغيلية لتحسين الوضوح والتنسيق والاستجابة عبر المدن والبيئات واسعة النطاق.","sol.env.t1":"المدن الذكية","sol.env.t2":"إنترنت الأشياء","sol.env.t3":"البنية التحتية المتصلة",
      "sol.gen.h":"الذكاء التوليدي والوكيل","sol.gen.p":"ننشر وكلاء أذكياء يدعمون الفرق وينسّقون المهام وينفّذون سير العمل المعقّد.",
      "sol.rob.h":"الروبوتات وتقنية الطائرات المسيّرة","sol.rob.p":"نُحسّن الدقة والسلامة والوصول التشغيلي في البيئات الصناعية والتجارية والتي يصعب الوصول إليها.",
      "sol.mob.h":"التنقل المتصل","sol.mob.p":"نُحسّن تنسيق وحركة الأشخاص والمركبات والأساطيل والبضائع عبر أنظمة نقل متصلة.",
      "ap.eyebrow":"منهجيتنا","ap.h2":"من التحدّي المعقّد إلى قدرة تشغيلية.","ap.lead":"يبدأ كل مشروع بفهم البيئة التي يجب أن تعمل فيها التقنية. نُوائم التصميم التقني مع المتطلبات التشغيلية والأنظمة القائمة والأشخاص الذين سيستخدمون الحل.",
      "ap.s1h":"الفهم","ap.s1p":"تحديد التحدّي وسياق التشغيل والأولويات ومقاييس النجاح.",
      "ap.s2h":"التصميم","ap.s2p":"صياغة بنية الحل وتجربته واتجاهه التقني.",
      "ap.s3h":"الهندسة","ap.s3p":"بناء التقنيات والمنصّات والأنظمة المطلوبة.",
      "ap.s4h":"التكامل","ap.s4p":"ربط الحل بالبنية التحتية والعمليات القائمة.",
      "ap.s5h":"النشر","ap.s5p":"التنفيذ والتحقّق وتهيئة الحل للاستخدام الفعلي.",
      "ap.s6h":"التطوّر","ap.s6p":"تحسين الأداء وتوسيع الحل مع تغيّر الاحتياجات.",
      "ind.eyebrow":"القطاعات التي نخدمها","ind.h2":"مبنية للقطاعات التي تصنع المستقبل.","ind.lead":"تُطبّق كيونكس الذكاء والأتمتة والأنظمة المتصلة حيث يكون الأداء والسلامة والتحكّم التشغيلي في أمسّ الأهمية.",
      "ind.c1h":"النقل والتنقل","ind.c1p":"أنظمة ذكية للشبكات والأساطيل والمركبات والأشخاص والبضائع.",
      "ind.c2h":"الطاقة والمرافق","ind.c2p":"مراقبة وإدارة وتحسين للبنية التحتية الحيوية.",
      "ind.c3h":"الصناعة والتصنيع","ind.c3p":"أتمتة وروبوتات لرفع الإنتاجية والدقة والسلامة.",
      "ind.c4h":"اللوجستيات وسلاسل الإمداد","ind.c4p":"وضوح وتحكّم عبر الأصول والمستودعات والتوزيع.",
      "ind.c5h":"الطيران والفضاء","ind.c5p":"حلول ذكية وذاتية التشغيل للعمليات والبنية التحتية.",
      "ind.c6h":"البناء والبنية التحتية","ind.c6p":"مراقبة مشاريع متصلة وإدارة أصول وأداء.",
      "ind.c7h":"الرعاية الصحية","ind.c7p":"منصّات ذكية تدعم عمليات كفؤة ومبنية على المعرفة.",
      "ind.c8h":"العقارات والتطوير العمراني","ind.c8p":"مبانٍ ومجتمعات وبيئات حضرية أكثر ذكاءً.",
      "why.eyebrow":"لماذا كيونكس","why.h2":"مصمّمة لتعمل خارج إطار العرض التجريبي.","why.lead":"نجمع بين عمق الهندسة والقدرات المتصلة والفهم الإقليمي لبناء أنظمة تعمل في بيئات تشغيل حقيقية وتتوسّع مع تغيّر الاحتياجات.",
      "why.p1h":"عمق هندسي","why.p1p":"بنية متينة وهندسة منضبطة وأداء موثوق من التصميم حتى النشر.",
      "why.p2h":"قدرات متصلة","why.p2p":"الذكاء الاصطناعي والأنظمة ذاتية التشغيل والبنية التحتية ضمن منهج متكامل واحد.",
      "why.p3h":"تصميم واقعي","why.p3p":"حلول مصمّمة حول ظروف التشغيل الفعلية والأنظمة القائمة والأشخاص الذين يستخدمونها.",
      "why.p4h":"آمنة وقابلة للتوسّع","why.p4p":"تقنية مبنية للعمليات المتطلّبة والاعتماد طويل الأمد والتوسّع المستقبلي.",
      "why.p5h":"فهم إقليمي","why.p5p":"فريق مقرّه الإمارات يمتلك فهمًا واضحًا للأولويات وبيئات التشغيل الإقليمية.",
      "why.p6h":"تركيز على النتائج","why.p6p":"كل حل يُطوّر حول النتيجة العملية التي يجب أن يحقّقها.",
      "faq.eyebrow":"الأسئلة الشائعة","faq.h2":"إجابات<br>على أسئلتك.",
      "faq.q1":"أين يقع مقر كيونكس؟","faq.a1":"مقرّنا الرئيسي في أبوظبي، الإمارات، ونعمل مع الحكومات والمؤسسات في المنطقة وخارجها، مع فهم واضح للأولويات وبيئات التشغيل الإقليمية.",
      "faq.q2":"ماذا تبني كيونكس فعليًا؟","faq.a2":"الذكاء الاصطناعي والتحليلات، والأنظمة ذاتية التشغيل مثل الروبوتات والطائرات المسيّرة، والبنية التحتية الذكية المتصلة، نقدّمها كأنظمة متكاملة وواقعية لا كأدوات منفصلة.",
      "faq.q3":"هل تعملون مع أنظمتنا الحالية؟","faq.a3":"نعم. يُصمّم كل حل حول بنيتك التحتية القائمة وظروف التشغيل والأشخاص الذين يستخدمونها، ليتلاءم مع واقع عملياتك.",
      "faq.q4":"كيف تتعاملون مع الأمان والتوسّع؟","faq.a4":"أنظمتنا مُهندَسة للعمليات المتطلّبة والاعتماد طويل الأمد والتوسّع المستقبلي. يُدمج الأمان وقابلية التوسّع منذ التصميم وحتى النشر.",
      "faq.q5":"ما القطاعات التي تخدمونها؟","faq.a5":"النقل والتنقل، والطاقة والمرافق، والصناعة والتصنيع، واللوجستيات، والطيران والفضاء، والبناء، والرعاية الصحية، والعقارات والتطوير العمراني.",
      "faq.q6":"كيف نبدأ؟","faq.a6":"يبدأ الأمر بمحادثة استكشافية قصيرة لرسم واقع عملياتك وتحديد النتيجة التي تحتاجها. ومن هناك، نُصمّم ونُهندس وننشر.",
      "cta.eyebrow":"ابنِ ما هو قادم.","cta.h2":"لنبنِ<br>أنظمة ذكية<br>معًا.","cta.p":"اكتشف كيف يمكن لكيونكس مساعدة مؤسستك على نشر الذكاء الاصطناعي والروبوتات والأنظمة المتصلة عبر العمليات الواقعية.","cta.btn":"ابدأ المحادثة",
      "cta.form.name":"الاسم الكامل","cta.form.email":"البريد الإلكتروني","cta.form.phone":"رقم الهاتف","cta.form.company":"الشركة / المؤسسة","cta.form.industry":"القطاع","cta.form.industryph":"اختر قطاعك","cta.form.gov":"الحكومة والقطاع العام","cta.form.other":"أخرى","cta.form.msg":"كيف يمكننا المساعدة؟","cta.form.msgph":"أخبرنا باختصار عن مشروعك أو التحدّي الذي تواجهه…","cta.form.send":"ناقش مشروعك","cta.form.privacy":"سنستخدم بياناتك فقط للرد على استفسارك.","cta.form.okh":"شكرًا لك — تم استلام رسالتك.","cta.form.okp":"سيتواصل معك فريقنا قريبًا.",
      "ft.brand":"نُوحّد بين العالمين المادي والرقمي لبناء أنظمة أذكى وأكثر استجابة للحكومات والمؤسسات والمدن.",
      "ft.explore":"استكشف","ft.cap":"القدرات","ft.contact":"تواصل","ft.faq":"الأسئلة الشائعة",
      "ft.copy":'© <span id="yr"></span> كيونكس. جميع الحقوق محفوظة.',"ft.tag":"الذكاء، الابتكار، الأثر."
    }
  };

  function applyLang(lang){
    if(!I18N[lang]) lang = "en";
    var dict = I18N[lang], doc = document.documentElement;
    doc.lang = lang; doc.dir = (lang === "ar") ? "rtl" : "ltr";
    document.querySelectorAll("[data-i18n]").forEach(function(el){
      var k = el.getAttribute("data-i18n");
      if(dict[k] != null) el.textContent = dict[k];
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function(el){
      var k = el.getAttribute("data-i18n-html");
      if(dict[k] != null) el.innerHTML = dict[k];
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(function(el){
      var k = el.getAttribute("data-i18n-ph");
      if(dict[k] != null) el.setAttribute("placeholder", dict[k]);
    });
    if(dict["meta.title"]) document.title = dict["meta.title"];
    var md = document.querySelector('meta[name="description"]');
    if(md && dict["meta.desc"]) md.setAttribute("content", dict["meta.desc"]);
    var tg = document.getElementById("langToggle");
    if(tg){ tg.textContent = (lang === "ar") ? "EN" : "عربي"; tg.setAttribute("lang", lang === "ar" ? "en" : "ar"); }
    var yr = document.getElementById("yr");
    if(yr) yr.textContent = new Date().getFullYear();
    try{ localStorage.setItem("qx-lang", lang); }catch(e){}
  }

  // Language switching temporarily disabled — force English regardless of any saved preference.
  applyLang("en");

  var langToggle = document.getElementById("langToggle");
  if(langToggle){
    // Toggle button left visible but inert for now. To re-enable Arabic,
    // restore the click handler below (and the saved-language load above).
    /*
    langToggle.addEventListener("click", function(){
      var next = (document.documentElement.lang === "ar") ? "en" : "ar";
      applyLang(next);
      // any open FAQ answers need their pinned height recalculated after text swap
      document.querySelectorAll(".faq-item.open .faq-a").forEach(function(a){
        a.style.maxHeight = a.scrollHeight + "px";
      });
    });
    */
  }

  /* ---- Nav scroll state ---- */
  var nav = document.getElementById("nav");
  function onScroll(){ nav.classList.toggle("scrolled", window.scrollY > 24); }
  onScroll(); window.addEventListener("scroll", onScroll, {passive:true});

  /* ---- Mobile menu ---- */
  var toggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");
  toggle.addEventListener("click", function(){
    var open = document.body.classList.toggle("menu-open");
    toggle.setAttribute("aria-expanded", open ? "true":"false");
  });
  navLinks.addEventListener("click", function(e){
    if(e.target.tagName === "A"){ document.body.classList.remove("menu-open"); toggle.setAttribute("aria-expanded","false"); }
  });

  /* ---- Reveal on scroll ---- */
  var reveals = document.querySelectorAll(".reveal");
  if(reduce || !("IntersectionObserver" in window)){
    reveals.forEach(function(el){ el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); } });
    }, {threshold:.14, rootMargin:"0px 0px -8% 0px"});
    reveals.forEach(function(el){ io.observe(el); });
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll(".faq-q").forEach(function(btn){
    btn.addEventListener("click", function(){
      var item = btn.parentElement;
      var ans = item.querySelector(".faq-a");
      var open = item.classList.toggle("open");
      ans.style.maxHeight = open ? ans.scrollHeight + "px" : 0;
    });
  });

  /* ---- Hero particle field (dot matrix that connects) ---- */
  var canvas = document.getElementById("field");
  if(canvas && !reduce){
    var ctx = canvas.getContext("2d");
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W, H, pts, mouse = {x:-999,y:-999};
    function size(){
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = W*dpr; canvas.height = H*dpr; ctx.setTransform(dpr,0,0,dpr,0,0);
      var density = Math.min(Math.max((W*H)/16000, 36), 110);
      pts = [];
      for(var i=0;i<density;i++){
        pts.push({x:Math.random()*W, y:Math.random()*H, vx:(Math.random()-.5)*.25, vy:(Math.random()-.5)*.25});
      }
    }
    function draw(){
      ctx.clearRect(0,0,W,H);
      for(var i=0;i<pts.length;i++){
        var p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if(p.x<0||p.x>W) p.vx*=-1;
        if(p.y<0||p.y>H) p.vy*=-1;
        // connect to mouse
        var dmx = p.x-mouse.x, dmy = p.y-mouse.y, dm = Math.sqrt(dmx*dmx+dmy*dmy);
        if(dm<150){ ctx.strokeStyle="rgba(2,6,219,"+(0.18*(1-dm/150))+")"; ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(mouse.x,mouse.y); ctx.stroke(); }
        for(var j=i+1;j<pts.length;j++){
          var q=pts[j], dx=p.x-q.x, dy=p.y-q.y, d=Math.sqrt(dx*dx+dy*dy);
          if(d<118){ ctx.strokeStyle="rgba(17,17,16,"+(0.06*(1-d/118))+")"; ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y); ctx.stroke(); }
        }
        ctx.fillStyle = (i%7===0) ? "rgba(2,6,219,.55)" : "rgba(17,17,16,.28)";
        ctx.beginPath(); ctx.arc(p.x,p.y,(i%7===0)?2:1.4,0,6.283); ctx.fill();
      }
      requestAnimationFrame(draw);
    }
    var hero = canvas.closest(".hero");
    var figure = document.querySelector(".hero-figure");
    hero.addEventListener("mousemove", function(e){
      var r=canvas.getBoundingClientRect(); mouse.x=e.clientX-r.left; mouse.y=e.clientY-r.top;
      if(figure){ var nx=(e.clientX/window.innerWidth-.5), ny=(e.clientY/window.innerHeight-.5);
        figure.style.transform="translate("+(nx*-20)+"px,"+(ny*-14)+"px)"; }
    });
    hero.addEventListener("mouseleave", function(){ mouse.x=-999; mouse.y=-999; if(figure) figure.style.transform=""; });
    window.addEventListener("resize", size);
    size(); draw();
  }
})();

/* ---- Contact form: forward to Zoho Flow (CRM) + Netlify Forms record ----
   Both destinations are attempted on every submit. The Zoho Flow forward goes
   through the serverless proxy (/.netlify/functions/zoho-lead) so the webhook
   URL stays server-side. Success fires if EITHER destination accepts the lead,
   so the visitor is never shown an error as long as the lead was captured
   somewhere; only if both fail do we surface the error. */
(function(){
  var form = document.querySelector(".cta-form");
  if(!form) return;
  form.addEventListener("submit", function(e){
    e.preventDefault();
    if(!form.reportValidity()) return;
    var btn = form.querySelector(".cta-submit");
    if(btn) btn.disabled = true;

    var fd = new FormData(form);
    var netlifyBody = new URLSearchParams(fd).toString();
    var lead = {};
    fd.forEach(function(value, key){ lead[key] = value; });

    // CRM delivery via Zoho Flow proxy.
    var crm = fetch("/.netlify/functions/zoho-lead", {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(lead)})
      .then(function(res){ if(!res.ok){ console.warn("Zoho Flow forward failed:", res.status); throw new Error("zoho "+res.status); } return "zoho"; });

    // Backup record in Netlify Forms.
    var record = fetch("/", {method:"POST", headers:{"Content-Type":"application/x-www-form-urlencoded"}, body:netlifyBody})
      .then(function(res){ if(!res.ok){ console.warn("Netlify Forms record failed:", res.status); throw new Error("netlify "+res.status); } return "netlify"; });

    // Success if either destination accepts the lead; error only if both fail.
    Promise.any([crm, record])
      .then(function(){
        form.classList.add("sent");
        form.scrollIntoView({behavior:"smooth", block:"center"});
      })
      .catch(function(){
        if(btn) btn.disabled = false;
        alert("Sorry, something went wrong. Please email info@qeonix.com");
      });
  });
})();
