import { assert, assertEquals } from "@std/assert";
import programma from "../data/programma.json" with { type: "json" };

interface ProgEvent {
  id: string;
  day: string;
  time: string;
  city: string;
  venue: string;
  speaker?: string;
  title: string;
  category: string;
}

const EVENTS = programma as ProgEvent[];
const DAY_CODES = ["ven", "sab", "dom"];

Deno.test("programma: has events", () => {
  assert(EVENTS.length > 0, "expected at least one event");
});

Deno.test("programma: every event has the required fields", () => {
  for (const e of EVENTS) {
    for (const field of ["id", "day", "time", "city", "venue", "title", "category"] as const) {
      assert(
        typeof e[field] === "string" && e[field].length > 0,
        `event ${e.id ?? "?"} is missing "${field}"`,
      );
    }
  }
});

Deno.test("programma: ids are unique", () => {
  const ids = EVENTS.map((e) => e.id);
  assertEquals(new Set(ids).size, ids.length, "duplicate event ids found");
});

Deno.test("programma: day codes are valid", () => {
  for (const e of EVENTS) {
    assert(DAY_CODES.includes(e.day), `event ${e.id} has invalid day "${e.day}"`);
  }
});

Deno.test("programma: time is in HH:MM format", () => {
  for (const e of EVENTS) {
    assert(/^\d{2}:\d{2}$/.test(e.time), `event ${e.id} has invalid time "${e.time}"`);
  }
});
