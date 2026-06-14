import { render } from "preact-render-to-string";
import { assertStringIncludes } from "@std/assert";
import Footer from "../components/Footer.tsx";

Deno.test("Footer: renders festival name and year", () => {
  const html = render(<Footer />);
  assertStringIncludes(html, "festivalfilosofia 2026");
});

Deno.test("Footer: renders all three cities", () => {
  const html = render(<Footer />);
  assertStringIncludes(html, "modena");
  assertStringIncludes(html, "carpi");
  assertStringIncludes(html, "sassuolo");
});

Deno.test("Footer: renders footer element with ff-footer class", () => {
  const html = render(<Footer />);
  assertStringIncludes(html, "ff-footer");
});

Deno.test("Footer: renders decorative red dot", () => {
  const html = render(<Footer />);
  assertStringIncludes(html, "red-dot");
  assertStringIncludes(html, 'aria-hidden="true"');
});
