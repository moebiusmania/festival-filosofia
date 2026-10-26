import { describe, expect, test } from "vitest";
import restaurants from "../src/data/restaurants.json";

describe("restaurants", () => {
  test("every entry has the required fields", () => {
    for (const r of restaurants) {
      for (const field of ["n", "name", "type", "addr", "when"] as const) {
        expect(r[field].length, `restaurant ${r.name} is missing "${field}"`).toBeGreaterThan(0);
      }
    }
  });

  test("numbering is zero-padded and sequential", () => {
    restaurants.forEach((r, i) => {
      expect(r.n).toBe(String(i + 1).padStart(2, "0"));
    });
  });

  test("names are unique", () => {
    const names = restaurants.map((r) => r.name);
    expect(new Set(names).size).toBe(names.length);
  });
});
