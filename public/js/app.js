// Core app — navigation, detail overlay, ritual stepper, calendar grid, toast.

let activeTab = 'home';
let ritualStep = 0;
let savedScrollTop = 0;
let calYear = new Date().getFullYear();
let calMonth = new Date().getMonth();
let selectedCalDay = null;
window.eventsByDate = window.eventsByDate || {}; // populated by calendar-sync.js

function switchTab(tab) {
  if (activeTab === tab && !document.getElementById('detail-view').classList.contains('active')) {
    closeDetail();
    return;
  }
  closeDetail();
  activeTab = tab;
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  document.getElementById('screen-' + tab).classList.add('active');
  const tabBtn = document.getElementById('tab-' + tab);
  if (tabBtn) tabBtn.classList.add('active');
  document.getElementById('content-area').scrollTop = 0;
  if (tab === 'ritual') renderRitual();
  if (tab === 'calendar') renderCal();
  if (tab === 'ask') focusChatInput();
  if (tab === 'settings') refreshSettings && refreshSettings();
}

function showDetail(data) {
  savedScrollTop = document.getElementById('content-area').scrollTop;
  document.getElementById('detail-content').innerHTML = buildDetailHTML(data);
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('detail-view').classList.add('active');
  document.getElementById('content-area').scrollTop = 0;
}
function closeDetail() {
  document.getElementById('detail-view').classList.remove('active');
  const screen = document.getElementById('screen-' + activeTab);
  if (screen) screen.classList.add('active');
  document.getElementById('content-area').scrollTop = savedScrollTop;
}
function showIdentityDetail(key) { const d = IDENTITY_DETAILS[key]; if (d) showDetail(d); }
function showGeoDetail(key)      { const d = GEO_DETAILS[key];      if (d) showDetail(d); }

function buildDetailHTML(d) {
  const anchors = d.anchors ? d.anchors.map(a => `<span class="anchor-pill">${a}</span>`).join('') : '';
  const decl = d.declaration ? `<div class="declaration">${d.declaration}</div>` : '';
  return `
    <div class="detail-eyebrow">${d.eyebrow || ''}</div>
    <div class="detail-title">${d.title}</div>
    ${d.tradition ? `<div class="detail-tradition">${d.tradition}</div>` : ''}
    ${anchors ? `<div class="anchor-row">${anchors}</div>` : ''}
    <hr class="divider">
    <div class="detail-body">${d.body}</div>
    ${decl}
  `;
}

// ── Ritual ──────────────────────────────────────
function renderRitual() {
  const prog = document.getElementById('ritual-progress');
  prog.innerHTML = RITUAL_STATIONS.map((s, i) => {
    let cls = 'r-dot';
    if (i === ritualStep) cls += ' active';
    else if (i < ritualStep) cls += ' done';
    return `<div class="${cls}" onclick="setRitualStep(${i})">${s.label}</div>`;
  }).join('');
  const s = RITUAL_STATIONS[ritualStep];
  const anchors = s.anchors.map(a => `<span class="anchor-pill">${a}</span>`).join('');
  const decl = s.declaration ? `<div class="declaration ritual-decl">${s.declaration}</div>` : '';
  const isLast = ritualStep === RITUAL_STATIONS.length - 1;
  document.getElementById('ritual-card-wrap').innerHTML = `
    <div class="ritual-card">
      <div class="ritual-card-header">
        <div class="ritual-num" style="background:${s.numBg};color:${s.numColor};">${s.num}</div>
        <div>
          <div class="ritual-card-title">${s.title}</div>
          <div class="ritual-card-sub">${s.sub}</div>
          <div style="margin-top:8px;display:flex;flex-wrap:wrap;gap:5px;">${anchors}</div>
        </div>
      </div>
      <div class="ritual-card-body">${s.body}</div>
      ${decl}
    </div>
    <div class="ritual-duration">Station duration: ${s.duration} · Tradition: ${s.tradition}</div>
    <div class="ritual-nav">
      <button class="btn-prev" onclick="setRitualStep(${ritualStep - 1})" ${ritualStep === 0 ? 'disabled style="opacity:.4"' : ''}>← Back</button>
      <button class="btn-next" onclick="setRitualStep(${isLast ? 0 : ritualStep + 1})">${isLast ? 'Begin again ↺' : 'Next station →'}</button>
    </div>
  `;
}
function setRitualStep(i) {
  if (i < 0 || i >= RITUAL_STATIONS.length) return;
  ritualStep = i; renderRitual();
  document.getElementById('content-area').scrollTop = 0;
}

