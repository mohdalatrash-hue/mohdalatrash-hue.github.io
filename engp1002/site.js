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

/* Week 3 enhancement: use separate, classroom-ready MP3 players and
   present the Oxford → original-workshop lesson flow at the top of the page. */
(function () {
  if (!/week3\.html$/i.test(location.pathname)) return;
  var sources = [
    'assets/unit1/listening-1-debate-5m48.mp3',
    'assets/unit1/listening-2-evidence-7m.mp3',
    'assets/unit1/listening-3-bias-context-8m.mp3',
    'assets/unit1/listening-4-conclusion-8m18.mp3'
  ];
  var players = document.querySelectorAll('.audio audio');
  players.forEach(function (audio, i) {
    var source = audio.querySelector('source');
    if (!source || !sources[i]) return;
    source.src = sources[i];
    source.type = 'audio/mpeg';
    audio.load();
  });
  var inner = document.querySelector('.section-inner');
  var firstInfo = inner && inner.querySelector('.info-box');
  if (!inner || !firstInfo || document.getElementById('week3-lesson-plan')) return;
  var plan = document.createElement('section');
  plan.className = 'lab'; plan.id = 'week3-lesson-plan';
  plan.innerHTML = '<h2>Teacher lesson plan <span class="tag">210 minutes</span></h2>' +
    '<p class="sub">Use the licensed Oxford platform first, then use this page for original practice, note-taking, and speaking. Do not copy or redistribute Oxford material from the platform.</p>' +
    '<div class="box"><b>Part A — Oxford English Hub (45 minutes)</b><ol>' +
    '<li>Open the authorised <a href="https://englishhub.oup.com/launch/teacher/QSKILLS4RWOP3" target="_blank" rel="noopener">Oxford English Hub course</a> and choose Unit 1.</li>' +
    '<li>Preview the Unit 1 question and target vocabulary. Ask students to predict which details may influence a first impression.</li>' +
    '<li>Complete the assigned official Unit 1 reading/listening activity in English Hub. Students take four-column notes: main idea, evidence, new word, question.</li>' +
    '<li>Pair-check notes; collect one unresolved question from each pair.</li></ol></div>' +
    '<div class="box"><b>Part B — GitHub practice workshop (165 minutes)</b><ol>' +
    '<li>Exercises 1–2: activate background knowledge and separate observation from interpretation.</li>' +
    '<li>Listenings 1–4: play each visible MP3 once for gist and once for notes; do not provide a transcript before the first listen.</li>' +
    '<li>Exercises 10–13: synthesize evidence through the evidence ladder, role-play, case conference, and assessed group response.</li></ol></div>' +
    '<div class="grid"><div class="card"><b>🎧 MP3 1 · 5:48</b><br>Debate: the main argument</div><div class="card"><b>🎧 MP3 2 · 7:00</b><br>Evidence and provisional judgment</div><div class="card"><b>🎧 MP3 3 · 8:00</b><br>Bias, stereotype, and context</div><div class="card"><b>🎧 MP3 4 · 8:18</b><br>Qualified conclusion and application</div></div>';
  firstInfo.insertAdjacentElement('afterend', plan);
})();
