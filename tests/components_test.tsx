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
// Leaflet is loaded client-side inside useEffect, so SSR only emits the shell:
// the filter buttons and the (empty) map container. Pins are hydrated later.

Deno.test("MapSection: renders the map container", () => {
  const html = render(<MapSection />);
  assertStringIncludes(html, 'class="ff-map"');
});

Deno.test("MapSection: renders the city filter buttons", () => {
  const html = render(<MapSection />);
  assertStringIncludes(html, "Tutte");
  assertStringIncludes(html, "Modena");
  assertStringIncludes(html, "Carpi");
  assertStringIncludes(html, "Sassuolo");
});

Deno.test("MapSection: does not embed pins in SSR output", () => {
  const html = render(<MapSection />);
  assert(!html.includes("ff-map-pin"), "pins are added client-side only");
});

// ── ProgrammaSection ─────────────────────────────────────────────────────────

Deno.test("ProgrammaSection: renders disclaimer", () => {
  const html = render(<ProgrammaSection />);
  assertStringIncludes(html, "Programma indicativo");
});

Deno.test("ProgrammaSection: renders day headers for days present in data", () => {
  const html = render(<ProgrammaSection />);
  assertStringIncludes(html, "Venerdì 18 settembre");
  assertStringIncludes(html, "Sabato 19 settembre");
});

Deno.test("ProgrammaSection: renders speaker names from the official program", () => {
  const html = render(<ProgrammaSection />);
  assertStringIncludes(html, "Stefano Massini");
  assertStringIncludes(html, "David Armitage");
  assertStringIncludes(html, "Nadia Fusini");
});

Deno.test("ProgrammaSection: renders day filter buttons", () => {
  const html = render(<ProgrammaSection />);
  assertStringIncludes(html, "Tutti i giorni");
  assertStringIncludes(html, "Venerdì 18");
});

Deno.test("ProgrammaSection: renders location filter buttons for each city", () => {
  const html = render(<ProgrammaSection />);
  assertStringIncludes(html, "Tutte le sedi");
  assertStringIncludes(html, "Modena");
  assertStringIncludes(html, "Carpi");
  assertStringIncludes(html, "Sassuolo");
});

Deno.test("ProgrammaSection: renders event categories", () => {
  const html = render(<ProgrammaSection />);
  assertStringIncludes(html, "Lezione magistrale");
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
