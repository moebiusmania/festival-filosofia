import { describe, expect, test } from "vitest";
import { SECTIONS } from "../src/lib/sections.ts";
import Sections from "../src/components/Sections.astro";
import InfoSection from "../src/components/sections/InfoSection.astro";
import MapSection from "../src/components/sections/MapSection.astro";
import ProgrammaSection from "../src/components/sections/ProgrammaSection.astro";
import HotelSection from "../src/components/sections/HotelSection.astro";
import RistorantiSection from "../src/components/sections/RistorantiSection.astro";
import NotePad from "../src/components/sections/NotePad.astro";
import { render } from "./render.ts";

describe("SECTIONS", () => {
  test("has six sections in order", () => {
    expect(SECTIONS.map((s) => s.id)).toEqual([
      "info",
      "mappa",
      "programma",
      "hotel",
      "ristoranti",
      "note",
    ]);
  });

  test("nums are sequential and zero-padded", () => {
    SECTIONS.forEach((s, i) => {
      expect(s.num).toBe(String(i + 1).padStart(2, "0"));
    });
  });

  test("titles are non-empty", () => {
    for (const s of SECTIONS) expect(s.title.trim()).not.toBe("");
  });
});

describe("Sections", () => {
  test("renders every section, with only the first open", async () => {
    const html = await render(Sections);
    for (const s of SECTIONS) {
      expect(html).toContain(`data-id="${s.id}"`);
      expect(html).toContain(`aria-controls="section-${s.id}"`);
    }
    expect(html.match(/class="ff-section open"/g)).toHaveLength(1);
    expect(html.match(/aria-expanded="true"/g)).toHaveLength(1);
  });
});

describe("InfoSection", () => {
  test("renders dates, theme, admission and edition", async () => {
    const html = await render(InfoSection);
    expect(html).toContain("18–20 set. 2026");
    expect(html).toContain("caos");
    expect(html).toContain("Gratuito");
    expect(html).toContain("XXVI");
  });

  test("renders all three cities in description", async () => {
    const html = await render(InfoSection);
    for (const c of ["Modena", "Carpi", "Sassuolo"]) expect(html).toContain(c);
  });
});

// Leaflet is loaded client-side, so the server only emits the shell.
describe("MapSection", () => {
  test("renders the map container", async () => {
    const html = await render(MapSection);
    expect(html).toContain('class="ff-map"');
  });

  test("renders the city filter buttons, with Tutte active", async () => {
    const html = await render(MapSection);
    for (const c of ["Tutte", "Modena", "Carpi", "Sassuolo"]) expect(html).toContain(c);
    expect(html).toContain('class="ff-map-filter-btn active"');
  });

  test("does not embed pins in server output", async () => {
    const html = await render(MapSection);
    expect(html).not.toContain("ff-map-pin");
  });
});

describe("ProgrammaSection", () => {
  test("renders disclaimer", async () => {
    const html = await render(ProgrammaSection);
    expect(html).toContain("Programma indicativo");
  });

  test("renders day headers for days present in data", async () => {
    const html = await render(ProgrammaSection);
    expect(html).toContain("Venerdì 18 settembre");
    expect(html).toContain("Sabato 19 settembre");
  });

  test("renders speaker names from the official program", async () => {
    const html = await render(ProgrammaSection);
    expect(html).toContain("Stefano Massini");
    expect(html).toContain("David Armitage");
    expect(html).toContain("Nadia Fusini");
  });

  test("renders day and location filter buttons", async () => {
    const html = await render(ProgrammaSection);
    expect(html).toContain("Tutti i giorni");
    expect(html).toContain("Venerdì 18");
    expect(html).toContain("Tutte le sedi");
    for (const c of ["Modena", "Carpi", "Sassuolo"]) expect(html).toContain(c);
  });

  test("renders event categories", async () => {
    const html = await render(ProgrammaSection);
    expect(html).toContain("Lezione magistrale");
  });

  test("no events are bookmarked in server output", async () => {
    const html = await render(ProgrammaSection);
    expect(html).not.toContain('class="prog-event prog-event--bookmarked"');
  });
});

// Hotel details live in localStorage, so the server renders the empty state.
describe("HotelSection", () => {
  test("renders empty state linking to the hotel page", async () => {
    const html = await render(HotelSection);
    expect(html).toContain("hotel-empty");
    expect(html).toContain("Nessun alloggio configurato");
    expect(html).toContain('href="/festival-filosofia/hotel"');
  });
});

describe("RistorantiSection", () => {
  test("renders the sample restaurants, numbered", async () => {
    const html = await render(RistorantiSection);
    expect(html).toContain("risto-item");
    expect(html).toContain("Osteria Francescana Bistrot");
    expect(html).toContain('<div class="risto-n">01</div>');
    expect(html).toContain('<div class="risto-n">02</div>');
  });

  test("shows the sample data hint", async () => {
    const html = await render(RistorantiSection);
    expect(html).toContain("risto-sample-hint");
    expect(html).toContain("Dati di esempio");
    expect(html).toContain('href="/festival-filosofia/ristoranti"');
  });
});

describe("NotePad", () => {
  test("renders label, textarea and disclaimer", async () => {
    const html = await render(NotePad);
    expect(html).toContain("Il mio taccuino");
    expect(html).toContain('id="ff-notes"');
    expect(html).toContain('aria-label="Note personali"');
    expect(html).toContain("Scrivi qui le tue note");
    expect(html).toContain("Le note vengono salvate localmente");
  });
});
