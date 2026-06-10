// Tiny KV wrapper around Upstash Redis (Vercel KV). Single-user app:
// we key everything under "u:default" — no auth roles, just one Architect.
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();
const USER = 'u:default';

export const kv = {
  // Google OAuth tokens
  async getGoogleTokens()        { return await redis.get(`${USER}:gtoken`); },
  async setGoogleTokens(tokens)  { return await redis.set(`${USER}:gtoken`, tokens); },
  async clearGoogleTokens()      { return await redis.del(`${USER}:gtoken`); },
  async getGoogleEmail()         { return await redis.get(`${USER}:gemail`); },
  async setGoogleEmail(email)    { return await redis.set(`${USER}:gemail`, email); },

  // Push subscriptions — list of objects keyed by endpoint
  async addPushSub(sub) {
    const key = `${USER}:push`;
    const existing = (await redis.get(key)) || [];
    const filtered = existing.filter(s => s.endpoint !== sub.endpoint);
    filtered.push(sub);
    await redis.set(key, filtered);
  },
  async removePushSub(endpoint) {
    const key = `${USER}:push`;
    const existing = (await redis.get(key)) || [];
    await redis.set(key, existing.filter(s => s.endpoint !== endpoint));
  },
  async listPushSubs() {
    return (await redis.get(`${USER}:push`)) || [];
  },

  // Generic OAuth state (CSRF protection during redirect)
  async setOAuthState(state) { return await redis.set(`oauth:state:${state}`, 1, { ex: 600 }); },
  async takeOAuthState(state) {
    const k = `oauth:state:${state}`;
    const v = await redis.get(k);
    if (v) await redis.del(k);
    return !!v;
  },
};
