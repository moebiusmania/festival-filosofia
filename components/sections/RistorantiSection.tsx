import { useEffect, useState } from "preact/hooks";
import staticData from "../../data/restaurants.json" with { type: "json" };

const LS_KEY = "ff2026-lista-ristoranti";

interface RistoEntry {
  name: string;
  type: string;
  addr: string;
  when: string;
}

function Ristorante({ n, name, type, addr, when }: RistoEntry & { n: string }) {
  return (
    <div class="risto-item">
      <div class="risto-n">{n}</div>
      <div class="risto-info">
        <div class="risto-name">{name}</div>
        <div class="risto-type">{type}</div>
        <div class="risto-addr">{addr}</div>
        <div class="risto-when">{when}</div>
      </div>
    </div>
  );
}

export default function RistorantiSection() {
  const [items, setItems] = useState<RistoEntry[]>(staticData);
  const [isSample, setIsSample] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as RistoEntry[];
        if (parsed.length > 0) {
          setItems(parsed);
          setIsSample(false);
        }
      }
    } catch { /* ignore */ }
  }, []);

  return (
    <>
      {isSample && (
        <p class="risto-sample-hint">
          Dati di esempio —{" "}
          <a href="/ristoranti" class="risto-sample-link">aggiungi i tuoi →</a>
        </p>
      )}
      {items.map((item, i) => (
        <Ristorante
          key={i}
          n={String(i + 1).padStart(2, "0")}
          {...item}
        />
      ))}
    </>
  );
}
