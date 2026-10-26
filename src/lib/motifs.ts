// Build-time generators for the decorative motifs: the constellation of Orion
// ("mito", 2027) and the Lorenz attractor ("caos", 2026), plus the particles
// and letter scatter. Everything is deterministic, so the markup is identical
// on every build.

/**
 * SVG path data for a Lorenz attractor (the "butterfly" of chaos theory),
 * projected on the x/z plane and fitted into a `size`×`size` viewBox.
 * The trajectory is integrated finely, then resampled to points `spacing`
 * viewBox units apart, so fast outer loops are as smooth as slow spirals.
 */
export function lorenzPath(size = 100, spacing = 1.5, duration = 20): string {
  const sigma = 10, rho = 28, beta = 8 / 3, dt = 0.002;
  const transient = 2500, steps = transient + Math.round(duration / dt);
  let x = 1, y = 1, z = 1;
  const raw: [number, number][] = [];
  for (let i = 0; i < steps; i++) {
    const dx = sigma * (y - x);
    const dy = x * (rho - z) - y;
    const dz = x * y - beta * z;
    x += dx * dt;
    y += dy * dt;
    z += dz * dt;
    // Skip the initial transient so the curve starts on the attractor.
    if (i >= transient) raw.push([x, z]);
  }

  const xs = raw.map((p) => p[0]), zs = raw.map((p) => p[1]);
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const minZ = Math.min(...zs), maxZ = Math.max(...zs);
  const scale = (size * 0.94) / Math.max(maxX - minX, maxZ - minZ);
  const offX = (size - (maxX - minX) * scale) / 2;
  const offZ = (size - (maxZ - minZ) * scale) / 2;
  // Flip z so the "wings" open upwards.
  const projected = raw.map(([px, pz]): [number, number] => [
    (px - minX) * scale + offX,
    size - ((pz - minZ) * scale + offZ),
  ]);

  const pts = [projected[0]];
  for (const p of projected) {
    const last = pts[pts.length - 1];
    if (Math.hypot(p[0] - last[0], p[1] - last[1]) >= spacing) pts.push(p);
  }

  return pts
    .map(([sx, sy], i) => `${i === 0 ? "M" : "L"}${sx.toFixed(1)} ${sy.toFixed(1)}`)
    .join("");
}

/**
 * The constellation of Orion, the hunter set among the stars ("mito"), in a
 * 0–100 viewBox (y down). Positions approximate the real figure; `r` grows
 * with brightness. `lines` is one path: its strokes draw in sequence.
 */
const ORION_STARS: Record<string, [x: number, y: number, r: number]> = {
  meissa: [50, 10, 1.6],
  betelgeuse: [28, 24, 3.2],
  bellatrix: [70, 28, 2.4],
  alnitak: [41, 54, 2.2],
  alnilam: [50, 51, 2.3],
  mintaka: [58, 48, 2.1],
  saiph: [33, 88, 2.2],
  rigel: [76, 84, 3],
  club1: [16, 8, 1.3],
  club2: [12, 18, 1.2],
  shield1: [86, 18, 1.2],
  shield2: [90, 30, 1.3],
  shield3: [87, 42, 1.2],
};

const ORION_LINES: [string, string][] = [
  ["meissa", "betelgeuse"], ["meissa", "bellatrix"],
  ["betelgeuse", "alnitak"], ["bellatrix", "mintaka"],
  ["alnitak", "alnilam"], ["alnilam", "mintaka"],
  ["alnitak", "saiph"], ["mintaka", "rigel"],
  ["betelgeuse", "club2"], ["club2", "club1"],
  ["bellatrix", "shield2"], ["shield1", "shield2"], ["shield2", "shield3"],
];

export interface Star {
  x: number;
  y: number;
  r: number;
  delay: number; // twinkle offset, seconds
}

export function orion(): { lines: string; stars: Star[] } {
  const rand = seeded(31);
  return {
    lines: ORION_LINES.map(([a, b]) => {
      const [x1, y1] = ORION_STARS[a], [x2, y2] = ORION_STARS[b];
      return `M${x1} ${y1}L${x2} ${y2}`;
    }).join(""),
    stars: Object.values(ORION_STARS).map(([x, y, r]) => ({
      x,
      y,
      r,
      delay: -rand() * 3,
    })),
  };
}

/** Small seeded PRNG (mulberry32) for reproducible scatter. */
export function seeded(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface Particle {
  x: number; // 0–100, percent of the field width
  y: number; // 0–100, percent of the field height
  r: number; // radius in px
  red: boolean;
  delay: number; // seconds
  duration: number; // seconds
  dx: number; // drift in px
  dy: number;
}

/** A field of drifting particles; roughly one in six is red. */
export function particles(count: number, seed: number): Particle[] {
  const rand = seeded(seed);
  return Array.from({ length: count }, () => ({
    x: rand() * 100,
    y: rand() * 100,
    r: 0.8 + rand() * 1.6,
    red: rand() < 0.17,
    delay: -rand() * 12,
    duration: 9 + rand() * 9,
    dx: (rand() - 0.5) * 28,
    dy: (rand() - 0.5) * 20,
  }));
}

export interface ScatteredLetter {
  char: string;
  dx: number; // px
  dy: number; // px
  rot: number; // deg
}

/** Letters of `word`, each with a random start offset for the intro. */
export function scatter(word: string, seed: number): ScatteredLetter[] {
  const rand = seeded(seed);
  return [...word].map((char) => ({
    char,
    dx: Math.round((rand() - 0.5) * 80),
    dy: Math.round((rand() - 0.5) * 50),
    rot: Math.round((rand() - 0.5) * 70),
  }));
}
