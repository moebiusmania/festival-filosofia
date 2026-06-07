import { render } from "preact-render-to-string";
import { assert, assertStringIncludes } from "@std/assert";
import NavMenu from "../islands/NavMenu.tsx";

Deno.test("NavMenu: renders controls container", () => {
  const html = render(<NavMenu />);
  assertStringIncludes(html, "ff-nav-controls");
});

Deno.test("NavMenu: theme button shows moon icon in light mode by default", () => {
  const html = render(<NavMenu />);
  assertStringIncludes(html, "ff-theme-btn");
  assertStringIncludes(html, "ti-moon");
  assertStringIncludes(html, "Passa al tema scuro");
});

Deno.test("NavMenu: burger button is closed by default", () => {
  const html = render(<NavMenu />);
  assertStringIncludes(html, "ff-nav-btn");
  assertStringIncludes(html, "Apri menu");
  assert(!html.includes("ff-nav-btn open"));
});

Deno.test("NavMenu: renders all three menu item labels", () => {
  const html = render(<NavMenu />);
  assertStringIncludes(html, "Alloggio");
  assertStringIncludes(html, "Lista ristoranti");
  assertStringIncludes(html, "Come funziona");
});

Deno.test("NavMenu: overlay is hidden and not marked open by default", () => {
  const html = render(<NavMenu />);
  assertStringIncludes(html, "ff-nav-overlay");
  assert(!html.includes("ff-nav-overlay open"));
  assertStringIncludes(html, 'aria-hidden="true"');
});

Deno.test("NavMenu: renders two burger lines", () => {
  const html = render(<NavMenu />);
  const lineCount = (html.match(/ff-nav-line/g) ?? []).length;
  assert(lineCount === 2, `expected 2 burger lines, got ${lineCount}`);
});
