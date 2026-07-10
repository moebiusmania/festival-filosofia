import { useEffect, useMemo, useState } from "preact/hooks";
import programma from "../../data/programma.json" with { type: "json" };

interface ProgEvent {
  id: string;
  day: string;
  time: string;
  city: string;
  venue: string;
  speaker?: string;
  title: string;
  category: string;
}

const EVENTS = programma as ProgEvent[];

// Day codes in chronological order, with their display labels.
const DAYS = [
  { code: "ven", label: "Venerdì 18" },
  { code: "sab", label: "Sabato 19" },
  { code: "dom", label: "Domenica 20" },
];

// Preferred display order for the location filter.
const CITY_ORDER = ["Modena", "Carpi", "Sassuolo"];

const STORAGE_KEY = "ff2026-bookmarks";

interface EventProps {
  event: ProgEvent;
  bookmarked: boolean;
  onToggle: (id: string) => void;
}

function Event({ event, bookmarked, onToggle }: EventProps) {
  return (
    <div
      class={`prog-event${bookmarked ? " prog-event--bookmarked" : ""}`}
      onClick={() => onToggle(event.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onToggle(event.id);
      }}
      aria-pressed={bookmarked}
    >
      <div class="prog-time">{event.time}</div>
      <div class="prog-info">
        <div class="prog-category">{event.category}</div>
        <div class="prog-title">{event.title}</div>
        {event.speaker && <div class="prog-speaker">{event.speaker}</div>}
        <div class="prog-place">{event.venue} · {event.city}</div>
      </div>
      {bookmarked && (
        <svg class="prog-bookmark-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 2H6a2 2 0 0 0-2 2v18l8-4 8 4V4a2 2 0 0 0-2-2z" />
        </svg>
      )}
    </div>
  );
}

export default function ProgrammaSection() {
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
  const [dayFilter, setDayFilter] = useState<string>("all");
  const [cityFilter, setCityFilter] = useState<string>("all");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setBookmarks(new Set(JSON.parse(saved)));
    } catch { /* ignore */ }
  }, []);

  function toggle(id: string) {
    setBookmarks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      } catch { /* ignore */ }
      return next;
    });
  }

  // Only surface filter options that actually appear in the data.
  const days = useMemo(
    () => DAYS.filter((d) => EVENTS.some((e) => e.day === d.code)),
    [],
  );
  const cities = useMemo(() => {
    const present = new Set(EVENTS.map((e) => e.city));
    return CITY_ORDER.filter((c) => present.has(c));
  }, []);

  const visible = useMemo(
    () =>
      EVENTS.filter(
        (e) =>
          (dayFilter === "all" || e.day === dayFilter) &&
          (cityFilter === "all" || e.city === cityFilter),
      ),
    [dayFilter, cityFilter],
  );

  return (
    <>
      <p class="prog-disclaimer">
        Programma indicativo — soggetto a variazioni
      </p>
      <p class="prog-bookmark-hint">
        Tocca un evento per salvarlo con il segnalibro{" "}
        <i class="ti ti-bookmark-filled" aria-hidden="true" />
        {" "}— tocca di nuovo per rimuoverlo.
      </p>

      <div class="prog-filters">
        <div class="prog-filter-group" role="group" aria-label="Filtra per giorno">
          <button
            type="button"
            class={`prog-filter${dayFilter === "all" ? " prog-filter--active" : ""}`}
            aria-pressed={dayFilter === "all"}
            onClick={() => setDayFilter("all")}
          >
            Tutti i giorni
          </button>
          {days.map((d) => (
            <button
              key={d.code}
              type="button"
              class={`prog-filter${dayFilter === d.code ? " prog-filter--active" : ""}`}
              aria-pressed={dayFilter === d.code}
              onClick={() => setDayFilter(d.code)}
            >
              {d.label}
            </button>
          ))}
        </div>

        <div class="prog-filter-group" role="group" aria-label="Filtra per luogo">
          <button
            type="button"
            class={`prog-filter${cityFilter === "all" ? " prog-filter--active" : ""}`}
            aria-pressed={cityFilter === "all"}
            onClick={() => setCityFilter("all")}
          >
            Tutte le sedi
          </button>
          {cities.map((c) => (
            <button
              key={c}
              type="button"
              class={`prog-filter${cityFilter === c ? " prog-filter--active" : ""}`}
              aria-pressed={cityFilter === c}
              onClick={() => setCityFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {days
        .filter((d) => visible.some((e) => e.day === d.code))
        .map((d) => (
          <div class="prog-day" key={d.code}>
            <div class="prog-day-header">{d.label} settembre</div>
            {visible
              .filter((e) => e.day === d.code)
              .map((e) => (
                <Event
                  key={e.id}
                  event={e}
                  bookmarked={bookmarks.has(e.id)}
                  onToggle={toggle}
                />
              ))}
          </div>
        ))}

      {visible.length === 0 && (
        <p class="prog-empty">Nessun evento per i filtri selezionati.</p>
      )}
    </>
  );
}
