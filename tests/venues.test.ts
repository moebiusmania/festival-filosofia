import { describe, expect, test } from "vitest";
import venues from "../src/data/venues.json";
import { EVENTS } from "../src/lib/programma.ts";
import type { Venue } from "../src/lib/venues.ts";

const VENUES = venues as Venue[];
const CITIES = ["Modena", "Carpi", "Sassuolo"];

describe("venues", () => {
  test("has entries", () => {
    expect(VENUES.length).toBeGreaterThan(0);
  });

  test("every entry has the required fields", () => {
    for (const v of VENUES) {
      expect(v.venue, `a venue is missing "venue"`).toBeTypeOf("string");
      expect(v.venue.length).toBeGreaterThan(0);
      expect(v.city, `venue ${v.venue} is missing "city"`).toBeTypeOf("string");
      expect(v.city.length).toBeGreaterThan(0);
      expect(v.lat, `venue ${v.venue} lat is not a number`).toBeTypeOf("number");
      expect(v.lng, `venue ${v.venue} lng is not a number`).toBeTypeOf("number");
    }
  });

  test("cities are known", () => {
    for (const v of VENUES) {
      expect(CITIES, `venue ${v.venue} has unknown city "${v.city}"`).toContain(v.city);
    }
  });

  test("coordinates fall within the Modena province area", () => {
    for (const v of VENUES) {
      expect(v.lat, `venue ${v.venue} lat out of range`).toBeGreaterThanOrEqual(44);
      expect(v.lat, `venue ${v.venue} lat out of range`).toBeLessThanOrEqual(45);
      expect(v.lng, `venue ${v.venue} lng out of range`).toBeGreaterThanOrEqual(10);
      expect(v.lng, `venue ${v.venue} lng out of range`).toBeLessThanOrEqual(11);
    }
  });

  test("venue names are unique", () => {
    const names = VENUES.map((v) => v.venue);
    expect(new Set(names).size, "duplicate venue names found").toBe(names.length);
  });

  test("every venue in the programme has coordinates", () => {
    const known = new Set(VENUES.map((v) => v.venue));
    const missing = [...new Set(EVENTS.map((e) => e.venue))].filter(
      (name) => !known.has(name),
    );
    expect(missing).toEqual([]);
  });

  test("venue city matches the programme", () => {
    const cityOf = new Map(VENUES.map((v) => [v.venue, v.city]));
    for (const e of EVENTS) {
      const mapped = cityOf.get(e.venue);
      if (mapped !== undefined) {
        expect(mapped, `venue "${e.venue}" city mismatch`).toBe(e.city);
      }
    }
  });
});
