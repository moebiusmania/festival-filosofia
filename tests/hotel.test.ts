import { describe, expect, test } from "vitest";
import {
  type HotelData,
  hotelTimeLine,
  validateHotelForm,
} from "../src/lib/hotel.ts";
import AlloggioForm from "../src/components/AlloggioForm.astro";
import { render } from "./render.ts";

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

describe("validateHotelForm", () => {
  test("valid data returns no errors", () => {
    expect(validateHotelForm(makeData())).toEqual({});
  });

  test("empty nome returns error", () => {
    expect(validateHotelForm(makeData({ nome: "" })).nome).toBeTruthy();
  });

  test("whitespace-only nome returns error", () => {
    expect(validateHotelForm(makeData({ nome: "   " })).nome).toBeTypeOf("string");
  });

  test("empty mapUrl is valid", () => {
    expect(validateHotelForm(makeData({ mapUrl: "" })).mapUrl).toBeUndefined();
  });

  test("valid https google maps URL is accepted", () => {
    const errs = validateHotelForm(
      makeData({ mapUrl: "https://www.google.com/maps/embed?pb=abc123" }),
    );
    expect(errs.mapUrl).toBeUndefined();
  });

  test("non-https URL returns error", () => {
    const errs = validateHotelForm(
      makeData({ mapUrl: "http://www.google.com/maps/embed?pb=abc" }),
    );
    expect(errs.mapUrl).toBeTypeOf("string");
  });

  test("invalid URL string returns error", () => {
    expect(validateHotelForm(makeData({ mapUrl: "not a url at all" })).mapUrl)
      .toBeTypeOf("string");
  });

  test("any https URL is accepted regardless of domain", () => {
    const errs = validateHotelForm(
      makeData({ mapUrl: "https://maps.example.com/embed/123" }),
    );
    expect(errs.mapUrl).toBeUndefined();
  });

  test("mapUrl with surrounding whitespace is trimmed before validation", () => {
    const errs = validateHotelForm(
      makeData({ mapUrl: "  https://www.google.com/maps/embed?pb=test  " }),
    );
    expect(errs.mapUrl).toBeUndefined();
  });

  test("both errors can be present simultaneously", () => {
    const errs = validateHotelForm(makeData({ nome: "", mapUrl: "not-a-url" }));
    expect(errs.nome).toBeTypeOf("string");
    expect(errs.mapUrl).toBeTypeOf("string");
  });
});

describe("hotelTimeLine", () => {
  test("joins check-in and check-out", () => {
    expect(hotelTimeLine(makeData({ checkin: "15:00", checkout: "11:00" })))
      .toBe("Check-in 15:00 · Check-out 11:00");
  });

  test("is empty when neither is set", () => {
    expect(hotelTimeLine(makeData())).toBe("");
  });
});

// The form is server-rendered empty; Alpine fills it from localStorage.
describe("AlloggioForm", () => {
  test("renders the form", async () => {
    const html = await render(AlloggioForm);
    expect(html).toContain("<form");
    expect(html).toContain("hotel-form");
  });

  test("renders nome field with required marker", async () => {
    const html = await render(AlloggioForm);
    expect(html).toContain("hf-nome");
    expect(html).toContain("hotel-form-required");
  });

  test("renders every field", async () => {
    const html = await render(AlloggioForm);
    for (const id of ["hf-indirizzo", "hf-checkin", "hf-checkout", "hf-ref", "hf-mapUrl", "hf-note"]) {
      expect(html).toContain(`id="${id}"`);
    }
    expect(html).toContain("<textarea");
  });

  test("renders map URL hint", async () => {
    const html = await render(AlloggioForm);
    expect(html).toContain("hotel-form-hint");
    expect(html).toContain("Incorpora una mappa");
  });

  test("renders submit button and no cancel button", async () => {
    const html = await render(AlloggioForm);
    expect(html).toContain("hotel-form-submit");
    expect(html).toContain("Salva");
    expect(html).not.toContain("hotel-form-cancel");
  });

  test("error messages are only rendered client-side", async () => {
    const html = await render(AlloggioForm);
    // Error spans sit inside x-if templates, which aren't displayed until
    // Alpine evaluates them.
    expect(html).toMatch(/<template x-if="errors\.nome">/);
  });
});
