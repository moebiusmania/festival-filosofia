import type { ComponentChildren } from "preact";

interface EventProps {
  time: string;
  place: string;
  speaker?: string;
  children: ComponentChildren;
}

function Event({ time, place, speaker, children }: EventProps) {
  return (
    <div class="prog-event">
      <div class="prog-time">{time}</div>
      <div class="prog-info">
        <div class="prog-title">{children}</div>
        {speaker && <div class="prog-speaker">{speaker}</div>}
        <div class="prog-place">{place}</div>
      </div>
    </div>
  );
}

export default function ProgrammaSection() {
  return (
    <>
      <p class="prog-disclaimer">
        Programma indicativo — soggetto a variazioni
      </p>

      <div class="prog-day">
        <div class="prog-day-header">Venerdì 18 settembre</div>
        <Event time="10:00" place="Piazza Grande · Modena">
          Apertura del festival
        </Event>
        <Event
          time="11:00"
          speaker="Massimo Cacciari"
          place="Piazza Grande · Modena"
        >
          <em>Il caos come principio cosmologico</em>
        </Event>
        <Event
          time="15:00"
          speaker="Elena Castellucci"
          place="Piazza Martiri · Carpi"
        >
          <em>Ordine e disordine nelle scienze naturali</em>
        </Event>
        <Event time="21:00" place="Cortile Palazzo Ducale · Modena">
          Concerto filosofico: <em>Musica e caos</em>
        </Event>
      </div>

      <div class="prog-day">
        <div class="prog-day-header">Sabato 19 settembre</div>
        <Event
          time="10:00"
          speaker="Barbara Carnevali"
          place="Piazza Grande · Modena"
        >
          <em>Il caos nella politica contemporanea</em>
        </Event>
        <Event time="14:00" place="Palazzo dei Musei · Modena">
          Laboratorio ragazzi: <em>Creare ordine dal caos</em>
        </Event>
        <Event
          time="17:30"
          speaker="Daniele Francesconi"
          place="Piazza Garibaldi · Sassuolo"
        >
          <em>Caos, caso e libertà</em>
        </Event>
        <Event time="20:30" place="Ex-fonderia · Modena">
          Cena filosofica <em>(su prenotazione)</em>
        </Event>
      </div>

      <div class="prog-day">
        <div class="prog-day-header">Domenica 20 settembre</div>
        <Event
          time="10:30"
          speaker="Michela Marzano"
          place="Piazza Grande · Modena"
        >
          <em>Il caos digitale e l'intelligenza artificiale</em>
        </Event>
        <Event
          time="15:00"
          speaker="Stefano Massini"
          place="Piazza Grande · Modena"
        >
          <em>Dal caos al cosmo — e ritorno</em>
        </Event>
        <Event time="18:00" place="Piazza Grande · Modena">
          Chiusura del festival
        </Event>
      </div>
    </>
  );
}
