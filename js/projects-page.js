(function () {
  var showcase = document.querySelector(".projects-showcase[data-reveal-ready]");
  if (!showcase) return;

  var rows = showcase.querySelectorAll(".projects-row");
  if (!rows.length) return;

  function revealAll() {
    rows.forEach(function (row) {
      row.classList.add("projects-row--in-view");
    });
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealAll();
    return;
  }

  showcase.setAttribute("data-reveal", "1");

  if (!("IntersectionObserver" in window)) {
    revealAll();
    return;
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("projects-row--in-view");
        io.unobserve(entry.target);
      });
    },
    { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
  );

  rows.forEach(function (row) {
    io.observe(row);
  });
})();
