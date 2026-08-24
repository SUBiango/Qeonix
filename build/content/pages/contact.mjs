import { T, tx, esc } from "../../lib/html.mjs";
import { icon } from "../../lib/icons.mjs";
import { section, secHead } from "../../lib/components.mjs";
import { heroFor } from "../../lib/page.mjs";
import { officeList } from "../../lib/layout.mjs";
import { BRAND } from "../site.mjs";

const LABEL = T("Contact", "تواصل معنا");

const HCAPTCHA_SITEKEY = "c3b84774-320a-413c-bd02-7b4e32eeefe2";

const INTENTS = [
  { v: "strategic", label: T("Discuss a strategic initiative", "مناقشة مبادرة استراتيجية") },
  { v: "partnership", label: T("Explore a technology partnership", "استكشاف شراكة تقنية") },
  { v: "careers", label: T("Careers", "الوظائف") },
  { v: "other", label: T("Something else", "أمر آخر") },
];

const INDUSTRIES = [
  T("Government & Public Sector", "الحكومة والقطاع العام"),
  T("Smart Cities & Urban Operations", "المدن الذكية والعمليات الحضرية"),
  T("Transportation & Mobility", "النقل والتنقل"),
  T("Energy & Utilities", "الطاقة والمرافق"),
  T("Industrial & Manufacturing", "الصناعة والتصنيع"),
  T("Logistics & Supply Chain", "اللوجستيات وسلاسل الإمداد"),
  T("Aviation & Aerospace", "الطيران والفضاء"),
  T("Healthcare", "الرعاية الصحية"),
  T("Real Estate & Urban Development", "العقارات والتطوير العمراني"),
  T("Other", "أخرى"),
];

function form(lang) {
  const ar = lang === "ar";
  const S = {
    name: T("Full name", "الاسم الكامل"),
    email: T("Work email", "البريد الإلكتروني للعمل"),
    phone: T("Phone (optional)", "الهاتف (اختياري)"),
    company: T("Organisation", "الجهة / المؤسسة"),
    industry: T("Sector", "القطاع"),
    industryPh: T("Select your sector", "اختر قطاعك"),
    msg: T("What has to work?", "ما الذي يجب أن يعمل؟"),
    msgPh: T("The operating reality, the constraint, the outcome you need…", "واقع التشغيل، والقيد، والنتيجة التي تحتاجها…"),
    send: T("Send it to the team", "أرسلها إلى الفريق"),
    privacy: T("We use your details only to respond to this enquiry.", "نستخدم بياناتك للرد على هذا الاستفسار فقط."),
    okH: T("Received. Thank you.", "وصلت. شكرًا لك."),
    okP: T("A member of the team — not an autoresponder — will come back to you shortly.", "سيعاود التواصل معك أحد أعضاء الفريق — لا ردّ آلي — قريبًا."),
    intent: T("What brings you here?", "ما الذي جاء بك إلينا؟"),
    err: T("This field is required.", "هذا الحقل مطلوب."),
    captchaMsg: T("Please complete the verification.", "يرجى إكمال خطوة التحقّق."),
    errorMsg: T("Something went wrong. Please email info@qeonix.com.", "حدث خطأ ما. يرجى مراسلتنا على info@qeonix.com."),
  };

  return `
<form class="formwrap" id="leadForm" name="contact" method="POST" action="/"
      data-netlify="true" netlify-honeypot="bot-field" novalidate
      data-msg-captcha="${tx(S.captchaMsg, lang)}" data-msg-error="${tx(S.errorMsg, lang)}">
  <input type="hidden" name="form-name" value="contact">
  <input type="hidden" name="language" value="${lang}">
  <p class="hp" aria-hidden="true"><label>Leave this field empty <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>

  <div class="form-body">
    <fieldset class="field">
      <legend class="legend">${tx(S.intent, lang)}</legend>
      <div class="intent">
        ${INTENTS.map((it, i) => `
          <input type="radio" id="intent-${it.v}" name="intent" value="${it.v}"${i === 0 ? " checked" : ""}>
          <label for="intent-${it.v}">${tx(it.label, lang)}</label>
        `).join("")}
      </div>
    </fieldset>

    <div class="field-row">
      <div class="field">
        <label for="cf-name">${tx(S.name, lang)} <span class="req" aria-hidden="true">*</span></label>
        <input id="cf-name" name="name" type="text" autocomplete="name" required>
        <p class="field-err">${tx(S.err, lang)}</p>
      </div>
      <div class="field">
        <label for="cf-email">${tx(S.email, lang)} <span class="req" aria-hidden="true">*</span></label>
        <input id="cf-email" name="email" type="email" autocomplete="email" required>
        <p class="field-err">${tx(S.err, lang)}</p>
      </div>
    </div>

    <div class="field-row">
      <div class="field">
        <label for="cf-phone">${tx(S.phone, lang)}</label>
        <input id="cf-phone" name="phone" type="tel" autocomplete="tel">
        <p class="field-err">${tx(S.err, lang)}</p>
      </div>
      <div class="field">
        <label for="cf-company">${tx(S.company, lang)}</label>
        <input id="cf-company" name="company" type="text" autocomplete="organization">
        <p class="field-err">${tx(S.err, lang)}</p>
      </div>
    </div>

    <div class="field">
      <label for="cf-industry">${tx(S.industry, lang)} <span class="req" aria-hidden="true">*</span></label>
      <select id="cf-industry" name="industry" required>
        <option value="" disabled selected>${tx(S.industryPh, lang)}</option>
        ${INDUSTRIES.map((o) => `<option value="${esc(o.en)}">${tx(o, lang)}</option>`).join("")}
      </select>
      <p class="field-err">${tx(S.err, lang)}</p>
    </div>

    <div class="field">
      <label for="cf-msg">${tx(S.msg, lang)} <span class="req" aria-hidden="true">*</span></label>
      <textarea id="cf-msg" name="message" rows="4" required placeholder="${tx(S.msgPh, lang)}"></textarea>
      <p class="field-err">${tx(S.err, lang)}</p>
    </div>

    <div class="field form-captcha" data-sitekey="${HCAPTCHA_SITEKEY}"></div>

    <button type="submit" class="btn btn-primary btn-lg form-submit">
      <span>${tx(S.send, lang)}</span>
      <span class="spin" aria-hidden="true"></span>
      <span class="btn-arr" aria-hidden="true">${icon("arrow")}</span>
    </button>
    <p class="form-status" aria-live="polite"></p>
    <p class="form-note">${tx(S.privacy, lang)}</p>
  </div>

  <div class="form-done" aria-live="polite">
    ${icon("check")}
    <h3>${tx(S.okH, lang)}</h3>
    <p>${tx(S.okP, lang)}</p>
  </div>
</form>`;
}

