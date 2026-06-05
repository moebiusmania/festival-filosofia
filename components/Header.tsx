export default function Header() {
  return (
    <header class="ff-header">
      <div class="ff-header-top">
        <div class="edition-tag">XXVI edizione · companion app</div>
        <button
          class="ff-theme-btn"
          id="ff-theme-btn"
          type="button"
          aria-label="Passa al tema scuro"
        >
          <i class="ti ti-moon" aria-hidden="true" />
        </button>
      </div>
      <h1 class="logo-line">
        festival<em>filosofia</em>
      </h1>
      <div class="theme-block">
        <span class="theme-label">tema</span>
        <span class="theme-word">caos</span>
      </div>
      <div class="dates">
        18 · 19 · 20 settembre 2026 &emsp; Modena · Carpi · Sassuolo
      </div>
    </header>
  );
}
