// הגשת סרטונים מ-R2, כולל Range כדי שהסרטון יתנגן ויתקדם בטלפון.
export const onRequestGet = async ({ request, env, params }) => {
  const name = Array.isArray(params.path) ? params.path.join('/') : params.path;
  if (!env.VIDEOS || !/^[a-z0-9]+\.(mp4|webm)$/.test(name || '')) return new Response('Not found', { status: 404 });
  const head = await env.VIDEOS.head(name);
  if (!head) return new Response('Not found', { status: 404 });

  let opts = {};
  let start = 0;
  let end = head.size - 1;
  const m = /bytes=(\d*)-(\d*)/.exec(request.headers.get('range') || '');
  if (m && (m[1] || m[2])) {
    start = m[1] ? Number(m[1]) : Math.max(0, head.size - Number(m[2]));
    end = m[1] && m[2] ? Math.min(Number(m[2]), head.size - 1) : head.size - 1;
    opts = { range: { offset: start, length: end - start + 1 } };
  }
  const obj = await env.VIDEOS.get(name, opts);
  const h = new Headers({
    'content-type': head.httpMetadata?.contentType || 'video/mp4',
    'accept-ranges': 'bytes',
    'cache-control': 'public, max-age=31536000, immutable',
  });
  if (opts.range) {
    h.set('content-range', `bytes ${start}-${end}/${head.size}`);
    h.set('content-length', String(end - start + 1));
    return new Response(obj.body, { status: 206, headers: h });
  }
  h.set('content-length', String(head.size));
  return new Response(obj.body, { headers: h });
};
