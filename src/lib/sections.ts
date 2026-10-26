// Accordion sections on the home page, in display order. The first one is
// open on load. Each id maps to a component in `components/Sections.astro`.
export const SECTIONS = [
  { id: "info", num: "01", title: "Info rapide" },
  { id: "mappa", num: "02", title: "Mappa dell'evento" },
  { id: "programma", num: "03", title: "Programma" },
  { id: "hotel", num: "04", title: "Dove alloggiamo" },
  { id: "ristoranti", num: "05", title: "I nostri ristoranti" },
  { id: "note", num: "06", title: "Note" },
] as const;
