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

// Only map venues that actually host at least one talk.
export const MAPPED = (venues as Venue[]).filter((v) => (COUNTS[v.venue] ?? 0) > 0);

// City filter options, in the same order used elsewhere in the app.
export const MAP_FILTERS = [
  { value: "all", label: "Tutte" },
  { value: "Modena", label: "Modena" },
  { value: "Carpi", label: "Carpi" },
  { value: "Sassuolo", label: "Sassuolo" },
];
