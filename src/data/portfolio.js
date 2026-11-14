// תיק העבודות נטען מ-src/content/settings/portfolio.json (עריכה במערכת הניהול).
// התמונות יושבות ב-src/assets/portfolio ומעובדות אוטומטית בבנייה (גודל, WebP).
// סדר הרשימה הוא סדר ההצגה באתר.
import { getImage } from 'astro:assets';
import data from '../content/settings/portfolio.json';

const files = import.meta.glob('../assets/portfolio/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  import: 'default',
});
const byName = Object.fromEntries(
  Object.entries(files).map(([p, m]) => [p.split('/').pop().toLowerCase(), m]),
);

export const works = (
  await Promise.all(
    (data.works || []).map(async (w) => {
      const isVideo = Boolean(w.video);
      const file = String(w.image || w.poster || '').split('/').pop();
      const meta = byName[file.toLowerCase()];
      if (!meta) return null; // תמונה שנמחקה או לא קיימת: מדלגים
      const thumb = await getImage({ src: meta, width: 800, format: 'webp', quality: 80 });
      const full = await getImage({ src: meta, width: 1400, format: 'webp', quality: 82 });
      return {
        file,
        video: isVideo ? w.video : '',
        category: w.category || '',
        src: thumb.src,
        full: full.src,
        w: thumb.attributes.width,
        h: thumb.attributes.height,
        alt: (w.alt || 'עבודת קעקוע של דוד שדה').trim(),
      };
    }),
  )
).filter(Boolean);

// עבודות (תמונות וסרטונים) של קטגוריה אחת: slug של קעקוע או פירסינג.
export const worksFor = (slug) => works.filter((w) => w.category === slug);

export const portrait = {
  file: 'david-at-work.webp',
  w: 1000,
  h: 1000,
  alt: 'דוד שדה מקעקע בסטודיו',
};
