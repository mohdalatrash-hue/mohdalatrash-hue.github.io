/* ============================================================
   ENG 446 — personal progress tracker (device-local only)
   Records the student's own activity in localStorage so they can
   see their progress on progress.html. NOTHING is sent anywhere —
   the data never leaves this browser.
   Dr. Muhammad Alatrash · Qassim University
   ============================================================ */
(function () {
  var KEY = "eng494_progress_v1";
  var page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  if (!page.endsWith(".html")) page = "index.html";

  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function save(d) { try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) {} }
  function dayStr() { var t = new Date(); return t.getFullYear() + "-" + String(t.getMonth() + 1).padStart(2, "0") + "-" + String(t.getDate()).padStart(2, "0"); }

  // ── Record a visit ──────────────────────────────────────
  var d = load();
  d.firstSeen = d.firstSeen || Date.now();
  d.lastSeen = Date.now();
  d.pages = d.pages || {};
  d.pages[page] = d.pages[page] || { visits: 0, timeSec: 0, last: 0 };
  d.pages[page].visits++;
  d.pages[page].last = Date.now();
  d.days = d.days || {};
  d.days[dayStr()] = true;
  save(d);

  // ── Time on page (accumulate active seconds) ────────────
  var segStart = Date.now();
  function flush() {
    var secs = Math.round((Date.now() - segStart) / 1000);
    segStart = Date.now();
    if (secs <= 0 || secs > 3600) return; // ignore idle/garbage segments
    var x = load();
    x.pages = x.pages || {};
    x.pages[page] = x.pages[page] || { visits: 1, timeSec: 0, last: Date.now() };
    x.pages[page].timeSec += secs;
    x.lastSeen = Date.now();
    save(x);
  }
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) flush(); else segStart = Date.now();
  });
  window.addEventListener("pagehide", flush);
  window.addEventListener("beforeunload", flush);
  setInterval(function () { if (!document.hidden) flush(); }, 15000);

  // ── Resource downloads (PDF clicks) ─────────────────────
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href$=".pdf"]');
    if (!a) return;
    var f = (a.getAttribute("href") || "").split("/").pop();
    if (!f) return;
    var x = load();
    x.downloads = x.downloads || {};
    x.downloads[f] = x.downloads[f] || { count: 0, last: 0, name: (a.querySelector(".res-name") ? a.querySelector(".res-name").textContent : f) };
    x.downloads[f].count++;
    x.downloads[f].last = Date.now();
    save(x);
  });

  // ── Quiz / workshop completion (auto-detect results) ────
  function logScore(kind, key, pct) {
    var x = load();
    x[kind] = x[kind] || {};
    var e = x[kind][key] || { best: 0, attempts: 0, last: 0 };
    e.attempts++;
    e.best = Math.max(e.best, pct);
    e.last = Date.now();
    x[kind][key] = e;
    save(x);
  }
  var lastLogged = "";
  function visible(el) {
    if (!el) return false;
    var disp = el.style && el.style.display;
    if (disp === "none") return false;
    if (disp === "block" || disp === "flex") return true;
    return el.offsetParent !== null; // fallback for browsers
  }
  setInterval(function () {
    // Practice banks (quiz1-4, quiz-final): #results-screen + #score-num "8/22"
    var rs = document.getElementById("results-screen");
    var sn = document.getElementById("score-num");
    if (visible(rs) && sn) {
      var m = (sn.textContent || "").match(/(\d+)\s*\/\s*(\d+)/);
      if (m) {
        var pct = Math.round((+m[1]) / (+m[2]) * 100);
        var sig = "quiz:" + page + ":" + sn.textContent;
        if (sig !== lastLogged) { logScore("quizzes", page, pct); lastLogged = sig; }
      }
    }
    // Workshops: #aq-score + .score-big "80%"
    var sc = document.getElementById("aq-score");
    if (visible(sc)) {
      var big = sc.querySelector(".score-big");
      if (big) {
        var pm = (big.textContent || "").match(/(\d+)\s*%/);
        if (pm) {
          var sig2 = "ws:" + page + ":" + big.textContent;
          if (sig2 !== lastLogged) { logScore("workshops", page, +pm[1]); lastLogged = sig2; }
        }
      }
    }
  }, 1500);

  // expose a tiny read API for progress.html
  window.ENG446_PROGRESS_KEY = KEY;
})();
