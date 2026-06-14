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
// useEffect does not run in SSR, so the component always renders the empty
// state (no localStorage data available) during server-side rendering.

Deno.test("HotelSection: renders empty state when no localStorage data", () => {
  const html = render(<HotelSection />);
  assertStringIncludes(html, "hotel-empty");
  assertStringIncludes(html, "Nessun alloggio configurato");
});

Deno.test("HotelSection: empty state contains link to /hotel page", () => {
  const html = render(<HotelSection />);
  assertStringIncludes(html, 'href="/hotel"');
});

Deno.test("HotelSection: does not render hotel card in empty state", () => {
  const html = render(<HotelSection />);
  assert(!html.includes("hotel-wrap"), "hotel card should not appear without saved data");
});

Deno.test("HotelSection: does not render map placeholder in empty state", () => {
  const html = render(<HotelSection />);
  assert(!html.includes("hotel-map-ph"), "map placeholder should not appear without saved data");
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

Deno.test("RistorantiSection: shows sample data hint when no localStorage data", () => {
  const html = render(<RistorantiSection />);
  assertStringIncludes(html, "risto-sample-hint");
  assertStringIncludes(html, "Dati di esempio");
  assertStringIncludes(html, 'href="/ristoranti"');
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
