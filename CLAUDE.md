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

# Testing
php artisan test                          # Run all tests
php artisan test --filter=TestClassName   # Run a single test
php artisan test tests/Feature/           # Run feature tests only
```

## Architecture

This is a **Statamic CMS 4.0** site built on Laravel 10, serving a school soccer team website. Statamic is a **flat-file-first CMS** — most content is stored as YAML/Markdown files, not in the database.

### Content Layer (`/content/`)
Collections (flat-file content types): `teams`, `players`, `coaches`, `games`, `news`, `opponents`, `sponsors`, `pages`. Each collection entry is a YAML/Markdown file. Global site data (school name, mascot, logo) lives in `content/globals/site_data.yaml`.

### Schema / Blueprints (`/resources/blueprints/`)
Blueprints define the field schemas for each collection. When adding or changing content fields, update the corresponding blueprint in `resources/blueprints/collections/`.

### Templating (`/resources/views/`)
Templates use **Antlers** — Statamic's templating language (`.antlers.html` files). It is not Blade. The master layout is `layout.antlers.html`. Key templates: `home.antlers.html`, `default.antlers.html`, `contact.antlers.html`.

### Routing
Statamic handles most routing automatically based on collection slugs and page URIs. `routes/web.php` only contains custom routes outside of Statamic's content-driven routing.

### Frontend Assets
- CSS/JS entry points live in `resources/css/` and `resources/js/`
- Tailwind CSS with custom fonts: Lato (body) and Roboto Slab (headings) — see `tailwind.config.js`
- Vite compiles assets to `public/build/` — the `AppServiceProvider` handles Statamic's Vite integration

### Database
Users are stored in the database (standard Laravel). All other content is flat-file. Run `php artisan migrate` on fresh installs.

### Admin Panel
Statamic Control Panel is accessible at `/cp`. User accounts are managed there or via `php artisan statamic:make:user`.
