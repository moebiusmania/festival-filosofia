// Prefixes an app path with the configured `base` (the site is served from a
// sub-path on GitHub Pages). Works both at build time and in client bundles.
export function url(path = ""): string {
  const base = import.meta.env.BASE_URL.replace(/\/?$/, "/");
  return base + path.replace(/^\//, "");
}
