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

  /* ------------------------------------------------------- digital twin */
  (function twin() {
    var root = $(".qx-twin");
    if (!root) return;
    var btns = $$("[data-twin-btn]", root);
    var rows = $$(".twin-row", root);
    var idle = $(".twin-idle", root);
    var kpis = $$("[data-twin-kpi]", root);
    if (!btns.length) return;

    var timers = [];
    var STEP_MS = 1100;

    function clearTimers() {
      timers.forEach(clearTimeout);
      timers = [];
    }
    function setKpis(btn) {
      kpis.forEach(function (el) {
        var v = btn ? btn.getAttribute("data-kpi-" + el.getAttribute("data-twin-kpi")) : null;
        el.textContent = v || el.getAttribute("data-idle");
      });
    }
    function resetVisual() {
      root.classList.remove("run-incident", "run-fault", "run-event", "is-done");
    }
    function reset() {
      clearTimers();
      resetVisual();
      rows.forEach(function (r) { r.hidden = true; });
      btns.forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
      setKpis(null);
      if (idle) idle.hidden = false;
    }

    function run(btn) {
      var key = btn.getAttribute("data-twin-btn");
      var replay = btn.getAttribute("aria-pressed") === "true";
      reset();
      if (replay) return; /* second click on the active scenario stops it */

      btn.setAttribute("aria-pressed", "true");
      if (idle) idle.hidden = true;
      root.classList.add("run-" + key);

      var steps = rows.filter(function (r) { return r.getAttribute("data-scn") === key; });

      if (reduced.matches) {
        steps.forEach(function (r) { r.hidden = false; });
        setKpis(null);
        root.classList.add("is-done");
        return;
      }

      setKpis(btn);
      steps.forEach(function (r, i) {
        timers.push(window.setTimeout(function () {
          r.hidden = false;
          if (i === steps.length - 1) {
            root.classList.add("is-done");
            setKpis(null);
          }
        }, 350 + i * STEP_MS));
      });
    }

    btns.forEach(function (b) {
      b.addEventListener("click", function () { run(b); });
    });

  })();

  /* --------------------------------------------- agent run: step-through */
  (function stepRun() {
    var root = $(".qx-agentic.is-steprun");
    if (!root) return;
    var rows = $$(".qx-trace .qxr", root);
    var runBtn = $(".steprun-run", root);
    var approveBtn = $(".steprun-approve", root);
    if (!rows.length || !runBtn) return;

    var timers = [];
    var STEP_MS = 950;

    /* Arm: hide all rows until run. Without JS the full trace stays visible. */
    rows.forEach(function (r) { r.setAttribute("data-armed", "true"); });

    function label(state) {
      $$("span[data-when]", runBtn).forEach(function (el) {
        el.hidden = el.getAttribute("data-when") !== state;
      });
    }
    function clearTimers() { timers.forEach(clearTimeout); timers = []; }
    function reset() {
      clearTimers();
      rows.forEach(function (r) { r.classList.remove("is-shown", "is-approved"); });
      var ok = $(".qxr-s-ok", root);
      if (ok) ok.hidden = true;
      approveBtn.hidden = true;
      label("idle");
    }

    function playFrom(start) {
      var i = start;
      function next() {
        if (i >= rows.length) { label("done"); return; }
        var row = rows[i];
        row.classList.add("is-shown");
        var isCheckpoint = row.classList.contains("is-human") && !row.classList.contains("is-approved");
        i += 1;
        if (isCheckpoint) {
          approveBtn.hidden = false;
          approveBtn.focus({ preventScroll: true });
          return; /* wait for the human */
        }
        timers.push(window.setTimeout(next, reduced.matches ? 0 : STEP_MS));
      }
      next();
    }

    runBtn.addEventListener("click", function () {
      reset();
      playFrom(0);
    });

    approveBtn.addEventListener("click", function () {
      approveBtn.hidden = true;
      var human = $(".qxr.is-human", root);
      if (human) {
        human.classList.add("is-approved");
        var ok = $(".qxr-s-ok", human);
        if (ok) ok.hidden = false;
      }
      var resume = rows.indexOf(human) + 1;
      timers.push(window.setTimeout(function () { playFrom(resume); }, reduced.matches ? 0 : 500));
      runBtn.focus({ preventScroll: true });
    });
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
