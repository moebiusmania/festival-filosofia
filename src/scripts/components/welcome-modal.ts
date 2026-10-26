import { defineComponent } from "../define.ts";
import { STORAGE_KEYS, writeText } from "../../lib/storage.ts";

// Shown once per edition: the first time it opens, the edition year is
// stored, and the head script hides it on later visits (html[data-welcome]).
export const welcomeModal = defineComponent(() => ({
  open: true,
  init() {
    if (document.documentElement.dataset.welcome === "seen") {
      this.open = false;
      return;
    }
    writeText(STORAGE_KEYS.welcome, this.$el.dataset.edition ?? "");
    document.body.style.overflow = "hidden";
    (this.$refs.close as HTMLElement).focus();
  },
  close() {
    this.open = false;
    document.body.style.overflow = "";
    document.body.focus();
  },
  onKeyDown(e: KeyboardEvent) {
    if (!this.open) return;
    if (e.key === "Escape") {
      this.close();
      return;
    }
    if (e.key !== "Tab") return;

    const focusable = (this.$refs.card as HTMLElement).querySelectorAll<
      HTMLElement
    >("button, a[href]");
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  },
}));
