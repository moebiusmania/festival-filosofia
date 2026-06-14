import { define } from "../utils.ts";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import AlloggioForm from "../islands/AlloggioForm.tsx";

export default define.page(function HotelPage() {
  return (
    <div class="ff-app">
      <Header />
      <main class="ff-page">
        <h2>Alloggio</h2>
        <AlloggioForm />
      </main>
      <Footer />
    </div>
  );
});