// ── Calendar ────────────────────────────────────
function renderCal() {
  const today = new Date();
  document.getElementById('cal-month-label').textContent = MONTHS[calMonth] + ' ' + calYear;
  document.getElementById('cal-dow').innerHTML = DOWS.map(d => `<div class="cal-dow-cell">${d}</div>`).join('');
  const firstDow = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const isAug = calMonth === 7;
  let html = '';
  for (let i = 0; i < firstDow; i++) html += '<div class="cal-day empty"></div>';
  for (let d = 1; d <= daysInMonth; d++) {
    const dow = (firstDow + d - 1) % 7;
    const planet = PLANET_NAMES[dow];
    const isToday = d === today.getDate() && calMonth === today.getMonth() && calYear === today.getFullYear();
    const isSolar = calMonth === 1 && d === 8;
    const isPower = [8, 17, 26].includes(d);
    const iso = `${calYear}-${String(calMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const hasEvents = (window.eventsByDate[iso] || []).length > 0;
    let cls = 'cal-day';
    if (isSolar) cls += ' solar-return';
    else if (d === 8)  cls += ' power-8';
    else if (d === 17) cls += ' power-17';
    else if (d === 26) cls += ' power-26';
    else if (isAug)    cls += ' august';
    if (isToday) cls += ' today';
    html += `<div class="${cls}" onclick="selectCalDay(${d}, ${dow})">
      <div class="cal-day-num">${d}</div>
      <div class="cal-day-planet">${planet}</div>
      ${(isPower || isSolar || isAug) ? '<div class="cal-day-dot"></div>' : ''}
      ${hasEvents ? '<div class="cal-day-event-marker"></div>' : ''}
    </div>`;
  }
  document.getElementById('cal-days').innerHTML = html;
}

function selectCalDay(d, dow) {
  selectedCalDay = d;
  const panel = document.getElementById('day-detail-panel');
  const planet = PLANET_NAMES[dow];
  const orisha = PLANET_ORISHA[dow];
  const isAug = calMonth === 7;
  const isSolar = calMonth === 1 && d === 8;
  const powerData = POWER_DAY_DATA[d];
  const iso = `${calYear}-${String(calMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
  const events = window.eventsByDate[iso] || [];

  let mainHTML = '';
  if (isSolar) {
    mainHTML = `
      <div class="day-detail-title" style="color:var(--gold);">February 8 — Solar Return</div>
      <div class="day-detail-sub">${MONTHS[calMonth]} ${d} · ${planet} day · ${orisha}</div>
      <div class="day-detail-body"><strong>The most powerful day of your year.</strong> The sun returns to your natal degree.<br><br>Begin the seven stations at 4:44 AM — extended. Declaration today is an <em>annual architectural summit</em>.</div>
      <div class="day-decl">"This is my year. What I plant on this day grows for twelve months."</div>`;
  } else if (powerData) {
    mainHTML = `
      <div class="day-detail-title">${powerData.title}</div>
      <div class="day-detail-sub">${MONTHS[calMonth]} ${d} · ${planet} day · ${orisha}</div>
      <div class="day-detail-body">${powerData.body}</div>
      <div class="day-decl">${powerData.decl}</div>`;
  } else {
    const notes = [
      'Solar will — declare publicly, make visible, establish presence.',
      'Inner tides — dreams, intuition, receptive reflection.',
      'Iron action — clear paths, begin new ventures, move obstacles.',
      'Crossroads — communication, contracts, precise language.',
      'Expansion — strategy, vision, the long view.',
      'Beauty and magnetism — art world activity, collector relationships.',
      'Structure — contracts, long-term architecture, administrative work.'
    ];
    mainHTML = `
      <div class="day-detail-title">${DOWS[dow]}day — ${planet} / ${orisha}</div>
      <div class="day-detail-sub">${MONTHS[calMonth]} ${d}${isAug ? ' · August: power month' : ''}</div>
      <div class="day-detail-body"><strong>Planetary current: ${planet}.</strong> Governed by <strong>${orisha}</strong>.<br><br>${notes[dow]}${isAug ? '<br><br><strong>August amplification:</strong> the 8th month amplifies your Life Path 8 frequency.' : ''}</div>
      <div class="day-decl">"${DOWS[dow]}day. ${planet} governs. I move in alignment with this current."</div>`;
  }

  let eventsHTML = '';
  if (events.length) {
    eventsHTML = `<div class="day-events">
      <div class="day-events-label">Calendar (${events.length})</div>
      ${events.slice(0, 8).map(e => `<div class="day-event"><span class="day-event-time">${e.time || 'All day'}</span><span>${escapeHTML(e.summary || '(untitled)')}</span></div>`).join('')}
    </div>`;
  }
  panel.innerHTML = mainHTML + eventsHTML;
}

function calChange(dir) {
  calMonth += dir;
  if (calMonth > 11) { calMonth = 0; calYear++; }
  if (calMonth < 0)  { calMonth = 11; calYear--; }
  renderCal();
  document.getElementById('day-detail-panel').innerHTML = `
    <div class="day-detail-title" style="color:var(--white-muted);">Select a day</div>
    <div class="day-detail-body" style="margin-top:6px;">Tap any date to see its planetary current, Orisha intelligence, ritual protocol, and Google Calendar events.</div>`;
  if (window.refreshCalendarEvents) window.refreshCalendarEvents(calYear, calMonth);
}

function escapeHTML(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2400);
}

// ── Planet chip ─────────────────────────────────
function renderPlanetChip() {
  const dow = new Date().getDay();
  const planet = PLANET_NAMES[dow];
  const orisha = PLANET_ORISHA[dow];
  const notes = [
    'Solar will — declare publicly, establish presence.',
    'Inner tides — intuition, reflection, receptive rest.',
    'Iron action — clear paths, begin ventures, move obstacles.',
    'Crossroads — contracts, communication, precise language.',
    'Expansion — strategy, vision, the long view.',
    'Beauty and magnetism — art world, collector relationships.',
    'Structure — long-term architecture, administrative work.'
  ];
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const chip = document.getElementById('today-planet-chip');
  if (!chip) return;
  chip.innerHTML = `
    <div class="planet-chip-day">${days[dow].slice(0,3)}</div>
    <div class="planet-chip-body">
      <div class="planet-chip-title">${planet} / ${orisha}</div>
      <div class="planet-chip-note">${notes[dow]}</div>
    </div>
  `;
}

// Init
renderCal();
renderPlanetChip();
