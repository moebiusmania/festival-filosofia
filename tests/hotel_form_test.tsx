import { render } from "preact-render-to-string";
import { assert, assertEquals, assertStringIncludes } from "@std/assert";
import AlloggioForm, {
  type FormErrors,
  type HotelData,
  validateHotelForm,
} from "../islands/AlloggioForm.tsx";

// ── validateHotelForm ─────────────────────────────────────────────────────────

function makeData(overrides: Partial<HotelData> = {}): HotelData {
  return {
    nome: "Hotel Test",
    indirizzo: "",
    checkin: "",
    checkout: "",
    ref: "",
    mapUrl: "",
    note: "",
    ...overrides,
  };
}

Deno.test("validateHotelForm: valid data returns no errors", () => {
  const errs = validateHotelForm(makeData());
  assertEquals(errs, {} as FormErrors);
});

Deno.test("validateHotelForm: empty nome returns error", () => {
  const errs = validateHotelForm(makeData({ nome: "" }));
  assert(typeof errs.nome === "string" && errs.nome.length > 0);
});

Deno.test("validateHotelForm: whitespace-only nome returns error", () => {
  const errs = validateHotelForm(makeData({ nome: "   " }));
  assert(typeof errs.nome === "string");
});

Deno.test("validateHotelForm: empty mapUrl is valid", () => {
  const errs = validateHotelForm(makeData({ mapUrl: "" }));
  assert(!errs.mapUrl);
});

Deno.test("validateHotelForm: valid https google maps URL is accepted", () => {
  const errs = validateHotelForm(
    makeData({ mapUrl: "https://www.google.com/maps/embed?pb=abc123" }),
  );
  assert(!errs.mapUrl);
});

Deno.test("validateHotelForm: non-https URL returns error", () => {
  const errs = validateHotelForm(
    makeData({ mapUrl: "http://www.google.com/maps/embed?pb=abc" }),
  );
  assert(typeof errs.mapUrl === "string");
});

Deno.test("validateHotelForm: invalid URL string returns error", () => {
  const errs = validateHotelForm(makeData({ mapUrl: "not a url at all" }));
  assert(typeof errs.mapUrl === "string");
});

Deno.test("validateHotelForm: any https URL is accepted regardless of domain", () => {
  const errs = validateHotelForm(
    makeData({ mapUrl: "https://maps.example.com/embed/123" }),
  );
  assert(!errs.mapUrl);
});

Deno.test("validateHotelForm: mapUrl with surrounding whitespace is trimmed before validation", () => {
  const errs = validateHotelForm(
    makeData({
      mapUrl: "  https://www.google.com/maps/embed?pb=test  ",
    }),
  );
  assert(!errs.mapUrl);
});

Deno.test("validateHotelForm: both errors can be present simultaneously", () => {
  const errs = validateHotelForm(makeData({ nome: "", mapUrl: "not-a-url" }));
  assert(typeof errs.nome === "string");
  assert(typeof errs.mapUrl === "string");
});

// ── AlloggioForm (SSR render) ─────────────────────────────────────────────────
// useEffect does not run during SSR, so the component renders in initial
// "editing=true, no saved data" state — the form is always shown.

Deno.test("AlloggioForm: renders the form on initial SSR", () => {
  const html = render(<AlloggioForm />);
  assertStringIncludes(html, "<form");
  assertStringIncludes(html, "hotel-form");
});

Deno.test("AlloggioForm: renders nome field with required marker", () => {
  const html = render(<AlloggioForm />);
  assertStringIncludes(html, "hf-nome");
  assertStringIncludes(html, "hotel-form-required");
});

Deno.test("AlloggioForm: renders indirizzo field", () => {
  const html = render(<AlloggioForm />);
  assertStringIncludes(html, "hf-indirizzo");
});

Deno.test("AlloggioForm: renders check-in and check-out fields", () => {
  const html = render(<AlloggioForm />);
  assertStringIncludes(html, "hf-checkin");
  assertStringIncludes(html, "hf-checkout");
});

Deno.test("AlloggioForm: renders booking reference field", () => {
  const html = render(<AlloggioForm />);
  assertStringIncludes(html, "hf-ref");
});

Deno.test("AlloggioForm: renders map URL field with hint", () => {
  const html = render(<AlloggioForm />);
  assertStringIncludes(html, "hf-mapUrl");
  assertStringIncludes(html, "hotel-form-hint");
  assertStringIncludes(html, "Incorpora una mappa");
});

Deno.test("AlloggioForm: renders free notes textarea", () => {
  const html = render(<AlloggioForm />);
  assertStringIncludes(html, "hf-note");
  assertStringIncludes(html, "<textarea");
});

Deno.test("AlloggioForm: renders submit button", () => {
  const html = render(<AlloggioForm />);
  assertStringIncludes(html, "hotel-form-submit");
  assertStringIncludes(html, "Salva");
});

Deno.test("AlloggioForm: no cancel button (form is always shown)", () => {
  const html = render(<AlloggioForm />);
  assert(
    !html.includes("hotel-form-cancel"),
    "there is no cancel button — the form is always visible",
  );
});

Deno.test("AlloggioForm: no errors shown on initial render", () => {
  const html = render(<AlloggioForm />);
  assert(!html.includes("hotel-form-error"), "no errors expected on initial render");
});
