import programma from "../data/programma.json";

export interface ProgEvent {
  id: string;
  day: string;
  time: string;
  city: string;
  venue: string;
  speaker?: string;
  title: string;
  category: string;
}

export const EVENTS = programma as ProgEvent[];

// Day codes in chronological order, with their display labels. Only days that
// actually appear in the data are kept.
export const DAYS = [
  { code: "ven", label: "Venerdì 18" },
  { code: "sab", label: "Sabato 19" },
  { code: "dom", label: "Domenica 20" },
].filter((d) => EVENTS.some((e) => e.day === d.code));

// Location filter options, in preferred display order, limited to the data.
export const CITIES = ["Modena", "Carpi", "Sassuolo"].filter((c) =>
  EVENTS.some((e) => e.city === c)
);
