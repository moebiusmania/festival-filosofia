import restaurants from "../../data/restaurants.json" with { type: "json" };

interface RistoranteProps {
  n: string;
  name: string;
  type: string;
  addr: string;
  when: string;
}

function Ristorante({ n, name, type, addr, when }: RistoranteProps) {
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
  return (
    <>
      {restaurants.map((r) => (
        <Ristorante key={r.n} {...r} />
      ))}
    </>
  );
}
