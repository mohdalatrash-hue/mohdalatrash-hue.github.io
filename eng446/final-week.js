(function(){
  'use strict';
  const STORE='eng446-final-paper-lab-v1';
  let saved={};
  try{saved=JSON.parse(localStorage.getItem(STORE)||'{}')}catch(e){saved={}}
  const page=document.body.dataset.labPage||'overview';
  const pageData=saved[page]||{fields:{},done:{},checks:{},quiz:{}};
  pageData.fields=pageData.fields||{};pageData.done=pageData.done||{};pageData.checks=pageData.checks||{};pageData.quiz=pageData.quiz||{};
  saved[page]=pageData;
  let saveTimer;
  function persist(){
    clearTimeout(saveTimer);saveTimer=setTimeout(function(){
      localStorage.setItem(STORE,JSON.stringify(saved));
      document.querySelectorAll('[data-save-state]').forEach(el=>{el.textContent='Saved on this device';});
    },180);
  }
  function updateProgress(){
    const buttons=[...document.querySelectorAll('.complete-btn')];
    const done=buttons.filter(b=>b.classList.contains('done')).length;
    const pct=buttons.length?Math.round(done/buttons.length*100):0;
    document.querySelectorAll('.lab-progress-fill').forEach(el=>el.style.width=pct+'%');
    document.querySelectorAll('.lab-progress-label').forEach(el=>el.textContent=done+'/'+buttons.length+' complete');
  }
  document.querySelectorAll('[data-lab-field]').forEach((el,i)=>{
    const key=el.dataset.labField||('field-'+i);
    if(pageData.fields[key]!==undefined)el.value=pageData.fields[key];
    const count=document.querySelector('[data-word-count="'+key+'"]');
    function words(){
      if(!count)return;const n=el.value.trim()?el.value.trim().split(/\s+/).length:0;count.textContent=n+' words';
    }
    words();
    el.addEventListener('input',()=>{pageData.fields[key]=el.value;words();persist();});
  });
  document.querySelectorAll('.complete-btn').forEach((btn,i)=>{
    const key=btn.dataset.complete||('task-'+i);
    if(pageData.done[key]){btn.classList.add('done');btn.textContent='✓ Completed';}
    btn.addEventListener('click',()=>{
      pageData.done[key]=!pageData.done[key];btn.classList.toggle('done',pageData.done[key]);btn.textContent=pageData.done[key]?'✓ Completed':'Mark workshop complete';persist();updateProgress();
    });
  });
  document.querySelectorAll('[data-lab-check]').forEach((el,i)=>{
    const key=el.dataset.labCheck||('check-'+i);el.checked=!!pageData.checks[key];
    el.addEventListener('change',()=>{pageData.checks[key]=el.checked;persist();});
  });
  document.querySelectorAll('[data-reveal]').forEach(btn=>{
    btn.addEventListener('click',()=>{const box=document.getElementById(btn.dataset.reveal);if(!box)return;box.classList.toggle('open');btn.setAttribute('aria-expanded',box.classList.contains('open'));});
  });
  document.querySelectorAll('[data-quiz-answer]').forEach((el,i)=>{
    const key=el.dataset.quizKey||('quiz-'+i);if(pageData.quiz[key])el.value=pageData.quiz[key];
    const feedback=el.parentElement.querySelector('.quiz-feedback');
    function grade(){
      if(!feedback||!el.value){if(feedback)feedback.textContent='';return}
      const good=el.value===el.dataset.quizAnswer;feedback.className='quiz-feedback '+(good?'good':'bad');feedback.textContent=good?'Correct — keep that editorial rule.':'Try again — trace the claim back to the evidence.';
    }
    grade();el.addEventListener('change',()=>{pageData.quiz[key]=el.value;grade();persist();});
  });
  document.querySelectorAll('[data-copy-target]').forEach(btn=>{
    btn.addEventListener('click',async()=>{const el=document.getElementById(btn.dataset.copyTarget);if(!el)return;try{await navigator.clipboard.writeText(el.value||el.textContent);btn.textContent='Copied';setTimeout(()=>btn.textContent='Copy output',1400)}catch(e){el.select&&el.select();}});
  });
  document.querySelectorAll('[data-export-lab]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const order=['sunday','monday','tuesday'];
      const lines=['ENG 446 — Full-Paper Imitation Laboratory','Saved group notes','Exported: '+new Date().toLocaleString(),''];
      let responseCount=0;
      order.forEach(day=>{
        const data=saved[day];
        if(!data)return;
        lines.push('=== '+day.toUpperCase()+' ===');
        Object.entries(data.fields||{}).forEach(([key,value])=>{
          const clean=String(value||'').trim();
          if(!clean)return;
          responseCount+=1;
          lines.push('',key.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase())+':',clean);
        });
        const finished=Object.entries(data.done||{}).filter(([,value])=>value).map(([key])=>key.replace(/-/g,' '));
        if(finished.length)lines.push('','Completed workshops: '+finished.join(', '));
        lines.push('');
      });
      const state=document.querySelector('[data-export-state]');
      if(!responseCount){
        if(state)state.textContent='No written responses are saved yet. Begin Sunday, then export.';
        return;
      }
      const blob=new Blob([lines.join('\n')],{type:'text/plain;charset=utf-8'});
      const url=URL.createObjectURL(blob);
      const link=document.createElement('a');
      link.href=url;link.download='ENG446-Full-Paper-Lab-Notes-'+new Date().toISOString().slice(0,10)+'.txt';
      document.body.appendChild(link);link.click();link.remove();URL.revokeObjectURL(url);
      if(state)state.textContent=responseCount+' saved responses downloaded.';
    });
  });
  document.querySelectorAll('[data-print]').forEach(btn=>btn.addEventListener('click',()=>window.print()));
  const reset=document.querySelector('[data-reset-page]');
  if(reset)reset.addEventListener('click',()=>{if(confirm('Clear the saved answers and completion marks for this page?')){delete saved[page];localStorage.setItem(STORE,JSON.stringify(saved));location.reload();}});
  updateProgress();
})();
