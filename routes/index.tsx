import { define } from "../utils.ts";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import Sections from "../islands/Sections.tsx";

export default define.page(function Home() {
  return (
    <div class="ff-app">
      <Header />
      <Sections />
      <Footer />
    </div>
  );
});
