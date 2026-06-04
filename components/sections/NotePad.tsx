import { useEffect, useState } from "preact/hooks";

export default function NotePad() {
  const [value, setValue] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("ff2026-notes");
      if (saved) setValue(saved);
    } catch {}
  }, []);

  function handleInput(e: Event) {
    const v = (e.target as HTMLTextAreaElement).value;
    setValue(v);
    try {
      localStorage.setItem("ff2026-notes", v);
    } catch {}
  }

  return (
    <>
      <div class="notepad-wrap">
        <div class="notepad-top">
          <label for="ff-notes">Il mio taccuino</label>
          <div class="notepad-rings">
            <div class="notepad-ring" aria-hidden="true"></div>
            <div class="notepad-ring" aria-hidden="true"></div>
            <div class="notepad-ring" aria-hidden="true"></div>
          </div>
        </div>
        <div class="notepad-inner">
          <div class="notepad-lines-bg"></div>
          <div class="notepad-margin-line"></div>
          <textarea
            id="ff-notes"
            value={value}
            onInput={handleInput}
            placeholder="Scrivi qui le tue note, riflessioni, citazioni dalle lezioni..."
            aria-label="Note personali"
          />
        </div>
      </div>
      <p class="ff-note-disclaimer">
        Le note vengono salvate localmente sul dispositivo
      </p>
    </>
  );
}
