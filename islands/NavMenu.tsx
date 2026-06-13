import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";

const MENU_ITEMS: Array<{ label: string; href: string }> = [
  { label: "Come funziona", href: "/info" },
  { label: "Alloggio", href: "/hotel" },
  { label: "Lista ristoranti", href: "/ristoranti" },
  { label: "Dati locali", href: "/local-data" },
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

  function goHome() {
    open.value = false;
    setTimeout(() => {
      if (window.location.pathname !== "/") {
        window.location.href = "/";
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
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
        <div class="ff-nav-title" aria-hidden="true">
          festival<em>filosofia</em>
        </div>
        <nav class="ff-nav-menu">
          <button
            class="ff-nav-item"
            type="button"
            onClick={(e) => { e.stopPropagation(); goHome(); }}
          >
            Torna all'inizio
          </button>
          {MENU_ITEMS.map(({ label, href }) => (
            <button
              key={href}
              class="ff-nav-item"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                open.value = false;
                window.location.href = href;
              }}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
