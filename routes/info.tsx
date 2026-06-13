import { define } from "../utils.ts";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";

export default define.page(function InfoPage() {
  return (
    <div class="ff-app">
      <Header />
      <main class="ff-page">
        <h2>Come funziona</h2>
      </main>
      <Footer />
    </div>
  );
});
