import { experimental_AstroContainer as AstroContainer } from "astro/container";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import astroConfig from "../astro.config.mjs";

const container = await AstroContainer.create({
  astroConfig: { base: astroConfig.base },
});

export function render(
  component: AstroComponentFactory,
  props: Record<string, unknown> = {},
): Promise<string> {
  return container.renderToString(component, { props });
}
