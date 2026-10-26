import { defineComponent } from "../define.ts";
import { STORAGE_KEYS, readJSON } from "../../lib/storage.ts";

interface RistoEntry {
  name: string;
  type: string;
  addr: string;
  when: string;
}

// Shows the server-rendered sample list until the user has saved their own.
export const ristorantiSection = defineComponent(() => ({
  items: [] as RistoEntry[],
  isSample: true,
  init() {
    const saved = readJSON<RistoEntry[]>(STORAGE_KEYS.ristoranti);
    if (saved && saved.length > 0) {
      this.items = saved;
      this.isSample = false;
    }
  },
}));
