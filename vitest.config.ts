/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";
import astroConfig from "./astro.config.mjs";

export default getViteConfig({
  test: {
    include: ["tests/**/*.test.ts"],
    // Vitest sets import.meta.env.BASE_URL itself, ignoring Astro's `base`.
    env: { BASE_URL: astroConfig.base ?? "/" },
  },
});
