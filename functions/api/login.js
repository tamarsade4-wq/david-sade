import { guard, json } from '../_lib/auth.js';

export const onRequestPost = async ({ request, env }) => (await guard(request, env)) || json({ ok: true });
