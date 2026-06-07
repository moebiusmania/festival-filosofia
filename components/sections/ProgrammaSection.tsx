import { useEffect, useState } from "preact/hooks";
import type { ComponentChildren } from "preact";

interface EventProps {
  id: string;
  time: string;
  place: string;
  speaker?: string;
  children: ComponentChildren;
  bookmarked: boolean;
  onToggle: (id: string) => void;
}

function Event({ id, time, place, speaker, children, bookmarked, onToggle }: EventProps) {
  return (
    <div
      class={`prog-event${bookmarked ? " prog-event--bookmarked" : ""}`}
      onClick={() => onToggle(id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onToggle(id); }}
      aria-pressed={bookmarked}
    >
      <div class="prog-time">{time}</div>
      <div class="prog-info">
        <div class="prog-title">{children}</div>
        {speaker && <div class="prog-speaker">{speaker}</div>}
        <div class="prog-place">{place}</div>
      </div>
      {bookmarked && (
        <i class="ti ti-bookmark-filled prog-bookmark-icon" aria-hidden="true" />
      )}
    </div>
  );
}

const STORAGE_KEY = "ff2026-bookmarks";

export default function ProgrammaSection() {
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setBookmarks(new Set(JSON.parse(saved)));
    } catch {}
  }, []);

  function toggle(id: string) {
    setBookmarks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      } catch {}
      return next;
    });
  }

  function event(id: string, time: string, place: string, speaker: string | undefined, children: ComponentChildren) {
    return (
      <Event id={id} time={time} place={place} speaker={speaker} bookmarked={bookmarks.has(id)} onToggle={toggle}>
        {children}
      </Event>
    );
  }

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

      <div class="prog-day">
        <div class="prog-day-header">Venerdì 18 settembre</div>
        {event("ven-10", "10:00", "Piazza Grande · Modena", undefined, "Apertura del festival")}
        {event("ven-11", "11:00", "Piazza Grande · Modena", "Massimo Cacciari", <em>Il caos come principio cosmologico</em>)}
        {event("ven-15", "15:00", "Piazza Martiri · Carpi", "Elena Castellucci", <em>Ordine e disordine nelle scienze naturali</em>)}
        {event("ven-21", "21:00", "Cortile Palazzo Ducale · Modena", undefined, <>Concerto filosofico: <em>Musica e caos</em></>)}
      </div>

      <div class="prog-day">
        <div class="prog-day-header">Sabato 19 settembre</div>
        {event("sab-10", "10:00", "Piazza Grande · Modena", "Barbara Carnevali", <em>Il caos nella politica contemporanea</em>)}
        {event("sab-14", "14:00", "Palazzo dei Musei · Modena", undefined, <>Laboratorio ragazzi: <em>Creare ordine dal caos</em></>)}
        {event("sab-17", "17:30", "Piazza Garibaldi · Sassuolo", "Daniele Francesconi", <em>Caos, caso e libertà</em>)}
        {event("sab-20", "20:30", "Ex-fonderia · Modena", undefined, <>Cena filosofica <em>(su prenotazione)</em></>)}
      </div>

      <div class="prog-day">
        <div class="prog-day-header">Domenica 20 settembre</div>
        {event("dom-10", "10:30", "Piazza Grande · Modena", "Michela Marzano", <em>Il caos digitale e l'intelligenza artificiale</em>)}
        {event("dom-15", "15:00", "Piazza Grande · Modena", "Stefano Massini", <em>Dal caos al cosmo — e ritorno</em>)}
        {event("dom-18", "18:00", "Piazza Grande · Modena", undefined, "Chiusura del festival")}
      </div>
    </>
  );
}
