# דף ההעלאה של דוד (davidsade.co.il/admin)

הדף `src/pages/admin.astro` שולח קבצים לפונקציות בתיקייה הזו. הפונקציות רצות ב-Cloudflare Pages.

## מה צריך להגדיר פעם אחת ב-Cloudflare (Pages, פרויקט האתר, Settings)

1. **Variables and Secrets** (Production):
   - `ADMIN_PASSWORD`: הסיסמה של דוד. לשינוי סיסמה: משנים כאן ומפעילים Deploy מחדש.
   - `GITHUB_TOKEN`: טוקן GitHub מסוג fine-grained, לריפו david-sade בלבד, הרשאה Contents: Read and write.
2. **Bindings**: R2 bucket, Variable name `VIDEOS`, ובוחרים דלי (למשל `david-sade-videos`).
3. Deployments: Retry deployment (כדי שההגדרות ייכנסו).

## איך זה עובד
- תמונה: נשמרת ב-`src/assets/portfolio` וברשימה `src/content/settings/portfolio.json` בקומיט אחד, והאתר נבנה מחדש לבד.
- סרטון: נשמר ב-R2 ומוגש דרך `/media/<שם>`. תמונת הפתיחה שלו נשמרת בריפו.
- קטגוריה: slug של עמוד קעקוע או פירסינג. העבודה מופיעה בעמוד הקטגוריה ובתיק העבודות.
