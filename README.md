# האתר של דוד שדה – סטודיו לקעקועים ופירסינג

אתר סטטי ב-Astro. מתארח ב-Cloudflare Pages.

- התקנה: `npm install`
- הרצה מקומית: `npm run dev`
- בנייה: `npm run build` (התוצאה בתיקייה dist)

הגדרות Cloudflare Pages: Framework preset = Astro, Build command = `npm run build`, Output directory = `dist`, משתנה סביבה `SITE_URL=https://davidsade.co.il`.

התוכן נערך דרך Pages CMS (app.pagescms.org). הקבצים: src/content/tattoos, src/content/piercings, src/content/blog, ופרטי העסק ב-src/content/settings/business.json.
