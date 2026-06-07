import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";

const MENU_ITEMS = [
  { label: "Alloggio", sectionId: "hotel" },
  { label: "Lista ristoranti", sectionId: "ristoranti" },
  { label: "Come funziona", sectionId: "info" },
];

export default function NavMenu() {
  const open = useSignal(false);
  const dark = useSignal(false);

  useEffect(() => {
    dark.value =
      document.documentElement.getAttribute("data-theme") === "dark";
  }, []);

  useEffect(() => {
    document.body.style.overflow = open.value ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open.value]);

  function toggleTheme() {
    const next = !dark.value;
    dark.value = next;
    document.documentElement.setAttribute(
      "data-theme",
      next ? "dark" : "light",
    );
    try {
      localStorage.setItem("ff-theme", next ? "dark" : "light");
    } catch (_) { /* ignore */ }
  }

  function goTo(sectionId: string) {
    open.value = false;
    setTimeout(() => {
      const section = document.querySelector(`[data-id="${sectionId}"]`);
      if (!section) return;
      if (!section.classList.contains("open")) {
        (
          section.querySelector(".ff-section-header") as HTMLButtonElement | null
        )?.click();
      }
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
  }

  return (
    <>
      <div class="ff-nav-controls">
        <button
          class="ff-theme-btn"
          type="button"
          onClick={toggleTheme}
          aria-label={dark.value ? "Passa al tema chiaro" : "Passa al tema scuro"}
        >
          <i class={`ti ${dark.value ? "ti-sun" : "ti-moon"}`} aria-hidden="true" />
        </button>
        <button
          class={`ff-nav-btn${open.value ? " open" : ""}`}
          type="button"
          onClick={() => { open.value = !open.value; }}
          aria-label={open.value ? "Chiudi menu" : "Apri menu"}
          aria-expanded={open.value}
        >
          <span class="ff-nav-burger" aria-hidden="true">
            <span class="ff-nav-line" />
            <span class="ff-nav-line" />
          </span>
        </button>
      </div>

      <div
        class={`ff-nav-overlay${open.value ? " open" : ""}`}
        aria-hidden={!open.value}
        onClick={() => { open.value = false; }}
      >
        <nav class="ff-nav-menu">
          {MENU_ITEMS.map(({ label, sectionId }) => (
            <button
              key={sectionId}
              class="ff-nav-item"
              type="button"
              onClick={(e) => { e.stopPropagation(); goTo(sectionId); }}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
