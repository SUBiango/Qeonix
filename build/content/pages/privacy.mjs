import { T, tx } from "../../lib/html.mjs";
import { section, secHead } from "../../lib/components.mjs";
import { heroFor } from "../../lib/page.mjs";
import { BRAND } from "../site.mjs";

const LABEL = T("Privacy", "الخصوصية");

/* Plain prose blocks. Everything stated here is verifiable from the codebase:
   no cookies, no analytics, form data to Netlify Forms + the Zoho Flow proxy,
   hCaptcha loaded only on form interaction. Keep it that way: if the stack
   changes, this page changes in the same commit. */
const BLOCKS = [
  {
    h: T("What this site does not do", "ما لا يفعله هذا الموقع"),
    ps: [
      T("This website sets no cookies. It runs no analytics, no advertising trackers and no fingerprinting of any kind. Browsing it leaves no profile of you with us or with anyone else.",
        "لا يضع هذا الموقع أي ملفات تعريف ارتباط، ولا يشغّل أي أدوات تحليلات أو تتبّع إعلاني أو بصمة رقمية من أي نوع. تصفّحك له لا يترك أي ملف تعريفي عنك لدينا أو لدى أي طرف آخر."),
      T("The only third-party resources the site loads while you browse are fonts served by Google Fonts, which involves your browser requesting font files from Google's servers. No personal information is sent with those requests beyond what any web request carries.",
        "الموارد الخارجية الوحيدة التي يحمّلها الموقع أثناء التصفّح هي الخطوط المقدَّمة من Google Fonts، ويعني ذلك أن متصفحك يطلب ملفات الخطوط من خوادم Google. ولا تُرسل مع تلك الطلبات أي معلومات شخصية تتجاوز ما يحمله أي طلب ويب."),
    ],
  },
  {
    h: T("What we collect, and when", "ما الذي نجمعه، ومتى"),
    ps: [
      T("We collect personal information in exactly one place: the contact form. If you submit it, we receive what you typed: your name, work email, optional phone number, organization, sector, the nature of your inquiry and your message.",
        "نجمع المعلومات الشخصية في موضع واحد فقط: نموذج التواصل. فإذا أرسلته، نتلقّى ما كتبته: اسمك وبريدك الإلكتروني للعمل ورقم هاتفك (اختياري) وجهتك وقطاعك وطبيعة استفسارك ورسالتك."),
      T("Our hosting provider also keeps standard, short-lived technical logs (such as IP addresses) for security and abuse prevention, as effectively every website's infrastructure does.",
        "كما يحتفظ مزوّد الاستضافة لدينا بسجلّات تقنية قياسية قصيرة الأمد (مثل عناوين IP) لأغراض الأمن ومنع إساءة الاستخدام، شأن البنية التحتية لأي موقع تقريبًا."),
    ],
  },
  {
    h: T("What we do with it", "ماذا نفعل بها"),
    ps: [
      T("We use your details for one purpose: responding to your inquiry and, where it leads somewhere, conducting the business relationship that follows. We do not sell personal information, share it for marketing, or add you to mailing lists you did not ask for.",
        "نستخدم بياناتك لغرض واحد: الرد على استفسارك، وإدارة العلاقة المهنية التي قد تنشأ عنه. ولا نبيع المعلومات الشخصية، ولا نشاركها لأغراض تسويقية، ولا نضيفك إلى قوائم بريدية لم تطلبها."),
    ],
  },
  {
    h: T("Who processes it for us", "من يعالجها نيابةً عنا"),
    ps: [
      T("Form submissions are handled by two service providers acting on our behalf: our website host (Netlify), which receives the submission, and our workflow provider (Zoho), which delivers it into our CRM. The form is protected against automated abuse by hCaptcha, which loads only if you interact with the form and operates under its own privacy policy.",
        "تُعالج بيانات النموذج بواسطة مزوّدَي خدمة يعملان نيابةً عنا: مستضيف الموقع (Netlify) الذي يتلقّى الإرسال، ومزوّد سير العمل (Zoho) الذي يوصله إلى نظام إدارة علاقات العملاء لدينا. ويحمي النموذجَ من إساءة الاستخدام الآلي نظام hCaptcha، الذي لا يُحمَّل إلا عند تفاعلك مع النموذج ويعمل وفق سياسة الخصوصية الخاصة به."),
      T("These providers may process data on infrastructure located outside the United Arab Emirates. We share with them only what the form contains, and only for the purposes described above.",
        "قد يعالج هذان المزوّدان البيانات على بنية تحتية تقع خارج دولة الإمارات العربية المتحدة. ولا نشارك معهما سوى ما يحتويه النموذج، وللأغراض الموضّحة أعلاه فقط."),
    ],
  },
  {
    h: T("How long we keep it", "مدة الاحتفاظ"),
    ps: [
      T("Inquiry data is kept for as long as it is needed to handle your inquiry and any business relationship that follows, and is deleted when it no longer serves that purpose.",
        "نحتفظ ببيانات الاستفسار ما دامت لازمة لمعالجته ولأي علاقة عمل تنشأ عنه، وتُحذف حين لا تعود تخدم هذا الغرض."),
    ],
  },
  {
    h: T("Your choices", "خياراتك"),
    ps: [
      T("You can ask us at any time what personal information we hold about you, ask us to correct it, or ask us to delete it. Write to us at the address below and we will respond promptly. Nothing about using this website requires an account, a login or any standing data relationship with us.",
        "يمكنك في أي وقت أن تسألنا عن المعلومات الشخصية التي نحتفظ بها عنك، أو تطلب تصحيحها أو حذفها. راسلنا على العنوان أدناه وسنرد سريعًا. ولا يتطلّب استخدام هذا الموقع أي حساب أو تسجيل دخول أو علاقة بيانات دائمة معنا."),
    ],
  },
  {
    h: T("Who we are, and where", "من نحن، وأين"),
    ps: [
      T("The controller of this website is QEONIX, headquartered in Abu Dhabi, United Arab Emirates. For anything relating to privacy or your personal information, contact info@qeonix.com.",
        "الجهة المسؤولة عن هذا الموقع هي كيونيكس، ومقرّها الرئيسي في أبوظبي بدولة الإمارات العربية المتحدة. ولأي أمر يتعلّق بالخصوصية أو معلوماتك الشخصية، تواصل معنا على info@qeonix.com."),
      T("If our practices change, for example if we ever introduce analytics, this page will change first, and the date below will move.",
        "إذا تغيّرت ممارساتنا، كأن نُدخل يومًا أدوات تحليلات، فستتغيّر هذه الصفحة أولًا، وسيتحدّث التاريخ أدناه."),
    ],
  },
];

