import { useState } from "preact/hooks";

const LOCAL_KEYS = ["ff2026-notes", "ff-theme", "ff2026-bookmarks"];

export default function DatiLocali() {
  const [deleted, setDeleted] = useState(false);

  function handleDelete() {
    if (
      !confirm(
        "Cancellare tutti i dati salvati localmente?\nQuesta azione è irreversibile.",
      )
    ) return;
    try {
      LOCAL_KEYS.forEach((k) => localStorage.removeItem(k));
    } catch { /* ignore */ }
    setDeleted(true);
  }

  return (
    <div class="dati-locali-actions">
      {deleted
        ? <p class="dati-locali-done">Dati eliminati.</p>
        : (
          <button
            class="dati-locali-delete-btn"
            type="button"
            onClick={handleDelete}
          >
            <i class="ti ti-trash" aria-hidden="true" />
            Cancella tutti i dati locali
          </button>
        )}
    </div>
  );
}
