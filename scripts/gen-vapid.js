#!/usr/bin/env node
// Generate VAPID keys for web push. Run once: node scripts/gen-vapid.js
// Paste the output into your .env / Vercel env vars.
import webpush from 'web-push';
const keys = webpush.generateVAPIDKeys();
console.log('VAPID_PUBLIC_KEY=' + keys.publicKey);
console.log('VAPID_PRIVATE_KEY=' + keys.privateKey);
