import { render } from "preact-render-to-string";
import { assert, assertStringIncludes } from "@std/assert";
import Header from "../components/Header.tsx";

Deno.test("Header: renders edition tag", () => {
  const html = render(<Header />);
  assertStringIncludes(html, "XXVI edizione");
});

Deno.test("Header: renders festival name", () => {
  const html = render(<Header />);
  assertStringIncludes(html, "festival");
  assertStringIncludes(html, "filosofia");
});

Deno.test("Header: renders theme word caos", () => {
  const html = render(<Header />);
  assertStringIncludes(html, "caos");
});

Deno.test("Header: renders event dates and cities", () => {
  const html = render(<Header />);
  assertStringIncludes(html, "settembre 2026");
  assertStringIncludes(html, "Modena");
  assertStringIncludes(html, "Carpi");
  assertStringIncludes(html, "Sassuolo");
});

Deno.test("Header: does not render theme toggle button (moved to NavMenu island)", () => {
  const html = render(<Header />);
  assert(!html.includes("ff-theme-btn"));
});
