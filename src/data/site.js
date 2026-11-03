// פרטי העסק. שדות עם null מחכים לתמר/דוד ולא יוצגו באתר עד שימולאו.
export const business = {
  name: 'דוד שדה – סטודיו לקעקועים ופירסינגים',
  shortName: 'דוד שדה',
  legalName: null, // שם העוסק הרשמי
  taxId: null, // מספר עוסק
  street: null, // כתובת מלאה
  city: 'עומר',
  region: 'מחוז הדרום',
  phoneDisplay: '050-2606770',
  phoneIntl: '+972502606770',
  whatsapp: '972502606770',
  email: 'david.sade38@gmail.com',
  instagram: 'https://www.instagram.com/david_sade_ts',
  facebook: 'https://www.facebook.com/share/1auqCd7ojA/',
  hours: null, // שעות פתיחה אמיתיות
  slogan: 'בשביל קעקוע מדהים שווה להדרים',
  sketchAppUrl: 'https://ink-crazy-sketch-flow.base44.app',
  accessibilityContact: null, // שם רכז/ת נגישות
};

export const wa = (text) =>
  `https://wa.me/${business.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

export const nav = [
  { href: '/services', label: 'שירותי העסק' },
  { href: '/tattoos/realism', label: 'ריאליזם' },
  { href: '/tattoos/cover-up', label: 'קאברים' },
  { href: '/piercing', label: 'פירסינג' },
  { href: '/private-lessons', label: 'לימוד פרטני' },
  { href: '/blog', label: 'מאמרים' },
  { href: '/about', label: 'אודות' },
  { href: '/contact', label: 'צרו קשר' },
];
