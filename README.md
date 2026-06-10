# The Architect — Sovereign Codex

Personal app for Ray-Anthony Eddie / Xqsitor. Five tabs (Identity, Temple, Calendar, Ask, Geometry) + Settings. Connects to Google Calendar, sends push notifications timed to your power dates, and answers questions via Claude grounded in your full codex.

---

## What's here

```
the-architect/
├── public/              ← static frontend (HTML, JS, manifest, sw)
│   ├── index.html
│   ├── manifest.json
│   ├── sw.js            ← service worker (push + offline shell)
│   ├── icons/           ← PWA icons (add yours before deploying)
│   └── js/              ← chat, insight, calendar-sync, notifications
├── api/                 ← Vercel serverless functions
│   ├── chat.js          ← POST — Claude conversation
│   ├── insights.js      ← GET — Today's reading for the Identity card
│   ├── auth/            ← Google OAuth (flat filenames: google-start, etc.)
│   ├── calendar/        ← status, events, push-power-dates
│   ├── push/            ← VAPID public-key, subscribe, unsubscribe
│   └── cron/            ← daily-notifications, power-date-eve
├── lib/                 ← identity codex, Claude client, Google client, KV, push sender
├── scripts/gen-vapid.js ← run once to generate web push keys
├── package.json
├── vercel.json          ← cron schedule + function config
└── .env.example
```

---

## Setup — one-time

### 1. Install dependencies
```bash
cd ~/Desktop/the-architect
npm install
```

### 2. Create accounts & keys

You need **four** things:

| What | Where | Why |
|---|---|---|
| **Anthropic API key** | [console.anthropic.com](https://console.anthropic.com/settings/keys) | Powers the Ask tab and Today's Insight |
| **Google OAuth client** | [console.cloud.google.com](https://console.cloud.google.com/apis/credentials) | Calendar read + write |
| **Vercel KV (Upstash)** | Vercel dashboard → Storage → Create Database → "Upstash KV" | Stores OAuth tokens + push subscriptions |
| **Supabase project** | [supabase.com/dashboard](https://supabase.com/dashboard) | Stores conversations, intentions, Heka log, and pillars |
| **VAPID keys** | Generated locally — see step 4 | Web push signing |

### 3. Set up Google OAuth
1. In Google Cloud Console, create a new project (or use existing).
2. Enable **Google Calendar API** and **Google People API**.
3. APIs & Services → OAuth consent screen: set up as **External**, add yourself as a test user.
4. Credentials → Create Credentials → OAuth client ID → Web application.
5. **Authorized redirect URI**: `https://YOUR-VERCEL-URL/api/auth/google-callback` (and `http://localhost:3000/api/auth/google-callback` for local dev).
6. Copy Client ID and Client Secret into your env vars.

### 4. Generate VAPID keys
```bash
npm run gen:vapid
```
Copy the two lines printed to your env vars.

### 5. Create the Supabase schema
Create a Supabase project, add `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` to `.env`, then run the SQL in `supabase/schema.sql` in the Supabase SQL editor.

The service-role key is server-only. Do not put it in `public/` files or any `NEXT_PUBLIC_`/browser-exposed variable.

### 6. Add icons
Drop `icon-192.png` and `icon-512.png` into `public/icons/`. Use the gold-on-black "X" mark. The simplest: open `public/index.html` in a browser, screenshot the top-bar mark at 512×512, save twice.

### 7. Deploy to Vercel
```bash
npx vercel
# follow prompts — link to a new project named "the-architect"
npx vercel --prod
```

### 8. Wire up environment variables in Vercel
Copy every key from `.env.example` into Vercel → Project → Settings → Environment Variables.

When you create the Upstash KV database in the Vercel dashboard, it will **auto-inject** `KV_REST_API_URL` and `KV_REST_API_TOKEN` — don't paste those manually.

Set `GOOGLE_REDIRECT_URI` to your actual deployed URL once Vercel gives it to you. Then update the Google Cloud Console redirect URI to match.

### 9. Re-deploy
```bash
npx vercel --prod
```

---

## Use

### On your iPhone (PWA install)
1. Open the deployed URL in Safari.
2. Share → Add to Home Screen.
3. Open from home screen icon (not Safari).
4. Open Settings tab → Connect Google Calendar → Enable notifications.

**iOS only sends web push when the app is launched from the home screen icon.** This is an Apple restriction, not the app's.

### What each tab does

- **Identity** — your codex at a glance. Top card is a live AI-generated reading for today, factoring in the planetary current, power dates, and (if connected) your Google Calendar events.
- **Temple** — the seven-station Morning Temple. Step through at 4:44 AM.
- **Calendar** — month grid showing power dates (8/17/26 in gold/teal/purple), August power month, Feb 8 solar return, and small chrome dots for your real Google Calendar events. Tap any day for its reading + events.
- **Ask** — chat with Claude, who has your full codex memorized. Try the quick prompts or ask anything.
- **Geometry** — sacred geometry references (Phi, Vesica Piscis, the Two Pillars, etc.) applied to Xqsitor.

### Notifications you'll get
- **Daily morning** (08:00 UTC ≈ 4:00 AM Eastern) — ritual reminder, varies by power date
- **Power date eves** (midnight UTC) — alert the night before 8/17/26, plus event-aware variant if you have meetings tomorrow on a power date
- **Solar Return countdown** — T-7, T-3, T-1 before Feb 8

Both schedules are in [`vercel.json`](vercel.json) under `crons`. Adjust the times to match your timezone if needed.

---

## Customize the codex

Edit `lib/identity.js` — the system prompt fed to Claude, the power-date logic, the Orisha mappings. Edit `public/js/data.js` to change the static text on the Identity and Geometry detail screens. The two files are kept in sync manually.

---

## Local dev
```bash
npx vercel dev
# opens at http://localhost:3000
```

Note: local push notifications won't work (no HTTPS). For testing notifications use a Vercel preview deploy.

---

## Troubleshooting

**"Insight unavailable" on the Identity tab** → `ANTHROPIC_API_KEY` not set or invalid.

**"Connect Google" loops or 400s** → redirect URI mismatch. The exact URI in Google Cloud Console must equal `GOOGLE_REDIRECT_URI` env var.

**Push notifications never arrive** → on iOS, app must be installed to home screen and launched from there. Check Settings → tap "Enable notifications" again to re-subscribe.

**Calendar events don't show** → re-connect Google in Settings; the access token may have expired. The KV refresh should be automatic but a manual reconnect resets it.

**Claude says "I don't have access to your calendar"** → it doesn't directly. The backend pulls today's events and injects them into the system prompt. If you want it to discuss future events, ask it in the Ask tab; the chat handler only feeds today's events by default.

---

## What's next (not yet built)

- Multi-day calendar context for the Ask tab (currently only today's events go to Claude)
- A "Weekly architecture" view summarizing the next 7 days
- iCloud / Apple Calendar support (only Google for now)
- Voice input on the Ask tab
- Conversation history persistence (currently each browser session starts fresh)
