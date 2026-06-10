// Google Calendar sync — connect, fetch events, push power dates.
// All real work happens on the backend; this file is just UI + fetch glue.

window.eventsByDate = window.eventsByDate || {};

async function checkGoogleStatus() {
  try {
    const res = await fetch('/api/calendar/status');
    if (!res.ok) return { connected: false };
    return await res.json();
  } catch { return { connected: false }; }
}

async function refreshSettings() {
  const status = await checkGoogleStatus();
  const badge = document.getElementById('gcal-status');
  const btn = document.getElementById('gcal-connect-btn');
  const pushRow = document.getElementById('gcal-push-row');
  const sub = document.getElementById('gcal-status-sub');
  if (status.connected) {
    badge.textContent = 'Connected'; badge.classList.remove('off'); badge.classList.add('on');
    btn.textContent = 'Disconnect Google';
    btn.onclick = disconnectGoogle;
    pushRow.hidden = false;
    if (status.email) sub.textContent = `Connected as ${status.email}.`;
  } else {
    badge.textContent = 'Off'; badge.classList.add('off'); badge.classList.remove('on');
    btn.textContent = 'Connect Google Calendar';
    btn.onclick = connectGoogle;
    pushRow.hidden = true;
  }
  // Push notif status
  await refreshPushStatus();
}

function connectGoogle() {
  window.location.href = '/api/auth/google-start';
}
async function disconnectGoogle() {
  await fetch('/api/auth/google-disconnect', { method: 'POST' });
  showToast('Google disconnected');
  refreshSettings();
}

async function pushPowerDates() {
  showToast('Pushing power dates to Google…');
  try {
    const res = await fetch('/api/calendar/push-power-dates', { method: 'POST' });
    if (!res.ok) throw new Error(await res.text());
    const data = await res.json();
    showToast(`Pushed ${data.created || 0} events`);
  } catch (e) {
    showToast('Failed: ' + e.message);
  }
}

// Refresh events for the calendar grid's current month.
window.refreshCalendarEvents = async function (year, month) {
  try {
    const start = new Date(year, month, 1).toISOString();
    const end = new Date(year, month + 1, 0, 23, 59, 59).toISOString();
    const res = await fetch(`/api/calendar/events?start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`);
    if (!res.ok) return;
    const data = await res.json();
    window.eventsByDate = data.byDate || {};
    if (typeof renderCal === 'function' && activeTab === 'calendar') renderCal();
  } catch { /* silent — backend not up */ }
};

// On load, refresh the current visible month so dots appear where events exist.
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    if (typeof calYear !== 'undefined' && typeof calMonth !== 'undefined') {
      window.refreshCalendarEvents(calYear, calMonth);
    }
  }, 500);
});
