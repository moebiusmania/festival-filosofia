import { describe, expect, test } from "vitest";
import Icon from "../src/components/Icon.astro";
import Layout from "../src/layouts/Layout.astro";
import { render } from "./render.ts";

describe("Icon", () => {
  test("inlines an outline Tabler icon as a text-sized SVG", async () => {
    const html = await render(Icon, { name: "x" });
    expect(html).toMatch(/^<svg[^>]*class="ti ti-x"/);
    expect(html).toContain('width="1em"');
    expect(html).toContain('stroke="currentColor"');
    expect(html).toContain('aria-hidden="true"');
    expect(html).toContain('<path d="M18 6l-12 12"');
    // Tabler's invisible bounding-box path is dropped.
    expect(html).not.toContain("M0 0h24v24H0z");
  });

  test("renders the filled variant", async () => {
    const html = await render(Icon, { name: "bookmark", filled: true });
    expect(html).toMatch(/class="ti ti-bookmark-filled"/);
    expect(html).toContain('fill="currentColor"');
  });

  test("passes extra classes through", async () => {
    const html = await render(Icon, { name: "arrow-right", class: "ff-nav-arrow" });
    expect(html).toContain('class="ti ti-arrow-right ff-nav-arrow"');
  });
});

// The app promises no third-party tracking: besides Bunny Fonts (which
// doesn't log visitors), the page shell must not load anything external.
describe("Layout", () => {
  test("loads no third-party resources except Bunny Fonts", async () => {
    const html = await render(Layout);
    const hosts = [...html.matchAll(/(?:href|src)="https?:\/\/([^/"]+)/g)].map((m) => m[1]);
    expect(new Set(hosts)).toEqual(new Set(["fonts.bunny.net"]));
    expect(html).not.toMatch(/googleapis|gstatic|jsdelivr|unpkg/);
  });
});
