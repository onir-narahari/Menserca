(function () {
  function initLanguageToggle() {
    if (!window.MensercaI18n) return;
    var headerInner = document.querySelector(".site-header__inner");
    if (!headerInner) return;

    function makeToggle(className) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = className;
      btn.setAttribute("data-lang-toggle", "true");
      btn.textContent = "EN";
      btn.addEventListener("click", function () {
        var next = window.MensercaI18n.getLanguage() === "en" ? "es" : "en";
        window.MensercaI18n.setLanguage(next);
      });
      return btn;
    }

    if (!headerInner.querySelector(".lang-toggle")) {
      headerInner.appendChild(makeToggle("lang-toggle"));
    }

    var drawer = document.getElementById("nav-drawer");
    if (drawer && !drawer.querySelector(".lang-toggle--mobile")) {
      var shell = document.createElement("div");
      shell.className = "lang-toggle-mobile-shell";
      shell.appendChild(makeToggle("lang-toggle lang-toggle--mobile"));
      drawer.appendChild(shell);
    }

    window.MensercaI18n.applyTranslations(document);
  }

  initLanguageToggle();

  var header = document.querySelector(".site-header");

  if (header) {
    var megaWrap = header.querySelector(".nav-item--mega");
    var megaBtn = megaWrap && megaWrap.querySelector("button");
    var drawer = document.getElementById("nav-drawer");
    var drawerBackdrop = document.getElementById("nav-drawer-backdrop");
    var navToggle = header.querySelector(".nav-toggle");
    var drawerClose = drawer && drawer.querySelector("[data-drawer-close]");
    var acc = drawer && drawer.querySelector(".drawer-accordion");
    var accBtn = acc && acc.querySelector("button");

    function setMega(open) {
      if (!megaWrap) return;
      megaWrap.classList.toggle("is-open", open);
      if (megaBtn) megaBtn.setAttribute("aria-expanded", open ? "true" : "false");
    }

    if (megaBtn && megaWrap) {
      megaBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        setMega(!megaWrap.classList.contains("is-open"));
      });
      document.addEventListener("click", function () {
        setMega(false);
      });
      megaWrap.addEventListener("click", function (e) {
        e.stopPropagation();
      });
    }

    function setDrawer(open) {
      if (!drawer || !drawerBackdrop || !navToggle) return;
      drawer.classList.toggle("is-open", open);
      drawerBackdrop.classList.toggle("is-visible", open);
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      drawer.setAttribute("aria-hidden", open ? "false" : "true");
      drawerBackdrop.setAttribute("aria-hidden", open ? "false" : "true");
      document.body.style.overflow = open ? "hidden" : "";
    }

    if (navToggle) {
      navToggle.addEventListener("click", function () {
        if (!drawer) return;
        setDrawer(!drawer.classList.contains("is-open"));
      });
    }
    if (drawerClose) {
      drawerClose.addEventListener("click", function () {
        setDrawer(false);
      });
    }
    if (drawerBackdrop) {
      drawerBackdrop.addEventListener("click", function () {
        setDrawer(false);
      });
    }

    if (accBtn && acc) {
      accBtn.addEventListener("click", function () {
        acc.classList.toggle("is-open");
        accBtn.setAttribute("aria-expanded", acc.classList.contains("is-open") ? "true" : "false");
      });
    }
  }

  /** Capability pages: only one technical accordion open per cluster group */
  function initCapAccordions() {
    var wraps = document.querySelectorAll(".cap-accordions-wrap");
    if (!wraps.length) return;
    wraps.forEach(function (wrap) {
      var groups = wrap.querySelectorAll(".clusters");
      groups.forEach(function (cluster) {
        var items = cluster.querySelectorAll("details");
        items.forEach(function (det) {
          det.addEventListener("toggle", function () {
            if (!det.open) return;
            items.forEach(function (other) {
              if (other !== det) other.removeAttribute("open");
            });
          });
        });
      });
    });
  }

  initCapAccordions();

  /** Homepage: staggered entrance for capability preview cards when scrolled into view */
  function initHomeCapReveal() {
    var grid = document.querySelector(".home-cap-reveal");
    if (!grid) return;

    function reveal() {
      grid.classList.add("home-cap-reveal--in");
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reveal();
      return;
    }

    if (!("IntersectionObserver" in window)) {
      reveal();
      return;
    }

    function inViewport() {
      var r = grid.getBoundingClientRect();
      var vh = window.innerHeight || document.documentElement.clientHeight;
      return r.top < vh * 0.9 && r.bottom > 48;
    }

    if (inViewport()) {
      reveal();
      return;
    }

    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            reveal();
            obs.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -6% 0px", threshold: 0.06 }
    );
    obs.observe(grid);
  }

  initHomeCapReveal();
})();
