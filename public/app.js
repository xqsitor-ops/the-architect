const settingsKey = "architect-live-settings-v1";
const sentKey = "architect-live-reminders-sent-v1";

const defaults = {
  calendarAlerts: true,
  ritualAlerts: true,
  mantraAlerts: true,
  leadMinutes: 10,
  morningTime: "06:18",
  middayTime: "12:00",
  eveningTime: "18:18",
  nightTime: "21:00",
  quietStart: "22:00",
  quietEnd: "06:00",
};

let settings = { ...defaults };
let calendarEvents = [];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function toast(message) {
  const node = $("#toast");
  if (!node) return;
  node.textContent = message;
  node.classList.add("on");
  window.clearTimeout(toast.timer);
  toast.timer = window.setTimeout(() => node.classList.remove("on"), 4200);
}

function loadSettings() {
  try {
    settings = { ...defaults, ...JSON.parse(localStorage.getItem(settingsKey) || "{}") };
  } catch {
    settings = { ...defaults };
  }
}

function saveSettings() {
  localStorage.setItem(settingsKey, JSON.stringify(settings));
}

function bindSettingsForm() {
  const form = $("#settings-form");
  if (!form) return;

  Object.entries(settings).forEach(([key, value]) => {
    const input = form.elements[key];
    if (!input) return;
    if (input.type === "checkbox") input.checked = Boolean(value);
    else input.value = String(value);
  });

  form.addEventListener("input", (event) => {
    const input = event.target;
    if (!input.name) return;
    settings[input.name] =
      input.type === "checkbox"
        ? input.checked
        : input.type === "number"
          ? Number(input.value)
          : input.value;
    saveSettings();
    renderReminders();
  });
}

function todayMeta() {
  const now = new Date();
  $("#today-meta").textContent = `${now.toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  })} / Opening lodge`;
}

function eventDateTime(event) {
  if (!event.date) return null;
  if (!event.time) return new Date(`${event.date}T09:00:00`);
  const parsed = new Date(`${event.date} ${event.time}`);
  return Number.isNaN(parsed.getTime()) ? new Date(`${event.date}T09:00:00`) : parsed;
}

function eventReminderTime(event) {
  const when = eventDateTime(event);
  if (!when) return null;
  return new Date(when.getTime() - settings.leadMinutes * 60000);
}

