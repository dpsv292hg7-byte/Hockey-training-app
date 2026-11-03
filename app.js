'use strict';
const foam='1 Runde · Waden 15s/Seite; Schienbein 15s/Seite; Hamstrings, Gesäss, Quadrizeps, Adduktoren und IT-Band je 20s/Seite; BWS rollen 30s; BWS-Extension 30s; Nackenrotation 5/Seite.';
const prep1='1 Runde · MB Glute Bridge 8 (5s halten); Banded Hip Flexor Drive 10/Seite; Standing Y/T/W Raises 8/8/8; Side Plank Abduction 8/Seite; Scap Pull-up 10.';
const prep2='1 Runde · SL Glute Bridge 8/Seite; Standing Banded Hip Flexor Drive 10/Seite; Prone Swimmers 8; Side Plank Abduction & Adduction 8/Seite; Scap Pull-up 10.';
const sprintPrep='1 Runde · Oscillating Lunge Jump with Switch 10/Seite; MB Pogo Jump 12; MB Split Stance Pogo Jump 8/Seite; A-Skip 5/Seite; High Knees 14 m. Pausen nach Bedarf.';
const ex=(id,name,sets,reps,desc='',kind='Kraft')=>({id,name,sets,reps,desc,kind});
const plans=[
{id:'s1',name:'Session 1',focus:'Full Body Strength, Power & Speed',blocks:[{name:'A · Warm-up',items:[ex('foam1','Foam Roller Circuit',1,'1 Runde',foam,'Mobilität'),ex('mob1','Full Body Mobility Prep 1',1,'1 Runde',prep1,'Mobilität'),ex('sprintprep','Sprint Prep Circuit',1,'1 Runde',sprintPrep,'Sprint')]},{name:'B · Speed & Plyometrics',items:[ex('depth','Split Stance Depth Drop',3,'3 / Seite','Von der Box steigen und weich im Ausfallschritt landen.','Explosivität'),ex('sprint10','9 m Sprint',4,'9 m','Maximale Beschleunigung, Startposition variieren.','Sprint')]}]},
{id:'s2',name:'Session 2',focus:'Full Body Strength, Power & Explosiveness',blocks:[{name:'A · Warm-up',items:[ex('foam2','Foam Roller Circuit',1,'1 Runde',foam,'Mobilität'),ex('mob2','Full Body Mobility Prep 2',1,'1 Runde',prep2,'Mobilität')]},{name:'B · Explosivität',items:[ex('mbslam','MB Slam',2,'4','Medizinball über Kopf heben und explosiv auf den Boden werfen.','Explosivität'),ex('plyopush','Band Accelerated Plyometric Pushup',2,'4','Band am Rack befestigen, um den Brustkorb legen und explosiv hochdrücken.','Explosivität'),ex('around','Around the World MB Slam',2,'4','Medizinball um den Kopf kreisen und explosiv auf den Boden werfen.','Explosivität')]},{name:'C · Kraft',items:[ex('landmine','SA Landmine Press',3,'6–8 / Seite','Einarmig von Schulterhöhe schräg nach vorne oben drücken. RPE 8–10, 0–2 Wiederholungen Reserve.'),ex('split','DB RFE Split Squat',3,'6–8 / Seite','Hinteren Fuss auf Bank, vorderes Bein kontrolliert beugen. RPE 8–10, 0–2 Wiederholungen Reserve.'),ex('bird','Bird Dog Row',3,'6–8 / Seite','Hand und Knie auf Bank, anderes Bein strecken und Kurzhantel rudern. RPE 8–10.'),ex('ham','SL BOSU Hamstring Curls',2,'8–10 / Seite','Eine Ferse auf Ball, Hüfte anheben und Ferse zu dir ziehen.'),ex('pallof','Pallof Press with Overhead Reach',2,'10 / Seite','Seitlich zum Band/Kabel stehen, Hände vor und über Kopf führen, Rotation widerstehen. Mindestens zwei Sätze sichtbar.') ]},{name:'D · Zusatz & Kondition',items:[ex('pinch','Plate Pinch Carry',2,'18 m','Gewichtsscheibe mit Fingern greifen, aufrecht gehen.','Griffkraft'),ex('rollups','Kettlebell Rollups',2,'2','Arme gestreckt, kontrolliert auf- und abrollen.','Core'),ex('bikeana','Anaerobic Capacity Bike Intervals',5,'30s hart / 90s locker','3 Minuten aufwärmen, 5 Intervalle, danach 2 Minuten locker ausfahren.','Kondition')]}]},
{id:'s3',name:'Session 3',focus:'Full Body Strength, Power & Agility',blocks:[{name:'A · Vorbereitung',items:[ex('foam3','Foam Roller Circuit',1,'1 Runde',foam,'Mobilität')]},{name:'B · Power & Kraft',items:[ex('stepjump','Step-up Jump',2,'4 / Seite','Explosiver Sprung auf/aus dem Step-up. Mindestens zwei Sätze sichtbar.','Explosivität'),ex('bandsquat','Banded Box Squat',1,'Sätze offen','Schweres Gewicht; aus der Box explosiv aufstehen. Satz- und Wiederholungszahl im Screenshot nicht lesbar.'),ex('incline','Single-arm DB Incline Bench Press',1,'Wdh. offen','Einarmiges Schrägbankdrücken, RPE 8–10. Satz- und Wiederholungszahl nicht sicher lesbar.'),ex('bstance','DB B-stance Romanian Deadlift',2,'6–8 / Seite','Einbeinbetonte Hüftbeuge, RPE 8–10.') ]},{name:'C · Core & Assistenz',items:[ex('plankdrag','Kettlebell Plank Drag',3,'8–10 / Seite','Kettlebell im Plank unter dem Körper durchziehen.'),ex('traises','Incline T Raises',2,'15–20','Brust auf Schrägbank, Arme in T-Form anheben.'),ex('hanging','Hanging Leg Raises',2,'8–12','Kontrolliertes Beinheben im Hang.'),ex('soleus','Single Leg Soleus Raise Iso Hold',2,'30s / Seite','Knie gebeugt, Ferse anheben und halten.') ]},{name:'D · Kondition',items:[ex('bikerepeat','Repeat Sprint Ability Bike Intervals',2,'6 Intervalle','3 Min Warm-up; Satz 1: 6×8s maximal/22s locker; 3 Min locker; Satz 2: 6×10s maximal/20s locker; 3 Min locker.','Kondition')]}]}
];
const STORE='sl33-training-v3';let db;try{db=JSON.parse(localStorage.getItem(STORE))||{}}catch{db={}};db.logs ||= {};db.videos ||= {};db.completed ||= {};db.planned ||= {};db.goals ||= {};let activePlan='s1',activeTab='home',month=new Date(),timerEnd=0,timerLeft=90,timerId=null,fb=null,fbUser=null,syncing=false;
const $=id=>document.getElementById(id),today=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`},safe=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function save(){localStorage.setItem(STORE,JSON.stringify(db));if(fbUser)queueSync()}
function getLog(date= $('workoutDate').value,pid=activePlan){const key=date+'|'+pid;return db.logs[key] ||= {sets:{},notes:'',date,plan:pid,finished:false}}
function navigate(tab){activeTab=tab;document.querySelectorAll('main>section').forEach(el=>el.classList.toggle('hidden',el.id!==tab));document.querySelectorAll('[data-tab]').forEach(el=>el.classList.toggle('active',el.dataset.tab===tab));if(tab==='home')renderHome();if(tab==='calendarPage')renderCalendar();if(tab==='stats')renderStats();if(tab==='goals')renderGoals();window.scrollTo(0,0)}
function renderHome(){ $('sessionCards').innerHTML=plans.map(p=>{let total=p.blocks.reduce((a,b)=>a+b.items.length,0);return `<div class="card"><div class="flex"><span class="pill">${safe(p.name.toUpperCase())}</span><span class="mini">${total} Übungen</span></div><h2 style="margin:13px 0 6px">${safe(p.focus)}</h2><p class="muted">${p.blocks.length} Trainingsabschnitte · selbst auswählbar</p><button class="btn" onclick="openWorkout('${p.id}')">Training öffnen →</button></div>`}).join('')}
function openWorkout(id){activePlan=id;$('workoutDate').value=today();navigate('workout');renderWorkout()}
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
 return Object.values(db.logs).filter(l=>l.date&&l.date<beforeDate)
  .flatMap(l=>Object.entries(l.sets||{}).filter(([key,s])=>key.startsWith(id+'-')&&s.kg!==undefined&&s.kg!==''&&Number.isFinite(Number(s.kg))&&Number(s.kg)>=0)
    .map(([key,s])=>({date:l.date,kg:Number(s.kg),reps:s.reps||'',set:Number(key.slice(id.length+1))+1,done:!!s.done})))
  .sort((a,b)=>b.date.localeCompare(a.date)||a.set-b.set);
}
function previousSet(id,index,date){
 const logs=Object.values(db.logs).filter(l=>l.date&&l.date<date&&l.sets&&Object.keys(l.sets).some(k=>k.startsWith(id+'-')))
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
 const p=plans.find(x=>x.id===activePlan),log=getLog();
 $('workoutTitle').textContent=p.name;$('workoutFocus').textContent=p.focus;$('workoutNotes').value=log.notes||'';
 let total=0,done=0,html='';
 for(const block of p.blocks){
   html+=`<div class="section-label">${safe(block.name)}</div><div class="card">`;
   for(const item of block.items){
     const key=item.id,mode=exerciseMode(item),one=mode==='circuit',units=one?1:item.sets;
     const prescription=one?'1 Runde · einmal vollständig durchführen':mode==='interval'?item.reps+' · Details in Anleitung':mode==='hold'?item.sets+' × '+item.reps:item.sets+' Sätze × '+item.reps;
     html+=`<div class="item"><div class="flex"><h3>${safe(item.name)}</h3><span class="pill">${safe(modeLabel(mode))}</span></div><div class="sub" style="margin:6px 0 10px">${safe(prescription)}</div>`;
     if(mode==='weighted')html+=`<button type="button" class="history-toggle" onclick="toggleExerciseHistory('${key}')">↗ Gewichtsverlauf ansehen</button><div id="history-${key}" class="exercise-history" hidden></div>`;
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
       html+=`<div class="set-card ${entry.done?'is-done':''}"><div class="set-card-title"><span class="set-number">${one?'Routine':mode==='interval'?'Block':'Satz'} ${i+1}</span><button aria-label="${one?'Routine':mode==='interval'?'Intervallblock':'Satz'} ${i+1} ${entry.done?'als offen markieren':'abhaken'}" aria-pressed="${entry.done?'true':'false'}" class="check ${entry.done?'yes':''}" onclick="toggleSet('${key}',${i})">${buttonText}</button></div><div class="set-inputs">`;
       if(mode==='weighted'){
         const prev=previousSet(key,i,log.date),shown=entry.kg??prev?.kg??'';
         html+=`<label>Gewicht (kg) <input aria-label="Gewicht Satz ${i+1}" type="number" min="0" step="0.5" value="${safe(shown)}" oninput="setField('${key}',${i},'kg',this.value)"></label>`;
         if(entry.kg===undefined&&prev)html+=`<div class="last-weight">Zuletzt: ${safe(prev.kg)} kg · ${safe(prev.date)}</div>`;
       }
       if(['weighted','equipment','bodyweight'].includes(mode))html+=`<label>Wdh. <input aria-label="Wiederholungen Satz ${i+1}" type="text" style="width:86px" value="${safe(entry.reps??'')}" placeholder="${safe(item.reps)}" onchange="setField('${key}',${i},'reps',this.value)"></label>`;
       html+='</div></div>';
     }
     html+='</div>';
     if(one)html+='<div class="mini" style="margin-top:8px">Keine Gewichte nötig · nach der gesamten Routine abhaken</div>';
     if(mode==='interval')html+='<div class="mini" style="margin-top:8px">Zeiten stehen in der Anleitung · jeden Intervallblock nach Abschluss abhaken</div>';
     if(mode==='hold')html+='<div class="mini" style="margin-top:8px">Haltezeit gemäss Vorgabe · kein Gewicht eintragen</div>';
   }
   html+='</div>';
 }
 $('workoutItems').innerHTML=html;$('workoutPercent').textContent=total?Math.round(done/total*100)+'%':'';$('workoutBar').style.width=(total?done/total*100:0)+'%';
}
function toggleSet(key,i){const l=getLog(),e=l.sets[key+'-'+i] ||= {};if(!e.done&&e.kg===undefined){const prev=previousSet(key,i,l.date);if(prev)e.kg=prev.kg}e.done=!e.done;if(!e.done)l.finished=false;save();renderWorkout()}
function setField(key,i,field,value){let e=getLog().sets[key+'-'+i] ||= {};e[field]=value;save()}
function saveNotes(){getLog().notes=$('workoutNotes').value;save()}
function finishWorkout(){let l=getLog();const p=plans.find(x=>x.id===activePlan),total=p.blocks.flatMap(b=>b.items).reduce((n,e)=>n+(exerciseMode(e)==='circuit'?1:e.sets),0),done=Object.values(l.sets).filter(s=>s.done).length;if(done<total&&!confirm(`${done} von ${total} Sätzen erledigt. Training trotzdem abschliessen?`))return;l.finished=true;save();navigate('stats')}
function setVideo(key){const prev=db.videos[key]||'';let v=prompt('Bestätigten YouTube-Videolink einfügen (leer = entfernen):',prev);if(v===null)return;if(v.trim()&&!/^https:\/\/(www\.)?(youtube\.com|youtu\.be)\//i.test(v.trim()))return alert('Bitte einen gültigen YouTube-HTTPS-Link verwenden.');if(v.trim())db.videos[key]=v.trim();else delete db.videos[key];save();renderWorkout()}
function shiftMonth(n){month=new Date(month.getFullYear(),month.getMonth()+n,1);renderCalendar()}
let selectedCalendarDate=today();
const fixedWeek=[['Frei / Regeneration','frei'],['Eistraining','eis'],['Eistraining','eis'],['Eistraining','eis'],['Match','match'],['Frei / Regeneration','frei'],['Match','match']];
function weekday(date){const [y,m,d]=date.split('-').map(Number);return (new Date(y,m-1,d).getDay()+6)%7}
function planSession(date,id){db.planned[date] ||= [];if(!db.planned[date].includes(id))db.planned[date].push(id);save();renderCalendar();calendarDay(date)}
function removePlanned(date,id){db.planned[date]=(db.planned[date]||[]).filter(x=>x!==id);save();renderCalendar();calendarDay(date)}
function openPlanned(date,id){openWorkout(id);$('workoutDate').value=date;renderWorkout()}
function renderCalendar(){const y=month.getFullYear(),m=month.getMonth(),start=(new Date(y,m,1).getDay()+6)%7,days=new Date(y,m+1,0).getDate();$('monthLabel').textContent=new Intl.DateTimeFormat('de-CH',{month:'long',year:'numeric'}).format(month);let html=['Mo','Di','Mi','Do','Fr','Sa','So'].map(d=>`<div class="mini" style="text-align:center">${d}</div>`).join('');for(let i=0;i<start;i++)html+='<div></div>';for(let d=1;d<=days;d++){const date=`${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`,n=new Set([...(db.planned[date]||[]),...Object.values(db.logs).filter(l=>l.date===date&&(l.finished||Object.values(l.sets).some(s=>s.done))).map(l=>l.plan)]).size,fix=fixedWeek[weekday(date)];html+=`<button class="day ${n?'has':''} ${date===selectedCalendarDate?'selected':''}" data-date="${date}" onclick="calendarDay('${date}')"><strong>${d}</strong><span>${fix[1]==='frei'?'Frei':fix[1]==='eis'?'Eis':'Match'}</span>${n?`<em class="day-extra">+${n}</em>`:''}</button>`}$('calendarGrid').innerHTML=html;const selected=selectedCalendarDate.slice(0,7)===`${y}-${String(m+1).padStart(2,'0')}`?selectedCalendarDate:`${y}-${String(m+1).padStart(2,'0')}-01`;calendarDay(selected)}
function calendarDay(date){selectedCalendarDate=date;document.querySelectorAll('.day').forEach(b=>b.classList.toggle('selected',b.dataset.date===date));const fixed=fixedWeek[weekday(date)][0],planned=db.planned[date]||[],logs=Object.values(db.logs).filter(l=>l.date===date),all=[...new Set([...planned,...logs.map(l=>l.plan)])];$('calendarDetail').innerHTML=`<div class="card"><h3>${safe(date)}</h3><p><strong>Fix:</strong> ${safe(fixed)}</p><button class="btn alt" onclick="openGoalsFor('${date}')">🎯 Ziele & Reflexion für diesen Tag</button><h3>Zusätzliche Trainings</h3>${all.length?all.map(id=>{const p=plans.find(p=>p.id===id),log=logs.find(l=>l.plan===id);return `<div style="padding:10px 0;border-top:1px solid var(--edge)"><strong>${safe(p?.name||id)}</strong> ${log?.finished?'✓':''}<div class="rowwrap" style="margin-top:8px"><button class="btn alt" onclick="openPlanned('${date}','${id}')">Training öffnen</button>${planned.includes(id)?`<button class="btn alt" onclick="removePlanned('${date}','${id}')">Aus Planung entfernen</button>`:''}</div></div>`}).join(''):'<p class="muted">Noch kein zusätzliches Training geplant.</p>'}<h3>Training hinzufügen</h3><div class="rowwrap">${plans.filter(p=>!all.includes(p.id)).map(p=>`<button class="btn alt" onclick="planSession('${date}','${p.id}')">+ ${safe(p.name)}</button>`).join('')||'<span class="mini">Alle drei Sessions sind bereits eingetragen.</span>'}</div></div>`}
function renderStats(){const logs=Object.values(db.logs),finished=logs.filter(l=>l.finished),checked=logs.reduce((a,l)=>a+Object.values(l.sets).filter(s=>s.done).length,0),days=new Set(logs.filter(l=>l.finished||Object.values(l.sets).some(s=>s.done)).map(l=>l.date)).size;$('statCards').innerHTML=`<div class="stat"><b>${finished.length}</b><small>Trainings fertig</small></div><div class="stat"><b>${checked}</b><small>Sätze erledigt</small></div><div class="stat"><b>${days}</b><small>Trainingstage</small></div>`;let prs={};for(const l of logs)for(const [key,s] of Object.entries(l.sets)){const kg=Number(s.kg);if(!s.done||!Number.isFinite(kg)||kg<=0)continue;const id=key.replace(/-\d+$/,'');if(!prs[id]||kg>prs[id].kg)prs[id]={kg,date:l.date}}$('prList').innerHTML=Object.entries(prs).sort((a,b)=>b[1].kg-a[1].kg).map(([id,v])=>`<div class="card flex"><div>${safe(findName(id))}<div class="mini">${safe(v.date)}</div></div><b>${v.kg} kg</b></div>`).join('')||'<p class="muted">Trage Gewichte ein und hake Sätze ab, um Bestleistungen zu sehen.</p>';$('historyList').innerHTML=logs.filter(l=>l.finished||Object.values(l.sets).some(s=>s.done)).sort((a,b)=>b.date.localeCompare(a.date)).slice(0,20).map(l=>`<div class="card flex"><span>${safe(l.date)} · ${safe(plans.find(p=>p.id===l.plan)?.name||l.plan)}</span><span class="badge">${l.finished?'✓ Fertig':'Begonnen'}</span></div>`).join('')||'<p class="muted">Noch keine Trainings gespeichert.</p>'}
function findName(id){for(const p of plans)for(const b of p.blocks)for(const e of b.items)if(e.id===id)return e.name;return id}
function timerDraw(){const n=Math.max(0,timerLeft);$('timerDisplay').textContent=String(Math.floor(n/60)).padStart(2,'0')+':'+String(n%60).padStart(2,'0')}
function startTimer(n){clearInterval(timerId);timerLeft=n;timerEnd=Date.now()+n*1000;timerId=setInterval(()=>{timerLeft=Math.max(0,Math.ceil((timerEnd-Date.now())/1000));timerDraw();if(!timerLeft){pauseTimer();alert('Pause vorbei!')}},250);timerDraw()}
function pauseTimer(){if(timerId){timerLeft=Math.max(0,Math.ceil((timerEnd-Date.now())/1000));clearInterval(timerId);timerId=null;timerDraw()}}
function resetTimer(){pauseTimer();timerLeft=90;timerDraw()}
function exportData(){const blob=new Blob([JSON.stringify({version:3,data:db},null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='sl33-training-backup.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
function importData(ev){const file=ev.target.files?.[0];if(!file)return;file.text().then(t=>{let obj=JSON.parse(t);if(!obj.data?.logs||!confirm('Bestehende lokale Trainingsdaten durch die Sicherung ersetzen?'))return;db=obj.data;db.videos ||= {};db.completed ||= {};db.planned ||= {};db.goals ||= {};save();renderHome();alert('Daten importiert')}).catch(()=>alert('Ungültige Sicherungsdatei.'));ev.target.value=''}
// Optional Firebase cloud integration. Requires a real Firebase project and restrictive Firestore rules.
let syncDelay;function queueSync(){clearTimeout(syncDelay);syncDelay=setTimeout(syncCloud,1000)}
function loadScript(url){return new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=url;s.onload=resolve;s.onerror=reject;document.head.appendChild(s)})}
async function connectFirebase(){try{let cfg=JSON.parse($('firebaseConfig').value);if(!cfg.apiKey||!cfg.projectId||!cfg.authDomain||!cfg.appId)throw Error('apiKey, authDomain, projectId und appId fehlen.');localStorage.setItem('sl33-firebase-config',JSON.stringify(cfg));if(!window.firebase){await loadScript('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js');await loadScript('https://www.gstatic.com/firebasejs/10.14.1/firebase-auth-compat.js');await loadScript('https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore-compat.js')}if(!firebase.apps.length)firebase.initializeApp(cfg);fb=firebase;fb.auth().onAuthStateChanged(async user=>{fbUser=user;$('authPanel').classList.remove('hidden');$('cloudStatus').textContent=user?'Angemeldet: '+user.email:'Firebase verbunden · Bitte anmelden';if(user){try{const snap=await fb.firestore().collection('users').doc(user.uid).get();if(snap.exists){const remote=snap.data().data;if(remote?.logs){if(confirm('Cloud-Daten laden? Die lokalen Daten werden dabei ersetzt.')){db=remote;db.videos ||= {};db.completed ||= {};db.planned ||= {};db.goals ||= {};localStorage.setItem(STORE,JSON.stringify(db));if(activeTab==='workout')renderWorkout();if(activeTab==='stats')renderStats();if(activeTab==='goals')renderGoals()}}}else await syncCloud()}catch(e){$('cloudStatus').textContent='Cloud-Lesen fehlgeschlagen: '+e.message}}});$('cloudStatus').textContent='Firebase wird verbunden …'}catch(e){$('cloudStatus').textContent='Verbindung fehlgeschlagen: '+e.message}}
async function authAction(action){if(!fb)return;try{if(action==='logout'){await fb.auth().signOut();return}const email=$('authEmail').value.trim(),pass=$('authPassword').value;if(action==='register')await fb.auth().createUserWithEmailAndPassword(email,pass);else await fb.auth().signInWithEmailAndPassword(email,pass)}catch(e){alert('Anmeldung: '+e.message)}}
async function syncCloud(){if(!fb||!fbUser||syncing)return;syncing=true;try{await fb.firestore().collection('users').doc(fbUser.uid).set({data:db,updatedAt:fb.firestore.FieldValue.serverTimestamp()});$('cloudStatus').textContent='Cloud synchronisiert · '+fbUser.email}catch(e){$('cloudStatus').textContent='Cloud-Speicherung fehlgeschlagen: '+e.message}finally{syncing=false}}
function disconnectFirebase(){localStorage.removeItem('sl33-firebase-config');$('firebaseConfig').value='';$('cloudStatus').textContent='Konfiguration entfernt. Seite neu laden, um die Verbindung zu beenden.'}

// Personal goals and reflections: local first, also included in existing JSON export / optional cloud sync.
let goalDate=today(),goalType='match';
const goalTypes={match:'Match',ice:'Eistraining',gym:'Krafttraining',other:'Sonstiges'};
function goalKey(){return goalDate+'|'+goalType}
function getGoal(){return db.goals[goalKey()]||{items:[],learned:'',notes:'',media:[]}}
function ensureGoal(){return db.goals[goalKey()] ||= {items:[],learned:'',notes:'',media:[]}}
function openGoalsFor(date){goalDate=date;const kind=fixedWeek[weekday(date)][1];goalType=kind==='match'?'match':kind==='eis'?'ice':'gym';navigate('goals')}
function goalSwitch(){goalDate=$('goalDate').value||today();goalType=$('goalType').value;renderGoals()}
function goalAdd(){const text=$('goalNew').value.trim();if(!text)return;ensureGoal().items.push({text,status:'pending'});$('goalNew').value='';save();renderGoals()}
function goalStatus(i,status){const g=ensureGoal();if(!g.items[i])return;g.items[i].status=status;save();renderGoals()}
function goalRemove(i){if(!confirm('Dieses Ziel löschen?'))return;ensureGoal().items.splice(i,1);save();renderGoals()}
function goalField(field,value){ensureGoal()[field]=value;save()}
function goalMediaAdd(){const url=$('goalMediaUrl').value.trim();if(!/^https:\/\//i.test(url))return alert('Bitte einen HTTPS-Link einfügen.');ensureGoal().media ||= [];ensureGoal().media.push(url);save();renderGoals()}
function goalMediaRemove(i){ensureGoal().media.splice(i,1);save();renderGoals()}
function renderGoals(){
 $('goalDate').value=goalDate;$('goalType').value=goalType;
 const g=getGoal(),items=g.items||[],media=g.media||[];
 $('goalList').innerHTML=items.map((x,i)=>`<div class="goal-item"><strong>${safe(x.text)}</strong><div class="goal-actions"><button class="btn ${x.status==='yes'?'':'alt'}" onclick="goalStatus(${i},'yes')">✓ Erreicht</button><button class="btn ${x.status==='partial'?'':'alt'}" onclick="goalStatus(${i},'partial')">Teilweise</button><button class="btn ${x.status==='no'?'':'alt'}" onclick="goalStatus(${i},'no')">Nicht erreicht</button><button class="btn alt" onclick="goalRemove(${i})">Entfernen</button></div><div class="goal-muted">${({yes:'Erreicht',partial:'Teilweise erreicht',no:'Nicht erreicht',pending:'Noch offen'})[x.status]||'Noch offen'}</div></div>`).join('')||'<p class="muted">Noch keine Ziele. Lege vor dem Training deine Ziele fest.</p>';
 $('goalLearned').value=g.learned||'';$('goalNotes').value=g.notes||'';
 $('goalMedia').innerHTML=media.map((url,i)=>`<div class="goal-entry"><a class="goal-link" target="_blank" rel="noopener noreferrer" href="${safe(url)}">${safe(url)}</a> <button class="btn alt" onclick="goalMediaRemove(${i})">Entfernen</button></div>`).join('')||'<p class="goal-muted">Hier kannst du Links zu deinen Fotos und Videos ablegen. Direkte Datei-Uploads benötigen später einen privaten Cloud-Speicher.</p>';
 $('goalHistory').innerHTML=Object.entries(db.goals).filter(([k,v])=>(v.items||[]).length||v.learned||v.notes).sort((a,b)=>b[0].localeCompare(a[0])).slice(0,60).map(([k,v])=>{const [d,t]=k.split('|'),yes=(v.items||[]).filter(x=>x.status==='yes').length;return `<div class="goal-entry"><button class="btn alt" onclick="goalOpenHistory('${safe(d)}','${safe(t)}')">${safe(d)} · ${safe(goalTypes[t]||t)}</button><div class="goal-muted">${yes}/${(v.items||[]).length} Ziele erreicht</div>${v.learned?`<p>${safe(v.learned)}</p>`:''}</div>`}).join('')||'<p class="muted">Deine früheren Reflexionen erscheinen hier.</p>';
}
function goalOpenHistory(date,type){goalDate=date;goalType=type;renderGoals();window.scrollTo({top:0,behavior:'smooth'})}

$('firebaseConfig').value=localStorage.getItem('sl33-firebase-config')||'';renderHome();timerDraw();if($('firebaseConfig').value)connectFirebase();
