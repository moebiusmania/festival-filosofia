export interface HotelData {
  nome: string;
  indirizzo: string;
  checkin: string;
  checkout: string;
  ref: string;
  mapUrl: string;
  note: string;
}

export interface FormErrors {
  nome?: string;
  mapUrl?: string;
}

export const EMPTY_HOTEL: HotelData = {
  nome: "",
  indirizzo: "",
  checkin: "",
  checkout: "",
  ref: "",
  mapUrl: "",
  note: "",
};

export function validateHotelForm(data: HotelData): FormErrors {
  const errors: FormErrors = {};
  if (!data.nome.trim()) {
    errors.nome = "Il nome dell'hotel è obbligatorio.";
  }
  if (data.mapUrl.trim()) {
    try {
      const url = new URL(data.mapUrl.trim());
      if (url.protocol !== "https:") {
        errors.mapUrl = "L'URL deve usare il protocollo https://.";
      }
    } catch {
      errors.mapUrl = "Inserisci un URL valido.";
    }
  }
  return errors;
}

export function hotelTimeLine(data: HotelData): string {
  return [
    data.checkin && `Check-in ${data.checkin}`,
    data.checkout && `Check-out ${data.checkout}`,
  ].filter(Boolean).join(" · ");
}
