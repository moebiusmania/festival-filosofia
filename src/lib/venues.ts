import venues from "../data/venues.json";
import { EVENTS } from "./programma.ts";

export interface Venue {
  venue: string;
  city: string;
  lat: number;
  lng: number;
}

// Number of talks held at each venue (used for the popup badge).
export const COUNTS: Record<string, number> = {};
for (const e of EVENTS) COUNTS[e.venue] = (COUNTS[e.venue] ?? 0) + 1;

// Once the programme is out, only map venues hosting at least one talk;
// until then, show every known venue (they're largely the same each year).
export const MAPPED = EVENTS.length > 0
  ? (venues as Venue[]).filter((v) => (COUNTS[v.venue] ?? 0) > 0)
  : (venues as Venue[]);

// City filter options, in the same order used elsewhere in the app.
export const MAP_FILTERS = [
  { value: "all", label: "Tutte" },
  { value: "Modena", label: "Modena" },
  { value: "Carpi", label: "Carpi" },
  { value: "Sassuolo", label: "Sassuolo" },
];
