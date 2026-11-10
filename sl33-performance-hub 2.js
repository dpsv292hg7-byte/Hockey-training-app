/* SL33 Performance Hub 3.0 — additive module, no existing data overwritten. */
(() => {
  'use strict';
  const ID = 'sl33-performance-hub';
  const KEY = 'sl33-performance-hub-v1';
  const DAYS = ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'];
  const SCHEDULE = [
    ['Regeneration','Erholung und Schlaf'],
    ['Regeneration','Optional kurzer Oberkörper, nur wenn erholt'],
    ['Teamkraft + Eis','Teamtraining zählt als Kraftbelastung'],
    ['Eistraining','Speed-/Puckfokus nach Trainerabsprache'],
    ['Eistraining','Frisch für Freitag bleiben'],
    ['MATCH','Matchleistung vor Zusatztraining'],
    ['Regeneration','Erholung vor dem Sonntagsmatch']
  ];
  const $ = id => document.getElementById(id);
  const localDate = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  };
  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const validDate = s => /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(`${s}T12:00:00`));
  const data = () => {
    if (typeof db !== 'undefined' && db && typeof db === 'object') {
      if (!db.player || typeof db.player !== 'object' || Array.isArray(db.player)) db.player = {};
      if (!Array.isArray(db.player.bodyWeights)) db.player.bodyWeights = [];
      return { entries: db.player.bodyWeights, persist: () => { if (typeof save === 'function') save(); } };
    }
    let entries = [];
    try { const stored = JSON.parse(localStorage.getItem(KEY) || '[]'); if (Array.isArray(stored)) entries = stored; } catch (_) {}
    return { entries, persist: () => localStorage.setItem(KEY, JSON.stringify(entries)) };
  };
  const cleanEntries = entries => entries.filter(x => x && validDate(x.date) && Number.isFinite(Number(x.kg)) && Number(x.kg) >= 30 && Number(x.kg) <= 250)
    .map(x => ({ date:x.date, kg:Number(x.kg) })).sort((a,b) => a.date.localeCompare(b.date));
  const avg = arr => arr.length ? arr.reduce((sum,x) => sum+x.kg,0)/arr.length : null;
  const weekly = entries => {
    const byWeek = new Map();
    for (const x of entries) {
      const dt = new Date(`${x.date}T12:00:00`);
      const day = (dt.getDay()+6)%7;
      dt.setDate(dt.getDate()-day);
      const monday = `${dt.getFullYear()}-${String(dt.getMonth()+1).padStart(2,'0')}-${String(dt.getDate()).padStart(2,'0')}`;
      if (!byWeek.has(monday)) byWeek.set(monday,[]);
      byWeek.get(monday).push(x);
    }
    return [...byWeek.entries()].sort((a,b)=>a[0].localeCompare(b[0])).map(([week,values])=>({week,mean:avg(values),count:values.length}));
  };
  function render() {
    const root = $(ID); if (!root) return;
    const entries = cleanEntries(data().entries);
    const weeks = weekly(entries);
    const latest = entries.at(-1);
    const current = weeks.at(-1), previous = weeks.at(-2);
    const diff = current && previous ? current.mean-previous.mean : null;
    const today = new Date(), plan = SCHEDULE[today.getDay()];
    const weight = latest ? `${latest.kg.toFixed(1)} kg` : 'Noch kein Eintrag';
    root.innerHTML = `
      <style>
        #${ID}{margin:18px 0;color:#edf5ff}
        #${ID} .sl33h-card{border:1px solid #385b85;border-radius:16px;background:linear-gradient(140deg,#142b4b,#101c31);padding:17px;margin:12px 0;box-shadow:0 8px 20px #0002}
        #${ID} h3{margin:0 0 9px} #${ID} h4{margin:14px 0 6px} #${ID} p{margin:7px 0;line-height:1.55}
        #${ID} .sl33h-sub{color:#b6cbe4;font-size:.9rem} #${ID} .sl33h-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
        #${ID} .sl33h-stat{border:1px solid #365474;border-radius:12px;padding:12px;background:#0e213b} #${ID} .sl33h-stat b{display:block;font-size:1.25rem}
        #${ID} label{display:flex;flex-direction:column;gap:5px;font-weight:600;min-width:0}
        #${ID} input{width:100%;min-width:0;box-sizing:border-box;padding:11px;border-radius:9px;border:1px solid #6785a5;background:#091a2f;color:white;font:inherit}
        #${ID} button{min-height:44px;border:0;border-radius:10px;background:#6daeff;color:#08172b;padding:10px 14px;font-weight:750;cursor:pointer}
        #${ID} button.sl33h-delete{background:transparent;color:#ffb6c1;border:1px solid #9d5365}
        #${ID} .sl33h-row{display:flex;align-items:end;gap:9px;flex-wrap:wrap} #${ID} .sl33h-row label{flex:1 1 130px}
        #${ID} details summary{cursor:pointer;font-weight:750;padding:5px 0}
        #${ID} .sl33h-history{max-height:260px;overflow:auto} #${ID} .sl33h-entry{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 0;border-bottom:1px solid #38516b}
        #${ID} .sl33h-entry button{min-height:36px;padding:6px 10px}
        #${ID} .sl33h-notice{font-size:.85rem;color:#bfd1e5}
        @media(max-width:500px){#${ID} .sl33h-grid{grid-template-columns:1fr 1fr} #${ID} .sl33h-card{padding:13px}}
      </style>
      <div class="sl33h-card">
        <div class="sl33h-sub">SL33 PERFORMANCE 3.0 · ATHLETE HUB</div>
        <h3>🏒 Dein Hockey-Performance-Plan</h3>
        <p><strong>${DAYS[today.getDay()]}: ${escapeHtml(plan[0])}</strong> – ${escapeHtml(plan[1])}</p>
        <p class="sl33h-sub">Priorität: Matchleistung → Speed und Puckkontrolle → funktionelle Kraft und Muskelaufbau → Regeneration.</p>
        <div class="sl33h-grid">
          <div class="sl33h-stat"><span class="sl33h-sub">Letztes Gewicht</span><b>${escapeHtml(weight)}</b></div>
          <div class="sl33h-stat"><span class="sl33h-sub">Wochentrend</span><b>${diff===null?'Noch offen':`${diff>=0?'+':''}${diff.toFixed(2)} kg`}</b></div>
        </div>
        <p class="sl33h-notice">Langfristige Orientierung: Richtung 85 kg, sofern Geschwindigkeit, Beweglichkeit und Leistung erhalten bleiben. Kein aggressives Bulking.</p>
      </div>
      <div class="sl33h-card">
        <h3>⚖️ Gewichtsentwicklung</h3>
        <form id="sl33h-form" class="sl33h-row">
          <label>Datum<input name="date" type="date" required value="${localDate()}"></label>
          <label>Gewicht (kg)<input name="kg" type="number" min="30" max="250" step="0.1" inputmode="decimal" placeholder="z. B. 74.2" required></label>
          <button type="submit">Speichern</button>
        </form>
        <p id="sl33h-message" class="sl33h-sub" role="status" aria-live="polite">Ein Eintrag pro Tag. Erneutes Speichern aktualisiert den Tag.</p>
        <details><summary>Verlauf (${entries.length} Tage) anzeigen</summary>
          <div class="sl33h-history">${entries.length ? entries.slice().reverse().slice(0,40).map(x=>`<div class="sl33h-entry"><span>${escapeHtml(x.date)} · <strong>${x.kg.toFixed(1)} kg</strong></span><button type="button" class="sl33h-delete" data-remove="${escapeHtml(x.date)}">Löschen</button></div>`).join('') : '<p class="sl33h-sub">Noch keine Messwerte gespeichert.</p>'}</div>
        </details>
        <p class="sl33h-notice">Wochentrend = Unterschied der Durchschnittsgewichte zweier Kalenderwochen. Einzelne Messungen schwanken durch Wasser und Nahrung. Bei nur wenigen Messungen ist der Trend wenig aussagekräftig.</p>
      </div>
      <details class="sl33h-card"><summary>📋 Mein persönlicher Entwicklungsplan</summary>
        <h4>1. Kraft und Muskelaufbau</h4>
        <p>Dienstag ist bereits Teamkrafttraining. Nach einer Gym-Pause zunächst höchstens 0–1 kurze zusätzliche Oberkörpereinheit pro Woche; später bei guter Erholung anpassen. Sätze kontrolliert, meist 2–3 Wiederholungen vor Muskelversagen beenden. Vor Matches keinen unnötigen Muskelkater provozieren.</p>
        <h4>2. Skating und Puck</h4>
        <p>Kurze explosive Starts (5–15 m) mit ausreichend Pause. Danach Starts mit Puck, schnelle Entscheidungen und Technik unter Tempo. Qualität vor Umfang, nach Absprache mit dem Teamtrainer.</p>
        <h4>3. Ernährung</h4>
        <p>Bei 74 kg Orientierung: rund 118–148 g Protein pro Tag, ausreichend Kohlenhydrate und ein moderater Kalorienüberschuss. Gewicht über mehrere Wochen statt einzelne Tage beurteilen.</p>
        <h4>4. Match und mentale Stärke</h4>
        <p>Vor jeder Einheit ein klares Ziel. Nach dem Match kurz festhalten: Was gelang? Was lernte ich? Wie reagiere ich nach einem Fehler? Bestehende Ziele- und Matchreflexionsfunktionen dafür verwenden.</p>
        <h4>5. Messen statt raten</h4>
        <p>Gewichtstrend wöchentlich; Kraftentwicklung und Umfänge etwa alle 4–6 Wochen; vergleichbare Speed- und Skilltests etwa alle 6–8 Wochen. Keine erfundenen Werte.</p>
        <p class="sl33h-notice">Bei Schmerzen, Schwindel, Sehproblemen oder ungewöhnlichen Beschwerden keine automatischen Belastungsempfehlungen als Freigabe verwenden.</p>
      </details>`;
    $('sl33h-form').addEventListener('submit', ev => {
      ev.preventDefault();
      const form = ev.currentTarget, date = form.elements.date.value, kg = Number(form.elements.kg.value);
      if (!validDate(date) || !Number.isFinite(kg) || kg < 30 || kg > 250) { $('sl33h-message').textContent='Bitte ein gültiges Datum und Gewicht eingeben.'; return; }
      const state = data(), found = state.entries.findIndex(x=>x.date===date);
      if (found>=0) state.entries[found] = {date,kg}; else state.entries.push({date,kg});
      state.persist(); render(); $('sl33h-message').textContent='✓ Gewicht gespeichert.';
    });
    root.querySelectorAll('[data-remove]').forEach(button => button.addEventListener('click', () => {
      const date = button.dataset.remove;
      if (!confirm(`Gewichtseintrag vom ${date} löschen?`)) return;
      const state=data(), i=state.entries.findIndex(x=>x.date===date);
      if(i>=0){state.entries.splice(i,1);state.persist();render();}
    }));
  }
  function mount(){
    const player = $('player'); if (!player || $(ID)) return;
    const host = document.createElement('div'); host.id=ID;
    const heading = player.querySelector('.player-heading');
    if(heading) heading.insertAdjacentElement('afterend',host); else player.prepend(host);
    render();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',mount,{once:true}); else mount();
})();
