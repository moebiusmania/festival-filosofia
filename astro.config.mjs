// @ts-check
import { defineConfig } from "astro/config";
import alpinejs from "@astrojs/alpinejs";

export default defineConfig({
  output: "static",
  // Deployed to GitHub Pages under a project sub-path. Internal links go
  // through `url()` in src/lib/url.ts so they pick this up.
  base: "/festival-filosofia/",
  // Emit `hotel.html` rather than `hotel/index.html` so pages keep their
  // slash-less URLs (…/hotel, …/ristoranti); GitHub Pages resolves
  // `/hotel` to `hotel.html`.
  build: { format: "file" },
  integrations: [alpinejs({ entrypoint: "/src/scripts/alpine.ts" })],
  server: {
    port: 3000,
    // Listen on all interfaces so the dev server is reachable from the LAN.
    host: true,
  },
});
