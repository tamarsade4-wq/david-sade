// השירותים נטענים מקבצי JSON ב-src/content/tattoos ו-src/content/piercings.
// עורכים אותם דרך מערכת הניהול (Pages CMS), בלי לגעת בקוד.
const load = (mods) =>
  Object.entries(mods)
    .map(([path, m]) => {
      const d = m.default ?? m;
      const slug = (d.slug || path.split('/').pop().replace(/\.json$/, '')).trim();
      return { ...d, slug, order: Number(d.order) || 999 };
    })
    .filter((d) => d.title && d.draft !== true)
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title, 'he'));

export const tattoos = load(import.meta.glob('../content/tattoos/*.json', { eager: true }));
export const piercings = load(import.meta.glob('../content/piercings/*.json', { eager: true }));
export const posts = load(import.meta.glob('../content/blog/*.json', { eager: true }));

export const tattooHref = (s) => `/tattoos/${s.slug}`;
export const piercingHref = (s) => `/piercing/${s.slug}`;
