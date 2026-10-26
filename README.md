# Festival di Filosofia 2027 — App companion

> An English version of this README follows below.

App companion non ufficiale per il [Festival di Filosofia 2027](https://www.festivalfilosofia.it/) (tema: **Mito**, 17–19 settembre, Modena · Carpi · Sassuolo).

> **Nota:** questo progetto è un'iniziativa personale, realizzata per hobby. Non è in alcun modo affiliato, sponsorizzato o approvato dall'organizzazione ufficiale del Festival di Filosofia.

## Scopo

Una piccola app web pensata per chi partecipa al festival: raccoglie in un unico posto le informazioni pratiche (programma, mappa, hotel, ristoranti) e offre un blocco note personale per appunti.

## Principi

- **Open source** — codice pubblico, licenza MIT
- **Nessun tracciamento** — nessun analytics, nessun cookie, nessun tracker di terze parti
- **Privacy by design** — nessun database, nessun backend: tutti i dati (es. note personali) restano sul dispositivo dell'utente tramite `localStorage`

## Stack

- **Runtime / package manager:** [Bun](https://bun.sh/)
- **Framework:** [Astro](https://astro.build/) (sito statico, routing filesystem) + TypeScript
- **Interattività:** [Alpine.js](https://alpinejs.dev/)
- **Deploy:** GitHub Pages tramite GitHub Actions a ogni push su `main`
- **Mappa:** [Leaflet](https://leafletjs.com/) + tile [OpenStreetMap](https://www.openstreetmap.org/) (nessuna API key)
- **Icone:** [Tabler Icons](https://tabler.io/icons), incorporate come SVG in fase di build
- **Font:** EB Garamond e Libre Franklin da [Bunny Fonts](https://fonts.bunny.net/) (nessun log dei visitatori)

## Setup locale

**Requisiti:** Bun installato.

```bash
# clona il repository
git clone https://github.com/moebiusmania/festival-filosofia.git
cd festival-filosofia

# installa le dipendenze e avvia il dev server con hot-reload (esposto in LAN)
bun install
bun run dev       # → http://localhost:3000/festival-filosofia/
```

Altri comandi disponibili:

```bash
bun run build     # build di produzione → dist/
bun run preview   # serve la build di produzione
bun run test      # test
bun run check     # controllo dei tipi
```

## Licenza

[MIT](./LICENSE) © 2026 Salvatore Laisa

---

# Festival di Filosofia 2027 — Companion app

Unofficial companion web app for [Festival di Filosofia 2027](https://www.festivalfilosofia.it/) (theme: **Myth**, 17–19 September, Modena · Carpi · Sassuolo).

> **Note:** this is a personal, hobbyist project. It is not affiliated with, sponsored by, or endorsed by the official Festival di Filosofia organisation in any way.

## Purpose

A small web app for festival attendees: it gathers practical information in one place (schedule, map, hotels, restaurants) and includes a personal notepad for on-the-go notes.

## Principles

- **Open source** — public code, MIT licence
- **No tracking** — no analytics, no cookies, no third-party trackers
- **Privacy by design** — no database, no backend: all data (e.g. personal notes) stays on the user's device via `localStorage`

## Stack

- **Runtime / package manager:** [Bun](https://bun.sh/)
- **Framework:** [Astro](https://astro.build/) (static site, filesystem routing) + TypeScript
- **Interactivity:** [Alpine.js](https://alpinejs.dev/)
- **Deploy:** GitHub Pages via GitHub Actions on every push to `main`
- **Map:** [Leaflet](https://leafletjs.com/) + [OpenStreetMap](https://www.openstreetmap.org/) tiles (no API key)
- **Icons:** [Tabler Icons](https://tabler.io/icons), inlined as SVG at build time
- **Fonts:** EB Garamond and Libre Franklin from [Bunny Fonts](https://fonts.bunny.net/) (no visitor logging)

## Local setup

**Requirements:** Bun installed.

```bash
# clone the repository
git clone https://github.com/moebiusmania/festival-filosofia.git
cd festival-filosofia

# install dependencies and start the dev server with hot-reload (exposed on the LAN)
bun install
bun run dev       # → http://localhost:3000/festival-filosofia/
```

Other available commands:

```bash
bun run build     # production build → dist/
bun run preview   # serve the production build
bun run test      # tests
bun run check     # type-check
```

## License

[MIT](./LICENSE) © 2026 Salvatore Laisa
