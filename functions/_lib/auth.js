// בדיקת סיסמה: הסיסמה נשמרת רק ב-Cloudflare (משתנה ADMIN_PASSWORD), לא בקוד.
const enc = new TextEncoder();

async function same(a, b) {
  const [x, y] = await Promise.all([
    crypto.subtle.digest('SHA-256', enc.encode(a)),
    crypto.subtle.digest('SHA-256', enc.encode(b)),
  ]);
  const ax = new Uint8Array(x);
  const ay = new Uint8Array(y);
  let d = 0;
  for (let i = 0; i < ax.length; i++) d |= ax[i] ^ ay[i];
  return d === 0;
}

export const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

// מחזיר Response של שגיאה אם לא מורשה, אחרת null.
export async function guard(request, env) {
  if (!env.ADMIN_PASSWORD) return json({ error: 'המערכת עוד לא הוגדרה (חסרה סיסמה ב-Cloudflare).' }, 503);
  const given = request.headers.get('x-admin-password') || '';
  if (!(await same(given, env.ADMIN_PASSWORD))) {
    await new Promise((r) => setTimeout(r, 800));
    return json({ error: 'הסיסמה לא נכונה' }, 401);
  }
  return null;
}
