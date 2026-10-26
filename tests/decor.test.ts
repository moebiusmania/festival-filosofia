import { describe, expect, test } from "vitest";
import { lorenzPath, orion } from "../src/lib/motifs.ts";
import { DECORS, DEFAULT_DECOR } from "../src/lib/decor.ts";
import { STORAGE_KEYS } from "../src/lib/storage.ts";
import Decor from "../src/components/Decor.astro";
import Settings from "../src/components/Settings.astro";
import { render } from "./render.ts";

function coords(d: string): number[] {
  return [...d.matchAll(/[ML]([\d.]+) ([\d.]+)/g)].flatMap((m) => [
    Number(m[1]),
    Number(m[2]),
  ]);
}

describe("motif generators", () => {
  const orionLines = () => orion().lines;
  for (const [name, path] of [["lorenzPath", lorenzPath], ["orion lines", orionLines]] as const) {
    test(`${name} is deterministic`, () => {
      expect(path()).toBe(path());
    });

    test(`${name} stays inside the 0–100 viewBox`, () => {
      const cs = coords(path());
      expect(cs.length).toBeGreaterThan(10);
      for (const c of cs) {
        expect(c).toBeGreaterThanOrEqual(0);
        expect(c).toBeLessThanOrEqual(100);
      }
    });
  }

  test("orion has 13 stars joined by 13 lines, all inside the viewBox", () => {
    const { lines, stars } = orion();
    expect(stars).toHaveLength(13);
    expect(lines.match(/M/g)).toHaveLength(13);
    for (const s of stars) {
      expect(s.x - s.r).toBeGreaterThanOrEqual(0);
      expect(s.x + s.r).toBeLessThanOrEqual(100);
      expect(s.y - s.r).toBeGreaterThanOrEqual(0);
      expect(s.y + s.r).toBeLessThanOrEqual(100);
    }
  });
});

describe("decor", () => {
  test("mito (2027) is the default, caos (2026) the alternative", () => {
    expect(DEFAULT_DECOR).toBe("mito");
    expect(DECORS.map((d) => [d.id, d.year])).toEqual([["mito", 2027], ["caos", 2026]]);
  });

  test("the choice is a storage key wiped by /local-data", () => {
    expect(STORAGE_KEYS.decor).toBe("ff-decor");
  });

  test("the seen welcome is a storage key wiped by /local-data", () => {
    expect(STORAGE_KEYS.welcome).toBe("ff-welcome");
  });

  test("Decor follows the user's choice by default (both motifs present)", async () => {
    const html = await render(Decor);
    expect(html).toContain('href="#ff-orion"');
    expect(html).toContain('href="#ff-lorenz"');
    expect(html).not.toContain("ff-decor--fixed");
  });

  test("Decor with a variant renders only that motif", async () => {
    const html = await render(Decor, { variant: "caos" });
    expect(html).toContain('href="#ff-lorenz"');
    expect(html).not.toContain('href="#ff-orion"');
    expect(html).toContain("ff-decor--fixed");
  });
});

describe("Settings", () => {
  test("offers each motif, labelled by theme and year, default selected", async () => {
    const html = await render(Settings);
    expect(html).toContain("Decorazione");
    for (const d of DECORS) {
      expect(html).toContain(`value="${d.id}"`);
      expect(html).toContain(`>${d.year}<`);
    }
    // A plain `checked` attribute, not Alpine's `:checked` binding.
    expect(html).toMatch(/value="mito"[^>]*\schecked[\s>]/);
    expect(html).not.toMatch(/value="caos"[^>]*\schecked[\s>]/);
  });
});
