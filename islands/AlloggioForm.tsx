import { useEffect, useState } from "preact/hooks";

export const LS_KEY = "ff2026-hotel";

export interface HotelData {
  nome: string;
  indirizzo: string;
  checkin: string;
  checkout: string;
  ref: string;
  mapUrl: string;
  note: string;
}

export interface FormErrors {
  nome?: string;
  mapUrl?: string;
}

const EMPTY: HotelData = {
  nome: "",
  indirizzo: "",
  checkin: "",
  checkout: "",
  ref: "",
  mapUrl: "",
  note: "",
};

export function validateHotelForm(data: HotelData): FormErrors {
  const errors: FormErrors = {};
  if (!data.nome.trim()) {
    errors.nome = "Il nome dell'hotel è obbligatorio.";
  }
  if (data.mapUrl.trim()) {
    try {
      const url = new URL(data.mapUrl.trim());
      if (url.protocol !== "https:") {
        errors.mapUrl = "L'URL deve usare il protocollo https://.";
      }
    } catch {
      errors.mapUrl = "Inserisci un URL valido.";
    }
  }
  return errors;
}

export default function AlloggioForm() {
  const [form, setForm] = useState<HotelData>({ ...EMPTY });
  const [errors, setErrors] = useState<FormErrors>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) setForm(JSON.parse(raw) as HotelData);
    } catch { /* ignore */ }
  }, []);

  function handleSubmit(e: Event) {
    e.preventDefault();
    const errs = validateHotelForm(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(form));
    } catch { /* ignore */ }
    setSaved(true);
  }

  function field(key: keyof HotelData) {
    return (e: Event) => {
      setSaved(false);
      setForm((prev) => ({
        ...prev,
        [key]: (e.currentTarget as HTMLInputElement | HTMLTextAreaElement).value,
      }));
    };
  }

  return (
    <form class="hotel-form" onSubmit={handleSubmit} noValidate>
      <div class="hotel-form-group">
        <label class="hotel-form-label" for="hf-nome">
          Nome hotel{" "}
          <span class="hotel-form-required" aria-hidden="true">*</span>
        </label>
        <input
          id="hf-nome"
          class={`hotel-form-input${errors.nome ? " hotel-form-input--error" : ""}`}
          type="text"
          value={form.nome}
          onInput={field("nome")}
          placeholder="es. Hotel Canalgrande"
          aria-required="true"
          aria-describedby={errors.nome ? "hf-nome-err" : undefined}
        />
        {errors.nome && (
          <span id="hf-nome-err" class="hotel-form-error" role="alert">
            {errors.nome}
          </span>
        )}
      </div>

      <div class="hotel-form-group">
        <label class="hotel-form-label" for="hf-indirizzo">Indirizzo</label>
        <input
          id="hf-indirizzo"
          class="hotel-form-input"
          type="text"
          value={form.indirizzo}
          onInput={field("indirizzo")}
          placeholder="es. Corso Canalgrande 6, 41121 Modena"
        />
      </div>

      <div class="hotel-form-row">
        <div class="hotel-form-group">
          <label class="hotel-form-label" for="hf-checkin">Check-in</label>
          <input
            id="hf-checkin"
            class="hotel-form-input"
            type="text"
            value={form.checkin}
            onInput={field("checkin")}
            placeholder="es. 15:00"
          />
        </div>
        <div class="hotel-form-group">
          <label class="hotel-form-label" for="hf-checkout">Check-out</label>
          <input
            id="hf-checkout"
            class="hotel-form-input"
            type="text"
            value={form.checkout}
            onInput={field("checkout")}
            placeholder="es. 11:00"
          />
        </div>
      </div>

      <div class="hotel-form-group">
        <label class="hotel-form-label" for="hf-ref">
          Riferimento prenotazione
        </label>
        <input
          id="hf-ref"
          class="hotel-form-input"
          type="text"
          value={form.ref}
          onInput={field("ref")}
          placeholder="es. FF2026-GRP"
        />
      </div>

      <div class="hotel-form-group">
        <label class="hotel-form-label" for="hf-mapUrl">
          Link Google Maps embed
        </label>
        <input
          id="hf-mapUrl"
          class={`hotel-form-input${errors.mapUrl ? " hotel-form-input--error" : ""}`}
          type="url"
          value={form.mapUrl}
          onInput={field("mapUrl")}
          placeholder="https://www.google.com/maps/embed?pb=..."
          aria-describedby={errors.mapUrl
            ? "hf-mapUrl-err hf-mapUrl-hint"
            : "hf-mapUrl-hint"}
        />
        <span id="hf-mapUrl-hint" class="hotel-form-hint">
          Google Maps → Condividi → Incorpora una mappa → copia il{" "}
          <code>src</code> dell'iframe
        </span>
        {errors.mapUrl && (
          <span id="hf-mapUrl-err" class="hotel-form-error" role="alert">
            {errors.mapUrl}
          </span>
        )}
      </div>

      <div class="hotel-form-group">
        <label class="hotel-form-label" for="hf-note">Note libere</label>
        <textarea
          id="hf-note"
          class="hotel-form-textarea"
          value={form.note}
          onInput={field("note")}
          placeholder="Prenotazione di gruppo, parcheggio convenzionato..."
          rows={3}
        />
      </div>

      <div class="hotel-form-actions">
        <button class="hotel-form-submit" type="submit">
          <i class="ti ti-check" aria-hidden="true" />
          Salva
        </button>
        {saved && (
          <span class="hotel-form-saved" role="status">
            <i class="ti ti-circle-check" aria-hidden="true" />
            Salvato
          </span>
        )}
      </div>
    </form>
  );
}
