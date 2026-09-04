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

/* Week 3 per-listening exercise packs: each audio has its own vocabulary,
   listening instructions, objective checks, written responses and note check. */
(function () {
  if (!/week3\.html$/i.test(location.pathname)) return;
  var packs = [
    {title:'Listening 1 — Debate: first impressions as a starting point', time:'5:48',
      words:[['observation','a fact you can notice or check','“She arrived late” is an observation.'],['interpretation','an explanation of what an observation means','“She is careless” is an interpretation.'],['provisional','temporary and open to change','A first judgment should be provisional.']],
      first:'Read the two gist questions. Listen once without pausing. Write only keywords.', second:'Listen again. Pause only after a named example. Add details to your notes.',
      choice:[['The speakers’ final position is that first impressions…','are always accurate','should never be used','can be useful but must be tested and revised','2'],['An observation is different because it…','can be checked','is always positive','proves someone’s character','0']],
      writing:[['What two details do you remember about Salma?','late|quiet|eye contact|spoke|arrival'],['Give one alternative explanation for Salma’s behavior.','shy|transport|bus|unfamiliar|nervous|problem'],['Write the speakers’ qualified conclusion in one sentence.','useful|evidence|revise|context|provisional']],
      note:'Use short phrases only: Host A’s claim / Host B’s challenge / shared conclusion.'},
    {title:'Listening 2 — Evidence and a reliable judgment', time:'7:00',
      words:[['relevant','directly connected to the question','A prepared answer is relevant evidence of preparation.'],['reliable','able to be trusted','Repeated behavior is more reliable than one event.'],['criteria','standards used to evaluate something','A team can agree on criteria before judging work.']],
      first:'Read the two gist questions. Listen once for the main argument. Do not try to write every word.', second:'Listen again. Record one strong and one weak kind of evidence.',
      choice:[['A judgment becomes stronger when it is based on…','appearance only','repeated and relevant evidence','one person’s opinion','1'],['The best first response to limited information is to…','make a final decision immediately','treat the judgment as provisional','ignore every observation','1']],
      writing:[['Name one kind of evidence the hosts describe as stronger.','repeated|pattern|relevant|consistent|feedback'],['Name one detail that may be interesting but not relevant.','clothing|appearance|first reaction|one event'],['Give one criterion for judging a group-project member fairly.','deadline|task|contribution|evidence|communication|work']],
      note:'Create two columns: Strong evidence / Weak or incomplete evidence.'},
    {title:'Listening 3 — Bias, stereotypes, and context', time:'8:00',
      words:[['bias','a tendency that affects judgment, often unfairly','A bias can change which details we notice.'],['stereotype','a simplified belief about a group','A stereotype ignores individual differences.'],['context','the situation surrounding an event','Context can change the meaning of silence.']],
      first:'Read the questions. Listen once for the problem and one solution.', second:'Listen again and make a cause-and-effect map: observation → assumption → consequence → correction.',
      choice:[['Bias can affect a judgment because it can…','make us notice and interpret details unfairly','guarantee accurate conclusions','remove all assumptions','0'],['A positive stereotype can still be harmful because it…','ignores individual differences','is always supported by evidence','makes every decision easy','0']],
      writing:[['Write one example of a context that could change the meaning of silence.','shy|language|confidence|listening|polite|uncertain'],['What correction can reduce bias before a decision?','criteria|context|evidence|perspective|wait|repeat'],['Write one possible consequence of a stereotype.','unfair|pressure|ignore|decision|opportunity|difference']],
      note:'Use arrows. Do not write full sentences until the final “correction” box.'},
    {title:'Listening 4 — A qualified conclusion', time:'8:18',
      words:[['claim','the main position someone argues for','A claim should be supported with evidence.'],['limitation','something that makes a conclusion less certain','A limitation reminds us what we do not know.'],['recommendation','advice about what should happen next','The hosts recommend gathering more evidence.']],
      first:'Listen once for the final answer to the Unit 1 question.', second:'Listen again and identify the structure: claim → limitation → recommendation.',
      choice:[['A qualified conclusion usually includes…','only a strong opinion','a claim, a limitation, and a recommendation','a list of unrelated examples','1'],['The best final approach to a first impression is to…','treat it as a hypothesis to test','accept it as a final verdict','never notice behavior','0']],
      writing:[['Write the central claim in your own words.','first|impression|useful|not final|evidence|hypothesis'],['What limitation makes the conclusion qualified?','limited|context|bias|incomplete|evidence|time'],['What is one recommendation for fairer judgment?','evidence|context|criteria|perspective|repeat|revise']],
      note:'Write only three lines: claim / limitation / recommendation. Then turn them into a 60-second spoken summary.'}
  ];
  var sections = document.querySelectorAll('.audio');
  sections.forEach(function(audioBox, index) {
    var p = packs[index]; if (!p || audioBox.parentNode.querySelector('.listening-pack')) return;
    var vocab = p.words.map(function(w){return '<div class="word"><b>'+w[0]+'</b>'+w[1]+'<br><em style="color:var(--text-2)">'+w[2]+'</em></div>';}).join('');
    var choices = p.choice.map(function(q, i){return '<div class="q"><b>'+q[0]+'</b><label><select data-answer="'+q[4]+'"><option value="">Choose…</option><option value="0">'+q[1]+'</option><option value="1">'+q[2]+'</option><option value="2">'+q[3]+'</option></select></label></div>';}).join('');
    var writing = p.writing.map(function(q, i){return '<div class="q"><b>'+q[0]+'</b><textarea rows="2" data-words="'+q[1]+'" placeholder="Write a short answer in your own words."></textarea></div>';}).join('');
    var wrap = document.createElement('div'); wrap.className = 'box listening-pack';
    wrap.innerHTML = '<h3 style="margin:0 0 8px;color:var(--ac-ink)">'+p.title+' <span class="tag">MP3 · '+p.time+'</span></h3>'+
      '<b>New vocabulary — read before playing</b><div class="grid" style="margin:8px 0 14px">'+vocab+'</div>'+
      '<div class="box"><b>First listen:</b> '+p.first+'<br><b>Second listen:</b> '+p.second+'</div>'+
      '<div class="notes"><div class="note"><b>Note-taking target</b>'+p.note+'</div><div class="note"><b>After listening</b>Compare notes with a partner. Add one missing detail in a different colour.</div></div>'+
      '<div class="box"><b>Quick check — choose an answer</b>'+choices+'</div>'+
      '<div class="box"><b>Write and evaluate</b>'+writing+'<button class="check pack-check">Check my work</button><p class="result" hidden></p><details class="key"><summary>Show self-check guidance</summary><div>Your wording can be different. A strong answer uses a relevant idea from the audio, one target word correctly, and enough detail to explain the point. If an answer is marked “review,” compare your notes with a partner and listen to the relevant section again.</div></details></div>';
    audioBox.insertAdjacentElement('beforebegin', wrap);
    wrap.querySelector('.pack-check').addEventListener('click', function(){
      var selects = wrap.querySelectorAll('select'), texts = wrap.querySelectorAll('textarea'), correct=0, written=0;
      selects.forEach(function(s){if(s.value===s.getAttribute('data-answer')) correct++;});
      texts.forEach(function(t){var keys=t.getAttribute('data-words').split('|'); if(t.value.trim().length>10 && keys.some(function(k){return t.value.toLowerCase().indexOf(k)>-1;})) written++;});
      var r=wrap.querySelector('.result'); r.hidden=false;
      r.textContent='Dropdown checks: '+correct+'/'+selects.length+'. Written answers showing a relevant keyword: '+written+'/'+texts.length+'. '+(correct===selects.length&&written===texts.length?'Excellent. Now explain one answer aloud without reading.':'Review any item marked incomplete; different wording is welcome when it uses a relevant idea from the audio.');
    });
  });
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
