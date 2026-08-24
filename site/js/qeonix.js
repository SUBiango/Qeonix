/* ==========================================================================
   QEONIX — behaviour
   Vanilla, deferred, no dependencies. Every feature degrades safely: with
   scripting off the page is fully readable and every FAQ answer is expanded.
   ========================================================================== */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  var mqDrawer = window.matchMedia("(max-width: 1040px)");
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ------------------------------------------------------------ header */
  (function header() {
    var hdr = $("#hdr");
    if (!hdr) return;
    var solid = hdr.dataset.solid === "true";
    var ticking = false;

    function apply() {
      hdr.classList.toggle("is-solid", solid || window.scrollY > 12);
      ticking = false;
    }
    apply();
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(apply); }
    }, { passive: true });
  })();

  /* ------------------------------------------- nav: drawer + dropdowns */
  (function nav() {
    var burger = $("#burger");
    var navEl = $("#nav");
    var scrim = $("#navScrim");
    if (!burger || !navEl) return;

    var lastFocus = null;

    function menus() { return $$(".nav-b", navEl); }

    function closeMenu(btn) {
      btn.setAttribute("aria-expanded", "false");
      var panel = document.getElementById(btn.getAttribute("aria-controls"));
      if (panel) panel.hidden = true;
    }
    function openMenu(btn) {
      menus().forEach(function (b) { if (b !== btn) closeMenu(b); });
      btn.setAttribute("aria-expanded", "true");
      var panel = document.getElementById(btn.getAttribute("aria-controls"));
      if (panel) panel.hidden = false;
    }
    function closeAllMenus() { menus().forEach(closeMenu); }

    menus().forEach(function (btn) {
      btn.addEventListener("click", function () {
        var open = btn.getAttribute("aria-expanded") === "true";
        if (open) closeMenu(btn); else openMenu(btn);
      });
    });

    /* Pointer affordance on desktop only, with a small close delay so the
       cursor can cross the gap between the trigger and the panel. */
    var hoverTimer;
    $$(".nav-i.has-menu", navEl).forEach(function (item) {
      item.addEventListener("mouseenter", function () {
        if (mqDrawer.matches) return;
        clearTimeout(hoverTimer);
        var btn = $(".nav-b", item);
        if (btn) openMenu(btn);
      });
      item.addEventListener("mouseleave", function () {
        if (mqDrawer.matches) return;
        hoverTimer = setTimeout(closeAllMenus, 180);
      });
    });

    document.addEventListener("click", function (e) {
      if (mqDrawer.matches) return;
      if (!e.target.closest(".nav-i.has-menu")) closeAllMenus();
    });

    /* --- drawer --- */
    function setDrawer(open) {
      document.body.classList.toggle("nav-open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
      if (scrim) {
        if (open) { scrim.hidden = false; requestAnimationFrame(function () { scrim.classList.add("in"); }); }
        else { scrim.classList.remove("in"); setTimeout(function () { scrim.hidden = true; }, 300); }
      }
      syncInert();
      if (open) {
        lastFocus = document.activeElement;
        var first = $("a, button", navEl);
        if (first) first.focus();
      } else {
        closeAllMenus();
        if (lastFocus && document.contains(lastFocus)) lastFocus.focus();
      }
    }

    /* A drawer that is translated off-screen must also leave the tab order. */
    function syncInert() {
      var hide = mqDrawer.matches && !document.body.classList.contains("nav-open");
      if ("inert" in HTMLElement.prototype) navEl.inert = hide;
      else navEl.setAttribute("aria-hidden", hide ? "true" : "false");
    }
    syncInert();
    (mqDrawer.addEventListener ? mqDrawer.addEventListener.bind(mqDrawer, "change")
      : mqDrawer.addListener.bind(mqDrawer))(function () {
        if (!mqDrawer.matches && document.body.classList.contains("nav-open")) setDrawer(false);
        closeAllMenus();
        syncInert();
      });

    burger.addEventListener("click", function () {
      setDrawer(!document.body.classList.contains("nav-open"));
    });
    if (scrim) scrim.addEventListener("click", function () { setDrawer(false); });

    navEl.addEventListener("click", function (e) {
      if (e.target.closest("a") && mqDrawer.matches) setDrawer(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      if (document.body.classList.contains("nav-open")) { setDrawer(false); return; }
      var open = menus().filter(function (b) { return b.getAttribute("aria-expanded") === "true"; });
      if (open.length) { closeAllMenus(); open[0].focus(); }
    });

    /* Keep focus inside the open drawer. */
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Tab" || !document.body.classList.contains("nav-open")) return;
      var f = $$("a[href], button:not([disabled])", navEl).concat([burger])
        .filter(function (el) { return el.offsetParent !== null || el === burger; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  })();

  /* ------------------------------------------------------- reveal system */
  (function reveal() {
    var items = $$(".reveal");
    if (!items.length) return;
    if (reduced.matches || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add("in");
        io.unobserve(en.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    items.forEach(function (el) { io.observe(el); });
  })();

  /* ------------------------------------------------------------ FAQ */
  (function faq() {
    $$(".faq-q").forEach(function (btn) {
      var panel = document.getElementById(btn.getAttribute("aria-controls"));
      if (!panel) return;

      btn.addEventListener("click", function () {
        var open = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", open ? "false" : "true");

        if (open) {
          panel.style.height = panel.scrollHeight + "px";
          requestAnimationFrame(function () { panel.style.height = "0px"; });
          window.setTimeout(function () {
            if (btn.getAttribute("aria-expanded") === "false") panel.hidden = true;
          }, reduced.matches ? 0 : 400);
        } else {
          panel.hidden = false;
          panel.style.height = "0px";
          requestAnimationFrame(function () { panel.style.height = panel.scrollHeight + "px"; });
        }
      });

      /* Pin to auto once open so reflow (resize, font swap) never clips. */
      panel.addEventListener("transitionend", function (e) {
        if (e.propertyName !== "height") return;
        if (btn.getAttribute("aria-expanded") === "true") panel.style.height = "auto";
      });
    });

    window.addEventListener("resize", function () {
      $$('.faq-q[aria-expanded="true"]').forEach(function (btn) {
        var p = document.getElementById(btn.getAttribute("aria-controls"));
        if (p) p.style.height = "auto";
      });
    }, { passive: true });
  })();

  /* ------------------------------------------- hero lattice: pause offscreen */
  (function latticeGuard() {
    var lat = $(".lattice");
    if (!lat || !("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (e) {
      lat.classList.toggle("is-paused", !e[0].isIntersecting);
    }, { threshold: 0 });
    io.observe(lat);
  })();

  /* ---------------------------------------------------------- contact form */
  (function contactForm() {
    var form = $("#leadForm");
    if (!form) return;

    var submit = $(".form-submit", form);
    var status = $(".form-status", form);
    var captchaHost = $(".form-captcha", form);
    var siteKey = captchaHost && captchaHost.dataset.sitekey;
    var captchaLoading = false;
    var i18n = form.dataset;

    /* --- hCaptcha is only fetched once the visitor engages with the form,
           so a third-party script never sits in the critical path. --- */
    function loadCaptcha() {
      if (captchaLoading || !siteKey || window.hcaptcha) return;
      captchaLoading = true;
      var s = document.createElement("script");
      s.src = "https://js.hcaptcha.com/1/api.js?render=explicit&onload=qxCaptchaReady";
      s.async = true; s.defer = true;
      document.head.appendChild(s);
    }
    window.qxCaptchaReady = function () {
      if (!captchaHost || !window.hcaptcha) return;
      try { window.hcaptcha.render(captchaHost, { sitekey: siteKey }); }
      catch (e) { /* already rendered */ }
    };
    ["focusin", "pointerdown"].forEach(function (ev) {
      form.addEventListener(ev, loadCaptcha, { once: true });
    });

    /* --- validation --- */
    function fieldOf(el) { return el.closest(".field"); }

    function validate(el) {
      var wrap = fieldOf(el);
      if (!wrap) return true;
      var ok = el.checkValidity();
      wrap.setAttribute("data-invalid", ok ? "false" : "true");
      var err = $(".field-err", wrap);
      if (err && !ok) err.textContent = el.validationMessage;
      el.setAttribute("aria-invalid", ok ? "false" : "true");
      return ok;
    }

    $$("input, select, textarea", form).forEach(function (el) {
      if (el.type === "hidden" || el.name === "bot-field") return;
      el.addEventListener("blur", function () { validate(el); });
      el.addEventListener("input", function () {
        var wrap = fieldOf(el);
        if (wrap && wrap.getAttribute("data-invalid") === "true") validate(el);
      });
    });

    function showError(msg) {
      if (!status) return;
      status.textContent = msg;
      status.classList.add("is-error");
      status.setAttribute("role", "alert");
    }
    function clearError() {
      if (!status) return;
      status.textContent = "";
      status.classList.remove("is-error");
      status.removeAttribute("role");
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      clearError();

      var fields = $$("input, select, textarea", form).filter(function (el) {
        return el.type !== "hidden" && el.name !== "bot-field";
      });
      var firstBad = null;
      fields.forEach(function (el) { if (!validate(el) && !firstBad) firstBad = el; });
      if (firstBad) { firstBad.focus(); return; }

      if (captchaHost && window.hcaptcha) {
        var token = "";
        try { token = window.hcaptcha.getResponse(); } catch (err) { token = ""; }
        if (!token) { showError(i18n.msgCaptcha || "Please complete the verification."); return; }
      }

      form.classList.add("is-busy");
      if (submit) submit.setAttribute("aria-disabled", "true");

      var fd = new FormData(form);
      var lead = {};
      fd.forEach(function (v, k) { lead[k] = v; });

      var crm = fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      }).then(function (r) { if (!r.ok) throw new Error("crm " + r.status); return "crm"; });

      var record = fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(fd).toString(),
      }).then(function (r) { if (!r.ok) throw new Error("forms " + r.status); return "forms"; });

      var any = Promise.any
        ? Promise.any([crm, record])
        : new Promise(function (res, rej) {
            var left = 2, done = false;
            [crm, record].forEach(function (p) {
              p.then(function (v) { if (!done) { done = true; res(v); } })
               .catch(function () { if (--left === 0 && !done) rej(); });
            });
          });

      any.then(function () {
        form.classList.remove("is-busy");
        form.classList.add("is-sent");
        var done = $(".form-done", form);
        if (done) {
          done.setAttribute("tabindex", "-1");
          done.focus({ preventScroll: true });
          done.scrollIntoView({ behavior: reduced.matches ? "auto" : "smooth", block: "center" });
        }
      }).catch(function () {
        form.classList.remove("is-busy");
        if (submit) submit.removeAttribute("aria-disabled");
        if (window.hcaptcha) { try { window.hcaptcha.reset(); } catch (err) {} }
        showError(i18n.msgError || "Something went wrong. Please email info@qeonix.com.");
      });
    });
  })();
})();
