// Web push enrollment. iOS requires the app to be installed as PWA first.

function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}
function isStandalone() {
  return window.matchMedia('(display-mode: standalone)').matches ||
         window.navigator.standalone === true;
}

async function refreshPushStatus() {
  const badge = document.getElementById('push-status');
  const btn = document.getElementById('push-enable-btn');
  const iosWarn = document.getElementById('ios-pwa-warning');

  if (isIOS() && !isStandalone()) {
    iosWarn.hidden = false;
    badge.textContent = 'Install first'; badge.classList.add('off');
    btn.disabled = true; btn.style.opacity = 0.5;
    return;
  }
  iosWarn.hidden = true;
  btn.disabled = false; btn.style.opacity = 1;

  if (!('Notification' in window) || !('serviceWorker' in navigator) || !('PushManager' in window)) {
    badge.textContent = 'Unsupported'; badge.classList.add('off');
    btn.disabled = true; btn.style.opacity = 0.5;
    return;
  }

  const reg = await navigator.serviceWorker.ready;
  const sub = await reg.pushManager.getSubscription();
  if (sub && Notification.permission === 'granted') {
    badge.textContent = 'On'; badge.classList.remove('off'); badge.classList.add('on');
    btn.textContent = 'Disable notifications';
    btn.onclick = disablePush;
  } else {
    badge.textContent = 'Off'; badge.classList.add('off'); badge.classList.remove('on');
    btn.textContent = 'Enable notifications';
    btn.onclick = enablePush;
  }
}

async function enablePush() {
  try {
    const perm = await Notification.requestPermission();
    if (perm !== 'granted') { showToast('Permission declined'); return; }
    const reg = await navigator.serviceWorker.ready;
    // Fetch VAPID public key from backend
    const keyRes = await fetch('/api/push');
    if (!keyRes.ok) throw new Error('No VAPID key configured on server');
    const { key } = await keyRes.json();

    const sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(key),
    });
    const res = await fetch('/api/push', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sub),
    });
    if (!res.ok) throw new Error(await res.text());
    showToast('Notifications enabled');
    refreshPushStatus();
  } catch (e) {
    showToast('Failed: ' + e.message);
  }
}

async function disablePush() {
  try {
    const reg = await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.getSubscription();
    if (sub) {
      await sub.unsubscribe();
      await fetch('/api/push', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endpoint: sub.endpoint }),
      });
    }
    showToast('Notifications disabled');
    refreshPushStatus();
  } catch (e) { showToast('Failed: ' + e.message); }
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const raw = atob(base64);
  const out = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; ++i) out[i] = raw.charCodeAt(i);
  return out;
}
