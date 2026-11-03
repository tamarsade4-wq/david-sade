# האתר של דוד שדה – סטודיו לקעקועים ופירסינג

אתר סטטי ב-Astro. מתארח ב-Cloudflare Pages.

- התקנה: `npm install`
- הרצה מקומית: `npm run dev`
- בנייה: `npm run build` (התוצאה בתיקייה dist)

הגדרות Cloudflare Pages: Framework preset = Astro, Build command = `npm run build`, Output directory = `dist`, משתנה סביבה `SITE_URL=https://davidsade.co.il`.

פרטי העסק נמצאים ב-src/data/site.js. השירותים ב-src/data/services.js, המאמרים ב-src/data/posts.json.
