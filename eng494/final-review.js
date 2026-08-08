(function(){
"use strict";

var BANK=window.ENG494_FINAL_BANK;
if(!BANK)return;

var KEY="eng494_final_exam_lab_v1";
var state=null;
var timerId=null;
var startScreen=document.getElementById("start-screen");
var app=document.getElementById("exam-app");
var panelsHost=document.getElementById("panels");
var tabsHost=document.getElementById("unit-tabs");
var results=document.getElementById("results");
var submitRow=document.getElementById("submit-row");

function esc(value){return String(value==null?"":value).replace(/[&<>"']/g,function(ch){return({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[ch];});}
function hash(text){var h=2166136261;for(var i=0;i<text.length;i++){h^=text.charCodeAt(i);h=Math.imul(h,16777619);}return h>>>0;}
function seededShuffle(items,seedText){var out=items.slice(),seed=hash(BANK.version+seedText);for(var i=out.length-1;i>0;i--){seed=(Math.imul(seed,1664525)+1013904223)>>>0;var j=seed%(i+1),tmp=out[i];out[i]=out[j];out[j]=tmp;}return out;}
function unit(id){return BANK.units.find(function(u){return u.id===id;});}
function freshState(){var now=Date.now();return{version:BANK.version,startedAt:now,deadline:now+BANK.durationMinutes*60000,active:"u1",responses:{},texts:{},selfChecks:{},submitted:false,objectiveScore:0,unitScores:{},expired:false};}
function loadState(){try{var saved=JSON.parse(localStorage.getItem(KEY));if(saved&&saved.version===BANK.version)return saved;}catch(e){}return null;}
function save(){if(!state)return;try{localStorage.setItem(KEY,JSON.stringify(state));var s=document.getElementById("save-state");if(s)s.textContent="Saved locally";}catch(e){var s2=document.getElementById("save-state");if(s2)s2.textContent="Could not save";}}
function clearSaved(){try{localStorage.removeItem(KEY);}catch(e){}}

function answerStarted(q){var value=state.responses[q.id];if(q.type==="multi")return Array.isArray(value)&&value.length>0;if(q.type==="match")return value&&Object.keys(value).some(function(k){return !!value[k];});return typeof value==="string"&&value!=="";}
function answerComplete(q){var value=state.responses[q.id];if(q.type==="multi")return Array.isArray(value)&&value.length>0;if(q.type==="match")return value&&q.rows.every(function(row){return !!value[row.id];});return typeof value==="string"&&value!=="";}
function objectiveAnswered(){return BANK.objective.filter(answerComplete).length;}
function textAnswered(){return BANK.evaluations.filter(function(c){return wordCount(state.texts[c.id]||"")>0;}).length;}
function wordCount(value){var t=String(value||"").trim();return t?t.split(/\s+/).length:0;}
function clampWords(value,max){var words=String(value).trim().split(/\s+/);if(words.length<=max)return value;return words.slice(0,max).join(" ");}

function optionHTML(q,opt,inputType){var response=state.responses[q.id];var checked=inputType==="checkbox"?(Array.isArray(response)&&response.indexOf(opt.id)>-1):(response===opt.id);return '<label class="opt"><input type="'+inputType+'" name="'+esc(q.id)+'" value="'+esc(opt.id)+'"'+(checked?' checked':'')+(state.submitted?' disabled':'')+'><span>'+esc(opt.text)+'</span></label>';}
function renderQuestion(q,index){var u=unit(q.unit),html='<article class="q-card" id="card-'+esc(q.id)+'" data-question="'+esc(q.id)+'" style="--unit-color:'+esc(u.color)+'">';
  html+='<div class="q-top"><span class="q-num">'+(index+1)+'</span><span class="q-tag">'+esc(q.tag)+'</span><span class="q-mark">1 mark</span></div>';
  if(q.source)html+='<div class="q-source">'+esc(q.source)+'</div>';
  html+='<p class="q-prompt">'+esc(q.prompt)+'</p>';
  if(q.type==="match"){
    var response=state.responses[q.id]||{};
    html+='<div class="match-grid">'+q.rows.map(function(row){var choices=seededShuffle(q.choices,q.id+row.id);return '<label class="match-row"><span>'+esc(row.text)+'</span><select data-match="'+esc(row.id)+'"'+(state.submitted?' disabled':'')+'><option value="">Choose…</option>'+choices.map(function(ch){return '<option value="'+esc(ch.id)+'"'+(response[row.id]===ch.id?' selected':'')+'>'+esc(ch.text)+'</option>';}).join('')+'</select></label>';}).join('')+'</div>';
  }else{
    var options=seededShuffle(q.options,q.id),inputType=q.type==="multi"?"checkbox":"radio";
    html+='<div class="opts">'+options.map(function(opt){return optionHTML(q,opt,inputType);}).join('')+'</div>';
  }
  html+='<div class="q-result" aria-live="polite"></div></article>';return html;
}
function renderCase(c,index){var u=unit(c.unit),value=state.texts[c.id]||"",checks=state.selfChecks[c.id]||[false,false,false,false];return '<article class="case-card" id="case-'+esc(c.id)+'" style="--unit-color:'+esc(u.color)+'">'
  +'<div class="case-unit">Unit '+u.n+' · '+esc(u.title)+' · 4 marks</div><div class="case-title">'+esc(c.title)+'</div>'
  +'<div class="case-block"><div class="case-pane"><div class="case-lab">Source / brief</div><div class="case-text">'+esc(c.source)+'</div></div><div class="case-pane ar"><div class="case-lab">Arabic version with issues</div><div class="case-text">'+esc(c.translation)+'</div></div></div>'
  +'<div class="case-prompt">'+esc(c.prompt)+'</div><div class="response-wrap"><textarea data-case="'+esc(c.id)+'" aria-label="Response to '+esc(c.title)+'"'+(state.submitted?' readonly':'')+'>'+esc(value)+'</textarea><div class="response-meta"><span>Recommended: 45–80 words</span><span id="wc-'+esc(c.id)+'">'+wordCount(value)+' / 80 words</span></div></div>'
  +'<div class="marker-guide"><h4>Four-point marker guide · tick only what your response actually earns</h4>'+c.guide.map(function(g,i){return '<label class="guide-item"><input type="checkbox" data-self="'+esc(c.id)+'" data-index="'+i+'"'+(checks[i]?' checked':'')+'><span><strong>'+(i+1)+' mark:</strong> '+esc(g)+'</span></label>';}).join('')+'<div class="self-score" id="self-'+esc(c.id)+'">Self-score: '+checks.filter(Boolean).length+' / 4</div></div></article>';}

function renderExam(){
  tabsHost.innerHTML=BANK.units.map(function(u){return '<button type="button" class="unit-tab" role="tab" data-panel="'+u.id+'">Unit '+u.n+' · '+esc(u.title)+'</button>';}).join('')+'<button type="button" class="unit-tab" role="tab" data-panel="cases">Short evaluations · 20 marks</button>';
  var qIndex=0;
  var html=BANK.units.map(function(u){var qs=BANK.objective.filter(function(q){return q.unit===u.id;});var body=qs.map(function(q){var out=renderQuestion(q,qIndex);qIndex++;return out;}).join('');return '<section class="panel" id="panel-'+u.id+'" role="tabpanel" style="--unit-color:'+u.color+'"><div class="panel-head"><div class="panel-eyebrow">Unit '+u.n+' · 6 automatically graded marks</div><h2>'+esc(u.title)+'</h2><p>'+esc(u.subtitle)+'</p></div>'+body+panelNav(u.id)+'</section>';}).join('');
  html+='<section class="panel" id="panel-cases" role="tabpanel"><div class="panel-head" style="--unit-color:#7c3aed"><div class="panel-eyebrow">40% short evaluation · 20 marks</div><h2>Evaluate translations with issues</h2><p>Five concise responses. Each one earns one mark per requirement: two diagnosed problems, one targeted repair, and one relevant course concept.</p></div>'+BANK.evaluations.map(renderCase).join('')+panelNav('cases')+'</section>';
  panelsHost.innerHTML=html;
  bindInputs();showPanel(state.active||"u1");if(state.submitted)applyGrade();updateProgress();
}
function panelNav(id){var ids=BANK.units.map(function(u){return u.id;}).concat(["cases"]),i=ids.indexOf(id),prev=i>0?ids[i-1]:null,next=i<ids.length-1?ids[i+1]:null;return '<div class="panel-nav">'+(prev?'<button type="button" class="btn btn-secondary btn-sm" data-go="'+prev+'">← Previous</button>':'<span></span>')+(next?'<button type="button" class="btn btn-primary btn-sm" data-go="'+next+'">Next section →</button>':'<button type="button" class="btn btn-primary btn-sm" data-jump-submit="1">Review and submit →</button>')+'</div>';}
function bindInputs(){
  panelsHost.querySelectorAll('input[type="radio"]').forEach(function(input){input.addEventListener("change",function(){if(state.submitted)return;state.responses[input.name]=input.value;save();updateProgress();});});
  panelsHost.querySelectorAll('.opts input[type="checkbox"]').forEach(function(input){input.addEventListener("change",function(){if(state.submitted)return;var list=state.responses[input.name]||[];if(input.checked&&list.indexOf(input.value)===-1)list.push(input.value);if(!input.checked)list=list.filter(function(x){return x!==input.value;});state.responses[input.name]=list;save();updateProgress();});});
  panelsHost.querySelectorAll('select[data-match]').forEach(function(select){select.addEventListener("change",function(){if(state.submitted)return;var card=select.closest('[data-question]'),qid=card.getAttribute('data-question'),row=select.getAttribute('data-match');state.responses[qid]=state.responses[qid]||{};state.responses[qid][row]=select.value;save();updateProgress();});});
  panelsHost.querySelectorAll('textarea[data-case]').forEach(function(area){area.addEventListener("input",function(){if(state.submitted)return;var id=area.getAttribute('data-case'),clamped=clampWords(area.value,80);if(clamped!==area.value)area.value=clamped;state.texts[id]=area.value;document.getElementById('wc-'+id).textContent=wordCount(area.value)+' / 80 words';save();updateProgress();});});
  panelsHost.querySelectorAll('input[data-self]').forEach(function(input){input.addEventListener("change",function(){if(!state.submitted)return;var id=input.getAttribute('data-self'),index=Number(input.getAttribute('data-index'));state.selfChecks[id]=state.selfChecks[id]||[false,false,false,false];state.selfChecks[id][index]=input.checked;document.getElementById('self-'+id).textContent='Self-score: '+state.selfChecks[id].filter(Boolean).length+' / 4';save();renderResults();});});
  panelsHost.querySelectorAll('[data-go]').forEach(function(btn){btn.addEventListener('click',function(){showPanel(btn.getAttribute('data-go'));window.scrollTo({top:0,behavior:'smooth'});});});
  panelsHost.querySelectorAll('[data-jump-submit]').forEach(function(btn){btn.addEventListener('click',function(){document.getElementById('submit-row').scrollIntoView({behavior:'smooth'});});});
}
function showPanel(id){state.active=id;document.querySelectorAll('.panel').forEach(function(p){p.classList.toggle('active',p.id==='panel-'+id);});document.querySelectorAll('.unit-tab').forEach(function(t){var on=t.getAttribute('data-panel')===id;t.classList.toggle('active',on);t.setAttribute('aria-selected',on?'true':'false');});save();}
function updateProgress(){var obj=objectiveAnswered(),txt=textAnswered(),total=obj+txt,pct=Math.round(total/35*100);document.getElementById('progress-copy').textContent=obj+' / 30 objective · '+txt+' / 5 evaluations started';document.getElementById('progress-fill').style.width=pct+'%';BANK.units.forEach(function(u){var complete=BANK.objective.filter(function(q){return q.unit===u.id;}).every(answerComplete);var tab=tabsHost.querySelector('[data-panel="'+u.id+'"]');if(tab)tab.classList.toggle('done',complete);});var ctab=tabsHost.querySelector('[data-panel="cases"]');if(ctab)ctab.classList.toggle('done',txt===5);}

function sameSet(a,b){if(!Array.isArray(a)||!Array.isArray(b)||a.length!==b.length)return false;return a.slice().sort().join('|')===b.slice().sort().join('|');}
function correct(q){var value=state.responses[q.id];if(q.type==='multi')return sameSet(value,q.answer);if(q.type==='match')return !!value&&q.rows.every(function(row){return value[row.id]===row.answer;});return value===q.answer;}
function answerLabel(q){if(q.type==='match')return q.rows.map(function(row){var choice=q.choices.find(function(c){return c.id===row.answer;});return row.text+' → '+(choice?choice.text:'');}).join(' | ');var ids=Array.isArray(q.answer)?q.answer:[q.answer];return ids.map(function(id){var opt=q.options.find(function(o){return o.id===id;});return opt?opt.text:id;}).join(' + ');}
function gradeObjective(){state.objectiveScore=0;state.unitScores={};BANK.units.forEach(function(u){state.unitScores[u.id]=0;});BANK.objective.forEach(function(q){if(correct(q)){state.objectiveScore++;state.unitScores[q.unit]++;}});state.submitted=true;save();applyGrade();renderResults();}
function applyGrade(){app.classList.add('submitted');submitRow.style.display='none';BANK.objective.forEach(function(q){var card=document.getElementById('card-'+q.id),isCorrect=correct(q);if(!card)return;card.classList.add('graded',isCorrect?'correct':'incorrect');card.querySelector('.q-result').innerHTML='<strong>'+(isCorrect?'Correct.':'Correct answer: '+esc(answerLabel(q)))+'</strong> '+esc(q.rationale);card.querySelectorAll('input,select').forEach(function(el){el.disabled=true;});});panelsHost.querySelectorAll('textarea').forEach(function(area){area.readOnly=true;});}
function selfTotal(){return BANK.evaluations.reduce(function(sum,c){return sum+((state.selfChecks[c.id]||[]).filter(Boolean).length);},0);}
function renderResults(){var self=selfTotal(),total=state.objectiveScore+self,deg=Math.round(total/50*360);results.hidden=false;results.style.setProperty('--score-deg',deg+'deg');var unitCards=BANK.units.map(function(u){var obj=state.unitScores[u.id]||0,c=BANK.evaluations.find(function(x){return x.unit===u.id;}),s=(state.selfChecks[c.id]||[]).filter(Boolean).length;return '<div class="ur"><div class="ur-n">Unit '+u.n+'</div><div class="ur-v">'+(obj+s)+' / 10</div><div class="ur-t">'+obj+'/6 objective · '+s+'/4 evaluation</div></div>';}).join('');var message=state.objectiveScore>=25?'Strong discrimination. Focus your review on the few concepts behind the missed items.':state.objectiveScore>=19?'A workable base, but several plausible distractors are still winning. Review the weakest unit before retrying.':'The result is diagnostic: revisit the unit workshops before another attempt, especially the reading-to-decision links.';
  results.innerHTML='<div class="result-head"><div class="score-ring"><div class="score-main">'+total+'</div><div class="score-sub">of 50 so far</div></div><div class="result-copy"><div class="section-label">Practice result</div><h2 id="results-title">Objective score: '+state.objectiveScore+' / 30</h2><p>'+esc(message)+' The remaining '+(20-self)+' marks depend on the four-point self-checks beneath the short responses. Tick a criterion only when your written answer clearly earns it.</p></div></div><div class="unit-results">'+unitCards+'</div><div class="final-total"><span>Current combined score</span><strong>'+total+' / 50</strong></div><div class="result-actions"><button type="button" class="btn btn-secondary btn-sm" id="print-result">Print / save review</button><button type="button" class="btn btn-primary btn-sm" id="review-cases">Mark short evaluations →</button><button type="button" class="danger-link" id="reset-attempt">Start a fresh attempt</button></div>';
  document.getElementById('print-result').addEventListener('click',function(){window.print();});document.getElementById('review-cases').addEventListener('click',function(){showPanel('cases');document.getElementById('panel-cases').scrollIntoView({behavior:'smooth'});});document.getElementById('reset-attempt').addEventListener('click',resetAttempt);
}

function startTimer(){if(timerId)clearInterval(timerId);function tick(){var remaining=Math.max(0,state.deadline-Date.now()),mins=Math.floor(remaining/60000),secs=Math.floor((remaining%60000)/1000),el=document.getElementById('timer');el.textContent=String(mins).padStart(2,'0')+':'+String(secs).padStart(2,'0');el.classList.toggle('danger',remaining<=10*60000);if(remaining<=0){clearInterval(timerId);if(!state.submitted){state.expired=true;gradeObjective();results.scrollIntoView({behavior:'smooth'});}}}tick();if(!state.submitted)timerId=setInterval(tick,1000);}
function enterExam(){startScreen.hidden=true;app.hidden=false;renderExam();startTimer();}
function begin(){state=freshState();save();enterExam();}
function resume(){state=loadState()||freshState();enterExam();}
function resetAttempt(){var btn=document.getElementById('reset-attempt');if(btn&&btn.getAttribute('data-armed')!=='1'){btn.setAttribute('data-armed','1');btn.textContent='Click again to clear this attempt';return;}clearSaved();state=freshState();save();app.classList.remove('submitted');results.hidden=true;submitRow.style.display='flex';renderExam();startTimer();window.scrollTo({top:0,behavior:'smooth'});}
function submit(){var incomplete=BANK.objective.filter(function(q){return !answerComplete(q);}).length,empty=5-textAnswered(),btn=document.getElementById('submit-exam');var detail=[];if(incomplete)detail.push(incomplete+' objective question'+(incomplete===1?'':'s'));if(empty)detail.push(empty+' short response'+(empty===1?'':'s'));if(detail.length&&btn.getAttribute('data-armed')!=='1'){btn.setAttribute('data-armed','1');btn.textContent='Submit anyway — '+detail.join(' · ')+' incomplete';btn.classList.remove('btn-primary');btn.classList.add('btn-secondary');return;}gradeObjective();results.scrollIntoView({behavior:'smooth'});}

document.getElementById('begin-exam').addEventListener('click',begin);
document.getElementById('resume-exam').addEventListener('click',resume);
document.getElementById('submit-exam').addEventListener('click',submit);
tabsHost.addEventListener('click',function(e){var tab=e.target.closest('[data-panel]');if(tab)showPanel(tab.getAttribute('data-panel'));});
var existing=loadState();if(existing){var resumeBtn=document.getElementById('resume-exam');resumeBtn.hidden=false;resumeBtn.textContent=existing.submitted?'Review saved result →':'Resume saved attempt →';}
})();