function toTimeLabel(date) {
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

function buildReminders() {
  const reminders = [];
  const today = new Date().toISOString().slice(0, 10);

  if (settings.calendarAlerts) {
    calendarEvents.forEach((event) => {
      const reminderAt = eventReminderTime(event);
      if (!reminderAt) return;
      reminders.push({
        channel: "Calendar",
        time: toTimeLabel(reminderAt),
        title: event.summary || "Calendar event",
        body: event.time
          ? `${event.time} on your Google Calendar. Prepare ${settings.leadMinutes} minutes before.`
          : "All-day Google Calendar event. Review the board before the day moves.",
      });
    });

    if (!calendarEvents.length) {
      reminders.push({
        channel: "Calendar",
        time: "08:30",
        title: "Review the calendar board",
        body: "No upcoming Google events found in the current window. Check the board and set the next move.",
      });
    }
  }

  if (settings.ritualAlerts) {
    reminders.push(
      {
        channel: "Ritual",
        time: settings.morningTime,
        title: "Opening measure",
        body: "Set the day in order: purpose, calendar, codex, action.",
      },
      {
        channel: "Ritual",
        time: settings.eveningTime,
        title: "Closing measure",
        body: "Review what was built, what was learned, and what must be preserved.",
      },
    );
  }

  if (settings.mantraAlerts) {
    reminders.push(
      {
        channel: "Mantra",
        time: settings.middayTime,
        title: "Midday mantra",
        body: "I measure twice; I act once.",
      },
      {
        channel: "Mantra",
        time: settings.nightTime,
        title: "Night mantra",
        body: "Close the lodge; preserve the lesson.",
      },
    );
  }

  return reminders
    .map((reminder) => ({ ...reminder, date: today }))
    .sort((a, b) => a.time.localeCompare(b.time));
}

function nextReminder(reminders) {
  if (!reminders.length) return "No reminders active";
  const now = new Date();
  const current = now.getHours() * 60 + now.getMinutes();
  const next =
    reminders.find((reminder) => {
      const [hour, minute] = reminder.time.split(":").map(Number);
      return hour * 60 + minute >= current;
    }) || reminders[0];
  return `${next.time} / ${next.channel}: ${next.title}`;
}

function renderReminders() {
  const reminders = buildReminders();
  $("#next-reminder").textContent = nextReminder(reminders);
  $("#reminder-list").innerHTML = reminders
    .map(
      (reminder) => `
        <article>
          <span>${escapeHtml(reminder.channel)}</span>
          <strong>${escapeHtml(reminder.time)}</strong>
          <h3>${escapeHtml(reminder.title)}</h3>
          <p>${escapeHtml(reminder.body)}</p>
        </article>
      `,
    )
    .join("");
}

function isQuietTime(now) {
  const current = now.getHours() * 60 + now.getMinutes();
  const [startHour, startMinute] = settings.quietStart.split(":").map(Number);
  const [endHour, endMinute] = settings.quietEnd.split(":").map(Number);
  const start = startHour * 60 + startMinute;
  const end = endHour * 60 + endMinute;
  if (start === end) return false;
  return start < end ? current >= start && current < end : current >= start || current < end;
}

function startLocalReminderLoop() {
  if (!("Notification" in window)) return;
  window.setInterval(() => {
    if (Notification.permission !== "granted" || isQuietTime(new Date())) return;
    const now = new Date();
    const today = now.toISOString().slice(0, 10);
    const time = toTimeLabel(now);
    const sent = JSON.parse(localStorage.getItem(sentKey) || "{}");

    buildReminders()
      .filter((reminder) => reminder.time === time)
      .forEach((reminder) => {
        const key = `${today}-${reminder.channel}-${reminder.time}-${reminder.title}`;
        if (sent[key]) return;
        new Notification(`The Architect / ${reminder.title}`, { body: reminder.body });
        sent[key] = true;
      });

    localStorage.setItem(sentKey, JSON.stringify(sent));
  }, 30000);
}

async function refreshGoogleStatus() {
  const label = $("#google-status");
  const detail = $("#google-status-detail");
  const button = $("#google-connect-btn");

  try {
    const response = await fetch("/api/calendar/status", { cache: "no-store" });
    const status = response.ok ? await response.json() : { connected: false };
    if (status.connected) {
      label.textContent = "CONNECTED";
      detail.textContent = status.email
        ? `Connected as ${status.email}. Calendar reminders can use live events.`
        : "Connected. Calendar reminders can use live events.";
      button.textContent = "DISCONNECT GOOGLE";
      button.onclick = disconnectGoogle;
      await refreshCalendarEvents();
    } else {
      label.textContent = "OFF";
      detail.textContent = "Google Calendar is not connected on this deployment.";
      button.textContent = "CONNECT GOOGLE";
      button.onclick = () => {
        window.location.href = "/api/auth/google-start";
      };
      calendarEvents = [];
      renderReminders();
    }
  } catch {
    label.textContent = "ERROR";
    detail.textContent = "Could not read calendar status from the backend.";
  }
}

async function disconnectGoogle() {
  const response = await fetch("/api/auth/google-disconnect", { method: "POST" });
  if (!response.ok) {
    toast("Google disconnect failed");
    return;
  }
  toast("Google disconnected");
  await refreshGoogleStatus();
}

async function refreshCalendarEvents() {
  const start = new Date();
  const end = new Date();
  end.setDate(end.getDate() + 7);
  try {
    const response = await fetch(
      `/api/calendar/events?start=${encodeURIComponent(start.toISOString())}&end=${encodeURIComponent(end.toISOString())}`,
      { cache: "no-store" },
    );
    const data = response.ok ? await response.json() : { byDate: {} };
    calendarEvents = Object.values(data.byDate || {}).flat();
  } catch {
    calendarEvents = [];
  }
  renderReminders();
}

async function pushPowerDates() {
  const response = await fetch("/api/calendar/push-power-dates", { method: "POST" });
  if (!response.ok) {
    toast("Power-date push failed. Reconnect Google if needed.");
    return;
  }
  const data = await response.json();
  toast(`Pushed ${data.created || 0} power-date events`);
  await refreshCalendarEvents();
}

function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

function isStandalone() {
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
}

async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return null;
  try {
    return await navigator.serviceWorker.register("/sw.js");
  } catch {
    return null;
  }
}

