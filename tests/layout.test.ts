import { describe, expect, test } from "vitest";
import Header from "../src/components/Header.astro";
import Footer from "../src/components/Footer.astro";
import NavMenu from "../src/components/NavMenu.astro";
import FineFestivalModal from "../src/components/FineFestivalModal.astro";
import { render } from "./render.ts";

describe("Header", () => {
  test("renders edition tag, name and theme", async () => {
    const html = await render(Header);
    expect(html).toContain("XXVI edizione");
    expect(html).toContain("festival<em>filosofia</em>");
    expect(html).toContain("caos");
  });

  test("renders event dates and cities", async () => {
    const html = await render(Header);
    expect(html).toContain("settembre 2026");
    expect(html).toContain("Modena · Carpi · Sassuolo");
  });

  test("logo links to the site root under the base path", async () => {
    const html = await render(Header);
    expect(html).toContain('href="/festival-filosofia/"');
  });
});

describe("Footer", () => {
  test("renders festival name, cities and decorative dot", async () => {
    const html = await render(Footer);
    expect(html).toContain("ff-footer");
    expect(html).toContain("festivalfilosofia 2026");
    expect(html).toContain("modena · carpi · sassuolo");
    expect(html).toContain('class="red-dot" aria-hidden="true"');
  });
});

describe("NavMenu", () => {
  test("theme button shows moon icon in light mode by default", async () => {
    const html = await render(NavMenu);
    expect(html).toContain("ff-theme-btn");
    expect(html).toContain('class="ti ti-moon"');
    expect(html).toContain('aria-label="Passa al tema scuro"');
  });

  test("burger button is closed by default", async () => {
    const html = await render(NavMenu);
    expect(html).toContain('class="ff-nav-btn"');
    expect(html).toContain('aria-label="Apri menu"');
    expect(html).toContain('aria-expanded="false"');
  });

  test("overlay is hidden by default", async () => {
    const html = await render(NavMenu);
    expect(html).toContain('class="ff-nav-overlay"');
    expect(html).not.toContain("ff-nav-overlay open");
  });

  test("renders all menu items with base-prefixed links", async () => {
    const html = await render(NavMenu);
    expect(html).toContain("Torna all'inizio");
    for (const [label, path] of [
      ["Come funziona", "info"],
      ["Alloggio", "hotel"],
      ["Lista ristoranti", "ristoranti"],
      ["Dati locali", "local-data"],
    ]) {
      expect(html).toContain(label);
      expect(html).toContain(`go(&quot;/festival-filosofia/${path}&quot;)`);
    }
  });

  test("renders two burger lines", async () => {
    const html = await render(NavMenu);
    expect(html.match(/ff-nav-line/g)).toHaveLength(2);
  });
});

describe("FineFestivalModal", () => {
  test("renders open on load", async () => {
    const html = await render(FineFestivalModal);
    expect(html).toContain('class="ff-modal-overlay open"');
  });

  test("announces the 2027 edition", async () => {
    const html = await render(FineFestivalModal);
    expect(html).toContain("mito");
    expect(html).toContain("17–19 settembre 2027");
    expect(html).toContain("Modena · Carpi · Sassuolo");
  });

  test("says the 2026 edition is over", async () => {
    const html = await render(FineFestivalModal);
    expect(html).toContain("2026");
    expect(html).toContain("conclus");
  });

  test("is an accessible dialog", async () => {
    const html = await render(FineFestivalModal);
    expect(html).toContain('role="dialog"');
    expect(html).toContain('aria-modal="true"');
    expect(html).toContain('aria-labelledby="ff-modal-title"');
  });

  test("links to the official site", async () => {
    const html = await render(FineFestivalModal);
    expect(html).toContain("https://www.festivalfilosofia.it/");
    expect(html).toContain('rel="noopener noreferrer"');
  });
});
