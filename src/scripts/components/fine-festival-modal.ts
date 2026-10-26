import { defineComponent } from "../define.ts";

// Open on every load; dismissal is deliberately not persisted.
export const fineFestivalModal = defineComponent(() => ({
  open: true,
  init() {
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
