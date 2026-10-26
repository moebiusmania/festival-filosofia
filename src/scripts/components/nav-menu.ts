import { defineComponent } from "../define.ts";
import { STORAGE_KEYS, writeText } from "../../lib/storage.ts";
import { url } from "../../lib/url.ts";

function isHome(): boolean {
  const path = window.location.pathname
    .replace(/index\.html$/, "")
    .replace(/\/?$/, "/");
  return path === url();
}

export const navMenu = defineComponent(() => ({
  open: false,
  dark: false,
  init() {
    this.dark = document.documentElement.getAttribute("data-theme") === "dark";
    this.$watch("open", (open) => {
      document.body.style.overflow = open ? "hidden" : "";
      if (open) this.originAtBurger();
    });
  },
  // The overlay is revealed as a circle growing from the burger button.
  originAtBurger() {
    const r = (this.$refs.burger as HTMLElement).getBoundingClientRect();
    const overlay = this.$refs.overlay as HTMLElement;
    overlay.style.setProperty("--ox", `${r.left + r.width / 2}px`);
    overlay.style.setProperty("--oy", `${r.top + r.height / 2}px`);
  },
  toggleTheme() {
    this.dark = !this.dark;
    document.documentElement.setAttribute(
      "data-theme",
      this.dark ? "dark" : "light",
    );
    writeText(STORAGE_KEYS.theme, this.dark ? "dark" : "light");
  },
  goHome() {
    this.open = false;
    setTimeout(() => {
      if (!isHome()) {
        window.location.href = url();
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 300);
  },
  go(href: string) {
    this.open = false;
    window.location.href = href;
  },
}));
