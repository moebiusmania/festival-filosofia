# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun install        # install dependencies
bun run dev        # dev server on :3000, exposed on the LAN → http://<host>:3000/festival-filosofia/
bun run build      # static build → dist/
bun run preview    # serve dist/ locally
bun run check      # type-check .astro and .ts files (astro check)
bun run test       # run unit tests (vitest)
```

`astro check` does not support TypeScript 7 yet, so `typescript` is pinned to `^6`.

## Tests

Tests live in `tests/` and use Vitest, configured through Astro's `getViteConfig` (`vitest.config.ts`).
Components are rendered with Astro's Container API via the `render()` helper in `tests/render.ts`.

| File | What it covers |
|------|----------------|
| `tests/programma.test.ts` | `src/data/programma.json` — required fields, unique ids, day codes, HH:MM times |
| `tests/venues.test.ts` | `src/data/venues.json` — fields, known cities, coordinates, consistency with the programme |
| `tests/restaurants.test.ts` | `src/data/restaurants.json` — fields, zero-padded sequential numbering, unique names |
| `tests/hotel.test.ts` | `validateHotelForm` / `hotelTimeLine` and the server-rendered `AlloggioForm` |
| `tests/sections.test.ts` | `SECTIONS` list, the accordion, and every section component's server output |
| `tests/layout.test.ts` | `Header`, `Footer`, `NavMenu`, `WelcomeModal` server output |
| `tests/decor.test.ts` | Motif generators (`lib/motifs.ts`), `DECORS`, `Decor` variants, `Settings` |

Tests assert on server-rendered HTML only; Alpine behaviour is not exercised by the suite.

## Architecture

Companion app for festivalfilosofia 2027 (XXVII edition, theme: "mito", 17–19 September, Modena/Carpi/Sassuolo).
The 2027 programme isn't published yet: `src/data/programma.json` is `[]`, so the Programma section shows a
placeholder and the map shows every venue in `venues.json`. Filling in `programma.json` brings back the filters,
bookmarks and per-venue event counts automatically (then update `tests/sections.test.ts`).
Built with **Astro** (static output), **TypeScript** and **Alpine.js** (via `@astrojs/alpinejs`), using **Bun**
as package manager and script runner. There is no backend: all user data lives in `localStorage`, so htmx
is not used (there is nothing to fetch from a server).

### Deployment & base path

Deployed to GitHub Pages under `/festival-filosofia/` by `.github/workflows/deploy.yml` on every push to
`main` (build runs in the `oven/bun:alpine` container). `base` is set in `astro.config.mjs`, and
`build.format: "file"` emits `hotel.html` etc. so URLs stay slash-less (`…/hotel`).

**Every internal link must go through `url()` from `src/lib/url.ts`**, never a bare `/path`. This applies
in `.astro` files and in client scripts alike. `public/manifest.json` uses relative paths for the same reason.

### Layout

- `src/layouts/Layout.astro` — HTML shell (meta, theme bootstrap script, Bunny Fonts, global CSS), wraps
  every page with `Header` + `Footer`. A `slot="after"` renders after the footer.
- `src/pages/` — `index`, `hotel`, `info`, `ristoranti`, `impostazioni` (settings), `local-data`.
- `src/components/` — Astro components; `src/components/sections/` holds the accordion section bodies.
- `src/lib/` — framework-free TS shared by components, client scripts and tests (storage keys, validation,
  data helpers, `url()`).
- `src/scripts/alpine.ts` — the `@astrojs/alpinejs` entrypoint; registers every `Alpine.data()` component.
- `src/scripts/components/*.ts` — one Alpine component factory per interactive component, wrapped in
  `defineComponent()` (`src/scripts/define.ts`) so `this` is typed with Alpine's magics.

### Interactivity pattern

Components are fully server-rendered in their initial state (same markup the user sees before JS runs),
and Alpine takes over via `x-data="<name>"`. Conventions:

- Render the initial value statically **and** bind it, e.g. `aria-expanded="false" :aria-expanded="String(open)"`.
  Use `String(...)` for aria booleans; Alpine drops attributes whose value is `false`.
- Use `:class="{ name: cond }"` (object form) to toggle classes that are also present statically.
- Content that must not exist until JS decides (error messages, saved-data cards) goes in `<template x-if>`.
  Content that is visible on first paint uses `x-show`.
- Never store Leaflet (or other third-party) objects in Alpine state; keep them in a closure (see
  `map-section.ts`), as Alpine's reactive proxies break them.
- An `x-data` wrapper around sibling elements uses `style="display: contents"` to keep the original layout;
  mind structural selectors such as `.risto-item:last-child` when adding wrappers.

### Welcome modal

`src/components/WelcomeModal.astro` shows a dismissable welcome to the current edition (*mito*, dates,
cities; the programme is not out yet), mounted on `src/pages/index.astro` only. It is shown **once per
edition**: when it opens, the edition year is stored under `ff-welcome`; on later loads the head script in
`Layout.astro` sets `html[data-welcome="seen"]`, which hides it with CSS before first paint (no flash), and
the Alpine component stays closed. Wiping local data shows it again. Edition facts (number, year, theme,
dates, cities) live in `src/lib/edition.ts`; bumping the year there makes the welcome show again to
everyone. Styles live under `/* WELCOME MODAL */` in `src/styles/style.css`.

### Settings & decoration motif

`/impostazioni` (`Settings.astro`, Alpine `settings`) lets the user pick the decorative motif, one per edition,
listed in `DECORS` (`src/lib/decor.ts`): `mito` · 2027, the constellation of Orion (default; lines draw between
twinkling stars, and the particles twinkle as a starfield), and `caos` · 2026, the Lorenz attractor. The choice is stored under `ff-decor` and applied as `html[data-decor]` by the inline
script in `Layout.astro` before first paint (like the theme). `<Decor />` renders both motifs and CSS shows
the chosen one; `<Decor variant="…" />` pins one (settings previews). To add an edition's motif: add a
generator to `lib/motifs.ts`, a `<path>`/`<g>` to `DecorSprite.astro`, a `<use>` to `Decor.astro`, an entry to
`DECORS`, and the matching `data-decor` rules in `style.css` (and the head script's allowed values).

### Sections

`src/components/Sections.astro` renders an accordion of six sections (Alpine `sections` component), listed in
`SECTIONS` in `src/lib/sections.ts`:

| id | Component | Notes |
|----|-----------|-------|
| info | `InfoSection` | Quick reference info |
| mappa | `MapSection` | Leaflet + OSM map of venues, lazily loaded client-side |
| programma | `ProgrammaSection` | Event schedule with day/city filters and bookmarks; placeholder while empty |
| hotel | `HotelSection` | Shows hotel data saved on `/hotel` |
| ristoranti | `RistorantiSection` | Sample `src/data/restaurants.json`, or the user's list from `/ristoranti` |
| note | `NotePad` | `localStorage`-persisted textarea |

To add a section: create the component in `src/components/sections/`, append an entry to `SECTIONS`, and map
its id in the `CONTENT` object in `Sections.astro`.

### Styles & assets

- `src/styles/style.css` — all styles; imported by `Layout.astro` (with Leaflet's CSS).
- Page changes cross-fade via native cross-document view transitions (`@view-transition` at the top of
  `style.css`, disabled under `prefers-reduced-motion`). Don't add Astro's `<ClientRouter />`: it would
  turn navigation into an SPA and break Alpine's per-page init and the modal's show-on-every-load.
- Text size scales globally through `--fs` (every `font-size` is `calc(Npx * var(--fs))`).
- Decorative graphics are generated at build time by `src/lib/motifs.ts` (the motifs, the header
  `ParticleField`, the per-letter offsets of the theme word). `DecorSprite.astro` defines the motif paths once
  per page in the layout; `Decor.astro` reuses them via `<use>`. Motif stroke widths are set per instance with
  `--sw` in viewBox units (not `non-scaling-stroke`, which breaks the `pathLength` draw animation). Styles
  and all motion live under `/* DECORATION & MOTION */` in `style.css`. Intro animations only run when the
  layout gets `intro` (home page), so they don't replay on every navigation. Reduced motion disables all of it.
- `public/` — static files copied as-is (`manifest.json`, `icons/`).
- Icons: `<Icon name="<tabler-name>" />` (add `filled` for the filled set) inlines the Tabler SVG from
  `@tabler/icons` at build time; it renders `<svg class="ti ti-<name>">` sized 1em in `currentColor`, so style
  icons through `.ti`. Don't add icon fonts or CDNs.
- Fonts come from Bunny Fonts (linked in `Layout.astro`). The README promises no third-party tracking:
  `tests/icons.test.ts` fails if the page shell loads anything external other than `fonts.bunny.net`.

### Data

Static JSON in `src/data/`. Import it directly; no API layer. All `localStorage` keys are listed in
`STORAGE_KEYS` (`src/lib/storage.ts`); `/local-data` wipes exactly those, so add new keys there. The
`ff2026-*` key names are kept on purpose for the 2027 edition so users' saved notes and data survive.
