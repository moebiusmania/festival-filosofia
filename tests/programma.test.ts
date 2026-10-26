import { describe, expect, test } from "vitest";
import { EVENTS } from "../src/lib/programma.ts";

const DAY_CODES = ["ven", "sab", "dom"];

describe("programma", () => {
  test("has events", () => {
    expect(EVENTS.length).toBeGreaterThan(0);
  });

  test("every event has the required fields", () => {
    for (const e of EVENTS) {
      for (const field of ["id", "day", "time", "city", "venue", "title", "category"] as const) {
        expect(e[field], `event ${e.id ?? "?"} is missing "${field}"`).toBeTypeOf("string");
        expect(e[field].length, `event ${e.id ?? "?"} is missing "${field}"`).toBeGreaterThan(0);
      }
    }
  });

  test("ids are unique", () => {
    const ids = EVENTS.map((e) => e.id);
    expect(new Set(ids).size, "duplicate event ids found").toBe(ids.length);
  });

  test("day codes are valid", () => {
    for (const e of EVENTS) {
      expect(DAY_CODES, `event ${e.id} has invalid day "${e.day}"`).toContain(e.day);
    }
  });

  test("time is in HH:MM format", () => {
    for (const e of EVENTS) {
      expect(e.time, `event ${e.id} has invalid time`).toMatch(/^\d{2}:\d{2}$/);
    }
  });
});
