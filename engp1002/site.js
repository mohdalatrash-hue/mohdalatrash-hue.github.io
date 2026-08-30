/* ENGP 1002 — shared mobile menu (mirror of the ENG 446 / ENG 494 / ENG 203 / ENG 270 pattern) */
(function () {
  var LINKS = [
    { href: "index.html", label: "Course Hub" },
    { href: "week1.html", label: "Week 1" },
    { href: "week2.html", label: "Week 2" },
    { href: "week3.html", label: "Week 3" },
    { href: "week4.html", label: "Week 4" },
    { href: "week5.html", label: "Week 5" },
    { href: "week6.html", label: "Week 6" },
    { href: "week7.html", label: "Week 7" },
    { href: "week8.html", label: "Week 8" },
    { href: "week9.html", label: "Week 9" },
    { href: "week10.html", label: "Week 10" },
    { href: "week11.html", label: "Week 11" },
    { href: "week12.html", label: "Week 12" },
    { href: "week13.html", label: "Week 13" },
    { href: "week14.html", label: "Week 14" },
    { href: "week15.html", label: "Week 15" }
  ];
  function build() {
    var nav = document.querySelector(".nav");
    var inner = document.querySelector(".nav .nav-inner");
    if (!nav || !inner || document.querySelector(".nav-toggle")) return;
    if (!inner.querySelector(".nav-spacer")) { var sp = document.createElement("div"); sp.className = "nav-spacer"; inner.appendChild(sp); }
    var here = (location.pathname.split("/").pop() || "index.html");
    var btn = document.createElement("button");
    btn.className = "nav-toggle";
    btn.setAttribute("aria-label", "Open course menu");
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-controls", "nav-drawer");
    btn.innerHTML = "<span></span><span></span><span></span>";
    inner.appendChild(btn);
    var drawer = document.createElement("div");
    drawer.className = "nav-drawer"; drawer.id = "nav-drawer";
    drawer.setAttribute("role", "navigation"); drawer.setAttribute("aria-label", "Course pages"); drawer.hidden = true;
    LINKS.forEach(function (l) { var a = document.createElement("a"); a.href = l.href; a.textContent = l.label; if (l.href === here) { a.setAttribute("aria-current", "page"); a.className = "active"; } drawer.appendChild(a); });
    nav.appendChild(drawer);
    function open() { drawer.hidden = false; void drawer.offsetWidth; drawer.classList.add("open"); btn.classList.add("open"); btn.setAttribute("aria-expanded", "true"); btn.setAttribute("aria-label", "Close course menu"); }
    function close() { drawer.classList.remove("open"); btn.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); btn.setAttribute("aria-label", "Open course menu"); setTimeout(function () { if (!drawer.classList.contains("open")) drawer.hidden = true; }, 200); }
    btn.addEventListener("click", function (e) { e.stopPropagation(); btn.getAttribute("aria-expanded") === "true" ? close() : open(); });
    document.addEventListener("click", function (e) { if (btn.getAttribute("aria-expanded") === "true" && !drawer.contains(e.target) && e.target !== btn) close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && btn.getAttribute("aria-expanded") === "true") { close(); btn.focus(); } });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build); else build();
})();
