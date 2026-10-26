import { describe, expect, test } from "vitest";
import Header from "../src/components/Header.astro";
import Footer from "../src/components/Footer.astro";
import NavMenu from "../src/components/NavMenu.astro";
import WelcomeModal from "../src/components/WelcomeModal.astro";
import { render } from "./render.ts";

describe("Header", () => {
  test("renders edition tag, name and theme", async () => {
    const html = await render(Header);
    expect(html).toContain("XXVII edizione");
    expect(html).toContain("festival<em>filosofia</em>");
    expect(html).toContain("mito");
  });

  test("renders event dates and cities", async () => {
    const html = await render(Header);
    expect(html).toContain("17 · 18 · 19 settembre 2027");
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
    expect(html).toContain("festivalfilosofia 2027");
    expect(html).toContain("modena · carpi · sassuolo");
    expect(html).toContain('class="red-dot" aria-hidden="true"');
  });
});

describe("NavMenu", () => {
  test("theme button shows moon icon in light mode by default", async () => {
    const html = await render(NavMenu);
    expect(html).toContain("ff-theme-btn");
    // Both icons ship; CSS shows the one matching html[data-theme].
    expect(html).toMatch(/<svg[^>]*class="ti ti-moon ff-theme-icon-light"/);
    expect(html).toMatch(/<svg[^>]*class="ti ti-sun ff-theme-icon-dark"/);
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
    expect(html).toMatch(/Torna all(&#39;|')inizio/);
    for (const [label, path] of [
      ["Come funziona", "info"],
      ["Alloggio", "hotel"],
      ["Lista ristoranti", "ristoranti"],
      ["Impostazioni", "impostazioni"],
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

describe("WelcomeModal", () => {
  test("renders open on load (hidden client-side once seen)", async () => {
    const html = await render(WelcomeModal);
    expect(html).toContain('class="ff-modal-overlay open"');
  });

  test("is stamped with the edition it welcomes", async () => {
    const html = await render(WelcomeModal);
    expect(html).toContain('data-edition="2027"');
  });

  test("welcomes the 2027 edition on mito", async () => {
    const html = await render(WelcomeModal);
    expect(html).toContain("XXVII edizione · 2027");
    expect(html).toContain("Benvenuti al festivalfilosofia 2027");
    expect(html).toContain("mito");
    expect(html).toContain("17–19 settembre 2027");
    expect(html).toContain("Modena · Carpi · Sassuolo");
  });

  test("is an accessible dialog", async () => {
    const html = await render(WelcomeModal);
    expect(html).toContain('role="dialog"');
    expect(html).toContain('aria-modal="true"');
    expect(html).toContain('aria-labelledby="ff-modal-title"');
  });

  test("links to the official site", async () => {
    const html = await render(WelcomeModal);
    expect(html).toContain("https://www.festivalfilosofia.it/");
    expect(html).toContain('rel="noopener noreferrer"');
  });
});
