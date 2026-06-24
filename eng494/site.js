/* ENG 494 — shared mobile menu (mirror of the ENG 446 pattern) */
(function () {
  var LINKS = [
    { href: "index.html",            label: "Course Hub" },
    { href: "workshop-prose.html",   label: "Adult Prose" },
    { href: "workshop-children-narrative.html", label: "Children's: Narrative" },
    { href: "workshop-children-dialogue.html",  label: "Children's: Dialogue" },
    { href: "workshop-children.html",label: "Children's: Multimodality" },
    { href: "workshop-poetry.html",  label: "Poetry" },
    { href: "workshop-children-poetry.html", label: "Children's Poetry" },
    { href: "workshop-drama.html",   label: "Drama & Adaptation" },
    { href: "progress.html",         label: "My Progress" }
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
