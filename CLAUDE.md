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
| `tests/layout.test.ts` | `Header`, `Footer`, `NavMenu`, `FineFestivalModal` server output |

Tests assert on server-rendered HTML only; Alpine behaviour is not exercised by the suite.

## Architecture

Single-page companion app for festivalfilosofia 2026 (theme: "caos", 18–20 September, Modena/Carpi/Sassuolo).
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

- `src/layouts/Layout.astro` — HTML shell (meta, theme bootstrap script, Tabler Icons CDN, global CSS), wraps
  every page with `Header` + `Footer`. A `slot="after"` renders after the footer.
- `src/pages/` — `index`, `hotel`, `info`, `ristoranti`, `local-data`.
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

### End-of-edition modal

`src/components/FineFestivalModal.astro` shows a dismissable modal on load announcing that the 2026 edition
is over and that the next one is *mito*, 17–19 September 2027. It is mounted on `src/pages/index.astro` only
(not the layout): dismissal is deliberately **not** persisted, and the nav menu does full page loads, so a
layout-wide mount would re-show it on every page. It renders open server-side, so there is no flash.
Styles live under `/* FINE FESTIVAL MODAL */` at the end of `src/styles/style.css`. To update it for a
future edition, edit the `PROSSIMA` const at the top of the component.

### Sections

`src/components/Sections.astro` renders an accordion of six sections (Alpine `sections` component), listed in
`SECTIONS` in `src/lib/sections.ts`:

| id | Component | Notes |
|----|-----------|-------|
| info | `InfoSection` | Quick reference info |
| mappa | `MapSection` | Leaflet + OSM map of venues, lazily loaded client-side |
| programma | `ProgrammaSection` | Event schedule with day/city filters and bookmarks |
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
- `public/` — static files copied as-is (`manifest.json`, `icons/`).
- Tabler Icons loaded from CDN webfont; use `<i class="ti ti-<name>" aria-hidden="true"></i>`.

### Data

Static JSON in `src/data/`. Import it directly; no API layer. All `localStorage` keys are listed in
`STORAGE_KEYS` (`src/lib/storage.ts`); `/local-data` wipes exactly those, so add new keys there.
