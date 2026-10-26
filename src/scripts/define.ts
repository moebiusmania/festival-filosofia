import type { AlpineComponent } from "alpinejs";

// Identity helper: gives a component factory defined outside `Alpine.data()`
// the same contextual typing for `this` (state + $refs/$watch/… magics).
export function defineComponent<T, A extends unknown[]>(
  factory: (...args: A) => AlpineComponent<T>,
) {
  return factory;
}