export default function contact(lang) {
  const ar = lang === "ar";
  const hero = heroFor({
    route: "contact",
    label: LABEL,
    kicker: T("Start a conversation", "ابدأ محادثة"),
    h: T("Tell us what|has to work.", "أخبرنا بما|يجب أن يعمل."),
    lead: T(
      "The operating reality, the constraints, the outcome you need. We will come back with questions worth answering and an architecture worth reading — not a brochure.",
      "واقع التشغيل والقيود والنتيجة المطلوبة. سنعود إليك بأسئلة تستحق الإجابة وبنية تستحق القراءة — لا بكتيّب تعريفي."
    ),
  }, lang);

  const body = `
${hero.html}

${section(`
  <div class="contact-grid">
    <div class="contact-aside reveal">
      <h2 class="h3">${ar ? "قنوات مباشرة" : "Direct lines"}</h2>
      <div class="contact-lines">
        <p class="contact-line">
          <span class="mono">${ar ? "البريد الإلكتروني" : "Email"}</span>
          <a href="mailto:${BRAND.email}">${BRAND.email}</a>
        </p>
        <p class="contact-line">
          <span class="mono">${ar ? "المقر الرئيسي" : "Headquarters"}</span>
          <span>${tx(BRAND.hq, lang)}</span>
        </p>
      </div>
      <div class="u-mt">
        <h3 class="mono">${ar ? "المكاتب" : "Offices"}</h3>
        <div class="u-mt-s">${officeList(lang)}</div>
      </div>
    </div>
    <div class="reveal" data-d="1">
      ${form(lang)}
    </div>
  </div>
`, { tone: "light" })}
`;

  return {
    route: "contact",
    solidHeader: true,
    hideCta: true,
    crumbTrail: hero.crumbTrail,
    title: T(
      "Contact Qeonix — Start a Conversation",
      "تواصل مع كيونكس — ابدأ محادثة"
    ),
    description: T(
      "Talk to Qeonix about a strategic initiative, a technology partnership or a role. Headquartered in Abu Dhabi with a presence in Paris; Muscat and Doha in progress.",
      "تحدّث إلى كيونكس بشأن مبادرة استراتيجية أو شراكة تقنية أو وظيفة. المقر الرئيسي في أبوظبي مع حضور في باريس؛ ومسقط والدوحة قيد التأسيس."
    ),
    og: "contact",
    body,
  };
}
