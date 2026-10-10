(function () {
  var root = document.documentElement;
  var btn = document.getElementById("theme-toggle");
  var mq = window.matchMedia("(prefers-color-scheme: dark)");

  function current() {
    var t = root.getAttribute("data-theme");
    if (t === "dark" || t === "light") return t;
    return mq.matches ? "dark" : "light";
  }
  function label() {
    btn.textContent = current() === "dark" ? "Tema claro" : "Tema escuro";
  }
  try {
    var saved = localStorage.getItem("portfolio-theme");
    if (saved === "dark" || saved === "light") root.setAttribute("data-theme", saved);
  } catch (e) {}
  label();
  btn.addEventListener("click", function () {
    var next = current() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("portfolio-theme", next); } catch (e) {}
    label();
  });
  if (mq.addEventListener) mq.addEventListener("change", label);


  var targets = document.querySelectorAll(
    ".hero > *, section h2, .section-note, .project, .skill, #contato .btn"
  );
  if (!("IntersectionObserver" in window)) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  targets.forEach(function (el, i) {
    el.classList.add("reveal");
    if (el.closest(".hero")) el.style.transitionDelay = (i * 0.12) + "s";
    io.observe(el);
  });
})();