import { guard, json } from '../_lib/auth.js';
import { readPortfolio, commitFiles, PORTFOLIO_PATH } from '../_lib/github.js';

export const onRequestPost = async ({ request, env }) => {
  const bad = await guard(request, env);
  if (bad) return bad;
  if (!env.GITHUB_TOKEN) return json({ error: 'חסר GITHUB_TOKEN' }, 503);
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'בקשה לא תקינה' }, 400);
  }
  try {
    const data = await readPortfolio(env);
    let i = data.works.findIndex((w) => (w.image || w.poster || '') === body.image && (w.video || '') === (body.video || ''));
    if (i < 0) i = Number.isInteger(body.index) ? body.index : -1;
    if (i < 0 || i >= data.works.length) return json({ error: 'העבודה לא נמצאה' }, 404);
    data.works.splice(i, 1);
    await commitFiles(env, [{ path: PORTFOLIO_PATH, content: JSON.stringify(data, null, 2) + '\n' }], 'Gallery: remove item from admin');
    return json({ ok: true });
  } catch (e) {
    return json({ error: 'המחיקה נכשלה: ' + e.message }, 502);
  }
};
