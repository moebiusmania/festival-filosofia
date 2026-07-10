import { assert, assertEquals } from "@std/assert";
import venues from "../data/venues.json" with { type: "json" };
import programma from "../data/programma.json" with { type: "json" };

interface Venue {
  venue: string;
  city: string;
  lat: number;
  lng: number;
}

interface ProgEvent {
  city: string;
  venue: string;
}

const VENUES = venues as Venue[];
const EVENTS = programma as ProgEvent[];
const CITIES = ["Modena", "Carpi", "Sassuolo"];

Deno.test("venues: has entries", () => {
  assert(VENUES.length > 0, "expected at least one venue");
});

Deno.test("venues: every entry has the required fields", () => {
  for (const v of VENUES) {
    assert(
      typeof v.venue === "string" && v.venue.length > 0,
      `a venue is missing "venue"`,
    );
    assert(
      typeof v.city === "string" && v.city.length > 0,
      `venue ${v.venue} is missing "city"`,
    );
    assert(typeof v.lat === "number", `venue ${v.venue} lat is not a number`);
    assert(typeof v.lng === "number", `venue ${v.venue} lng is not a number`);
  }
});

Deno.test("venues: cities are known", () => {
  for (const v of VENUES) {
    assert(CITIES.includes(v.city), `venue ${v.venue} has unknown city "${v.city}"`);
  }
});

Deno.test("venues: coordinates fall within the Modena province area", () => {
  for (const v of VENUES) {
    assert(v.lat >= 44 && v.lat <= 45, `venue ${v.venue} lat ${v.lat} out of range`);
    assert(v.lng >= 10 && v.lng <= 11, `venue ${v.venue} lng ${v.lng} out of range`);
  }
});

Deno.test("venues: venue names are unique", () => {
  const names = VENUES.map((v) => v.venue);
  assertEquals(new Set(names).size, names.length, "duplicate venue names found");
});

Deno.test("venues: every venue in the programme has coordinates", () => {
  const known = new Set(VENUES.map((v) => v.venue));
  const missing = [...new Set(EVENTS.map((e) => e.venue))].filter(
    (name) => !known.has(name),
  );
  assertEquals(missing, [], `venues missing from venues.json: ${missing.join(", ")}`);
});

Deno.test("venues: venue city matches the programme", () => {
  const cityOf = new Map(VENUES.map((v) => [v.venue, v.city]));
  for (const e of EVENTS) {
    const mapped = cityOf.get(e.venue);
    if (mapped !== undefined) {
      assertEquals(
        mapped,
        e.city,
        `venue "${e.venue}" city mismatch: venues.json=${mapped} vs programma=${e.city}`,
      );
    }
  }
});
