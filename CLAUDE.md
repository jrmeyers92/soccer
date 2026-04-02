# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Frontend development
npm run dev      # Start Vite dev server (hot reload)
npm run build    # Build optimized production assets

# PHP / Statamic
php artisan ...          # Standard Laravel artisan commands
./please ...             # Statamic CLI wrapper (equivalent to artisan for Statamic commands)

# Linting
./vendor/bin/pint        # Laravel Pint (PHP code style fixer)

# Testing
php artisan test                          # Run all tests
php artisan test --filter=TestClassName   # Run a single test
php artisan test tests/Feature/           # Run feature tests only
```

## Architecture

This is a **Statamic CMS 6.0** site built on **Laravel 12**, serving **Kickapoo Chiefs Athletics** — a multi-sport high school athletics site (soccer, basketball, football, baseball, softball, swimming). Statamic is a **flat-file-first CMS** — most content is stored as YAML/Markdown files, not in the database.

### Content Layer (`/content/`)
Collections (flat-file content types): `teams`, `coaches`, `news`, `opponents`, `sponsors`, `pages`. Each collection entry is a YAML/Markdown file. Global site data (school name, colors, sports/teams navigation, Google Analytics ID, Stripe donation link) lives in `content/globals/site_data.yaml`.

**Important:** Schedules and rosters are NOT separate collections — they are stored as replicator fieldsets embedded directly inside team entries (`fieldsets/schedule.yaml`, `fieldsets/roster.yaml`). The `games` collection blueprint exists but is no longer actively used.

### Schema / Blueprints (`/resources/blueprints/`)
Blueprints define field schemas. When adding or changing content fields, update the corresponding blueprint in `resources/blueprints/collections/`. Reusable field groups live in `resources/blueprints/fieldsets/` (schedule, roster, player).

### Templating (`/resources/views/`)
Templates use **Antlers** — Statamic's templating language (`.antlers.html` files). It is not Blade. The master layout is `layout.antlers.html`. Partials live in `resources/views/partials/`.

### Routing
`routes/web.php` contains a loop over all 6 sports that registers `/{sport}/{team}/schedule`, `/{sport}/{team}/roster`, `/{sport}/{team}/stats`, `/{sport}/{team}/coaches`, `/{sport}/{team}/seasons`, and `/{sport}/{team}/calendar.ics` (iCal export via `CalendarController`). Statamic handles all other routing via collection slugs and page URIs.

Custom routes also include newsletter subscription endpoints (`POST /subscribe`, `/subscribe/confirm/{token}`, `/unsubscribe/{token}`) and CP admin routes for managing subscribers (`/cp/subscribers`).

### Frontend Assets
- CSS/JS entry points: `resources/css/site.css`, `resources/js/site.js|routing.js|news_filtering.js`
- Tailwind CSS with custom fonts: **Inter** (body) and **Oswald** (headings), custom colors: primary gold `#DCC137`, secondary dark `#373F51`
- Vite compiles assets to `public/build/`
- `resources/js/routing.js` manages sport/team navigation state via localStorage
- `resources/js/news_filtering.js` handles real-time news search/filtering

### Database
Only 3 custom tables exist (all other content is flat-file):
- `users` — standard Laravel auth
- `subscribers` — newsletter email subscriptions (email, name, sport, team, confirmed, token)
- `game_notifications` — deduplication log to prevent sending duplicate game-change emails

Run `php artisan migrate` on fresh installs.

### Game Change Notification System
`EventServiceProvider` listens to Statamic's `EntrySaving`/`EntrySaved` events and dispatches `GameChangedListener`, which diffs the team entry's schedule replicator before and after save. If a game changes (date, time, location, cancellation, score posted), it sends `GameAlert` mailables to matching `Subscriber` records, using `GameNotification` to prevent duplicates.

### Admin Panel
Statamic Control Panel is accessible at `/cp`. User accounts are managed there or via `php artisan statamic:make:user`. Git auto-commit on content save is enabled in `config/statamic/git.php`.
