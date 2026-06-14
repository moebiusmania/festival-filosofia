import { define } from "../utils.ts";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import ListaRistoranti from "../islands/ListaRistoranti.tsx";

export default define.page(function RistorantiPage() {
  return (
    <div class="ff-app">
      <Header />
      <main class="ff-page">
        <h2>Lista ristoranti</h2>
        <ListaRistoranti />
      </main>
      <Footer />
    </div>
  );
});
