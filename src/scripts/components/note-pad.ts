import { defineComponent } from "../define.ts";
import { STORAGE_KEYS, readText, writeText } from "../../lib/storage.ts";

export const notePad = defineComponent(() => ({
  value: "",
  init() {
    this.value = readText(STORAGE_KEYS.notes) ?? "";
  },
  save() {
    writeText(STORAGE_KEYS.notes, this.value);
  },
}));
