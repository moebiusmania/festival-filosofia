import { render } from "preact-render-to-string";
import { assert, assertStringIncludes } from "@std/assert";
import InfoSection from "../components/sections/InfoSection.tsx";
import MapSection from "../components/sections/MapSection.tsx";
import ProgrammaSection from "../components/sections/ProgrammaSection.tsx";
import HotelSection from "../components/sections/HotelSection.tsx";
import RistorantiSection from "../components/sections/RistorantiSection.tsx";
import NotePad from "../components/sections/NotePad.tsx";

// ── InfoSection ──────────────────────────────────────────────────────────────

Deno.test("InfoSection: renders event dates", () => {
  const html = render(<InfoSection />);
  assertStringIncludes(html, "18–20 set. 2026");
});

Deno.test("InfoSection: renders theme word caos", () => {
  const html = render(<InfoSection />);
  assertStringIncludes(html, "caos");
});

Deno.test("InfoSection: renders free admission", () => {
  const html = render(<InfoSection />);
  assertStringIncludes(html, "Gratuito");
});

Deno.test("InfoSection: renders edition XXVI", () => {
  const html = render(<InfoSection />);
  assertStringIncludes(html, "XXVI");
});

Deno.test("InfoSection: renders all three cities in description", () => {
  const html = render(<InfoSection />);
  assertStringIncludes(html, "Modena");
  assertStringIncludes(html, "Carpi");
  assertStringIncludes(html, "Sassuolo");
});

// ── MapSection ───────────────────────────────────────────────────────────────

Deno.test("MapSection: renders placeholder text", () => {
  const html = render(<MapSection />);
  assertStringIncludes(html, "Mappa interattiva non ancora disponibile");
});

Deno.test("MapSection: renders availability date", () => {
  const html = render(<MapSection />);
  assertStringIncludes(html, "luglio 2026");
});

Deno.test("MapSection: renders all three cities", () => {
  const html = render(<MapSection />);
  assertStringIncludes(html, "Modena");
  assertStringIncludes(html, "Carpi");
  assertStringIncludes(html, "Sassuolo");
});

Deno.test("MapSection: renders city venue details", () => {
  const html = render(<MapSection />);
  assertStringIncludes(html, "Piazza Martiri");
  assertStringIncludes(html, "Piazza Garibaldi");
});

// ── ProgrammaSection ─────────────────────────────────────────────────────────

Deno.test("ProgrammaSection: renders disclaimer", () => {
  const html = render(<ProgrammaSection />);
  assertStringIncludes(html, "Programma indicativo");
});

Deno.test("ProgrammaSection: renders all three day headers", () => {
  const html = render(<ProgrammaSection />);
  assertStringIncludes(html, "Venerdì 18 settembre");
  assertStringIncludes(html, "Sabato 19 settembre");
  assertStringIncludes(html, "Domenica 20 settembre");
});

Deno.test("ProgrammaSection: renders speaker names", () => {
  const html = render(<ProgrammaSection />);
  assertStringIncludes(html, "Massimo Cacciari");
  assertStringIncludes(html, "Michela Marzano");
  assertStringIncludes(html, "Stefano Massini");
});

Deno.test("ProgrammaSection: renders opening and closing events", () => {
  const html = render(<ProgrammaSection />);
  assertStringIncludes(html, "Apertura del festival");
  assertStringIncludes(html, "Chiusura del festival");
});

Deno.test("ProgrammaSection: no events are bookmarked in initial render", () => {
  const html = render(<ProgrammaSection />);
  assert(!html.includes("prog-event--bookmarked"), "no bookmarks expected on SSR");
});

// ── HotelSection ─────────────────────────────────────────────────────────────

Deno.test("HotelSection: renders hotel name", () => {
  const html = render(<HotelSection />);
  assertStringIncludes(html, "Hotel Canalgrande");
});

Deno.test("HotelSection: renders hotel address", () => {
  const html = render(<HotelSection />);
  assertStringIncludes(html, "Corso Canalgrande 6");
  assertStringIncludes(html, "Modena");
});

Deno.test("HotelSection: renders group booking reference", () => {
  const html = render(<HotelSection />);
  assertStringIncludes(html, "FF2026-GRP");
});

Deno.test("HotelSection: renders check-in and check-out times", () => {
  const html = render(<HotelSection />);
  assertStringIncludes(html, "Check-in 15:00");
  assertStringIncludes(html, "Check-out 11:00");
});

// ── RistorantiSection ────────────────────────────────────────────────────────

Deno.test("RistorantiSection: renders at least one restaurant item", () => {
  const html = render(<RistorantiSection />);
  assertStringIncludes(html, "risto-item");
});

Deno.test("RistorantiSection: renders first restaurant name", () => {
  const html = render(<RistorantiSection />);
  assertStringIncludes(html, "Osteria Francescana Bistrot");
});

Deno.test("RistorantiSection: renders restaurant numbering", () => {
  const html = render(<RistorantiSection />);
  assertStringIncludes(html, "01");
  assertStringIncludes(html, "02");
});

// ── NotePad ──────────────────────────────────────────────────────────────────

Deno.test("NotePad: renders label", () => {
  const html = render(<NotePad />);
  assertStringIncludes(html, "Il mio taccuino");
});

Deno.test("NotePad: renders textarea with correct id and aria-label", () => {
  const html = render(<NotePad />);
  assertStringIncludes(html, 'id="ff-notes"');
  assertStringIncludes(html, 'aria-label="Note personali"');
});

Deno.test("NotePad: renders placeholder text", () => {
  const html = render(<NotePad />);
  assertStringIncludes(html, "Scrivi qui le tue note");
});

Deno.test("NotePad: renders local storage disclaimer", () => {
  const html = render(<NotePad />);
  assertStringIncludes(html, "Le note vengono salvate localmente");
});

Deno.test("NotePad: textarea is empty on initial render", () => {
  const html = render(<NotePad />);
  assertStringIncludes(html, "<textarea");
  assert(!html.includes(">some content<"), "textarea should be empty on SSR");
});
