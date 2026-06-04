export default function HotelSection() {
  return (
    <>
      <div class="hotel-wrap">
        <div class="hotel-head">
          <div class="hotel-name">Hotel Canalgrande</div>
          <div class="hotel-addr">Corso Canalgrande 6, 41121 Modena</div>
          <div class="hotel-tag">
            ⭐⭐⭐⭐ · Check-in 15:00 · Check-out 11:00
          </div>
        </div>
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
            <i class="ti ti-map-pin" aria-hidden="true"></i>
            <span>segnaposto Google Maps</span>
          </div>
        </div>
      </div>
      <p class="hotel-note">
        Prenotazione di gruppo confermata · ref. FF2026-GRP · parcheggio
        convenzionato
      </p>
    </>
  );
}
