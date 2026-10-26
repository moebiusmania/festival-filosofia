import { defineComponent } from "../define.ts";
import { STORAGE_KEYS, readJSON, writeJSON } from "../../lib/storage.ts";
import { EVENTS } from "../../lib/programma.ts";

export const programma = defineComponent(() => ({
  bookmarks: [] as string[],
  dayFilter: "all",
  cityFilter: "all",
  init() {
    this.bookmarks = readJSON<string[]>(STORAGE_KEYS.bookmarks) ?? [];
  },
  isBookmarked(id: string): boolean {
    return this.bookmarks.includes(id);
  },
  toggle(id: string) {
    this.bookmarks = this.isBookmarked(id)
      ? this.bookmarks.filter((b) => b !== id)
      : [...this.bookmarks, id];
    writeJSON(STORAGE_KEYS.bookmarks, this.bookmarks);
  },
  matches(day: string, city: string): boolean {
    return (this.dayFilter === "all" || this.dayFilter === day) &&
      (this.cityFilter === "all" || this.cityFilter === city);
  },
  dayVisible(day: string): boolean {
    return EVENTS.some((e) => e.day === day && this.matches(e.day, e.city));
  },
  get noneVisible(): boolean {
    return !EVENTS.some((e) => this.matches(e.day, e.city));
  },
}));
