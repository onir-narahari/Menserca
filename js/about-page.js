(function () {
  var root = document.body;
  if (!root.classList.contains("page-about")) return;

  var nodes = document.querySelectorAll("[data-about-reveal]");
  if (!nodes.length) return;

  function revealAll() {
    nodes.forEach(function (el) {
      el.classList.add("about-reveal--in-view");
    });
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealAll();
    return;
  }

  root.setAttribute("data-about-animate", "1");

  if (!("IntersectionObserver" in window)) {
    revealAll();
    return;
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("about-reveal--in-view");
        io.unobserve(entry.target);
      });
    },
    { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
  );

  nodes.forEach(function (el) {
    io.observe(el);
  });
})();
