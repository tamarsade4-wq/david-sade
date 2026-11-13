// פרטי העסק נערכים ב-src/content/settings/business.json (דרך מערכת הניהול).
// שדה ריק לא מוצג באתר.
import data from '../content/settings/business.json';
export const business = data;

export const wa = (text) =>
  `https://wa.me/${business.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

export const nav = [
  { href: '/services', label: 'שירותי העסק' },
  { href: '/tattoos/realism', label: 'ריאליזם' },
  { href: '/tattoos/cover-up', label: 'קאברים' },
  { href: '/piercing', label: 'פירסינג' },
  { href: '/portfolio', label: 'תיק עבודות' },
  { href: '/private-lessons', label: 'לימוד פרטני' },
  { href: '/blog', label: 'מאמרים' },
  { href: '/about', label: 'אודות' },
  { href: '/contact', label: 'צרו קשר' },
];
