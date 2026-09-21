import { render } from "preact-render-to-string";
import { assert, assertStringIncludes } from "@std/assert";
import FineFestivalModal from "../islands/FineFestivalModal.tsx";

Deno.test("FineFestivalModal: renders open on load", () => {
  const html = render(<FineFestivalModal />);
  assertStringIncludes(html, "ff-modal-overlay open");
});

Deno.test("FineFestivalModal: announces the 2027 edition", () => {
  const html = render(<FineFestivalModal />);
  assertStringIncludes(html, "mito");
  assertStringIncludes(html, "17–19 settembre 2027");
  assertStringIncludes(html, "Modena · Carpi · Sassuolo");
});

Deno.test("FineFestivalModal: says the 2026 edition is over", () => {
  const html = render(<FineFestivalModal />);
  assertStringIncludes(html, "2026");
  assert(
    html.includes("conclus"),
    "expected the copy to state the edition has ended",
  );
});

Deno.test("FineFestivalModal: is an accessible dialog", () => {
  const html = render(<FineFestivalModal />);
  assertStringIncludes(html, 'role="dialog"');
  assertStringIncludes(html, 'aria-modal="true"');
  assertStringIncludes(html, 'aria-labelledby="ff-modal-title"');
});

Deno.test("FineFestivalModal: links to the official site", () => {
  const html = render(<FineFestivalModal />);
  assertStringIncludes(html, "https://www.festivalfilosofia.it/");
  assertStringIncludes(html, 'rel="noopener noreferrer"');
});
