import { guard, json } from '../_lib/auth.js';

// העלאת סרטון ל-R2 (binding בשם VIDEOS). הסרטון מוגש דרך /media/<שם>.
export const onRequestPut = async ({ request, env }) => {
  const bad = await guard(request, env);
  if (bad) return bad;
  if (!env.VIDEOS) return json({ error: 'אחסון הסרטונים עוד לא הוגדר ב-Cloudflare.' }, 503);
  const name = new URL(request.url).searchParams.get('name') || '';
  if (!/^[a-z0-9]+\.(mp4|webm)$/.test(name)) return json({ error: 'שם קובץ לא תקין' }, 400);
  const type = name.endsWith('.webm') ? 'video/webm' : 'video/mp4';
  await env.VIDEOS.put(name, request.body, { httpMetadata: { contentType: type } });
  return json({ ok: true, url: '/media/' + name });
};
