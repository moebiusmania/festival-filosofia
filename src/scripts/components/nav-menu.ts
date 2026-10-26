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
    });
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