export default function privacy(lang) {
  const ar = lang === "ar";
  const hero = heroFor({
    route: "privacy",
    label: LABEL,
    kicker: T("Privacy notice", "إشعار الخصوصية"),
    h: T("Short, because there is|little to disclose.", "قصير، لأن ما يستدعي الإفصاح|قليل."),
    lead: T(
      "We build systems that treat data seriously, so this site practices what we sell: no cookies, no trackers, and personal information collected in exactly one place, the contact form, if you choose to use it.",
      "نبني أنظمة تتعامل مع البيانات بجدّية، ولذلك يطبّق هذا الموقع ما نقدّمه لعملائنا: لا ملفات تعريف ارتباط، ولا متتبّعات، ولا معلومات شخصية تُجمع إلا في موضع واحد، نموذج التواصل، إن اخترت استخدامه."),
  }, lang);

  const body = `
${hero.html}

${section(`
  <div class="u-narrow prose">
    ${BLOCKS.map((b, i) => `
      <section class="prose-block reveal"${i ? "" : ' data-d="1"'}>
        <h2 class="h3">${tx(b.h, lang)}</h2>
        ${b.ps.map((p) => `<p>${tx(p, lang)}</p>`).join("")}
      </section>`).join("")}
    <p class="mono prose-date reveal">${ar ? "آخر تحديث: أغسطس 2026" : "Last updated: August 2026"}</p>
  </div>
`, { tone: "light" })}
`;

  return {
    route: "privacy",
    solidHeader: true,
    hideCta: true,
    crumbTrail: hero.crumbTrail,
    title: T("Privacy Notice | Qeonix", "إشعار الخصوصية | كيونيكس"),
    description: T(
      "How the Qeonix website handles personal information: no cookies, no analytics, no trackers, data is collected only through the contact form and used solely to respond to your inquiry.",
      "كيف يتعامل موقع كيونيكس مع المعلومات الشخصية: لا ملفات تعريف ارتباط ولا تحليلات ولا متتبّعات، تُجمع البيانات عبر نموذج التواصل فقط وتُستخدم حصرًا للرد على استفسارك."
    ),
    og: "default",
    body,
  };
}
