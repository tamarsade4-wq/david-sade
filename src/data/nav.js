// מבנה הניווט הראשי ודפי המרכז. עמוד קעקוע חדש שלא מופיע כאן יופיע בקבוצה "עוד קעקועים" בעמוד /tattoos.
import { tattoos, piercings } from './services.js';

// קבוצות הקעקועים (לפי כוונה). הכותרות הקצרות משמשות בתפריט.
export const tattooGroups = [
  { title: 'ריאליזם ופורטרטים', slugs: ['realism', 'portrait', 'memorial', 'animals'], blurb: 'פורטרטים, בעלי חיים והנצחה, בצל ובעומק.' },
  { title: 'קאברים וחידוש', slugs: ['cover-up', 'refresh'], blurb: 'קעקוע ישן שכבר לא מתאים לכם? אפשר להפוך אותו ליצירה חדשה.' },
  { title: 'קו דק וגרפי', slugs: ['small-fine-line', 'geometric', 'abstract', 'trash-polka'], blurb: 'קעקועים קטנים, קווים עדינים וסגנונות גרפיים.' },
  { title: 'פרויקטים גדולים', slugs: ['sleeve'], blurb: 'שרוול, גב או חזה.' },
  { title: 'להתחיל', slugs: ['consultation'], blurb: 'שיחה וסקיצה לפני שמתחילים.' },
];

export const tattooShort = {
  realism: 'ריאליזם שחור-אפור', portrait: 'פורטרט', memorial: 'הנצחה', animals: 'בעלי חיים',
  'cover-up': 'קאבר לקעקוע ישן', refresh: 'חידוש קעקוע דהוי',
  'small-fine-line': 'קטנים ופיין ליין', geometric: 'גיאומטרי', abstract: 'אבסטרקט', 'trash-polka': 'טראש פולקה',
  sleeve: 'שרוול', consultation: 'ייעוץ וסקיצה',
};

export const piercingGroups = [
  { key: 'ear', title: 'באוזן' },
  { key: 'face', title: 'בפנים' },
  { key: 'body', title: 'בגוף' },
  { key: 'jewelry', title: 'תכשיטים' },
];

export const piercingShort = {
  helix: 'הליקס', tragus: 'טראגוס', conch: "קונץ'", daith: 'דיית', industrial: 'אינדסטריאל',
  nose: 'אף', septum: 'ספטום', lip: 'שפה', eyebrow: 'גבה', nipple: 'פטמה',
  jewelry: 'תכשיטי פירסינג', 'titanium-jewelry': 'תכשיטי טיטניום', 'custom-jewelry': 'התאמה אישית',
};

const byslug = (list) => Object.fromEntries(list.map((s) => [s.slug, s]));
const T = byslug(tattoos);

// קבוצות קעקועים עם הפריטים עצמם (כולל קבוצת שארית).
export function tattooGrouped() {
  const used = new Set();
  const groups = tattooGroups.map((g) => ({
    ...g,
    items: g.slugs.map((s) => T[s]).filter(Boolean).map((s) => { used.add(s.slug); return s; }),
  })).filter((g) => g.items.length);
  const rest = tattoos.filter((t) => !used.has(t.slug));
  if (rest.length) groups.push({ title: 'עוד קעקועים', blurb: '', slugs: rest.map((r) => r.slug), items: rest });
  return groups;
}

const label = (map, s) => map[s.slug] || s.title;

export function buildNav() {
  const tg = tattooGrouped();
  return [
    {
      label: 'קעקועים', href: '/tattoos', match: ['/tattoos'],
      groups: tg.map((g) => ({ title: g.title, links: g.items.map((s) => ({ href: `/tattoos/${s.slug}`, label: label(tattooShort, s) })) })),
    },
    {
      label: 'פירסינג', href: '/piercing', match: ['/piercing'],
      groups: piercingGroups.map((g) => ({
        title: g.title,
        links: piercings.filter((p) => p.group === g.key).map((s) => ({ href: `/piercing/${s.slug}`, label: label(piercingShort, s) })),
      })).filter((g) => g.links.length),
    },
    { label: 'תיק עבודות', href: '/portfolio', match: ['/portfolio'] },
    { label: 'לימוד פרטני', href: '/private-lessons', match: ['/private-lessons'] },
    { label: 'מאמרים', href: '/blog', match: ['/blog'] },
    {
      label: 'הסטודיו', href: '/about', match: ['/about', '/studio', '/visit', '/press', '/tattoo-beer-sheva', '/contact'],
      groups: [{
        title: 'הסטודיו',
        links: [
          { href: '/about', label: 'אודות דוד' },
          { href: '/studio', label: 'סטודיו פרטי' },
          { href: '/visit', label: 'מגיעים מרחוק' },
          { href: '/tattoo-beer-sheva', label: 'מקעקע בבאר שבע' },
          { href: '/press', label: 'כתבו עלינו' },
          { href: '/contact', label: 'צרו קשר' },
        ],
      }],
    },
  ];
}

// קישורים קשורים בסוף עמוד שירות: קודם מאותה קבוצה, ואז משאר העמודים.
export function relatedTattoos(slug, n = 4) {
  const g = tattooGrouped().find((x) => x.items.some((i) => i.slug === slug));
  const same = g ? g.items.filter((i) => i.slug !== slug) : [];
  const rest = tattoos.filter((t) => t.slug !== slug && !same.includes(t));
  return [...same, ...rest].slice(0, n);
}
export function relatedPiercings(slug, n = 4) {
  const me = piercings.find((p) => p.slug === slug);
  const same = piercings.filter((p) => p.slug !== slug && me && p.group === me.group);
  const rest = piercings.filter((p) => p.slug !== slug && !same.includes(p));
  return [...same, ...rest].slice(0, n);
}
