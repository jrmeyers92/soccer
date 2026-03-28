# SoccerSite Setup Guide

Follow these steps after cloning the repo to get a new school site up and running.

---

## 1. Environment

```bash
cp .env.example .env
php artisan key:generate
```

Edit `.env` and set:
```
APP_NAME="School Name Soccer"
APP_URL=https://yourdomain.com
```

---

## 2. Install Dependencies

```bash
composer install
npm install
npm run build
```

---

## 3. Statamic License

Either set a license key in `.env`:
```
STATAMIC_LICENSE_KEY=your-key
```

Or enable solo/trial mode in `config/statamic/editions.php`.

---

## 4. Create Admin User

```bash
php please make:user
```

---

## 5. Configure School Info (CP → Globals → Site Data)

Log in at `/cp` and fill out **Site Data**:

| Field | Description |
|-------|-------------|
| School Name | e.g. "Jefferson" |
| Mascot | e.g. "Eagles" |
| Street Address | Physical address |
| School City / State / Zip | Location |
| Logo | Upload school logo (SVG or PNG) |
| Primary Color | Team color (hex) — used site-wide |
| Secondary Color | Secondary color (hex) |
| Google Analytics ID | e.g. `G-XXXXXXXXXX` (leave blank to disable) |
| Stripe Link | Donation button URL (leave blank to hide button) |
| Facebook / Twitter / Instagram URL | Social links (leave blank to hide icons) |

---

## 6. Configure Nav Teams

In **Site Data → Nav Teams**, add each team that should appear in the navigation dropdown:

| Field | Value |
|-------|-------|
| Slug | `boys-varsity`, `boys-jv`, `girls-varsity`, `girls-jv` |
| Display Name | "Boy's Varsity", "Boy's JV", etc. |

Only add teams the school actually has. The nav dropdown and homepage redirect are driven by this list.

---

## 7. Add Opponents

Under **Collections → Opponents**, add every school you play against. Each opponent needs:
- School Name
- Mascot
- City / State
- Logo

---

## 8. Create Teams

Under **Collections → Teams**, create an entry for each team per season year:

- Team type: `jv` or `varsity`
- Gender: `boys` or `girls`
- Year: e.g. `2025`
- Add games to the Games replicator (opponent, date, location, scores, optional recap/photos)

---

## 9. Add Coaches

Under **Collections → Coaches**, add coaching staff with photo and bio.

---

## 10. Add Sponsors / Footer Logos

In **Site Data → Footer Logos**, add sponsor logos with a link URL.

---

## 11. Add News / Stories

Under **Collections → News**, publish pre-season, game recap, or general articles.

---

## 12. DNS & Deployment

Point your domain to the server, set `APP_URL` in `.env`, and run:

```bash
php artisan config:cache
php artisan route:cache
npm run build
```

---

## Done

Visit your site at `APP_URL`. The nav, schedule, roster, stats, and news pages are all data-driven from the CP — no code changes needed.
