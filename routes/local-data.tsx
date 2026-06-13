import { define } from "../utils.ts";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import DatiLocali from "../islands/DatiLocali.tsx";

export default define.page(function DatiLocaliPage() {
  return (
    <div class="ff-app">
      <Header />
      <main class="dati-locali-page">
        <h2>Dati locali</h2>
        <p>
          Questa app salva alcune informazioni direttamente sul tuo dispositivo,
          senza inviarle a nessun server.
        </p>
        <p>I dati attualmente memorizzati sono:</p>
        <ul>
          <li>Le note del taccuino personale</li>
          <li>La preferenza per il tema (chiaro / scuro)</li>
          <li>Gli eventi del programma salvati con il segnalibro</li>
        </ul>
        <p>
          Puoi eliminare tutti i dati premendo il pulsante qui sotto. L'operazione
          è irreversibile.
        </p>
        <DatiLocali />
      </main>
      <Footer />
    </div>
  );
});
