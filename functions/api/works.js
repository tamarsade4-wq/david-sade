import { guard, json } from '../_lib/auth.js';
import { readPortfolio } from '../_lib/github.js';

export const onRequestGet = async ({ request, env }) => {
  const bad = await guard(request, env);
  if (bad) return bad;
  try {
    return json({ works: (await readPortfolio(env)).works });
  } catch (e) {
    return json({ error: 'לא ניתן לקרוא את הגלריה: ' + e.message }, 502);
  }
};
