import type { Map as LeafletMap } from "leaflet";
import { defineComponent } from "../define.ts";
import { COUNTS, MAPPED, type Venue } from "../../lib/venues.ts";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function popupHtml(v: Venue): string {
  const n = COUNTS[v.venue] ?? 0;
  const events = `${n} ${n === 1 ? "evento" : "eventi"}`;
  const dir =
    `https://www.google.com/maps/dir/?api=1&destination=${v.lat},${v.lng}`;
  return `<div class="ff-map-popup">
    <strong>${escapeHtml(v.venue)}</strong>
    <span>${escapeHtml(v.city)} · ${events}</span>
    <a href="${dir}" target="_blank" rel="noopener">Apri in Maps →</a>
  </div>`;
}

function pointsFor(active: string): [number, number][] {
  const list = active === "all"
    ? MAPPED
    : MAPPED.filter((v) => v.city === active);
  return list.map((v) => [v.lat, v.lng]);
}

export const mapSection = defineComponent(() => {
  // Leaflet objects live outside Alpine's reactive state: proxying them breaks
  // Leaflet's internal identity checks.
  let map: LeafletMap | undefined;
  let observer: ResizeObserver | undefined;

  return {
    active: "all",
    ready: false,
    async init() {
      // Loaded lazily so Leaflet only ships in its own chunk.
      const L = (await import("leaflet")).default;
      const el = this.$refs.map as HTMLElement;

      // An initial center/zoom must be set before adding any layer, otherwise
      // Leaflet throws "Set map center and zoom first." The real view is set by
      // fit() once the container has a size. This center roughly spans the
      // three towns (Modena · Carpi · Sassuolo).
      map = L.map(el, { scrollWheelZoom: false, center: [44.65, 10.87], zoom: 10 });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      for (const v of MAPPED) {
        const icon = L.divIcon({
          className: "ff-map-pin-wrap",
          html:
            `<svg class="ff-map-pin ff-map-pin--${v.city.toLowerCase()}" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>`,
          iconSize: [30, 30],
          iconAnchor: [15, 29],
          popupAnchor: [0, -27],
        });
        L.marker([v.lat, v.lng], { icon, title: v.venue })
          .addTo(map)
          .bindPopup(popupHtml(v));
      }

      // The section is collapsed at first paint, so the container has no size
      // yet. A ResizeObserver fixes the map once it becomes visible and keeps
      // it correct through the accordion open/close animation.
      observer = new ResizeObserver(() => {
        map?.invalidateSize();
        if (!this.ready && el.clientHeight > 0 && el.clientWidth > 0) {
          this.ready = true;
          this.fit();
        }
      });
      observer.observe(el);

      this.$watch("active", () => this.fit());
    },
    destroy() {
      observer?.disconnect();
      map?.remove();
    },
    // Fit the view to the active city (or all venues) once the map is sized.
    fit() {
      if (!map || !this.ready) return;
      const pts = pointsFor(this.active);
      if (pts.length === 0) return;
      if (pts.length === 1) {
        map.setView(pts[0], 16);
      } else {
        map.flyToBounds(pts, { padding: [32, 32], maxZoom: 16 });
      }
    },
  };
});
