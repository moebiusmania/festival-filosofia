import NavMenu from "../islands/NavMenu.tsx";

export default function Header() {
  return (
    <header class="ff-header">
      <div class="ff-header-top">
        <div class="edition-tag">XXVI edizione · companion app</div>
        <NavMenu />
      </div>
      <h1 class="logo-line">
        <a href="/" class="logo-link">festival<em>filosofia</em></a>
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
