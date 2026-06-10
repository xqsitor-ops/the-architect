// Today's Insight card — pulls a personalized reading from /api/insights.

async function loadInsight() {
  const body = document.getElementById('insight-body');
  const title = document.getElementById('insight-title');
  const eventsEl = document.getElementById('insight-events');
  const eyebrow = document.getElementById('insight-eyebrow');
  body.classList.add('insight-loading');
  body.textContent = 'Reading the planetary current and your calendar…';
  title.textContent = 'Loading the current…';
  eventsEl.style.display = 'none';

  try {
    const res = await fetch('/api/insights?date=' + encodeURIComponent(new Date().toISOString()));
    if (!res.ok) throw new Error(await res.text());
    const data = await res.json();

    eyebrow.textContent = data.eyebrow || "Today's reading";
    title.textContent = data.title || '';
    body.innerHTML = renderMarkdownLite(data.body || '');
    body.classList.remove('insight-loading');

    if (data.events && data.events.length) {
      eventsEl.innerHTML = '<div style="font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--white-muted);margin-bottom:6px;">Today on your calendar</div>' +
        data.events.slice(0, 5).map(ev =>
          `<div class="insight-event"><span class="insight-event-time">${ev.time || 'All day'}</span><span>${escapeHTML(ev.summary || '(untitled)')}</span></div>`
        ).join('');
      eventsEl.style.display = 'block';
    }
  } catch (e) {
    body.classList.remove('insight-loading');
    body.innerHTML = `<em style="color:var(--white-muted)">Insight unavailable — backend not configured yet. ` +
      `Once you deploy and set your ANTHROPIC_API_KEY, this card will read the day for you live.</em>`;
    title.textContent = fallbackTitle();
  }
}

function refreshInsight() { loadInsight(); }

// Quick local title if backend is unreachable (so the card isn't empty).
function fallbackTitle() {
  const d = new Date();
  const day = d.getDate();
  if (d.getMonth() === 1 && day === 8)  return 'February 8 — Solar Return';
  if (day === 8)  return '8th — Ogún opens the gate';
  if (day === 17) return '17th — Shango commands the room';
  if (day === 26) return '26th — Oshun receives the harvest';
  const planet = PLANET_NAMES[d.getDay()];
  return `${planet} day — planetary current`;
}

window.addEventListener('DOMContentLoaded', () => {
  loadInsight();
});
