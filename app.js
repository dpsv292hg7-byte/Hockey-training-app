'use strict';
const foam='1 Runde · Waden 15s/Seite; Schienbein 15s/Seite; Hamstrings, Gesäss, Quadrizeps, Adduktoren und IT-Band je 20s/Seite; BWS rollen 30s; BWS-Extension 30s; Nackenrotation 5/Seite.';
const prep1='1 Runde · MB Glute Bridge 8 (5s halten); Banded Hip Flexor Drive 10/Seite; Standing Y/T/W Raises 8/8/8; Side Plank Abduction 8/Seite; Scap Pull-up 10.';
const prep2='1 Runde · SL Glute Bridge 8/Seite; Standing Banded Hip Flexor Drive 10/Seite; Prone Swimmers 8; Side Plank Abduction & Adduction 8/Seite; Scap Pull-up 10.';
const sprintPrep='1 Runde · Oscillating Lunge Jump with Switch 10/Seite; MB Pogo Jump 12; MB Split Stance Pogo Jump 8/Seite; A-Skip 5/Seite; High Knees 14 m. Pausen nach Bedarf.';
const ex=(id,name,sets,reps,desc='',kind='Kraft')=>({id,name,sets,reps,desc,kind});
const plans=[
{id:'s1',name:'Session 1',focus:'Full Body Strength, Power & Speed',blocks:[{name:'A · Warm-up',items:[ex('foam1','Foam Roller Circuit',1,'1 Runde',foam,'Mobilität'),ex('mob1','Full Body Mobility Prep 1',1,'1 Runde',prep1,'Mobilität'),ex('sprintprep','Sprint Prep Circuit',1,'1 Runde',sprintPrep,'Sprint')]},{name:'B · Speed & Plyometrics',items:[ex('depth','Split Stance Depth Drop',3,'3 / Seite','Von der Box steigen und weich im Ausfallschritt landen.','Explosivität'),ex('sprint10','9 m Sprint',4,'9 m','Maximale Beschleunigung, Startposition variieren.','Sprint')]}]},
{id:'s2',name:'Session 2',focus:'Full Body Strength, Power & Explosiveness',blocks:[{name:'A · Warm-up',items:[ex('foam2','Foam Roller Circuit',1,'1 Runde',foam,'Mobilität'),ex('mob2','Full Body Mobility Prep 2',1,'1 Runde',prep2,'Mobilität')]},{name:'B · Explosivität',items:[ex('mbslam','MB Slam',2,'4','Medizinball über Kopf heben und explosiv auf den Boden werfen.','Explosivität'),ex('plyopush','Band Accelerated Plyometric Pushup',2,'4','Band am Rack befestigen, um den Brustkorb legen und explosiv hochdrücken.','Explosivität'),ex('around','Around the World MB Slam',2,'4','Medizinball um den Kopf kreisen und explosiv auf den Boden werfen.','Explosivität')]},{name:'C · Kraft',items:[ex('landmine','SA Landmine Press',3,'6–8 / Seite','Einarmig von Schulterhöhe schräg nach vorne oben drücken. RPE 8–10, 0–2 Wiederholungen Reserve.'),ex('split','DB RFE Split Squat',3,'6–8 / Seite','Hinteren Fuss auf Bank, vorderes Bein kontrolliert beugen. RPE 8–10, 0–2 Wiederholungen Reserve.'),ex('bird','Bird Dog Row',3,'6–8 / Seite','Hand und Knie auf Bank, anderes Bein strecken und Kurzhantel rudern. RPE 8–10.'),ex('ham','SL BOSU Hamstring Curls',2,'8–10 / Seite','Eine Ferse auf Ball, Hüfte anheben und Ferse zu dir ziehen.'),ex('pallof','Pallof Press with Overhead Reach',2,'10 / Seite','Seitlich zum Band/Kabel stehen, Hände vor und über Kopf führen, Rotation widerstehen. Mindestens zwei Sätze sichtbar.') ]},{name:'D · Zusatz & Kondition',items:[ex('pinch','Plate Pinch Carry',2,'18 m','Gewichtsscheibe mit Fingern greifen, aufrecht gehen.','Griffkraft'),ex('rollups','Kettlebell Rollups',2,'2','Arme gestreckt, kontrolliert auf- und abrollen.','Core'),ex('bikeana','Anaerobic Capacity Bike Intervals',5,'30s hart / 90s locker','3 Minuten aufwärmen, 5 Intervalle, danach 2 Minuten locker ausfahren.','Kondition')]}]},
{id:'s3',name:'Session 3',focus:'Full Body Strength, Power & Agility',blocks:[{name:'A · Vorbereitung',items:[ex('foam3','Foam Roller Circuit',1,'1 Runde',foam,'Mobilität')]},{name:'B · Power & Kraft',items:[ex('stepjump','Step-up Jump',2,'4 / Seite','Explosiver Sprung auf/aus dem Step-up. Mindestens zwei Sätze sichtbar.','Explosivität'),ex('bandsquat','Banded Box Squat',1,'Individuell festlegen','Schweres Gewicht; aus der Box explosiv aufstehen. Satz- und Wiederholungszahl bitte mit Trainer festlegen.'),ex('incline','Single-arm DB Incline Bench Press',1,'Individuell festlegen','Einarmiges Schrägbankdrücken. Satz- und Wiederholungszahl bitte mit Trainer festlegen.'),ex('bstance','DB B-stance Romanian Deadlift',2,'6–8 / Seite','Einbeinbetonte Hüftbeuge, RPE 8–10.') ]},{name:'C · Core & Assistenz',items:[ex('plankdrag','Kettlebell Plank Drag',3,'8–10 / Seite','Kettlebell im Plank unter dem Körper durchziehen.'),ex('traises','Incline T Raises',2,'15–20','Brust auf Schrägbank, Arme in T-Form anheben.'),ex('hanging','Hanging Leg Raises',2,'8–12','Kontrolliertes Beinheben im Hang.'),ex('soleus','Single Leg Soleus Raise Iso Hold',2,'30s / Seite','Knie gebeugt, Ferse anheben und halten.') ]},{name:'D · Kondition',items:[ex('bikerepeat','Repeat Sprint Ability Bike Intervals',2,'6 Intervalle','3 Min Warm-up; Satz 1: 6×8s maximal/22s locker; 3 Min locker; Satz 2: 6×10s maximal/20s locker; 3 Min locker.','Kondition')]}]}
];
const STORE='sl33-training-v3';let db;try{db=JSON.parse(localStorage.getItem(STORE))||{}}catch{db={}};db.logs ||= {};db.videos ||= {};db.completed ||= {};db.planned ||= {};db.goals ||= {};db.restTimes ||= {};db.goalDrafts ||= {};db.workoutArchive ||= [];let activePlan='s1',activeTab='home',month=new Date(),timerEnd=0,timerLeft=90,timerId=null,fb=null,fbUser=null,syncing=false;
const $=id=>document.getElementById(id),today=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`},safe=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function emptyData(){return {logs:{},videos:{},completed:{},planned:{},goals:{},restTimes:{},goalDrafts:{},workoutArchive:[]}}
function normalizeData(value){const d=value&&typeof value==='object'&&!Array.isArray(value)?value:emptyData();for(const key of ['logs','videos','completed','planned','goals','restTimes','goalDrafts'])if(!d[key]||typeof d[key]!=='object'||Array.isArray(d[key]))d[key]={};if(!Array.isArray(d.workoutArchive))d.workoutArchive=[];return d}
function userStore(uid){return STORE+'-user-'+uid}
function loadUserData(user){
  let value=null;try{value=JSON.parse(localStorage.getItem(userStore(user.uid)))}catch{}
  // Only the original admin may migrate legacy unscoped data. Never expose it to another account.
  if(!value&&isAdminUser(user)){
    try{value=JSON.parse(localStorage.getItem(STORE))}catch{}
    if(value)localStorage.setItem(userStore(user.uid),JSON.stringify(normalizeData(value)));
  }
  db=normalizeData(value);renderHome();
}
function save(){if(!fbUser||!isApproved)return;localStorage.setItem(userStore(fbUser.uid),JSON.stringify(db));queueSync()}
function allTrainingLogs(){return [...Object.values(db.logs),...(db.workoutArchive||[])].filter(l=>l&&l.date&&l.plan&&l.sets&&typeof l.sets==='object')}
function friendlyDate(date){if(!/^\d{4}-\d{2}-\d{2}$/.test(date||''))return date||'–';const [y,m,d]=date.split('-');return `${d}.${m}.${y}`}
function workoutProgress(l){const p=plans.find(p=>p.id===l.plan);if(!p)return {done:0,total:0};const keys=p.blocks.flatMap(b=>b.items.flatMap(e=>Array.from({length:exerciseMode(e)==='circuit'?1:e.sets},(_,i)=>e.id+'-'+i)));return {done:keys.filter(k=>l.sets?.[k]?.done).length,total:keys.length}}
function archiveFinishedLog(date,id){const key=date+'|'+id,l=db.logs[key];if(!l?.finished)return false;db.workoutArchive ||= [];db.workoutArchive.push({...l,archiveId:'wa-'+Date.now()+'-'+Math.random().toString(36).slice(2,12)});delete db.logs[key];save();return true}
function removeArchivedWorkout(id){if(!confirm('Abgeschlossenes Training endgültig aus dem Verlauf löschen?'))return;db.workoutArchive=(db.workoutArchive||[]).filter(l=>l.archiveId!==id);save();renderStats();renderCalendar();showToast('Training aus Verlauf gelöscht')}
function getLog(date= $('workoutDate').value,pid=activePlan){const key=date+'|'+pid;return db.logs[key] ||= {sets:{},notes:'',date,plan:pid,finished:false}}
function showToast(message){let el=$('sl33Toast');if(!el){el=document.createElement('div');el.id='sl33Toast';el.className='sl33-toast';el.setAttribute('role','status');el.setAttribute('aria-live','polite');document.body.appendChild(el)}el.textContent=message;el.classList.add('visible');clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>el.classList.remove('visible'),2800)}
function navigate(tab,keepGoal=false){if(!isApproved&&tab!=='home')return;if(tab==='goals'&&activeTab==='goals')keepGoal=true;activeTab=tab;document.querySelectorAll('main>section').forEach(el=>el.classList.toggle('hidden',el.id!==tab));document.querySelectorAll('[data-tab]').forEach(el=>el.classList.toggle('active',el.dataset.tab===tab));if(tab==='home')renderHome();if(tab==='player'&&typeof pdRender==='function')pdRender();if(tab==='calendarPage')renderCalendar();if(tab==='stats')renderStats();if(tab==='goals'){if(!keepGoal){goalDate=today();goalType=defaultGoalType(today());goalViewingArchive=false}renderGoals();}window.scrollTo(0,0)}
function renderHome(){
 const done=allTrainingLogs().filter(l=>l.finished).length;
 const drafts=Object.values(db.logs).filter(l=>Object.values(l.sets||{}).some(x=>x.done||x.kg!==undefined||x.reps)||l.notes?.trim()).length;
 const goalsOpen=Object.values(db.goals).filter(g=>!g.closed&&(g.items?.length||g.notes?.trim()||g.learned?.trim())).length;
 const day=today(),fixed=fixedWeek[weekday(day)][0];
 const activeDrafts=Object.values(db.logs).filter(l=>!l.finished&&(Object.values(l.sets||{}).some(x=>x.done||x.kg!==undefined||x.reps)||l.notes?.trim())).sort((a,b)=>b.date.localeCompare(a.date)).slice(0,3);
 $('homeSummary').innerHTML=`<div class="card"><h3>Heute · ${safe(day)}</h3><p><strong>${safe(fixed)}</strong> · deine fixen Eis- und Matchtermine bleiben bestehen.</p><div class="rowwrap"><span class="pill">${done} abgeschlossene Trainings</span><span class="pill">${drafts} offene Trainings</span><span class="pill">${goalsOpen} offene Zieleinträge</span></div><div class="rowwrap"><button class="btn" onclick="navigate('calendarPage')">Wochenplan öffnen</button><button class="btn alt" onclick="navigate('goals')">Ziele öffnen</button><button class="btn alt" onclick="navigate('stats')">Verlauf / Löschen</button></div><p class="mini">Training abschliessen → im Verlauf gespeichert → beim nächsten Start wieder 0 %. Einträge im Verlauf lassen sich löschen.</p></div>`;
 $('sessionCards').innerHTML=(activeDrafts.length?`<div class="card"><h3>Weitermachen</h3><p class="mini">Deine begonnenen Einheiten bleiben gespeichert.</p>${activeDrafts.map(l=>`<div class="rowwrap" style="justify-content:space-between;padding:7px 0"><span>${safe(l.date)} · ${safe(plans.find(p=>p.id===l.plan)?.name||l.plan)}</span><button class="btn alt" onclick="openWorkoutOn('${safe(l.date)}','${safe(l.plan)}')">Fortsetzen</button></div>`).join('')}</div>`:'')+plans.map(p=>{let total=p.blocks.reduce((a,b)=>a+b.items.length,0),draft=db.logs[day+'|'+p.id],progress=draft?Object.values(draft.sets||{}).filter(x=>x.done).length:0;return `<div class="card"><div class="flex"><span class="pill">${safe(p.name.toUpperCase())}</span><span class="mini">${total} Übungen</span></div><h2 style="margin:13px 0 6px">${safe(p.focus)}</h2><p class="muted">${draft&&progress?progress+' Sätze im Entwurf · weitermachen':'Bereit · startet bei 0 %'}</p><button class="btn" onclick="openWorkout('${p.id}')">${draft&&progress?'Weitertrainieren':'Training starten'} →</button></div>`}).join('')
}
function openWorkout(id){openWorkoutOn(today(),id)}
function openWorkoutOn(date,id){if(!plans.some(p=>p.id===id))return;activePlan=id;$('workoutDate').value=date;archiveFinishedLog(date,id);navigate('workout');renderWorkout()}
function jumpToNextSet(){const first=document.querySelector('#workoutItems .check:not(.yes)');if(first){first.closest('.set-card')?.scrollIntoView({behavior:'smooth',block:'center'});first.focus({preventScroll:true})}else alert('Alle Sätze sind abgehakt. Du kannst das Training jetzt abschliessen.')}
function resetWorkoutDraft(){const date=$('workoutDate').value,key=date+'|'+activePlan,l=db.logs[key];if(!l||!Object.keys(l.sets||{}).length&&!l.notes?.trim())return alert('Noch keine Eingaben zum Zurücksetzen.');if(!confirm('Alle Eingaben dieses Trainings zurücksetzen? Abgeschlossene Trainings im Verlauf bleiben erhalten.'))return;delete db.logs[key];save();renderWorkout();showToast('Entwurf zurückgesetzt')}
function exerciseMode(item){
 const id=item.id;
 if(['foam1','foam2','foam3','mob1','mob2','sprintprep'].includes(id))return 'circuit';
 if(['bikeana','bikerepeat'].includes(id))return 'interval';
 if(id==='soleus')return 'hold';
 if(['sprint10','depth','stepjump','plyopush','ham','pallof','hanging'].includes(id))return 'bodyweight';
 if(['mbslam','around','pinch','rollups','plankdrag'].includes(id))return 'equipment';
 if(id==='traises')return 'weighted';
 return 'weighted';
}
function modeLabel(mode){return ({circuit:'Routine',interval:'Intervalle',hold:'Haltezeit',bodyweight:'Ohne Zusatzgewicht',equipment:'Geräteübung',weighted:'Krafttraining'})[mode]}
function exerciseHistory(id,beforeDate='9999-12-31'){
 return allTrainingLogs().filter(l=>l.date&&l.date<beforeDate)
  .flatMap(l=>Object.entries(l.sets||{}).filter(([key,s])=>key.startsWith(id+'-')&&s.kg!==undefined&&s.kg!==''&&Number.isFinite(Number(s.kg))&&Number(s.kg)>=0)
    .map(([key,s])=>({date:l.date,kg:Number(s.kg),reps:s.reps||'',set:Number(key.slice(id.length+1))+1,done:!!s.done})))
  .sort((a,b)=>b.date.localeCompare(a.date)||a.set-b.set);
}
function previousSet(id,index,date){
 const logs=allTrainingLogs().filter(l=>l.date&&l.date<date&&l.sets&&Object.keys(l.sets).some(k=>k.startsWith(id+'-')))
  .sort((a,b)=>b.date.localeCompare(a.date));
 for(const l of logs){const same=l.sets[id+'-'+index];if(same&&same.kg!==undefined&&same.kg!=='')return {kg:same.kg,date:l.date};
  const other=Object.entries(l.sets).find(([k,s])=>k.startsWith(id+'-')&&s.kg!==undefined&&s.kg!=='');
  if(other)return {kg:other[1].kg,date:l.date};
 }
 return null;
}
function toggleExerciseHistory(id){
 const el=document.getElementById('history-'+id);if(!el)return;
 if(!el.hidden){el.hidden=true;return}
 const entries=exerciseHistory(id).slice(0,40);
 el.innerHTML=entries.length?`<div class="history-title">Gewichtsverlauf · neueste zuerst</div><div class="history-scroll"><table class="history-table"><thead><tr><th>Datum</th><th>Satz</th><th>Gewicht</th><th>Wdh.</th></tr></thead><tbody>${entries.map(e=>`<tr><td>${safe(e.date)}</td><td>${e.set}</td><td><strong>${safe(e.kg)} kg</strong></td><td>${safe(e.reps||'–')}</td></tr>`).join('')}</tbody></table></div>`:'<p class="muted">Noch keine Gewichte gespeichert. Nach deinem ersten Training erscheint hier dein Verlauf.</p>';
 el.hidden=false;
}
function renderWorkout(){
 const p=plans.find(x=>x.id===activePlan);archiveFinishedLog($('workoutDate').value,activePlan);const log=getLog(),locked=false;
 $('workoutTitle').textContent=p.name;$('workoutFocus').textContent=p.focus;$('workoutNotes').value=log.notes||'';$('workoutNotes').disabled=locked;$('workoutDate').disabled=false;$('workoutCompletion').innerHTML=locked?`<div class="archive-notice">✓ Dieses Training ist abgeschlossen und im Kalender gespeichert. <button class="btn alt" onclick="reopenWorkout()">Bearbeitung wieder öffnen</button></div>`:'<p class="mini">Automatisch gespeichert · Hake Sätze ab und schliesse die Einheit am Ende ab.</p><div class="rowwrap"><button type="button" class="btn alt" onclick="jumpToNextSet()">Zum nächsten offenen Satz ↓</button><button type="button" class="btn alt" onclick="resetWorkoutDraft()">Entwurf zurücksetzen</button></div>';$('finishWorkoutBtn').hidden=locked;const del=$('deleteWorkoutBtn');if(del)del.hidden=!db.logs[$('workoutDate').value+'|'+activePlan];
 let total=0,done=0,html='';
 for(const block of p.blocks){
   html+=`<div class="section-label">${safe(block.name)}</div><div class="card">`;
   for(const item of block.items){
     const key=item.id,mode=exerciseMode(item),one=mode==='circuit',units=one?1:item.sets;
     const prescription=one?'1 Runde · einmal vollständig durchführen':mode==='interval'?item.reps+' · Details in Anleitung':mode==='hold'?item.sets+' × '+item.reps:item.sets+' Sätze × '+item.reps;
     html+=`<div class="item"><div class="flex"><h3>${safe(item.name)}</h3><span class="pill">${safe(modeLabel(mode))}</span></div><div class="sub" style="margin:6px 0 10px">${safe(prescription)}</div>`;
     if(mode==='weighted')html+=`<button type="button" class="history-toggle" onclick="toggleExerciseHistory('${key}')">↗ Gewichtsverlauf ansehen</button><div id="history-${key}" class="exercise-history" hidden></div>`;
      if(mode!=='circuit'&&mode!=='interval')html+=`<div class="rest-setting"><label>Pause nach Satz <input type="number" min="0" max="900" step="5" value="${safe(db.restTimes[key]??90)}" onchange="setRestTime('${key}',this.value)"> Sekunden</label><span class="mini">0 = aus · wird gespeichert</span></div><div id="rest-${key}" class="rest-countdown" hidden></div>`;
     if(one){
       const steps=item.desc.split(';').map(x=>x.trim()).filter(Boolean);
       html+=`<details><summary>Alle Übungen der Routine ansehen (${steps.length})</summary><ol class="sub" style="padding-left:20px">${steps.map(step=>`<li style="padding:4px 0">${safe(step)}</li>`).join('')}</ol></details>`;
     }else{
       html+=`<details><summary>Technik und Ablauf ansehen</summary><div class="sub">${safe(item.desc||'Saubere, kontrollierte Ausführung.')}</div></details>`;
     }
     html+='<div class="setrow">';
     for(let i=0;i<units;i++){
       total++;const entry=log.sets[key+'-'+i]||{};if(entry.done)done++;
       const buttonText=entry.done?'✓':'✓';
       html+=`<div class="set-card ${entry.done?'is-done':''}"><div class="set-card-title"><span class="set-number">${one?'Routine':mode==='interval'?'Block':'Satz'} ${i+1}</span><button aria-label="${one?'Routine':mode==='interval'?'Intervallblock':'Satz'} ${i+1} ${entry.done?'als offen markieren':'abhaken'}" aria-pressed="${entry.done?'true':'false'}" class="check ${entry.done?'yes':''}" ${locked?'disabled':''} onclick="toggleSet('${key}',${i})">${buttonText}</button></div><div class="set-inputs">`;
       if(mode==='weighted'){
         const prev=previousSet(key,i,log.date),shown=entry.kg??prev?.kg??'';
         html+=`<label>Gewicht (kg) <input aria-label="Gewicht Satz ${i+1}" type="number" min="0" step="0.5" value="${safe(shown)}" ${locked?'disabled':''} oninput="setField('${key}',${i},'kg',this.value)"></label>`;
         if(entry.kg===undefined&&prev)html+=`<div class="last-weight">Zuletzt: ${safe(prev.kg)} kg · ${safe(prev.date)}</div>`;
       }
       if(['weighted','equipment','bodyweight'].includes(mode))html+=`<label>Wdh. <input aria-label="Wiederholungen Satz ${i+1}" type="text" style="width:86px" value="${safe(entry.reps??'')}" placeholder="${safe(item.reps)}" ${locked?'disabled':''} onchange="setField('${key}',${i},'reps',this.value)"></label>`;
       html+='</div></div>';
     }
     html+='</div>';
     if(one)html+='<div class="mini" style="margin-top:8px">Keine Gewichte nötig · nach der gesamten Routine abhaken</div>';
     if(mode==='interval')html+='<div class="mini" style="margin-top:8px">Zeiten stehen in der Anleitung · jeden Intervallblock nach Abschluss abhaken</div>';
     if(mode==='hold')html+='<div class="mini" style="margin-top:8px">Haltezeit gemäss Vorgabe · kein Gewicht eintragen</div>';
   }
   html+='</div>';
 }
 $('workoutItems').innerHTML=html;timerDraw();$('workoutPercent').textContent=total?Math.round(done/total*100)+'%':'';$('workoutBar').style.width=(total?done/total*100:0)+'%';
}
function toggleSet(key,i){if(getLog().finished)return;const l=getLog(),e=l.sets[key+'-'+i] ||= {};const completing=!e.done;if(completing&&e.kg===undefined){const prev=previousSet(key,i,l.date);if(prev&&prev.kg!=='')e.kg=prev.kg}e.done=completing;if(!e.done)l.finished=false;save();renderWorkout();if(completing&&i<getExerciseUnits(key)-1)beginRest(key)}
function getExerciseUnits(key){for(const p of plans)for(const b of p.blocks)for(const e of b.items)if(e.id===key)return exerciseMode(e)==='circuit'?1:e.sets;return 1}
function setRestTime(key,value){db.restTimes[key]=Math.max(0,Math.min(900,Number(value)||0));save()}
let restExercise=null;
function beginRest(key){const n=db.restTimes[key]??90;if(!n)return;restExercise=key;startTimer(n)}

function setField(key,i,field,value){if(getLog().finished)return;if(field==='kg'&&value!==''){const n=Number(value);if(!Number.isFinite(n)||n<0||n>1000){showToast('Bitte ein Gewicht von 0 bis 1000 kg eingeben');return}}let e=getLog().sets[key+'-'+i] ||= {};e[field]=value;save()}
function saveNotes(){if(getLog().finished)return;getLog().notes=$('workoutNotes').value;save()}
function finishWorkout(){let l=getLog();const p=plans.find(x=>x.id===activePlan),total=p.blocks.flatMap(b=>b.items).reduce((n,e)=>n+(exerciseMode(e)==='circuit'?1:e.sets),0),done=p.blocks.flatMap(b=>b.items).reduce((n,e)=>n+Array.from({length:exerciseMode(e)==='circuit'?1:e.sets},(_,i)=>l.sets[e.id+'-'+i]?.done?1:0).reduce((a,b)=>a+b,0),0);if(done<total&&!confirm(`${done} von ${total} Sätzen erledigt. Training trotzdem abschliessen?`))return;l.finished=true;l.finishedAt=new Date().toISOString();save();archiveFinishedLog(l.date,activePlan);restExercise=null;pauseTimer();selectedCalendarDate=l.date;month=new Date(l.date+'T12:00:00');navigate('calendarPage');showToast('Training gespeichert! Nächster Start beginnt bei 0 %.')}
function reopenWorkout(){if(!confirm('Dieses abgeschlossene Training wieder zur Bearbeitung öffnen?'))return;const l=getLog();l.finished=false;delete l.finishedAt;save();renderWorkout()}
function setVideo(key){const prev=db.videos[key]||'';let v=prompt('Bestätigten YouTube-Videolink einfügen (leer = entfernen):',prev);if(v===null)return;if(v.trim()&&!/^https:\/\/(www\.)?(youtube\.com|youtu\.be)\//i.test(v.trim()))return alert('Bitte einen gültigen YouTube-HTTPS-Link verwenden.');if(v.trim())db.videos[key]=v.trim();else delete db.videos[key];save();renderWorkout()}
function shiftMonth(n){month=new Date(month.getFullYear(),month.getMonth()+n,1);renderCalendar()}
let selectedCalendarDate=today();
const fixedWeek=[['Frei / Regeneration','frei'],['Eistraining','eis'],['Eistraining','eis'],['Eistraining','eis'],['Match','match'],['Frei / Regeneration','frei'],['Match','match']];
function weekday(date){const [y,m,d]=date.split('-').map(Number);return (new Date(y,m-1,d).getDay()+6)%7}
function planSession(date,id){db.planned[date] ||= [];if(!db.planned[date].includes(id))db.planned[date].push(id);save();renderCalendar();calendarDay(date)}
function removePlanned(date,id){if(!confirm('Diese geplante zusätzliche Einheit entfernen? Ein bereits erfasstes Training bleibt bestehen.'))return;db.planned[date]=(db.planned[date]||[]).filter(x=>x!==id);if(!db.planned[date].length)delete db.planned[date];save();renderCalendar()}
function deleteWorkout(date,id){
 const key=date+'|'+id,l=db.logs[key];if(!l)return;
 if(!confirm('Training vom '+date+' inklusive ALLER Sätze, Gewichte und Notizen endgültig löschen? Das lässt sich nur mit einer Datensicherung rückgängig machen.'))return;
 delete db.logs[key];save();renderCalendar();if(activeTab==='stats')renderStats();showToast('Entwurf gelöscht');
}
function deleteCurrentWorkout(){const date=$('workoutDate').value;if(!db.logs[date+'|'+activePlan])return alert('Für diesen Tag gibt es noch keinen Trainingseintrag.');deleteWorkout(date,activePlan);navigate('calendarPage')}

function openPlanned(date,id){openWorkoutOn(date,id)}
function renderCalendar(){const y=month.getFullYear(),m=month.getMonth(),start=(new Date(y,m,1).getDay()+6)%7,days=new Date(y,m+1,0).getDate();$('monthLabel').textContent=new Intl.DateTimeFormat('de-CH',{month:'long',year:'numeric'}).format(month);let html=['Mo','Di','Mi','Do','Fr','Sa','So'].map(d=>`<div class="mini" style="text-align:center">${d}</div>`).join('');for(let i=0;i<start;i++)html+='<div></div>';for(let d=1;d<=days;d++){const date=`${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`,closedGoals=Object.entries(db.goals).some(([k,g])=>k.startsWith(date+'|')&&g.closed),n=new Set([...(db.planned[date]||[]),...allTrainingLogs().filter(l=>l.date===date&&(l.finished||Object.values(l.sets).some(s=>s.done))).map(l=>l.plan)]).size,fix=fixedWeek[weekday(date)];html+=`<button class="day ${n?'has':''} ${date===selectedCalendarDate?'selected':''}" data-date="${date}" onclick="calendarDay('${date}')"><strong>${d}</strong><span>${fix[1]==='frei'?'Frei':fix[1]==='eis'?'Eis':'Match'}</span>${n?`<em class="day-extra">+${n}</em>`:''}${closedGoals?'<em class="day-goal">🎯</em>':''}</button>`}$('calendarGrid').innerHTML=html;const selected=selectedCalendarDate.slice(0,7)===`${y}-${String(m+1).padStart(2,'0')}`?selectedCalendarDate:`${y}-${String(m+1).padStart(2,'0')}-01`;calendarDay(selected)}
function calendarDay(date){selectedCalendarDate=date;document.querySelectorAll('.day').forEach(b=>b.classList.toggle('selected',b.dataset.date===date));const fixed=fixedWeek[weekday(date)][0],planned=db.planned[date]||[],logs=allTrainingLogs().filter(l=>l.date===date),all=[...new Set([...planned,...logs.map(l=>l.plan)])];$('calendarDetail').innerHTML=`<div class="card"><h3>${safe(date)}</h3><p><strong>Fix:</strong> ${safe(fixed)}</p><button class="btn alt" onclick="openGoalsFor('${date}')">🎯 Tagesziele ${Object.entries(db.goals).some(([k,g])=>k.startsWith(date+'|')&&g.closed)?'ansehen ✓':'öffnen'}</button><div class="calendar-goal-summary">${Object.entries(db.goals).filter(([k,g])=>k.startsWith(date+'|')&&g.closed).map(([k,g])=>`<div class="mini">✓ ${safe(goalTypes[k.split('|')[1]]||k.split('|')[1])}: ${(g.items||[]).filter(x=>x.status==='yes').length}/${(g.items||[]).length} erreicht</div>`).join('')}</div><h3>Zusätzliche Trainings</h3>${all.length?all.map(id=>{const p=plans.find(p=>p.id===id),log=logs.find(l=>l.plan===id),archived=logs.filter(l=>l.plan===id&&l.archiveId);return `<div style="padding:10px 0;border-top:1px solid var(--edge)"><strong>${safe(p?.name||id)}</strong> ${archived.length?'✓ '+archived.length+' abgeschlossen':''}<div class="rowwrap" style="margin-top:8px"><button class="btn alt" onclick="openPlanned('${date}','${id}')">Training öffnen</button>${planned.includes(id)?`<button class="btn alt" onclick="removePlanned('${date}','${id}')">Aus Planung entfernen</button>`:''}${log&&!log.archiveId?`<button class="btn alt danger-btn" onclick="deleteWorkout('${date}','${id}')">Entwurf löschen</button>`:''}${archived.map(l=>`<button class="btn alt danger-btn" onclick="removeArchivedWorkout('${safe(l.archiveId)}')">Abgeschlossenes Training löschen</button>`).join('')}</div></div>`}).join(''):'<p class="muted">Noch kein zusätzliches Training geplant.</p>'}<h3>Training hinzufügen</h3><div class="rowwrap">${plans.filter(p=>!all.includes(p.id)).map(p=>`<button class="btn alt" onclick="planSession('${date}','${p.id}')">+ ${safe(p.name)}</button>`).join('')||'<span class="mini">Alle drei Sessions sind bereits eingetragen.</span>'}</div></div>`}
function renderStats(){const logs=allTrainingLogs(),finished=logs.filter(l=>l.finished),checked=logs.reduce((a,l)=>a+Object.values(l.sets).filter(s=>s.done).length,0),days=new Set(logs.filter(l=>l.finished||Object.values(l.sets).some(s=>s.done)).map(l=>l.date)).size;$('statCards').innerHTML=`<div class="stat"><b>${finished.length}</b><small>Trainings fertig</small></div><div class="stat"><b>${checked}</b><small>Sätze erledigt</small></div><div class="stat"><b>${days}</b><small>Trainingstage</small></div>`;let prs={};for(const l of logs)for(const [key,s] of Object.entries(l.sets)){const kg=Number(s.kg);if(!s.done||!Number.isFinite(kg)||kg<=0)continue;const id=key.replace(/-\d+$/,'');if(!prs[id]||kg>prs[id].kg)prs[id]={kg,date:l.date}}$('prList').innerHTML=Object.entries(prs).sort((a,b)=>b[1].kg-a[1].kg).map(([id,v])=>`<div class="card flex"><div>${safe(findName(id))}<div class="mini">${safe(v.date)}</div></div><b>${v.kg} kg</b></div>`).join('')||'<p class="muted">Trage Gewichte ein und hake Sätze ab, um Bestleistungen zu sehen.</p>';$('historyList').innerHTML=logs.filter(l=>l.finished||Object.values(l.sets).some(s=>s.done)).sort((a,b)=>(b.finishedAt||b.date).localeCompare(a.finishedAt||a.date)).map(l=>`<div class="card flex"><span>${safe(friendlyDate(l.date))} · ${safe(plans.find(p=>p.id===l.plan)?.name||l.plan)}</span><span class="badge">${l.finished?'✓ Fertig':'Begonnen'} · ${workoutProgress(l).done}/${workoutProgress(l).total}</span><button class="btn alt danger-btn" onclick="${l.archiveId?`removeArchivedWorkout('${safe(l.archiveId)}')`:`deleteWorkout('${safe(l.date)}','${safe(l.plan)}');renderStats()`}">Löschen</button></div>`).join('')||'<p class="muted">Noch keine Trainings gespeichert.</p>'}
function findName(id){for(const p of plans)for(const b of p.blocks)for(const e of b.items)if(e.id===id)return e.name;return id}
function timerDraw(){if(!restExercise)return;const el=$('rest-'+restExercise);if(!el)return;el.hidden=false;const n=Math.max(0,timerLeft);el.textContent=n?'⏱ Pause: '+String(Math.floor(n/60)).padStart(2,'0')+':'+String(n%60).padStart(2,'0'):'✓ Pause vorbei – nächster Satz!'}
function startTimer(n){clearInterval(timerId);timerLeft=n;timerEnd=Date.now()+n*1000;timerId=setInterval(()=>{timerLeft=Math.max(0,Math.ceil((timerEnd-Date.now())/1000));timerDraw();if(!timerLeft){clearInterval(timerId);timerId=null}},250);timerDraw()}
function pauseTimer(){clearInterval(timerId);timerId=null}
function resetTimer(){pauseTimer();timerLeft=0;timerDraw()}
function exportData(){const blob=new Blob([JSON.stringify({version:3,data:db},null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='sl33-training-backup.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
function importData(ev){const file=ev.target.files?.[0];if(!file)return;file.text().then(t=>{const obj=JSON.parse(t);if(obj.version!==3||!obj.data||typeof obj.data.logs!=='object'||Array.isArray(obj.data.logs))throw Error('Format');if(!confirm('ALLE aktuellen lokalen Trainingsdaten durch die Sicherung ersetzen? Exportiere vorher deine aktuellen Daten.'))return;db=normalizeData(obj.data);save();navigate('home');alert('Daten importiert')}).catch(()=>alert('Ungültige oder inkompatible Sicherungsdatei.'));ev.target.value=''}
// Firebase Auth and private Firestore. No secrets are embedded in client code.
const ADMIN_UID='LQzUxoUnkhVIR7gFrT74AHmNO4t2';
const ADMIN_EMAIL='28simon06@gmail.com';
function isAdminUser(user){return !!user&&user.uid===ADMIN_UID&&(user.email||'').toLowerCase()===ADMIN_EMAIL}
const FIREBASE_CONFIG={apiKey:'AIzaSyDrWe116T7CCzBYw4YjyGtGdsZFDRPzVzw',authDomain:'sl33-performance.firebaseapp.com',projectId:'sl33-performance',storageBucket:'sl33-performance.firebasestorage.app',messagingSenderId:'443932352448',appId:'1:443932352448:web:8e739a9885fdc94ef6f225'};
let isApproved=false,cloudReady=false,cloudSaving=false,cloudWritesEnabled=false,cloudTimer=null,cloudUnsubscribe=null;
let presenceTimer=null,adminUsersUnsubscribe=null;
function loadScript(url){return new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=url;s.onload=resolve;s.onerror=reject;document.head.appendChild(s)})}
function setAuthMessage(message){const el=$('loginMessage');if(el)el.textContent=message}
function showGate(view){$('loginGate').classList.toggle('hidden',view!=='login');$('pendingGate').classList.toggle('hidden',view!=='pending');document.querySelector('main').classList.toggle('hidden',view!=='app');document.querySelector('header').classList.toggle('hidden',view!=='app');document.querySelector('nav.tabs').classList.toggle('hidden',view!=='app');}
async function connectFirebase(){try{
  showGate('login');setAuthMessage('Verbinde mit Firebase …');
  if(!window.firebase){await loadScript('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js');await loadScript('https://www.gstatic.com/firebasejs/10.14.1/firebase-auth-compat.js');await loadScript('https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore-compat.js')}
  if(!firebase.apps.length)firebase.initializeApp(FIREBASE_CONFIG);fb=firebase;cloudReady=true;
  fb.auth().onAuthStateChanged(async user=>{
    if(cloudUnsubscribe){cloudUnsubscribe();cloudUnsubscribe=null}
    stopPresence();clearTimeout(cloudTimer);if(adminUsersUnsubscribe){adminUsersUnsubscribe();adminUsersUnsubscribe=null}
    fbUser=user;isApproved=false;cloudWritesEnabled=false;db=emptyData();const adminPanel=$('adminRequests');if(adminPanel)adminPanel.classList.add('hidden');
    if(!user){showGate('login');setAuthMessage('Melde dich an oder beantrage ein Konto.');return}
    loadUserData(user);if(isAdminUser(user)){await allowAccess();return}
    showGate('pending');$('pendingEmail').textContent=user.email||'';
    cloudUnsubscribe=fb.firestore().collection('approvals').doc(user.uid).onSnapshot(async snap=>{
      if(!fbUser||fbUser.uid!==user.uid)return;
      if(snap.exists&&snap.data().approved===true){if(!isApproved)await allowAccess()}
      else{isApproved=false;cloudWritesEnabled=false;clearTimeout(cloudTimer);stopPresence();db=emptyData();showGate('pending');$('pendingStatus').textContent=snap.exists&&snap.data().approved===false?'Dein Antrag wurde abgelehnt.':'Dein Antrag wartet auf die Freigabe des Administrators.'}
    },e=>{$('pendingStatus').textContent='Freigabestatus nicht abrufbar: '+e.message});
  });
}catch(e){setAuthMessage('Firebase-Verbindung fehlgeschlagen: '+e.message);showGate('login')}}
async function allowAccess(){
  isApproved=true;showGate('app');$('cloudStatus').textContent='Angemeldet: '+(fbUser.email||'');
  await loadCloudOnce();startPresence();if(isAdminUser(fbUser)){loadRequests();watchAdminUsers()}
}
async function loadCloudOnce(){
 try{const snap=await fb.firestore().collection('users').doc(fbUser.uid).get();
   if(snap.exists&&snap.data().data?.logs){const remote=snap.data().data;
     if(confirm('Cloud-Daten auf dieses Gerät laden? Achtung: Die lokalen Daten werden dadurch ersetzt. Exportiere sie vorher bei Bedarf.')){
       db=normalizeData(remote);localStorage.setItem(userStore(fbUser.uid),JSON.stringify(db));cloudWritesEnabled=true;$('cloudStatus').textContent='Cloud geladen · Synchronisierung aktiv';navigate('home')
     }else{$('cloudStatus').textContent='Cloud vorhanden · lokale Daten noch nicht abgeglichen. Vor dem Überschreiben bitte exportieren.'}
   }else{$('cloudStatus').textContent='Angemeldet · keine Cloud-Sicherung gefunden. Synchronisierung erst nach manueller Bestätigung aktiv.'}
 }catch(e){$('cloudStatus').textContent='Cloud-Laden fehlgeschlagen: '+e.message}
}
async function authAction(action){
 if(!fb)return;try{
  if(action==='logout'){await markOffline();await fb.auth().signOut();return}
  const email=$('authEmail').value.trim(),pass=$('authPassword').value;
  if(!email||!pass)throw Error('Bitte E-Mail und Passwort eingeben.');
  if(action==='register'){
   const cred=await fb.auth().createUserWithEmailAndPassword(email,pass);
   await fb.firestore().collection('requests').doc(cred.user.uid).set({email,createdAt:fb.firestore.FieldValue.serverTimestamp(),status:'pending'});
   setAuthMessage('Konto erstellt. Warte auf die Freigabe durch den Administrator.');
  }else await fb.auth().signInWithEmailAndPassword(email,pass)
 }catch(e){setAuthMessage('Anmeldung: '+e.message)}
}
async function loadRequests(){
 if(!fbUser||!isAdminUser(fbUser))return;
 const box=$('adminRequests');box.classList.remove('hidden');
 try{const snap=await fb.firestore().collection('requests').get();
  const requests=snap.docs.filter(d=>d.data().status==='pending');
  $('requestList').innerHTML=requests.length?requests.map(d=>`<div class="request-entry"><span>${safe(d.data().email||d.id)}</span><div class="rowwrap"><button class="btn" onclick="reviewRequest('${d.id}',true)">Genehmigen</button><button class="btn alt" onclick="reviewRequest('${d.id}',false)">Ablehnen</button></div></div>`).join(''):'<p class="mini">Keine offenen Anfragen.</p>';
 }catch(e){$('requestList').textContent='Anfragen konnten nicht geladen werden: '+e.message}
}
async function reviewRequest(uid,approve){
 if(!fbUser||!isAdminUser(fbUser))return;
 if(!confirm(approve?'Dieses Konto freischalten?':'Diese Anfrage ablehnen?'))return;
 try{const batch=fb.firestore().batch();batch.set(fb.firestore().collection('approvals').doc(uid),{approved:approve,reviewedAt:fb.firestore.FieldValue.serverTimestamp(),reviewedBy:fbUser.uid});batch.update(fb.firestore().collection('requests').doc(uid),{status:approve?'approved':'rejected'});await batch.commit();await loadRequests();await loadAdminUsers()}catch(e){alert('Freigabe fehlgeschlagen: '+e.message)}
}
// Admin directory and approximate presence; status is NOT Firebase Authentication deletion.
function stopPresence(){if(presenceTimer){clearInterval(presenceTimer);presenceTimer=null}}
async function presencePing(online=true){
 if(!fb||!fbUser||!isApproved)return;
 try{await fb.firestore().collection('presence').doc(fbUser.uid).set({email:fbUser.email||'',lastSeen:fb.firestore.FieldValue.serverTimestamp(),online:!!online},{merge:true})}catch(e){console.warn('Presence unavailable',e.message)}
}
function startPresence(){stopPresence();presencePing(true);presenceTimer=setInterval(()=>{if(document.visibilityState==='visible')presencePing(true)},60000)}
async function markOffline(){stopPresence();await presencePing(false)}
document.addEventListener('visibilitychange',()=>{if(fbUser&&isApproved)presencePing(document.visibilityState==='visible')});
function adminOnly(){return !!fbUser&&isAdminUser(fbUser)}
function watchAdminUsers(){if(!adminOnly())return;loadAdminUsers();if(adminUsersUnsubscribe)adminUsersUnsubscribe();adminUsersUnsubscribe=fb.firestore().collection('presence').onSnapshot(()=>loadAdminUsers(),e=>console.warn('Admin presence',e.message))}
async function loadAdminUsers(){
 if(!adminOnly())return;
 const el=$('adminUsersList');if(!el)return;
 try{
  const [requests,approvals,presence]=await Promise.all(['requests','approvals','presence'].map(c=>fb.firestore().collection(c).get()));
  const people=new Map();
  for(const d of requests.docs)people.set(d.id,{uid:d.id,email:d.data().email||'',request:d.data().status||'pending'});
  for(const d of approvals.docs){const x=people.get(d.id)||{uid:d.id,email:'',request:'unknown'};x.approved=d.data().approved===true;people.set(d.id,x)}
  for(const d of presence.docs){const x=people.get(d.id)||{uid:d.id,email:'',request:'unknown'};x.email=x.email||d.data().email||'';x.lastSeen=d.data().lastSeen?.toDate?.()||null;x.onlineFlag=d.data().online===true;people.set(d.id,x)}
  people.delete(ADMIN_UID);
  const rows=[...people.values()].sort((a,b)=>(a.email||a.uid).localeCompare(b.email||b.uid));
  el.innerHTML=rows.length?rows.map(x=>{
   const fresh=x.lastSeen&&Date.now()-x.lastSeen.getTime()<150000;
   const online=x.approved&&x.onlineFlag&&fresh;
   const last=x.lastSeen?x.lastSeen.toLocaleString('de-CH'):'Noch keine Aktivität erfasst';
   const status=x.approved?'Zugriff erlaubt':x.approved===false?'Zugriff gesperrt':'Nicht freigeschaltet';
   return `<div class="request-entry"><div><strong>${safe(x.email||'Unbekannte E-Mail')}</strong><div class="mini">${online?'🟢 Kürzlich aktiv':'⚪ Offline / unbekannt'} · ${safe(status)}</div><div class="mini">Zuletzt gesehen: ${safe(last)}</div></div><div class="rowwrap">${x.approved?`<button class="btn alt danger-btn" onclick="changeUserAccess('${x.uid}',false)">Zugriff entziehen</button>`:`<button class="btn" onclick="changeUserAccess('${x.uid}',true)">Zugriff erlauben</button>`}</div></div>`
  }).join(''):'<p class="mini">Noch keine Benutzer vorhanden.</p>';
 }catch(e){el.textContent='Benutzer konnten nicht geladen werden: '+e.message}
}
async function changeUserAccess(uid,allow){
 if(!adminOnly()||uid===ADMIN_UID)return;
 if(!confirm(allow?'Diesem Benutzer den Zugriff erlauben?':'Zugriff sperren? Das Konto und seine Trainingsdaten bleiben erhalten.'))return;
 try{
  const ref=fb.firestore().collection('approvals').doc(uid);
  await ref.set({approved:allow,reviewedAt:fb.firestore.FieldValue.serverTimestamp(),reviewedBy:fbUser.uid},{merge:true});
  const req=fb.firestore().collection('requests').doc(uid);const snap=await req.get();if(snap.exists)await req.update({status:allow?'approved':'revoked'});
  await loadRequests();await loadAdminUsers();
 }catch(e){alert('Zugriff konnte nicht geändert werden: '+e.message)}
}
function queueSync(){if(!isApproved||!cloudWritesEnabled)return;clearTimeout(cloudTimer);cloudTimer=setTimeout(syncCloud,1800)}
async function syncCloud(){if(!fb||!fbUser||!isApproved||!cloudWritesEnabled||cloudSaving)return;cloudSaving=true;try{
 await fb.firestore().collection('users').doc(fbUser.uid).set({data:db,updatedAt:fb.firestore.FieldValue.serverTimestamp()});$('cloudStatus').textContent='Cloud gespeichert · '+fbUser.email
}catch(e){$('cloudStatus').textContent='Cloud-Speicherung fehlgeschlagen: '+e.message}finally{cloudSaving=false}}
async function manualSyncCloud(){if(!fb||!fbUser||!isApproved)return alert('Bitte zuerst anmelden.');if(!cloudWritesEnabled){if(!confirm('Lokale Daten jetzt in die Cloud hochladen? Falls dort bereits andere Daten liegen, werden diese überschrieben. Bitte vorher eine JSON-Sicherung exportieren.'))return;cloudWritesEnabled=true}await syncCloud()}
function disconnectFirebase(){authAction('logout')}
// Goal lifecycle: drafts remain editable; closed entries become a read-only archive.
let goalDate=today(),goalType='match',goalViewingArchive=false;
const goalTypes={match:'Match',ice:'Eistraining',gym:'Krafttraining',other:'Sonstiges'};
function defaultGoalType(date){const kind=fixedWeek[weekday(date)][1];return kind==='match'?'match':kind==='eis'?'ice':'gym'}
goalType=defaultGoalType(today());
function goalKey(){return goalDate+'|'+goalType}
function getGoal(){return db.goals[goalKey()]||{items:[],learned:'',notes:'',media:[],saved:false,closed:false}}
function ensureGoal(){return db.goals[goalKey()] ||= {items:[],learned:'',notes:'',media:[],saved:false,closed:false}}
function goalIsClosed(){return !!getGoal().closed}
function openGoalsFor(date){goalDate=date;goalType=defaultGoalType(date);goalViewingArchive=date!==today();navigate('goals',true)}
function goalSwitch(){goalDate=$('goalDate').value||today();goalType=$('goalType').value;goalViewingArchive=goalDate!==today();renderGoals()}
function goalAdd(){if(goalIsClosed())return;const text=$('goalNew').value.trim();if(!text)return;ensureGoal().items.push({text,status:'pending'});$('goalNew').value='';save();renderGoals()}
function goalStatus(i,status){if(goalIsClosed())return;const g=ensureGoal();if(!g.items[i])return;g.items[i].status=status;save();renderGoals()}
function goalRemove(i){if(goalIsClosed()||!confirm('Dieses Ziel löschen?'))return;ensureGoal().items.splice(i,1);save();renderGoals()}
function goalEdit(i){if(goalIsClosed())return;const g=ensureGoal();if(!g.items[i])return;const value=prompt('Ziel bearbeiten:',g.items[i].text);if(value===null)return;if(!value.trim())return alert('Ein Ziel darf nicht leer sein. Zum Entfernen «Löschen» verwenden.');g.items[i].text=value.trim();save();renderGoals()}
function goalDeleteEntry(){const key=goalKey(),g=db.goals[key];if(!g)return alert('Noch kein Eintrag vorhanden.');if(!confirm('Den gesamten Zieleintrag vom '+goalDate+' ('+(goalTypes[goalType]||goalType)+') endgültig löschen? Auch archivierte Ziele und Reflexionen werden entfernt.'))return;delete db.goals[key];save();renderGoals()}

function goalField(field,value){if(goalIsClosed())return;ensureGoal()[field]=value;save()}
function goalMediaAdd(){if(goalIsClosed())return;const url=$('goalMediaUrl').value.trim();if(!/^https:\/\//i.test(url))return alert('Bitte einen HTTPS-Link einfügen.');ensureGoal().media ||= [];ensureGoal().media.push(url);save();renderGoals()}
function goalMediaRemove(i){if(goalIsClosed())return;ensureGoal().media.splice(i,1);save();renderGoals()}
function saveGoalDraft(){const g=ensureGoal();if(g.closed)return;g.saved=true;g.savedAt=new Date().toISOString();save();renderGoals();$('goalFeedback').textContent='✓ Ziele gespeichert. Nach dem Match oder Training kannst du sie auswerten und den Tag abschliessen.'}
function closeGoalDay(){const g=ensureGoal();if(g.closed)return;if(!(g.items||[]).length&&!g.learned?.trim()&&!g.notes?.trim())return alert('Trage zuerst mindestens ein Ziel oder eine Reflexion ein.');const open=(g.items||[]).filter(x=>!['yes','partial','no'].includes(x.status)).length;if(open&&!confirm(`${open} Ziel(e) noch nicht bewertet. Tag trotzdem abschliessen?`))return;if(!confirm('Diesen Eintrag abschliessen und im Kalender archivieren?'))return;g.saved=true;g.closed=true;g.closedAt=new Date().toISOString();save();const archivedDate=goalDate;goalDate=today();goalType=defaultGoalType(today());goalViewingArchive=false;selectedCalendarDate=archivedDate;month=new Date(archivedDate+'T12:00:00');navigate('calendarPage')}
function reopenGoal(){const g=getGoal();if(!g.closed||!confirm('Abgeschlossenen Eintrag wirklich wieder bearbeiten?'))return;g.closed=false;delete g.closedAt;save();renderGoals()}
function newGoalToday(){goalDate=today();goalType=defaultGoalType(today());goalViewingArchive=false;renderGoals()}
function renderGoals(){
 $('goalDate').value=goalDate;$('goalType').value=goalType;
 const g=getGoal(),items=g.items||[],media=g.media||[],closed=!!g.closed;
 $('goalBanner').innerHTML=closed?`<div class="archive-notice">✓ Abgeschlossen am ${safe(g.closedAt?.slice(0,10)||goalDate)}. Dieser Eintrag ist archiviert und kann nicht versehentlich verändert werden. <button class="btn alt" onclick="reopenGoal()">Bearbeitung wieder öffnen</button></div>`:g.saved?'<div class="notice">✓ Ziele gespeichert · bereit für die Auswertung nach der Einheit.</div>':'<div class="mini">1. Ziele festlegen und speichern · 2. Nach der Einheit bewerten · 3. Tag abschliessen</div>';
 $('goalList').innerHTML=items.map((x,i)=>`<div class="goal-item"><strong>${safe(x.text)}</strong><div class="goal-actions">${closed?'':`<button class="btn ${x.status==='yes'?'':'alt'}" onclick="goalStatus(${i},'yes')">✓ Erreicht</button><button class="btn ${x.status==='partial'?'':'alt'}" onclick="goalStatus(${i},'partial')">Teilweise</button><button class="btn ${x.status==='no'?'':'alt'}" onclick="goalStatus(${i},'no')">Nicht erreicht</button><button class="btn alt" onclick="goalEdit(${i})">Bearbeiten</button><button class="btn alt danger-btn" onclick="goalRemove(${i})">Löschen</button>`}</div><div class="goal-muted">${({yes:'✓ Erreicht',partial:'◐ Teilweise erreicht',no:'○ Nicht erreicht',pending:'Noch offen'})[x.status]||'Noch offen'}</div></div>`).join('')||'<p class="muted">Noch keine Ziele für diese Einheit. Lege deine Ziele fest.</p>';
 $('goalNew').disabled=closed;$('goalAddBtn').hidden=closed;$('goalLearned').value=g.learned||'';$('goalNotes').value=g.notes||'';$('goalLearned').disabled=closed;$('goalNotes').disabled=closed;$('goalMediaUrl').disabled=closed;$('goalMediaAddBtn').hidden=closed;
 $('goalMedia').innerHTML=media.map((url,i)=>`<div class="goal-entry"><a class="goal-link" target="_blank" rel="noopener noreferrer" href="${safe(url)}">${safe(url)}</a> ${closed?'':`<button class="btn alt" onclick="goalMediaRemove(${i})">Entfernen</button>`}</div>`).join('')||'<p class="goal-muted">Optional: HTTPS-Links zu Fotos oder Videos hinterlegen.</p>';
 $('goalActions').innerHTML=closed?`<button class="btn alt" onclick="newGoalToday()">← Zur heutigen Einheit</button><button class="btn alt danger-btn" onclick="goalDeleteEntry()">Eintrag löschen</button>`:`<button class="btn alt" onclick="saveGoalDraft()">💾 Ziele speichern</button><button class="btn" onclick="closeGoalDay()">✓ Tag abschliessen & archivieren</button><button class="btn alt danger-btn" onclick="goalDeleteEntry()">Eintrag löschen</button>`;
 $('goalFeedback').textContent='';
 const archives=Object.entries(db.goals).filter(([k,v])=>v.closed).sort((a,b)=>b[0].localeCompare(a[0])); const drafts=Object.entries(db.goals).filter(([k,v])=>!v.closed&&(v.items?.length||v.notes?.trim()||v.learned?.trim()||v.saved)).sort((a,b)=>b[0].localeCompare(a[0]));
 $('goalHistory').innerHTML=(drafts.map(([k,v])=>{const [d,t]=k.split('|');return `<div class="goal-entry"><div class="flex"><strong>${safe(d)} · ${safe(goalTypes[t]||t)}</strong><span class="badge">Entwurf</span></div><p class="mini">${(v.items||[]).length} Ziele · noch nicht abgeschlossen</p><button class="btn alt" onclick="goalOpenHistory('${safe(d)}','${safe(t)}')">Bearbeiten</button><button class="btn alt danger-btn" onclick="goalDeleteArchive('${safe(d)}','${safe(t)}')">Löschen</button></div>`}).join(''))+archives.map(([k,v])=>{const [d,t]=k.split('|'),yes=(v.items||[]).filter(x=>x.status==='yes').length,partial=(v.items||[]).filter(x=>x.status==='partial').length;return `<div class="goal-entry"><div class="flex"><strong>${safe(d)} · ${safe(goalTypes[t]||t)}</strong><span class="badge">✓ Archiv</span></div><p class="mini">${yes} erreicht · ${partial} teilweise · ${(v.items||[]).length} Ziele</p><button class="btn alt" onclick="goalOpenHistory('${safe(d)}','${safe(t)}')">Rückblick ansehen →</button><button class="btn alt danger-btn" onclick="goalDeleteArchive('${safe(d)}','${safe(t)}')">Löschen</button></div>`}).join('')||'<p class="muted">Nach dem ersten abgeschlossenen Tag findest du hier deine Rückblicke.</p>';
}
function goalDeleteArchive(date,type){const key=date+'|'+type;if(!db.goals[key]||!confirm('Gespeicherten Zieleintrag vom '+date+' endgültig löschen?'))return;delete db.goals[key];save();if(goalDate===date&&goalType===type){goalDate=today();goalType=defaultGoalType(today())}renderGoals()}
function goalOpenHistory(date,type){goalDate=date;goalType=type;goalViewingArchive=true;renderGoals();window.scrollTo({top:0,behavior:'smooth'})}

renderHome();connectFirebase();
