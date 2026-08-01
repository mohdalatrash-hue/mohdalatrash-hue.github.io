/* ENG 494 Week 6 — private, device-local workshop interactions */
(function(){
  "use strict";
  var KEY="eng494_drama_week6_v2";
  var page=(location.pathname.split("/").pop()||"").toLowerCase();
  function load(){try{return JSON.parse(localStorage.getItem(KEY))||{};}catch(e){return {};}}
  function save(d){try{localStorage.setItem(KEY,JSON.stringify(d));}catch(e){}}
  function pageData(){var d=load();d.pages=d.pages||{};d.pages[page]=d.pages[page]||{fields:{},done:{},choices:{}};return d;}
  function qsa(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s));}

  function initFields(){
    var d=pageData(),p=d.pages[page];
    qsa("[data-save]").forEach(function(el){
      var k=el.getAttribute("data-save");
      if(Object.prototype.hasOwnProperty.call(p.fields,k))el.value=p.fields[k];
      el.addEventListener("input",function(){var x=pageData();x.pages[page].fields[k]=el.value;save(x);});
    });
  }

  function updateProgress(){
    var acts=qsa("[data-activity]"),d=pageData().pages[page],n=0;
    acts.forEach(function(a){var yes=!!d.done[a.getAttribute("data-activity")];a.classList.toggle("done",yes);var b=a.querySelector(".complete-btn");if(b)b.textContent=yes?"Completed — tap to reopen":"Mark activity complete";if(yes)n++;});
    qsa("[data-progress-fill]").forEach(function(el){el.style.width=(acts.length?Math.round(n/acts.length*100):0)+"%";});
    qsa("[data-progress-copy]").forEach(function(el){el.textContent=n+" of "+acts.length+" activities complete";});
  }
  function initCompletion(){
    qsa("[data-activity]").forEach(function(a){var b=a.querySelector(".complete-btn");if(!b)return;b.addEventListener("click",function(){var x=pageData(),k=a.getAttribute("data-activity");x.pages[page].done[k]=!x.pages[page].done[k];save(x);updateProgress();});});
    updateProgress();
  }

  function initChoiceSets(){
    qsa("[data-choice-set]").forEach(function(set,si){
      var answer=set.getAttribute("data-answer"),fb=set.querySelector(".feedback"),buttons=qsa("[data-value]",set),key=set.getAttribute("data-choice-set")||("set"+si),prior=pageData().pages[page].choices[key];
      if(prior){buttons.forEach(function(b){if(b.getAttribute("data-value")===prior)b.classList.add("selected");});}
      buttons.forEach(function(btn){btn.addEventListener("click",function(){
        buttons.forEach(function(b){b.classList.remove("selected","correct","wrong");});
        btn.classList.add("selected");
        if(answer){btn.classList.add(btn.getAttribute("data-value")===answer?"correct":"wrong");}
        if(fb){fb.classList.add("show");fb.classList.add(answer&&btn.getAttribute("data-value")===answer?"good":"note");}
        var x=pageData();x.pages[page].choices[key]=btn.getAttribute("data-value");save(x);
      });});
    });
  }

  function initReveals(){qsa("[data-reveal]").forEach(function(b){b.addEventListener("click",function(){var el=document.getElementById(b.getAttribute("data-reveal"));if(el){el.hidden=!el.hidden;b.setAttribute("aria-expanded",String(!el.hidden));}});});}

  function initBudget(){
    qsa("[data-budget]").forEach(function(box,bi){
      var max=+(box.getAttribute("data-budget")||5),count=box.querySelector("[data-budget-count]"),buttons=qsa(".token-btn",box),key="budget-"+bi,prior=pageData().pages[page].choices[key]||[];
      buttons.forEach(function(b){if(prior.indexOf(b.textContent.trim())>=0)b.classList.add("selected");});
      function paint(){var n=buttons.filter(function(b){return b.classList.contains("selected");}).length;if(count)count.textContent=n+" / "+max+" changes spent";}
      buttons.forEach(function(b){b.addEventListener("click",function(){var n=buttons.filter(function(x){return x.classList.contains("selected");}).length;if(!b.classList.contains("selected")&&n>=max){var f=box.querySelector(".feedback");if(f){f.textContent="Your adaptation budget is full. Remove one change before adding another.";f.className="feedback show note";}return;}b.classList.toggle("selected");var x=pageData();x.pages[page].choices[key]=buttons.filter(function(t){return t.classList.contains("selected");}).map(function(t){return t.textContent.trim();});save(x);paint();});});paint();
    });
  }

  function initRoles(){qsa("[data-role-group]").forEach(function(g,gi){var bs=qsa(".role-btn,.credit-btn",g),key="role-"+gi,prior=pageData().pages[page].choices[key],out=g.querySelector("[data-role-output]");if(prior){bs.forEach(function(b){if(b.textContent.trim()===prior){b.classList.add("selected");if(out)out.textContent=b.getAttribute("data-note")||b.textContent;}});}bs.forEach(function(b){b.addEventListener("click",function(){bs.forEach(function(x){x.classList.remove("selected");});b.classList.add("selected");if(out)out.textContent=b.getAttribute("data-note")||b.textContent;var x=pageData();x.pages[page].choices[key]=b.textContent.trim();save(x);});});});}
  function initRubrics(){qsa("input[type=range][data-output]").forEach(function(r){var o=document.getElementById(r.getAttribute("data-output"));function u(){if(o)o.value=r.value;}r.addEventListener("input",u);u();});}

  function shuffle(a){for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t;}return a;}
  function initQuiz(){
    var qs=window.DRAMA_QUIZ,host=document.getElementById("aq-container"),score=document.getElementById("aq-score"),bar=document.getElementById("aq-prog");
    if(!qs||!host)return;var order=shuffle(qs.map(function(q,i){return i;})),at=0,points=0;
    function render(){
      if(at>=order.length){finish();return;}var q=qs[order[at]],opts=shuffle(q.options.map(function(o,i){return {text:o,index:i};}));
      if(bar)bar.style.width=Math.round(at/order.length*100)+"%";
      host.innerHTML='<div class="activity" style="margin-top:0"><div class="act-head"><div class="act-num">'+(at+1)+'</div><div><h2>Question '+(at+1)+' of '+order.length+'</h2><div class="act-meta">'+q.tag+'</div></div></div><p class="act-lead" style="font-weight:700;color:var(--text)">'+q.question+'</p><div id="quiz-options">'+opts.map(function(o){return '<button class="quiz-opt" data-index="'+o.index+'">'+o.text+'</button>';}).join("")+'</div><div class="feedback" id="quiz-feedback"></div><button class="complete-btn" id="quiz-next" style="display:none">Next question</button></div>';
      qsa(".quiz-opt",host).forEach(function(b){b.addEventListener("click",function(){
        if(b.disabled)return;var picked=+b.getAttribute("data-index");qsa(".quiz-opt",host).forEach(function(x){x.disabled=true;var ix=+x.getAttribute("data-index");if(ix===q.answer)x.classList.add("correct");else if(x===b&&picked!==q.answer)x.classList.add("wrong");});
        if(picked===q.answer)points++;var f=document.getElementById("quiz-feedback");f.textContent=q.feedback;f.className="feedback show "+(picked===q.answer?"good":"note");document.getElementById("quiz-next").style.display="inline-block";
      });});
      document.getElementById("quiz-next").addEventListener("click",function(){at++;render();});
    }
    function finish(){var pct=Math.round(points/order.length*100);host.style.display="none";if(bar)bar.style.width="100%";score.style.display="block";score.innerHTML='<div class="score-big">'+pct+'%</div><div class="score-sub">'+points+' / '+order.length+' correct</div><p class="act-lead" style="margin:14px auto;max-width:560px">'+(pct>=80?"Strong work: you are making decisions for the actor, the production and the audience—not only replacing words.":"Review the classification ladder, speakability test and modernization decisions, then retry.")+'</p><button class="complete-btn" id="quiz-retry">Retry quiz</button>';document.getElementById("quiz-retry").addEventListener("click",function(){order=shuffle(qs.map(function(q,i){return i;}));at=0;points=0;host.style.display="block";score.style.display="none";render();});}
    render();
  }

  function initPrint(){qsa("[data-print]").forEach(function(b){b.addEventListener("click",function(){window.print();});});}
  function init(){initFields();initCompletion();initChoiceSets();initReveals();initBudget();initRoles();initRubrics();initQuiz();initPrint();}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
