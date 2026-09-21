# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
deno task dev      # start dev server (Vite HMR)
deno task build    # production build → _fresh/
deno task start    # serve the production build
deno task update   # update Fresh to latest
deno task test     # run unit tests (deno test --allow-read tests/)
```

Linting uses the `fresh` + `recommended` rule tags from `deno.json`; run with `deno lint`.

## Tests

Tests live in `tests/` and use Deno's built-in test runner with `@std/assert`.

| File | What it covers |
|------|----------------|
| `tests/restaurants_test.ts` | `data/restaurants.json` — field presence, zero-padded numbering, sequential order, no duplicate names |
| `tests/sections_test.ts` | `SECTIONS` array in `islands/Sections.tsx` — count, id order, uniqueness, sequential nums, non-empty titles, Content is a function |
| `tests/components_test.tsx` | Renders each section component via `preact-render-to-string` and asserts key text appears in the output |

To add tests for a new section component, import it in `tests/components_test.tsx` and add a `Deno.test` block using `render(<YourSection />)` and `assertStringIncludes`.

## Architecture

Single-page companion app for festivalfilosofia 2026 (theme: "caos", 18–20 September, Modena/Carpi/Sassuolo). Built on **Deno Fresh 2.3.3** with **Preact** and **Vite** via `@fresh/plugin-vite`.

### Routing & app shell

- `main.ts` — creates the Fresh `App`, mounts static files middleware, and enables filesystem routing
- `routes/_app.tsx` — HTML shell (lang, meta, Tabler Icons CDN link, title)
- `routes/index.tsx` — home page: `Header` + `Sections` island + `Footer` + `FineFestivalModal` island
- `utils.ts` — exports `define = createDefine<State>()` used in all route files; `State` is the shared middleware state type

### Islands vs components

Fresh's islands architecture applies strictly:
- `islands/` — interactive (client-hydrated) components: `Sections.tsx` (owns the accordion open/close state via `@preact/signals`), `NavMenu.tsx`, `AlloggioForm.tsx`, `ListaRistoranti.tsx`, `DatiLocali.tsx`, and `FineFestivalModal.tsx`
- `components/` — static server-rendered components (`Header`, `Footer`) and section content under `components/sections/`

### End-of-edition modal

`islands/FineFestivalModal.tsx` shows a dismissable modal on load announcing that the 2026 edition
is over and that the next one is *mito*, 17–19 September 2027. It is mounted on `routes/index.tsx`
only (not `_app.tsx`): dismissal is deliberately **not** persisted, and the nav menu does full page
loads, so an app-wide mount would re-show it on every internal navigation. Open state is
`useSignal(true)`, so it renders open during SSR with no hydration flash. Styles live under
`/* FINE FESTIVAL MODAL */` at the end of `assets/style.css`. To update it for a future edition,
edit the `PROSSIMA` const at the top of the island.

### Sections

`islands/Sections.tsx` renders an accordion of six sections, each backed by a component in `components/sections/`:

| id | Component | Notes |
|----|-----------|-------|
| info | `InfoSection` | Quick reference info |
| mappa | `MapSection` | Placeholder; map due July 2026 |
| programma | `ProgrammaSection` | Event schedule |
| hotel | `HotelSection` | Hotel Canalgrande details + SVG map placeholder |
| ristoranti | `RistorantiSection` | Reads `data/restaurants.json` |
| note | `NotePad` | `localStorage`-persisted textarea |

To add a new section: create the component in `components/sections/`, import it in `islands/Sections.tsx`, and append an entry to the `SECTIONS` array.

### Styles & assets

- `assets/style.css` — all styles; imported by `client.ts` (the Vite client entry)
- `client.ts` — sole purpose is `import "./assets/style.css"`, making styles part of the Vite bundle
- Tabler Icons loaded from CDN webfont; use class `ti ti-<name>` with `aria-hidden="true"`

### Data

Static JSON files in `data/` (e.g. `restaurants.json`). Import them directly in components; no API layer.

### JSX

Using Preact's `precompile` JSX transform (`jsxImportSource: "preact"` in `deno.json`). HTML intrinsic elements listed in `jsxPrecompileSkipElements` are not precompiled (passed through as-is).
