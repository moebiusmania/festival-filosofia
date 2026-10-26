import { defineComponent } from "../define.ts";
import { SECTIONS } from "../../lib/sections.ts";

// Accordion: at most one section open at a time, the first open on load.
export const sections = defineComponent(() => ({
  openId: SECTIONS[0].id as string,
  isOpen(id: string): boolean {
    return this.openId === id;
  },
  toggle(id: string) {
    this.openId = this.openId === id ? "" : id;
  },
}));
