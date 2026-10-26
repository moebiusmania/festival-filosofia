import { defineComponent } from "../define.ts";
import { STORAGE_KEYS, readJSON, writeJSON } from "../../lib/storage.ts";

interface RistoItem {
  id: string;
  name: string;
  type: string;
  addr: string;
  when: string;
}

const EMPTY_FORM = { name: "", type: "", addr: "", when: "" };
type FormData = typeof EMPTY_FORM;

export const listaRistoranti = defineComponent(() => ({
  items: [] as RistoItem[],
  mode: "list" as "list" | "form",
  editingId: null as string | null,
  form: { ...EMPTY_FORM } as FormData,
  nameErr: "",
  init() {
    this.items = readJSON<RistoItem[]>(STORAGE_KEYS.ristoranti) ?? [];
  },
  persist(list: RistoItem[]) {
    this.items = list;
    writeJSON(STORAGE_KEYS.ristoranti, list);
  },
  num(i: number): string {
    return String(i + 1).padStart(2, "0");
  },
  openAdd() {
    this.editingId = null;
    this.form = { ...EMPTY_FORM };
    this.nameErr = "";
    this.mode = "form";
  },
  openEdit(item: RistoItem) {
    this.editingId = item.id;
    this.form = { name: item.name, type: item.type, addr: item.addr, when: item.when };
    this.nameErr = "";
    this.mode = "form";
  },
  cancel() {
    this.editingId = null;
    this.mode = "list";
  },
  remove(id: string) {
    this.persist(this.items.filter((i) => i.id !== id));
  },
  save() {
    if (!this.form.name.trim()) {
      this.nameErr = "Il nome è obbligatorio.";
      return;
    }
    const data = { ...this.form };
    if (this.editingId) {
      this.persist(
        this.items.map((i) => i.id === this.editingId ? { ...i, ...data } : i),
      );
    } else {
      this.persist([...this.items, { id: crypto.randomUUID(), ...data }]);
    }
    this.cancel();
  },
}));
