// Every key this app writes to localStorage. `/local-data` wipes all of them.
export const STORAGE_KEYS = {
  notes: "ff2026-notes",
  theme: "ff-theme",
  bookmarks: "ff2026-bookmarks",
  hotel: "ff2026-hotel",
  ristoranti: "ff2026-lista-ristoranti",
} as const;

// localStorage may be unavailable (private mode, blocked storage): every
// accessor swallows errors and falls back to "nothing saved".

export function readText(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeText(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch { /* ignore */ }
}

export function readJSON<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function writeJSON(key: string, value: unknown): void {
  writeText(key, JSON.stringify(value));
}

export function removeAll(): void {
  try {
    Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
  } catch { /* ignore */ }
}