async function refreshPushStatus() {
  const label = $("#push-status");
  const detail = $("#push-status-detail");
  const button = $("#push-enable-btn");

  if (isIOS() && !isStandalone()) {
    label.textContent = "INSTALL";
    detail.textContent = "On iOS, install The Architect to the home screen before enabling web push.";
    button.disabled = true;
    return;
  }

  if (!("Notification" in window) || !("serviceWorker" in navigator) || !("PushManager" in window)) {
    label.textContent = "UNSUPPORTED";
    detail.textContent = "This browser does not support web push notifications.";
    button.disabled = true;
    return;
  }

  await navigator.serviceWorker.ready;
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.getSubscription();
  if (subscription && Notification.permission === "granted") {
    label.textContent = "ON";
    detail.textContent = "Push notifications are enrolled for this browser.";
    button.textContent = "DISABLE NOTIFICATIONS";
    button.onclick = disablePush;
  } else {
    label.textContent = Notification.permission === "denied" ? "DENIED" : "OFF";
    detail.textContent =
      Notification.permission === "denied"
        ? "Browser permission is denied. Change site settings to allow notifications."
        : "Enable notifications to receive ritual and calendar reminders.";
    button.textContent = "ENABLE NOTIFICATIONS";
    button.onclick = enablePush;
  }
}

async function enablePush() {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      toast("Permission declined");
      await refreshPushStatus();
      return;
    }
    const registration = await navigator.serviceWorker.ready;
    const keyResponse = await fetch("/api/push", { cache: "no-store" });
    if (!keyResponse.ok) throw new Error("No VAPID key configured");
    const { key } = await keyResponse.json();
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(key),
    });
    const response = await fetch("/api/push", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(subscription),
    });
    if (!response.ok) throw new Error(await response.text());
    toast("Notifications enabled");
    await refreshPushStatus();
  } catch (error) {
    toast(`Failed: ${error.message}`);
  }
}

async function disablePush() {
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.getSubscription();
  if (subscription) {
    await subscription.unsubscribe();
    await fetch("/api/push", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ endpoint: subscription.endpoint }),
    });
  }
  toast("Notifications disabled");
  await refreshPushStatus();
}

function testNotification() {
  if (!("Notification" in window)) {
    toast("Notifications are unsupported in this browser");
    return;
  }
  if (Notification.permission !== "granted") {
    enablePush();
    return;
  }
  new Notification("The Architect / Test reminder", {
    body: "I measure twice; I act once.",
  });
}

async function askArchitect(event) {
  event.preventDefault();
  const input = $("#ask-input");
  const output = $("#ask-output");
  const message = input.value.trim();
  if (!message) return;
  output.textContent = "The Architect is reading the codex.";
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    const data = await response.json();
    output.textContent = data.reply || data.message || data.text || "No reply returned.";
  } catch {
    output.textContent = "Ask is unavailable right now. Check API keys and deployment logs.";
  }
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64);
  const out = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; ++i) out[i] = raw.charCodeAt(i);
  return out;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

document.addEventListener("DOMContentLoaded", async () => {
  todayMeta();
  loadSettings();
  bindSettingsForm();
  renderReminders();
  $("#push-power-btn").addEventListener("click", pushPowerDates);
  $("#push-test-btn").addEventListener("click", testNotification);
  $("#ask-form").addEventListener("submit", askArchitect);
  await registerServiceWorker();
  await Promise.all([refreshGoogleStatus(), refreshPushStatus()]);
  startLocalReminderLoop();
});
