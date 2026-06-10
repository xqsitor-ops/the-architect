// Web push sender, used by /api/cron/*.
import webpush from 'web-push';
import { kv } from './kv.js';

let configured = false;
function configure() {
  if (configured) return;
  if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) return;
  webpush.setVapidDetails(
    process.env.VAPID_SUBJECT || 'mailto:rayanthony@xqsitor.org',
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );
  configured = true;
}

export async function pushAll(payload) {
  configure();
  const subs = await kv.listPushSubs();
  const results = [];
  for (const sub of subs) {
    try {
      await webpush.sendNotification(sub, JSON.stringify(payload));
      results.push({ endpoint: sub.endpoint, ok: true });
    } catch (e) {
      results.push({ endpoint: sub.endpoint, ok: false, err: e.message });
      // 410 Gone — drop stale subscription
      if (e.statusCode === 410 || e.statusCode === 404) await kv.removePushSub(sub.endpoint);
    }
  }
  return results;
}
