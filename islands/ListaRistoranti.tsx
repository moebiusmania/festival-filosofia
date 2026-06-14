import { useEffect, useState } from "preact/hooks";

const LS_KEY = "ff2026-lista-ristoranti";

interface RistoItem {
  id: string;
  name: string;
  type: string;
  addr: string;
  when: string;
}

const EMPTY_FORM = { name: "", type: "", addr: "", when: "" };
type FormData = typeof EMPTY_FORM;

interface FormProps {
  initial: FormData;
  onSave: (data: FormData) => void;
  onCancel: () => void;
}

function RistoForm({ initial, onSave, onCancel }: FormProps) {
  const [form, setForm] = useState<FormData>({ ...initial });
  const [nameErr, setNameErr] = useState("");

  function field(key: keyof FormData) {
    return (e: Event) => {
      const value = (e.currentTarget as HTMLInputElement).value;
      setForm((prev) => ({ ...prev, [key]: value }));
      if (key === "name") setNameErr("");
    };
  }

  function handleSubmit(e: Event) {
    e.preventDefault();
    if (!form.name.trim()) {
      setNameErr("Il nome è obbligatorio.");
      return;
    }
    onSave(form);
  }

  return (
    <form class="hotel-form" onSubmit={handleSubmit} noValidate>
      <div class="hotel-form-group">
        <label class="hotel-form-label" for="rf-name">
          Nome{" "}
          <span class="hotel-form-required" aria-hidden="true">*</span>
        </label>
        <input
          id="rf-name"
          class={`hotel-form-input${nameErr ? " hotel-form-input--error" : ""}`}
          type="text"
          value={form.name}
          onInput={field("name")}
          placeholder="es. Trattoria da Enzo"
          aria-required="true"
        />
        {nameErr && (
          <span class="hotel-form-error" role="alert">{nameErr}</span>
        )}
      </div>

      <div class="hotel-form-group">
        <label class="hotel-form-label" for="rf-type">Tipo di cucina</label>
        <input
          id="rf-type"
          class="hotel-form-input"
          type="text"
          value={form.type}
          onInput={field("type")}
          placeholder="es. Emiliana tradizionale"
        />
      </div>

      <div class="hotel-form-group">
        <label class="hotel-form-label" for="rf-addr">Indirizzo</label>
        <input
          id="rf-addr"
          class="hotel-form-input"
          type="text"
          value={form.addr}
          onInput={field("addr")}
          placeholder="es. Via Coltellini 17, Modena"
        />
      </div>

      <div class="hotel-form-group">
        <label class="hotel-form-label" for="rf-when">Quando</label>
        <input
          id="rf-when"
          class="hotel-form-input"
          type="text"
          value={form.when}
          onInput={field("when")}
          placeholder="es. Venerdì sera · ore 20:00 · prenotato"
        />
      </div>

      <div class="hotel-form-actions">
        <button class="hotel-form-submit" type="submit">
          <i class="ti ti-check" aria-hidden="true" />
          Salva
        </button>
        <button class="lista-risto-cancel" type="button" onClick={onCancel}>
          Annulla
        </button>
      </div>
    </form>
  );
}

export default function ListaRistoranti() {
  const [items, setItems] = useState<RistoItem[]>([]);
  const [mode, setMode] = useState<"list" | "form">("list");
  const [editing, setEditing] = useState<RistoItem | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) setItems(JSON.parse(raw) as RistoItem[]);
    } catch { /* ignore */ }
  }, []);

  function persist(list: RistoItem[]) {
    setItems(list);
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(list));
    } catch { /* ignore */ }
  }

  function handleSave(data: FormData) {
    if (editing) {
      persist(items.map((i) => i.id === editing.id ? { ...i, ...data } : i));
    } else {
      persist([...items, { id: crypto.randomUUID(), ...data }]);
    }
    setMode("list");
    setEditing(null);
  }

  function handleDelete(id: string) {
    persist(items.filter((i) => i.id !== id));
  }

  function openEdit(item: RistoItem) {
    setEditing(item);
    setMode("form");
  }

  function openAdd() {
    setEditing(null);
    setMode("form");
  }

  function handleCancel() {
    setEditing(null);
    setMode("list");
  }

  if (mode === "form") {
    return (
      <>
        <p class="lista-risto-form-title">
          {editing ? "Modifica ristorante" : "Nuovo ristorante"}
        </p>
        <RistoForm
          initial={
            editing
              ? { name: editing.name, type: editing.type, addr: editing.addr, when: editing.when }
              : { ...EMPTY_FORM }
          }
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </>
    );
  }

  return (
    <>
      <button class="lista-risto-add" type="button" onClick={openAdd}>
        <i class="ti ti-plus" aria-hidden="true" />
        Aggiungi ristorante
      </button>

      {items.length === 0
        ? (
          <p class="lista-risto-empty">
            Nessun ristorante aggiunto ancora.
          </p>
        )
        : items.map((item, i) => (
          <div key={item.id} class="risto-item">
            <div class="risto-n">{String(i + 1).padStart(2, "0")}</div>
            <div class="risto-info">
              <div class="risto-name">{item.name}</div>
              {item.type && <div class="risto-type">{item.type}</div>}
              {item.addr && <div class="risto-addr">{item.addr}</div>}
              {item.when && <div class="risto-when">{item.when}</div>}
              <div class="lista-risto-actions">
                <button
                  class="lista-risto-btn lista-risto-btn--edit"
                  type="button"
                  onClick={() => openEdit(item)}
                  aria-label={`Modifica ${item.name}`}
                >
                  <i class="ti ti-edit" aria-hidden="true" />
                  Modifica
                </button>
                <button
                  class="lista-risto-btn lista-risto-btn--delete"
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  aria-label={`Elimina ${item.name}`}
                >
                  <i class="ti ti-trash" aria-hidden="true" />
                  Elimina
                </button>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
