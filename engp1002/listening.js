/* ENGP 1002 — Listening & Note-taking Lab
   Practice only. Notes autosave in THIS browser (localStorage); nothing is sent anywhere. */
(function () {
  "use strict";
  var page = (location.pathname.split("/").pop() || "listening.html");
  var store = null;
  try { localStorage.setItem("__t", "1"); localStorage.removeItem("__t"); store = localStorage; } catch (e) { store = null; }
  var KEY = "engp1002_lab_" + page;
  function load() { if (!store) return {}; try { return JSON.parse(store.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function save(d) { if (!store) return; try { store.setItem(KEY, JSON.stringify(d)); } catch (e) {} }
  var data = load();

  /* ---- notes autosave + word counts ---- */
  var fields = document.querySelectorAll("[data-save]");
  Array.prototype.forEach.call(fields, function (el) {
    var k = el.getAttribute("data-save");
    if (data[k]) el.value = data[k];
    function upd() {
      var wc = document.getElementById("wc-" + k);
      if (wc) { var n = (el.value.trim().match(/\S+/g) || []).length; wc.textContent = n + (n === 1 ? " word" : " words"); }
    }
    upd();
    el.addEventListener("input", function () { data[k] = el.value; save(data); upd(); });
  });
  var st = document.getElementById("store-state");
  if (st && !store) st.textContent = "Your browser is blocking storage, so notes will not be saved if you close this page. Use the Print button to keep a copy.";

  /* ---- checkable questions ---- */
  function norm(s) { return String(s).toLowerCase().replace(/[,$%\s]/g, "").replace(/\.$/, ""); }
  function readAnswer(q) {
    var t = q.getAttribute("data-type");
    if (t === "gap") { var i = q.querySelector("input[type=text]"); return i ? i.value : ""; }
    if (t === "sel") { var s = q.querySelector("select"); return s ? s.value : ""; }
    var r = q.querySelector("input[type=radio]:checked"); return r ? r.value : "";
  }
  function isRight(q, v) {
    if (v === "") return false;
    var ans = q.getAttribute("data-answer");
    if (q.getAttribute("data-type") === "gap") {
      var alts = ans.split("|").map(norm), x = norm(v);
      return alts.indexOf(x) !== -1;
    }
    return v === ans;
  }
  function setFb(q, ok) {
    var fb = q.querySelector(".fb"); if (!fb) return;
    var time = q.getAttribute("data-time"), why = q.getAttribute("data-why") || "";
    var head = ok ? "✔ Correct. " : "✖ Not yet. ";
    fb.innerHTML = "";
    var b = document.createElement("b"); b.textContent = head; fb.appendChild(b);
    fb.appendChild(document.createTextNode(why + " "));
    if (time) { var s = document.createElement("span"); s.className = "ts"; s.textContent = "Video: " + time; fb.appendChild(s); }
  }
  Array.prototype.forEach.call(document.querySelectorAll(".quiz"), function (box) {
    var check = box.querySelector(".check"), retry = box.querySelector(".retry"), score = box.querySelector(".score");
    var qs = box.querySelectorAll(".q");
    if (check) check.addEventListener("click", function () {
      var right = 0, answered = 0;
      Array.prototype.forEach.call(qs, function (q) {
        var v = readAnswer(q); q.classList.remove("right", "wrong");
        if (v === "") { var fb0 = q.querySelector(".fb"); if (fb0) fb0.innerHTML = ""; return; }
        answered++;
        var ok = isRight(q, v); if (ok) right++;
        q.classList.add(ok ? "right" : "wrong"); setFb(q, ok);
      });
      if (score) {
        score.classList.add("on");
        score.textContent = answered < qs.length
          ? right + " / " + qs.length + " correct — " + (qs.length - answered) + " unanswered"
          : right + " / " + qs.length + " correct" + (right === qs.length ? " — excellent!" : " — listen again and fix the red ones");
        score.setAttribute("role", "status");
      }
    });
    if (retry) retry.addEventListener("click", function () {
      Array.prototype.forEach.call(qs, function (q) {
        q.classList.remove("right", "wrong");
        var fb = q.querySelector(".fb"); if (fb) fb.innerHTML = "";
        Array.prototype.forEach.call(q.querySelectorAll("input[type=radio]"), function (r) { r.checked = false; });
        Array.prototype.forEach.call(q.querySelectorAll("input[type=text]"), function (i) { i.value = ""; });
        Array.prototype.forEach.call(q.querySelectorAll("select"), function (s) { s.value = ""; });
      });
      if (score) { score.classList.remove("on"); score.textContent = ""; }
    });
  });

  /* ---- print: mirror textarea content ---- */
  window.addEventListener("beforeprint", function () {
    Array.prototype.forEach.call(document.querySelectorAll("textarea[data-save]"), function (t) {
      var m = t.nextElementSibling;
      if (!m || !m.classList || !m.classList.contains("print-only")) {
        m = document.createElement("div"); m.className = "print-only"; t.parentNode.insertBefore(m, t.nextSibling);
      }
      m.textContent = t.value;
    });
  });
  Array.prototype.forEach.call(document.querySelectorAll(".printbtn"), function (b) {
    b.addEventListener("click", function () { window.print(); });
  });
})();
