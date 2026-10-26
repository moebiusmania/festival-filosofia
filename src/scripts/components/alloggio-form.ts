import { defineComponent } from "../define.ts";
import { STORAGE_KEYS, readJSON, writeJSON } from "../../lib/storage.ts";
import {
  EMPTY_HOTEL,
  type FormErrors,
  type HotelData,
  validateHotelForm,
} from "../../lib/hotel.ts";

export const alloggioForm = defineComponent(() => ({
  form: { ...EMPTY_HOTEL } as HotelData,
  errors: {} as FormErrors,
  saved: false,
  init() {
    const stored = readJSON<HotelData>(STORAGE_KEYS.hotel);
    if (stored) this.form = stored;
  },
  submit() {
    this.errors = validateHotelForm(this.form);
    if (Object.keys(this.errors).length > 0) return;
    writeJSON(STORAGE_KEYS.hotel, this.form);
    this.saved = true;
  },
}));
