import { useEffect, useRef } from "preact/hooks";
import { useSignal } from "@preact/signals";

const PROSSIMA = {
  tema: "mito",
  date: "17–19 settembre 2027",
  città: "Modena · Carpi · Sassuolo",
};

const SITO = "https://www.festivalfilosofia.it/";

export default function FineFestivalModal() {
  const open = useSignal(true);
  const cardRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.style.overflow = open.value ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open.value]);

  useEffect(() => {
    if (!open.value) {
      document.body.focus();
      return;
    }

    closeRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        open.value = false;
        return;
      }
      if (e.key !== "Tab") return;

      const focusable = cardRef.current?.querySelectorAll<HTMLElement>(
        "button, a[href]",
      );
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open.value]);

  return (
    <div
      class={`ff-modal-overlay${open.value ? " open" : ""}`}
      aria-hidden={!open.value}
      onClick={() => {
        open.value = false;
      }}
    >
      <div
        ref={cardRef}
        class="ff-modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ff-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          class="ff-modal-close"
          type="button"
          onClick={() => {
            open.value = false;
          }}
          aria-label="Chiudi l'avviso"
        >
          <i class="ti ti-x" aria-hidden="true" />
        </button>

        <p class="ff-modal-eyebrow">edizione 2026 · conclusa</p>
        <h2 class="ff-modal-title" id="ff-modal-title">
          Ci vediamo l'anno prossimo
        </h2>
        <p class="ff-modal-body">
          Il festivalfilosofia 2026 su <em>caos</em> si è concluso il 20
          settembre. Grazie di aver camminato con noi tra Modena, Carpi e
          Sassuolo.
        </p>

        <div class="ff-modal-next">
          <p class="ff-modal-eyebrow">la prossima edizione</p>
          <p class="ff-modal-tema">{PROSSIMA.tema}</p>
          <p class="ff-modal-date">{PROSSIMA.date}</p>
          <p class="ff-modal-cities">{PROSSIMA.città}</p>
        </div>

        <div class="ff-modal-actions">
          <button
            class="ff-modal-btn"
            type="button"
            onClick={() => {
              open.value = false;
            }}
          >
            Chiudi
          </button>
          <a
            class="ff-modal-link"
            href={SITO}
            target="_blank"
            rel="noopener noreferrer"
          >
            Sito ufficiale
          </a>
        </div>
      </div>
    </div>
  );
}
