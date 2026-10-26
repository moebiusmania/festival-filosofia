import { defineComponent } from "../define.ts";
import { removeAll } from "../../lib/storage.ts";

export const datiLocali = defineComponent(() => ({
  deleted: false,
  remove() {
    if (
      !confirm(
        "Cancellare tutti i dati salvati localmente?\nQuesta azione è irreversibile.",
      )
    ) return;
    removeAll();
    this.deleted = true;
  },
}));
