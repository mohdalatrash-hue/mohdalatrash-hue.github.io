/* ENG 270 reading-lab engine: MCQ with per-option "why wrong" and a back-to-the-text pointer */
var RL=(function(){
var cfg,st,cur=0;
function shuf(n){var a=[],i,j,t;for(i=0;i<n;i++)a.push(i);for(i=n-1;i>0;i--){j=Math.floor(Math.random()*(i+1));t=a[i];a[i]=a[j];a[j]=t;}return a;}
function src(q){return q.p?'<div class="rl-src">&#128214; Back to the text &middot; <b>'+q.p+'</b>'+(q.t?' &mdash; '+q.t:'')+'</div>':'';}
function render(){
 var root=document.getElementById('rl-root'),tabs='',panels='';
 cfg.parts.forEach(function(p,pi){
  tabs+='<button class="rl-tab'+(pi===0?' act':'')+'" id="rl-tab-'+pi+'" onclick="RL.show('+pi+')">'+p.title+'<small id="rl-ts-'+pi+'"></small></button>';
  var qs=p.qs.map(function(q,qi){
   st[pi][qi].ord=shuf(q.o.length);
   return ((q.h&&(qi===0||p.qs[qi-1].h!==q.h))?'<h3 class="rl-stage">'+q.h+'</h3>':'')+'<div class="rl-card" id="rl-c-'+pi+'-'+qi+'"><div class="rl-num">Question '+(qi+1)+' of '+p.qs.length+'</div>'+(q.ctx?'<div class="rl-ctx">'+q.ctx+'</div>':'')+'<div class="rl-q">'+q.q+'</div>'+
    st[pi][qi].ord.map(function(oi){return '<button class="ex-opt" id="rl-o-'+pi+'-'+qi+'-'+oi+'" onclick="RL.pick('+pi+','+qi+','+oi+')">'+q.o[oi]+'</button>';}).join('')+
    '<div class="rl-fb" id="rl-f-'+pi+'-'+qi+'"></div></div>';}).join('');
  panels+='<div class="rl-panel'+(pi===0?' act':'')+'" id="rl-p-'+pi+'"><div class="rl-read">'+p.read+'</div><div class="rl-bar"><i id="rl-b-'+pi+'"></i></div>'+qs+'</div>';
 });
 tabs+='<button class="rl-tab" id="rl-tab-s" onclick="RL.show(-1)">&#127942; My score</button>';
 panels+='<div class="rl-panel" id="rl-p-s"></div>';
 root.innerHTML='<div class="rl-tabs">'+tabs+'</div>'+panels;
 cfg.parts.forEach(function(p,pi){upd(pi);});
}
function upd(pi){
 var p=cfg.parts[pi],done=0,good=0;
 st[pi].forEach(function(s){if(s.done){done++;if(s.first)good++;}});
 document.getElementById('rl-b-'+pi).style.width=(done/p.qs.length*100)+'%';
 document.getElementById('rl-ts-'+pi).textContent=done?(' '+good+'/'+p.qs.length):'';
}
function pick(pi,qi,oi){
 var q=cfg.parts[pi].qs[qi],s=st[pi][qi];
 if(s.done)return;
 var b=document.getElementById('rl-o-'+pi+'-'+qi+'-'+oi),fb=document.getElementById('rl-f-'+pi+'-'+qi);
 if(s.first===null)s.first=(oi===q.a);
 if(oi===q.a){
  s.done=true;b.classList.add('correct-ans');
  s.ord.forEach(function(k){document.getElementById('rl-o-'+pi+'-'+qi+'-'+k).disabled=true;});
  fb.className='rl-fb show ok';
  fb.innerHTML='<b>'+(s.first?'Correct.':'Correct this time (second try, so it is not counted).')+'</b> '+q.ok+src(q);
  upd(pi);
 }else{
  b.classList.add('wrong-ans');b.disabled=true;
  var why=(typeof q.no==='string')?q.no:(q.no[oi]||'');
  fb.className='rl-fb show no';
  fb.innerHTML='<b>Not quite.</b> '+why+src(q)+'<div style="margin-top:6px;"><b>Try again:</b> pick another answer.</div>';
 }
}
function show(pi){
 cur=pi;
 document.querySelectorAll('.rl-panel').forEach(function(e){e.classList.remove('act');});
 document.querySelectorAll('.rl-tab').forEach(function(e){e.classList.remove('act');});
 if(pi<0){document.getElementById('rl-p-s').classList.add('act');document.getElementById('rl-tab-s').classList.add('act');summary();}
 else{document.getElementById('rl-p-'+pi).classList.add('act');document.getElementById('rl-tab-'+pi).classList.add('act');}
 window.scrollTo({top:document.getElementById('rl-root').offsetTop-70,behavior:'smooth'});
}
function summary(){
 var tot=0,good=0,ans=0,rows='',miss='';
 cfg.parts.forEach(function(p,pi){
  var d=0,g=0;
  st[pi].forEach(function(s,qi){tot++;if(s.done){d++;ans++;if(s.first)g++;else miss+='<li><b>'+p.title+' &middot; Q'+(qi+1)+'</b> &mdash; reread <b>'+(p.qs[qi].p||'')+'</b></li>';}});
  good+=g;rows+='<li><b>'+p.title+'</b>: '+g+' of '+p.qs.length+' right first time'+(d<p.qs.length?' ('+(p.qs.length-d)+' unanswered)':'')+'</li>';
 });
 var pct=tot?Math.round(good/tot*100):0;
 document.getElementById('rl-p-s').innerHTML='<div class="rl-sum"><div class="rl-big">'+pct+'%</div><div>'+good+' of '+tot+' right on the first try &middot; '+ans+' answered</div><ul class="rl-miss">'+rows+'</ul>'+
  (miss?'<h4 style="margin:16px 0 4px;">Pages to reread</h4><ul class="rl-miss">'+miss+'</ul>':'')+
  '<button class="rl-btn" onclick="RL.reset()">Start again</button></div>';
}
function reset(){
 st=cfg.parts.map(function(p){return p.qs.map(function(){return{first:null,done:false};});});
 render();show(0);
}
function init(c){
 cfg=c;
 st=cfg.parts.map(function(p){return p.qs.map(function(){return{first:null,done:false};});});
 render();
}
return{init:init,pick:pick,show:show,reset:reset};
})();
