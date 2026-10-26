// Entrypoint for @astrojs/alpinejs: registers every component used in
// `x-data` before Alpine starts.
import type { Alpine } from "alpinejs";
import { alloggioForm } from "./components/alloggio-form.ts";
import { datiLocali } from "./components/dati-locali.ts";
import { fineFestivalModal } from "./components/fine-festival-modal.ts";
import { hotelSection } from "./components/hotel-section.ts";
import { listaRistoranti } from "./components/lista-ristoranti.ts";
import { mapSection } from "./components/map-section.ts";
import { navMenu } from "./components/nav-menu.ts";
import { notePad } from "./components/note-pad.ts";
import { programma } from "./components/programma.ts";
import { ristorantiSection } from "./components/ristoranti-section.ts";
import { sections } from "./components/sections.ts";

export default (Alpine: Alpine) => {
  Alpine.data("alloggioForm", alloggioForm);
  Alpine.data("datiLocali", datiLocali);
  Alpine.data("fineFestivalModal", fineFestivalModal);
  Alpine.data("hotelSection", hotelSection);
  Alpine.data("listaRistoranti", listaRistoranti);
  Alpine.data("mapSection", mapSection);
  Alpine.data("navMenu", navMenu);
  Alpine.data("notePad", notePad);
  Alpine.data("programma", programma);
  Alpine.data("ristorantiSection", ristorantiSection);
  Alpine.data("sections", sections);
};
