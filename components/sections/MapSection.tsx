import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import type { Map as LeafletMap } from "leaflet";
import programma from "../../data/programma.json" with { type: "json" };
import venues from "../../data/venues.json" with { type: "json" };

interface ProgEvent {
  venue: string;
  city: string;
}

interface Venue {
  venue: string;
  city: string;
  lat: number;
  lng: number;
}

const EVENTS = programma as ProgEvent[];
const VENUES = venues as Venue[];

// Number of talks held at each venue (used for the popup badge).
const COUNTS: Record<string, number> = {};
for (const e of EVENTS) COUNTS[e.venue] = (COUNTS[e.venue] ?? 0) + 1;

// Only map venues that actually host at least one talk.
const MAPPED = VENUES.filter((v) => (COUNTS[v.venue] ?? 0) > 0);

// City filter options, in the same order used elsewhere in the app.
const FILTERS = [
  { value: "all", label: "Tutte" },
  { value: "Modena", label: "Modena" },
  { value: "Carpi", label: "Carpi" },
  { value: "Sassuolo", label: "Sassuolo" },
];

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

export default function MapSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const [active, setActive] = useState("all");
  const [ready, setReady] = useState(false);

  // Recompute counts once for the legend line under the filter.
  const total = useMemo(() => MAPPED.length, []);

  // Initialise the Leaflet map on the client only. Leaflet touches `window`
  // on import, so it must be loaded dynamically inside the effect (never at
  // module top level) to keep server-side rendering working.
  useEffect(() => {
    let map: LeafletMap | undefined;
    let observer: ResizeObserver | undefined;
    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;
      const el = containerRef.current;
      if (cancelled || !el) return;

      // An initial center/zoom must be set before adding any layer, otherwise
      // Leaflet throws "Set map center and zoom first." The real view is set by
      // the fit effect once the container has a size. This center roughly spans
      // the three towns (Modena · Carpi · Sassuolo).
      map = L.map(el, { scrollWheelZoom: false, center: [44.65, 10.87], zoom: 10 });
      mapRef.current = map;

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
      // yet. A ResizeObserver lets us fix the map once it becomes visible and
      // keep it correct through the accordion open/close animation.
      observer = new ResizeObserver(() => {
        if (!map) return;
        map.invalidateSize();
        if (!cancelled && el.clientHeight > 0 && el.clientWidth > 0) {
          setReady(true);
        }
      });
      observer.observe(el);
    })();

    return () => {
      cancelled = true;
      observer?.disconnect();
      map?.remove();
      mapRef.current = null;
    };
  }, []);

  // Fit the view to the active city (or all venues) once the map is sized and
  // whenever the filter changes.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;
    const pts = pointsFor(active);
    if (pts.length === 0) return;
    if (pts.length === 1) {
      map.setView(pts[0], 16);
    } else {
      map.flyToBounds(pts, { padding: [32, 32], maxZoom: 16 });
    }
  }, [active, ready]);

  return (
    <>
      <div class="ff-map-filter" role="group" aria-label="Filtra per città">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            class={`ff-map-filter-btn${active === f.value ? " active" : ""}`}
            onClick={() => setActive(f.value)}
            aria-pressed={active === f.value}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div ref={containerRef} class="ff-map" aria-label="Mappa delle sedi" />
      <p class="ff-map-note">
        <i class="ti ti-map-pin" aria-hidden="true" /> {total}{" "}
        sedi · tocca un segnaposto per indicazioni
      </p>
    </>
  );
}
