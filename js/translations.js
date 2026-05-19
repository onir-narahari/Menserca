(function () {
  var STORAGE_KEY = "menserca_lang";
  var DEFAULT_LANG = "en";
  var SUPPORTED_LANGS = ["en", "es"];

  var trackedTextNodes = [];
  var trackedAttrNodes = [];

  var OVERRIDES_ES = {
    "Home": "Inicio",
    "About": "Nosotros",
    "Close": "Cerrar",
    "Capabilities": "Capacidades",
    "Projects": "Proyectos",
    "Contact": "Contacto",
    "Safety": "Seguridad",
    "Safety & Sustainability": "Seguridad y sostenibilidad",
    "About MENSERCA": "Sobre MENSERCA",
    "Navigate": "Navegación"
  };

  function getPhraseMap() {
    return window.MensercaPhraseMapEs || {};
  }

  function getLanguage() {
    var stored = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch (err) {
      stored = null;
    }
    return SUPPORTED_LANGS.indexOf(stored) >= 0 ? stored : DEFAULT_LANG;
  }

  function translateTextToSpanish(text) {
    if (!text) return text;
    if (OVERRIDES_ES[text]) return OVERRIDES_ES[text];

    var map = getPhraseMap();
    if (map[text]) return map[text];

    var trimmed = text.trim();
    if (OVERRIDES_ES[trimmed]) {
      return text.replace(trimmed, OVERRIDES_ES[trimmed]);
    }
    if (map[trimmed]) {
      return text.replace(trimmed, map[trimmed]);
    }

    return text;
  }

  function shouldSkipNode(node) {
    if (!node || !node.parentElement) return true;
    var parent = node.parentElement;
    var tag = parent.tagName;
    if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT") return true;
    if (parent.hasAttribute("data-lang-toggle")) return true;
    if (!node.nodeValue || !node.nodeValue.trim()) return true;
    return false;
  }

  function cacheNodes() {
    trackedTextNodes = [];
    trackedAttrNodes = [];

    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    var current;
    while ((current = walker.nextNode())) {
      if (shouldSkipNode(current)) continue;
      trackedTextNodes.push({ node: current, en: current.nodeValue });
    }

    var title = document.querySelector("title");
    if (title && title.textContent) {
      trackedAttrNodes.push({ node: title, attr: "textContent", en: title.textContent });
    }

    var placeholders = document.querySelectorAll("input[placeholder], textarea[placeholder]");
    placeholders.forEach(function (el) {
      trackedAttrNodes.push({ node: el, attr: "placeholder", en: el.getAttribute("placeholder") || "" });
    });

    var alts = document.querySelectorAll("img[alt]");
    alts.forEach(function (el) {
      var alt = el.getAttribute("alt");
      if (alt) {
        trackedAttrNodes.push({ node: el, attr: "alt", en: alt });
      }
    });

    var ariaLabels = document.querySelectorAll("[aria-label]");
    ariaLabels.forEach(function (el) {
      if (el.hasAttribute("data-lang-toggle")) return;
      var label = el.getAttribute("aria-label");
      if (label) {
        trackedAttrNodes.push({ node: el, attr: "aria-label", en: label });
      }
    });
  }

  function updateToggleButtons() {
    var nodes = document.querySelectorAll("[data-lang-toggle]");
    var label = window.__lang === "en" ? "EN" : "ES";
    nodes.forEach(function (node) {
      node.textContent = label;
      node.setAttribute("aria-label", "Language: " + label);
      node.setAttribute("data-active-lang", window.__lang);
    });
  }

  function applyTranslations() {
    var isSpanish = window.__lang === "es";

    trackedTextNodes.forEach(function (entry) {
      if (!entry.node || !entry.node.parentElement) return;
      entry.node.nodeValue = isSpanish ? translateTextToSpanish(entry.en) : entry.en;
    });

    trackedAttrNodes.forEach(function (entry) {
      if (!entry.node) return;
      var value = isSpanish ? translateTextToSpanish(entry.en) : entry.en;
      if (entry.attr === "textContent") {
        entry.node.textContent = value;
      } else {
        entry.node.setAttribute(entry.attr, value);
      }
    });

    updateToggleButtons();
  }

  function setLanguage(lang) {
    window.__lang = SUPPORTED_LANGS.indexOf(lang) >= 0 ? lang : DEFAULT_LANG;
    try {
      localStorage.setItem(STORAGE_KEY, window.__lang);
    } catch (err) {
      // ignore storage issues
    }
    applyTranslations();
  }

  window.__lang = getLanguage();
  window.MensercaI18n = {
    t: function (key) {
      return key;
    },
    setLanguage: setLanguage,
    getLanguage: function () {
      return window.__lang;
    },
    applyTranslations: applyTranslations
  };

  document.addEventListener("DOMContentLoaded", function () {
    cacheNodes();
    applyTranslations();
  });
})();
