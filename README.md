# Festival di Filosofia 2026 — App companion

> An English version of this README follows below.

App companion non ufficiale per il [Festival di Filosofia 2026](https://www.festivalfilosofia.it/) (tema: **Caos**, 18–20 settembre, Modena · Carpi · Sassuolo).

> **Nota:** questo progetto è un'iniziativa personale, realizzata per hobby. Non è in alcun modo affiliato, sponsorizzato o approvato dall'organizzazione ufficiale del Festival di Filosofia.

## Scopo

Una piccola app web pensata per chi partecipa al festival: raccoglie in un unico posto le informazioni pratiche (programma, mappa, hotel, ristoranti) e offre un blocco note personale per appunti.

## Stack

- **Runtime:** [Deno](https://deno.com/)
- **Framework:** [Fresh 2](https://fresh.deno.dev/) (routing filesystem, islands architecture)
- **UI:** [Preact](https://preactjs.com/) + [Preact Signals](https://preactjs.com/guide/v10/signals/)
- **Bundler:** [Vite](https://vite.dev/) via `@fresh/plugin-vite`
- **Icone:** [Tabler Icons](https://tabler.io/icons) (CDN webfont)

## Setup locale

**Requisiti:** Deno ≥ 2.x installato.

```bash
# clona il repository
git clone https://github.com/moebiusmania/festival-filosofia.git
cd festival-filosofia

# avvia il dev server con hot-reload
deno task dev
```

Altri comandi disponibili:

```bash
deno task build   # build di produzione → _fresh/
deno task start   # serve la build di produzione
deno task update  # aggiorna Fresh all'ultima versione
```

## Licenza

[MIT](./LICENSE) © 2026 Salvatore Laisa

---

# Festival di Filosofia 2026 — Companion app

Unofficial companion web app for [Festival di Filosofia 2026](https://www.festivalfilosofia.it/) (theme: **Chaos**, 18–20 September, Modena · Carpi · Sassuolo).

> **Note:** this is a personal, hobbyist project. It is not affiliated with, sponsored by, or endorsed by the official Festival di Filosofia organisation in any way.

## Purpose

A small web app for festival attendees: it gathers practical information in one place (schedule, map, hotels, restaurants) and includes a personal notepad for on-the-go notes.

## Stack

- **Runtime:** [Deno](https://deno.com/)
- **Framework:** [Fresh 2](https://fresh.deno.dev/) (filesystem routing, islands architecture)
- **UI:** [Preact](https://preactjs.com/) + [Preact Signals](https://preactjs.com/guide/v10/signals/)
- **Bundler:** [Vite](https://vite.dev/) via `@fresh/plugin-vite`
- **Icons:** [Tabler Icons](https://tabler.io/icons) (CDN webfont)

## Local setup

**Requirements:** Deno ≥ 2.x installed.

```bash
# clone the repository
git clone https://github.com/moebiusmania/festival-filosofia.git
cd festival-filosofia

# start the dev server with hot-reload
deno task dev
```

Other available commands:

```bash
deno task build   # production build → _fresh/
deno task start   # serve the production build
deno task update  # update Fresh to the latest version
```

## License

[MIT](./LICENSE) © 2026 Salvatore Laisa
