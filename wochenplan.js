/* SL33 Performance – Wochenplan-Ergänzung für Version 2.
   Eigenständiges Modul; bestehende Trainings- und Kalenderdaten bleiben unberührt. */
(function () {
  'use strict';
  const tage = [
    ['Montag', 'Regeneration / frei', 'frei'],
    ['Dienstag', 'Eistraining', 'eis'],
    ['Mittwoch', 'Eistraining', 'eis'],
    ['Donnerstag', 'Eistraining', 'eis'],
    ['Freitag', 'Match', 'match'],
    ['Samstag', 'Regeneration / frei', 'frei'],
    ['Sonntag', 'Match', 'match']
  ];
  function setup() {
    const home = document.getElementById('home');
    if (!home || document.getElementById('sl33-weekly-plan')) return;
    const section = document.createElement('section');
    section.id = 'sl33-weekly-plan';
    section.className = 'card';
    section.innerHTML = '<div class="flex"><h2 style="margin:0">Dein Wochenplan</h2><span class="pill">Fixe Termine</span></div>' +
      '<p class="muted" style="font-size:13px">Eistraining und Matches sind deine festen Wochentermine. Die Gym-Sessions kannst du unabhängig davon selbst auswählen.</p>' +
      '<div id="sl33-weekly-days"></div>';
    const list = section.querySelector('#sl33-weekly-days');
    const today = (new Date().getDay() + 6) % 7;
    tage.forEach((item, index) => {
      const row = document.createElement('div');
      row.className = 'flex';
      row.style.cssText = 'padding:11px 0;border-bottom:1px solid var(--edge);gap:12px;';
      if (index === today) row.style.background = 'rgba(45,227,160,.07)';
      const day = document.createElement('strong');
      day.textContent = item[0] + (index === today ? ' · Heute' : '');
      const status = document.createElement('span');
      status.textContent = item[1];
      status.style.cssText = 'font-size:13px;text-align:right;color:' +
        (item[2] === 'match' ? 'var(--green)' : item[2] === 'eis' ? 'var(--blue)' : 'var(--muted)');
      row.append(day, status);
      list.appendChild(row);
    });
    home.insertBefore(section, home.querySelector('#sessionCards'));
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup);
  else setup();
})();
