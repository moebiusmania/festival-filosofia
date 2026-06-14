import { useEffect, useState } from "preact/hooks";

const LS_KEY = "ff2026-hotel";

interface HotelData {
  nome: string;
  indirizzo: string;
  checkin: string;
  checkout: string;
  ref: string;
  mapUrl: string;
  note: string;
}

function MapPlaceholder() {
  return (
    <div class="hotel-map-ph">
      <svg
        viewBox="0 0 380 150"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="380" height="150" fill="#e8e8e4" />
        <rect x="0" y="60" width="380" height="8" fill="#d4d0cc" />
        <rect x="0" y="100" width="380" height="6" fill="#d4d0cc" />
        <rect x="70" y="0" width="6" height="150" fill="#d4d0cc" />
        <rect x="170" y="0" width="4" height="150" fill="#d4d0cc" />
        <rect x="270" y="0" width="6" height="150" fill="#d4d0cc" />
        <rect x="80" y="20" width="65" height="32" rx="2" fill="#ccc9c6" />
        <rect x="80" y="70" width="65" height="22" rx="2" fill="#ccc9c6" />
        <rect x="180" y="30" width="55" height="22" rx="2" fill="#ccc9c6" />
        <rect x="180" y="68" width="55" height="28" rx="2" fill="#ccc9c6" />
        <rect x="280" y="18" width="70" height="36" rx="2" fill="#ccc9c6" />
        <rect x="280" y="70" width="70" height="22" rx="2" fill="#ccc9c6" />
        <circle
          cx="190"
          cy="78"
          r="14"
          fill="none"
          stroke="#c0392b"
          stroke-width="2"
        />
        <circle cx="190" cy="78" r="5" fill="#c0392b" />
      </svg>
      <div class="hotel-map-label">
        <i class="ti ti-map-pin" aria-hidden="true" />
        <span>Nessuna mappa inserita</span>
      </div>
    </div>
  );
}

export default function HotelSection() {
  const [data, setData] = useState<HotelData | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) setData(JSON.parse(raw) as HotelData);
    } catch { /* ignore */ }
  }, []);

  if (!data) {
    return (
      <p class="hotel-empty">
        Nessun alloggio configurato.{" "}
        <a href="/hotel" class="hotel-empty-link">
          Inserisci i dati →
        </a>
      </p>
    );
  }

  const timeLine = [
    data.checkin && `Check-in ${data.checkin}`,
    data.checkout && `Check-out ${data.checkout}`,
  ].filter(Boolean).join(" · ");

  return (
    <>
      <div class="hotel-wrap">
        <div class="hotel-head">
          <div class="hotel-name">{data.nome}</div>
          {data.indirizzo && <div class="hotel-addr">{data.indirizzo}</div>}
          {timeLine && <div class="hotel-tag">{timeLine}</div>}
        </div>
        {data.mapUrl.trim()
          ? (
            <iframe
              class="hotel-map-iframe"
              src={data.mapUrl.trim()}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Mappa di ${data.nome}`}
            />
          )
          : <MapPlaceholder />}
      </div>
      {data.ref && <p class="hotel-note">{data.ref}</p>}
      {data.note && <p class="hotel-note">{data.note}</p>}
      <a href="/hotel" class="hotel-edit-link">
        <i class="ti ti-edit" aria-hidden="true" />
        Modifica
      </a>
    </>
  );
}
