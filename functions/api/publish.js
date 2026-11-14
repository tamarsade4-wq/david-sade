import { guard, json } from '../_lib/auth.js';
import { readPortfolio, commitFiles, PORTFOLIO_PATH } from '../_lib/github.js';

const clean = (s) => String(s || '').replace(/[<>]/g, '').trim().slice(0, 200);
const okName = (n, re) => re.test(String(n));

export const onRequestPost = async ({ request, env }) => {
  const bad = await guard(request, env);
  if (bad) return bad;
  if (!env.GITHUB_TOKEN) return json({ error: 'המערכת עוד לא חוברה ל-GitHub (חסר GITHUB_TOKEN).' }, 503);
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'בקשה לא תקינה' }, 400);
  }
  const items = Array.isArray(body.items) ? body.items.slice(0, 30) : [];
  if (!items.length) return json({ error: 'לא נבחרו קבצים' }, 400);

  try {
    const data = await readPortfolio(env);
    const files = [];
    const added = [];
    for (const it of items) {
      const alt = clean(it.alt);
      const category = /^[a-z0-9-]*$/.test(it.category || '') ? it.category || '' : '';
      if (it.type === 'photo' && okName(it.name, /^[a-z0-9]+\.jpg$/) && it.data) {
        files.push({ path: `src/assets/portfolio/${it.name}`, base64: it.data });
        added.push({ image: `/src/assets/portfolio/${it.name}`, alt: alt || 'עבודה של דוד שדה', category });
      } else if (it.type === 'video' && okName(it.name, /^[a-z0-9]+\.(mp4|webm)$/) && it.poster) {
        const poster = it.name.replace(/\.(mp4|webm)$/, '-poster.jpg');
        files.push({ path: `src/assets/portfolio/${poster}`, base64: it.poster });
        added.push({ video: `/media/${it.name}`, poster: `/src/assets/portfolio/${poster}`, alt: alt || 'סרטון מהסטודיו של דוד שדה', category });
      }
    }
    if (!added.length) return json({ error: 'לא נמצאו קבצים תקינים' }, 400);
    data.works = [...added, ...data.works];
    files.push({ path: PORTFOLIO_PATH, content: JSON.stringify(data, null, 2) + '\n' });
    await commitFiles(env, files, `Gallery: add ${added.length} item(s) from admin`);
    return json({ ok: true, added: added.length });
  } catch (e) {
    return json({ error: 'השמירה נכשלה: ' + e.message }, 502);
  }
};
