import { defineComponent } from "../define.ts";
import { STORAGE_KEYS, writeText } from "../../lib/storage.ts";
import { DEFAULT_DECOR, type DecorId } from "../../lib/decor.ts";

export const settings = defineComponent(() => ({
  decor: DEFAULT_DECOR as DecorId,
  init() {
    // The head script has already applied the saved choice.
    this.decor = (document.documentElement.dataset.decor as DecorId | undefined) ??
      DEFAULT_DECOR;
  },
  setDecor(id: DecorId) {
    this.decor = id;
    document.documentElement.dataset.decor = id;
    writeText(STORAGE_KEYS.decor, id);
  },
}));
