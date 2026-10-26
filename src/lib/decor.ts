// Decorative motifs, one per festival edition. The first is the default.
export const DECORS = [
  { id: "mito", year: 2027, motif: "La costellazione di Orione" },
  { id: "caos", year: 2026, motif: "L'attrattore di Lorenz" },
] as const;

export type DecorId = (typeof DECORS)[number]["id"];

export const DEFAULT_DECOR: DecorId = DECORS[0].id;
