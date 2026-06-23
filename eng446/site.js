/* ============================================================
   ENG 446 — shared site script
   Injects an accessible mobile navigation menu on every page.
   Desktop keeps the existing per-page .nav-links; on phones a
   hamburger button reveals a consistent drawer so NO page is
   left without navigation.
   Dr. Muhammad Alatrash · Qassim University
   ============================================================ */
(function () {
  // Standard link set — every page reachable from every page on mobile.
  var LINKS = [
    { href: "index.html",         label: "Course Hub" },
    { href: "syllabus.html",      label: "Syllabus" },
    { href: "groups.html",        label: "Groups" },
    { href: "resources.html",     label: "Resources" },
    { href: "apa-quickref.html",  label: "APA 7 Guide" },
    { href: "quiz-final.html",    label: "Final Exam Bank" }
  ];

  function build() {
    var nav = document.querySelector(".nav");
    var inner = document.querySelector(".nav .nav-inner");
    if (!nav || !inner || document.querySelector(".nav-toggle")) return;

    // Make sure links push to the right even on pages with no .nav-spacer.
    if (!inner.querySelector(".nav-spacer")) {
      var sp = document.createElement("div");
      sp.className = "nav-spacer";
      inner.appendChild(sp);
    }

    var here = (location.pathname.split("/").pop() || "index.html");

    // Hamburger button
    var btn = document.createElement("button");
    btn.className = "nav-toggle";
    btn.setAttribute("aria-label", "Open course menu");
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-controls", "nav-drawer");
    btn.innerHTML = "<span></span><span></span><span></span>";
    inner.appendChild(btn);

    // Drawer
    var drawer = document.createElement("div");
    drawer.className = "nav-drawer";
    drawer.id = "nav-drawer";
    drawer.setAttribute("role", "navigation");
    drawer.setAttribute("aria-label", "Course pages");
    drawer.hidden = true;
    LINKS.forEach(function (l) {
      var a = document.createElement("a");
      a.href = l.href;
      a.textContent = l.label;
      if (l.href === here) { a.setAttribute("aria-current", "page"); a.className = "active"; }
      drawer.appendChild(a);
    });
    nav.appendChild(drawer);

    function open() {
      drawer.hidden = false;
      // force reflow so the transition runs
      void drawer.offsetWidth;
      drawer.classList.add("open");
      btn.classList.add("open");
      btn.setAttribute("aria-expanded", "true");
      btn.setAttribute("aria-label", "Close course menu");
    }
    function close() {
      drawer.classList.remove("open");
      btn.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-label", "Open course menu");
      setTimeout(function () { if (!drawer.classList.contains("open")) drawer.hidden = true; }, 200);
    }
    function toggle() { btn.getAttribute("aria-expanded") === "true" ? close() : open(); }

    btn.addEventListener("click", function (e) { e.stopPropagation(); toggle(); });
    document.addEventListener("click", function (e) {
      if (btn.getAttribute("aria-expanded") === "true" && !drawer.contains(e.target) && e.target !== btn)
        close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && btn.getAttribute("aria-expanded") === "true") { close(); btn.focus(); }
    });
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", build);
  else
    build();
})();
