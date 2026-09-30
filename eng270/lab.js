/* ENG 270 — group workshop "lab" engine.
   Read -> Learn -> Try -> Compare -> Report.  Everything is device-local (localStorage); nothing is sent anywhere. */
(function () {
  "use strict";
  var W = window;
  /* ---------- item constructors ---------- */
  W.mcq = function (q, opts, ans, why, pre) { return { t: "mcq", q: q, o: opts, a: ans, w: why || "", pre: pre || "" }; };
  W.tf = function (q, val, why, pre) { return { t: "mcq", tf: 1, q: q, o: ["True", "False"], a: val ? 0 : 1, w: why || "", pre: pre || "" }; };
  W.wr = function (o) { o.t = "wr"; return o; };   /* {q,pre,ltr,hint,model,note,check[],rows,ph} */
  W.mt = function (q, pairs, why, pre) { return { t: "mt", q: q, p: pairs, w: why || "", pre: pre || "" }; };
  W.ds = function (o) { o.t = "ds"; return o; };   /* {q,pre,points} */
  /* helpers for Arabic inside English text */
  W.A = function (s) { return '<span class="ar" dir="rtl" lang="ar">' + s + "</span>"; };
  W.EX = function (en, ar, note) { return '<div class="exm">' + (en ? '<p class="en">' + en + "</p>" : "") + (ar ? '<p class="ar" dir="rtl" lang="ar">' + ar + "</p>" : "") + (note ? '<p style="font-size:12.5px;color:var(--text-2)">' + note + "</p>" : "") + "</div>"; };

  var LAB = (W.LAB = {});
  var CFG, KEY, state = { g: { n: "", m: "" }, a: {}, c: {} }, ITEMS = {}, ORDER = [];

  function $(id) { return document.getElementById(id); }
  function load() { try { var r = localStorage.getItem(KEY); if (r) { var s = JSON.parse(r); if (s && s.a) state = s; } } catch (e) {} if (!state.c) state.c = {}; if (!state.g) state.g = { n: "", m: "" }; }
  var saveT = null;
  function save() { clearTimeout(saveT); saveT = setTimeout(function () { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }, 250); }
  function shuffle(a) { var b = a.map(function (_, i) { return i; }); for (var i = b.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = b[i]; b[i] = b[j]; b[j] = t; } return b; }
  function isAr(t){return /[\u0600-\u06FF]/.test(t)&&!/[A-Za-z<]/.test(t);}
  function wrapAr(t){return isAr(t)?'<span class="ar" dir="rtl" lang="ar">'+t+"</span>":t;}
  function strip(h) { var d = document.createElement("div"); d.innerHTML = h || ""; return (d.textContent || "").replace(/\s+/g, " ").trim(); }

  /* ---------- rendering ---------- */
  function kindLabel(t) { return t === "mcq" ? "Choose" : t === "wr" ? "Write / translate" : t === "mt" ? "Match" : "Discuss"; }

  function renderItem(it, id, n) {
    var head = '<div class="item-n"><span>Question ' + n + '</span><span class="item-kind">' + (it.tf ? "True / False" : kindLabel(it.t)) + '</span><span class="item-done" id="' + id + '-ok"></span></div>';
    var pre = it.pre ? '<div class="excerpt' + (it.preAr ? " ar" : "") + '">' + it.pre + "</div>" : "";
    if (it.t === "mcq") {
      it._perm = it.tf ? [0, 1] : shuffle(it.o);
      var opts = it._perm.map(function (oi, k) { return '<button class="ex-opt" id="' + id + "-o" + k + '" data-oi="' + oi + '" onclick="LAB.pick(\'' + id + "'," + k + ')">' + wrapAr(it.o[oi]) + "</button>"; }).join("");
      return '<div class="lab-item" id="' + id + '">' + head + pre + '<div class="ex-q">' + it.q + "</div>" + opts + '<div class="ex-feedback" id="' + id + '-fb"></div></div>';
    }
    if (it.t === "wr") {
      var dir = it.ltr ? ' style="direction:ltr;text-align:left;"' : "";
      var hint = it.hint ? '<details class="hint"><summary>💡 Hint from the reading</summary><div>' + it.hint + "</div></details>" : "";
      var model = '<div class="modelbox" id="' + id + '-model"><h4>One possible answer</h4><div class="tp-sample' + (it.ltr ? " ltr" : "") + '">' + (it.model || "") + "</div>" + (it.note ? '<h4>Why it works</h4><div>' + it.note + "</div>" : "") + (it.check && it.check.length ? '<h4>Check your group\'s version</h4><ul class="checklist2">' + it.check.map(function (c) { return "<li>" + c + "</li>"; }).join("") + "</ul>" : "") + "</div>";
      return '<div class="lab-item" id="' + id + '">' + head + pre + '<div class="ex-q">' + it.q + "</div><textarea class=\"tp-input\" id=\"" + id + '-t" rows="' + (it.rows || 3) + '"' + dir + ' placeholder="' + (it.ph || (it.ltr ? "Write your group's answer here…" : "اكتبوا إجابة المجموعة هنا…")) + '" oninput="LAB.typed(\'' + id + "')\"></textarea>" + hint + '<div><button class="lab-btn" style="margin-top:12px" onclick="LAB.reveal(\'' + id + "')\">Compare with the model →</button></div>" + '<div class="msg-warn" id="' + id + '-w">Write your group\'s attempt first, then compare. The learning happens in the attempt.</div>' + model + "</div>";
    }
    if (it.t === "mt") {
      it._rp = shuffle(it.p);
      var rows = it.p.map(function (pr, i) {
        var so = '<option value="">Choose…</option>' + it._rp.map(function (ri) { return '<option value="' + ri + '">' + strip(it.p[ri][1]) + "</option>"; }).join("");
        return '<div class="matchrow"><div>' + wrapAr(pr[0]) + '</div><select id="' + id + "-s" + i + '" onchange="LAB.msel(\'' + id + "')\">" + so + "</select></div>";
      }).join("");
      return '<div class="lab-item" id="' + id + '">' + head + pre + '<div class="ex-q">' + it.q + "</div>" + rows + '<div><button class="lab-btn" style="margin-top:12px" onclick="LAB.mcheck(\'' + id + "')\">Check matches</button></div>" + '<div class="ex-feedback" id="' + id + '-fb"></div></div>';
    }
    /* discuss */
    var pts = it.points ? '<details class="hint"><summary>💬 Points worth raising afterwards</summary><div>' + it.points + "</div></details>" : "";
    return '<div class="lab-item" id="' + id + '">' + head + pre + '<div class="ex-q">' + it.q + '</div><textarea class="tp-input" id="' + id + '-t" rows="3" dir="auto" style="text-align:start;" placeholder="Note your group\'s conclusion (one or two sentences)…" oninput="LAB.typed(\'' + id + "')\"></textarea>" + pts + "</div>";
  }

  function renderStation(st, si) {
    var sid = "st" + si, out = '<section class="stn" id="' + sid + '"><div class="stn-head"><div class="stn-eyebrow"><span class="stn-tag">Station ' + (si + 1) + " of " + CFG.stations.length + "</span>" + (st.page ? '<span class="pgbadge">' + st.page + "</span>" : "") + (st.time ? '<span class="timebadge">⏱ ' + st.time + "</span>" : "") + '<span class="timebadge" id="' + sid + '-cnt"></span></div><h2>' + st.title + "</h2>" + (st.goal ? '<p class="stn-goal"><b>Goal:</b> ' + st.goal + "</p>" : "") + '</div><div class="stn-body">';
    if (st.read) out += '<div class="readbox"><span class="boxlab">📖 Read first' + (st.page ? " · " + st.page : "") + "</span>" + st.read + "</div>";
    if (st.learn) out += '<div class="learnbox"><span class="boxlab">💡 Learn · explanation and examples</span>' + st.learn + "</div>";
    if (st.rule) out += '<div class="rulebox"><span class="boxlab">📌 Remember</span>' + st.rule + "</div>";
    out += '<h3 style="font-size:15px;margin:22px 0 4px;color:var(--ac-ink)">✍️ Try it as a group</h3>';
    var n = 0;
    st.items.forEach(function (it, ii) { n++; var id = "s" + si + "i" + ii; ITEMS[id] = it; ORDER.push(id); out += renderItem(it, id, n); });
    if (st.check && st.check.length) {
      out += '<div class="grpbox"><span class="boxlab">✅ Group checkpoint</span><ul class="cpk">' + st.check.map(function (c, ci) { var cid = sid + "c" + ci; return '<li><input type="checkbox" id="' + cid + '" onchange="LAB.cp(\'' + cid + "',this.checked)\"><label for=\"" + cid + '">' + c + "</label></li>"; }).join("") + "</ul>" + (st.report ? '<p style="margin-top:10px"><b>Reporter:</b> ' + st.report + "</p>" : "") + "</div>";
    }
    return out + "</div></section>";
  }

  LAB.start = function (cfg) {
    CFG = cfg; KEY = "eng270w6lab:" + cfg.id; load();
    var root = $("lab-root");
    var jump = cfg.stations.map(function (s, i) { return '<a href="#st' + i + '" id="j' + i + '">' + (s.short || "Station " + (i + 1)) + "</a>"; }).join("");
    var bar = '<div class="lab-bar"><div class="lab-bar-in"><div class="lab-prog"><span id="prog-txt">0 / 0 done</span><div class="prog-bar-wrap"><div class="prog-bar" id="prog-bar" style="width:0%"></div></div></div><div class="lab-jump">' + jump + "</div></div></div>";
    var top = '<div class="lab-wrap">' + (cfg.intro || "") + '<div class="lab-box"><h2>👥 Set up your group</h2><p>Work in groups of 3 or 4. Choose roles and <b>rotate them at every station</b>.</p><div class="roles"><div class="role"><b>Reader</b>Reads the “Read first” box and each question aloud.</div><div class="role"><b>Writer</b>Types the group\'s answer in the box.</div><div class="role"><b>Checker</b>Compares with the model and the checklist.</div><div class="role"><b>Reporter</b>Explains one answer to the class.</div></div><div class="steps5"><div><span>1</span>Read</div><div><span>2</span>Learn</div><div><span>3</span>Try</div><div><span>4</span>Compare</div><div><span>5</span>Report</div></div><div class="grp-in"><input id="g-n" placeholder="Group name" aria-label="Group name"><input id="g-m" placeholder="Members (names)" aria-label="Members"></div></div>';
    var sts = cfg.stations.map(renderStation).join("");
    var end = '<div class="lab-box lab-final"><h2>🏁 Finish</h2><div id="final-msg"></div><div class="lab-actions" style="justify-content:center"><button class="lab-btn" onclick="LAB.copy()">📋 Copy our answers</button><button class="lab-btn ghost" onclick="window.print()">🖨️ Print / save as PDF</button><button class="lab-btn warn" id="reset-btn" onclick="LAB.reset()">Reset this workshop</button></div><p style="font-size:12.5px">Copy or print your group\'s answers and hand them in as your instructor directs. Your work is saved on this device only.</p><textarea class="export-area" id="export-area" readonly></textarea></div>' + (cfg.sibs || "") + "</div>";
    root.innerHTML = bar + top + sts + end;
    /* restore group + answers */
    $("g-n").value = state.g.n || ""; $("g-m").value = state.g.m || "";
    $("g-n").addEventListener("input", function () { state.g.n = this.value; save(); });
    $("g-m").addEventListener("input", function () { state.g.m = this.value; save(); });
    ORDER.forEach(restore);
    Object.keys(state.c).forEach(function (k) { var e = $(k); if (e) e.checked = !!state.c[k]; });
    progress();
  };

  /* ---------- interactions ---------- */
  LAB.pick = function (id, k) {
    var it = ITEMS[id]; if (state.a[id] && state.a[id].done) return;
    var oi = it._perm[k];
    state.a[id] = { done: 1, c: oi }; lockMcq(id, oi); save(); progress();
  };
  function lockMcq(id, oi) {
    var it = ITEMS[id], fb = $(id + "-fb"), ok = oi === it.a;
    it._perm.forEach(function (o, k) { var b = $(id + "-o" + k); b.disabled = true; if (o === it.a) b.classList.add("correct-ans"); else if (o === oi) b.classList.add("wrong-ans"); });
    fb.className = "ex-feedback show " + (ok ? "fb-correct" : "fb-wrong");
    fb.innerHTML = (ok ? "<b>Correct.</b> " : "<b>Not quite.</b> ") + it.w;
    var d = $(id + "-ok"); if (d) d.textContent = ok ? "✓ correct" : "✗ review";
    it._ok = ok;
  }
  LAB.typed = function (id) {
    var v = $(id + "-t").value, it = ITEMS[id]; state.a[id] = state.a[id] || {}; state.a[id].v = v;
    if (it.t === "ds") state.a[id].done = v.trim().length >= 8 ? 1 : 0;
    save(); if (it.t === "ds") progress();
  };
  LAB.reveal = function (id) {
    var v = $(id + "-t").value.trim();
    if (v.length < 8) { $(id + "-w").style.display = "block"; return; }
    $(id + "-w").style.display = "none"; $(id + "-model").classList.add("show");
    state.a[id] = state.a[id] || {}; state.a[id].v = $(id + "-t").value; state.a[id].done = 1; save(); progress();
  };
  LAB.msel = function (id) { var it = ITEMS[id]; state.a[id] = state.a[id] || {}; state.a[id].s = it.p.map(function (_, i) { return $(id + "-s" + i).value; }); save(); };
  LAB.mcheck = function (id) {
    var it = ITEMS[id], good = 0, all = true;
    it.p.forEach(function (_, i) { var s = $(id + "-s" + i); s.classList.remove("ok", "no"); if (s.value === "") { all = false; return; } if (parseInt(s.value, 10) === i) { s.classList.add("ok"); good++; } else s.classList.add("no"); });
    var fb = $(id + "-fb"); fb.className = "ex-feedback show " + (good === it.p.length ? "fb-correct" : "fb-wrong");
    fb.innerHTML = (all ? "<b>" + good + " of " + it.p.length + " matched correctly.</b> " : "<b>Choose an answer for every row first.</b> ") + (good === it.p.length ? it.w : (all ? "Discuss the red ones and try again. " + "" : ""));
    if (all) { state.a[id] = state.a[id] || {}; state.a[id].done = 1; state.a[id].good = good; state.a[id].s = it.p.map(function (_, i) { return $(id + "-s" + i).value; }); it._ok = good === it.p.length; var d = $(id + "-ok"); if (d) d.textContent = good + "/" + it.p.length; save(); progress(); }
  };
  LAB.cp = function (cid, v) { state.c[cid] = v ? 1 : 0; save(); };

  function restore(id) {
    var it = ITEMS[id], a = state.a[id]; if (!a) return;
    if (it.t === "mcq" && a.done) lockMcq(id, a.c);
    else if (it.t === "wr") { if (a.v) $(id + "-t").value = a.v; if (a.done) $(id + "-model").classList.add("show"); }
    else if (it.t === "ds") { if (a.v) $(id + "-t").value = a.v; }
    else if (it.t === "mt") { if (a.s) { a.s.forEach(function (v, i) { $(id + "-s" + i).value = v; }); } if (a.done) LAB.mcheck(id); }
  }

  function progress() {
    var done = 0, tot = ORDER.length;
    CFG.stations.forEach(function (st, si) {
      var d = 0, n = st.items.length;
      st.items.forEach(function (_, ii) { var a = state.a["s" + si + "i" + ii]; if (a && a.done) d++; });
      done += d; var c = $("st" + si + "-cnt"); if (c) c.textContent = d + "/" + n + " done";
      var j = $("j" + si); if (j) j.classList.toggle("done", d === n);
    });
    $("prog-txt").textContent = done + " / " + tot + " done";
    $("prog-bar").style.width = (tot ? Math.round(done / tot * 100) : 0) + "%";
    ORDER.forEach(function (id) { var a = state.a[id], d = $(id + "-ok"); if (d && a && a.done && ITEMS[id].t === "wr") d.textContent = "✓ compared"; if (d && a && a.done && ITEMS[id].t === "ds") d.textContent = "✓ noted"; });
    var fm = $("final-msg");
    if (fm) {
      var mc = 0, mg = 0; ORDER.forEach(function (id) { var it = ITEMS[id], a = state.a[id]; if (it.t === "mcq" && a && a.done) { mc++; if (a.c === it.a) mg++; } });
      fm.innerHTML = '<div class="score-big">' + (tot ? Math.round(done / tot * 100) : 0) + '%</div><div class="score-sub">' + done + " of " + tot + " tasks completed" + (mc ? " · " + mg + " of " + mc + " multiple-choice answers correct" : "") + "</div>";
    }
  }

  LAB.copy = function () {
    var L = [CFG.title, "Group: " + (state.g.n || "—"), "Members: " + (state.g.m || "—"), ""];
    CFG.stations.forEach(function (st, si) {
      L.push("=== " + strip(st.title) + " ===");
      st.items.forEach(function (it, ii) {
        var id = "s" + si + "i" + ii, a = state.a[id] || {};
        L.push((ii + 1) + ". " + strip(it.q));
        if (it.t === "mcq") L.push("   Answer: " + (a.done ? strip(it.o[a.c]) + (a.c === it.a ? " (correct)" : " (incorrect)") : "not answered"));
        else if (it.t === "wr" || it.t === "ds") L.push("   Answer: " + (a.v ? a.v.replace(/\n/g, " ") : "not answered"));
        else if (it.t === "mt") L.push("   Matches: " + (a.done ? (a.good + "/" + it.p.length + " correct") : "not checked"));
      });
      L.push("");
    });
    var txt = L.join("\n"), ta = $("export-area");
    ta.value = txt; ta.style.display = "block";
    try { if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(txt).then(function () { ta.placeholder = "Copied."; }, function () { ta.select(); }); return; } } catch (e) {}
    ta.select();
  };

  LAB.reset = function () {
    var b = $("reset-btn");
    if (!b.dataset.arm) { b.dataset.arm = "1"; b.textContent = "Click again to erase all answers"; setTimeout(function () { b.dataset.arm = ""; b.textContent = "Reset this workshop"; }, 4000); return; }
    try { localStorage.removeItem(KEY); } catch (e) {}
    location.reload();
  };
})();
