import { defineComponent } from "../define.ts";
import { STORAGE_KEYS, readJSON } from "../../lib/storage.ts";
import { type HotelData, hotelTimeLine } from "../../lib/hotel.ts";

export const hotelSection = defineComponent(() => ({
  data: null as HotelData | null,
  init() {
    this.data = readJSON<HotelData>(STORAGE_KEYS.hotel);
  },
  get timeLine(): string {
    return this.data ? hotelTimeLine(this.data) : "";
  },
  get mapUrl(): string {
    return this.data?.mapUrl.trim() ?? "";
  },
}));
