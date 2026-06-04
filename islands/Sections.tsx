import { useSignal } from "@preact/signals";
import type { ComponentType } from "preact";
import InfoSection from "../components/sections/InfoSection.tsx";
import MapSection from "../components/sections/MapSection.tsx";
import ProgrammaSection from "../components/sections/ProgrammaSection.tsx";
import HotelSection from "../components/sections/HotelSection.tsx";
import RistorantiSection from "../components/sections/RistorantiSection.tsx";
import NotePad from "../components/sections/NotePad.tsx";

interface SectionDef {
  id: string;
  num: string;
  title: string;
  Content: ComponentType;
}

const SECTIONS: SectionDef[] = [
  { id: "info", num: "01", title: "Info rapide", Content: InfoSection },
  { id: "mappa", num: "02", title: "Mappa dell'evento", Content: MapSection },
  { id: "programma", num: "03", title: "Programma", Content: ProgrammaSection },
  { id: "hotel", num: "04", title: "Dove alloggiamo", Content: HotelSection },
  { id: "ristoranti", num: "05", title: "I nostri ristoranti", Content: RistorantiSection },
  { id: "note", num: "06", title: "Note", Content: NotePad },
];

export default function Sections() {
  const openId = useSignal("info");

  return (
    <main class="ff-sections" id="sections">
      {SECTIONS.map(({ id, num, title, Content }) => {
        const isOpen = openId.value === id;
        return (
          <section
            key={id}
            class={`ff-section${isOpen ? " open" : ""}`}
            data-id={id}
          >
            <button
              class="ff-section-header"
              type="button"
              onClick={() => {
                openId.value = isOpen ? "" : id;
              }}
              aria-expanded={isOpen}
              aria-controls={`section-${id}`}
            >
              <span class="ff-section-num">{num}</span>
              <span class="ff-section-title">{title}</span>
              <i class="ti ti-chevron-down ff-section-arrow" aria-hidden="true">
              </i>
            </button>
            <div class="ff-section-body" id={`section-${id}`}>
              <Content />
            </div>
          </section>
        );
      })}
    </main>
  );
}
