import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import {
  getCallToAction,
  getConfirmedAppointments,
  getPendingAppointments,
  markAppointmentCompleted,
} from "../../api/appointment";

const KEY_STORAGE = {
  PENDING: "@servio_pending",
  CONFIRMED: "@servio_confirmed",
  CALL_TO: "@servio_call_to",
};

export const useBookingStore = create((set, get) => ({
  pending: null,
  confirmed: null,
  callTo: null,
  loading: false,
  error: false,

  loadBook: async () => {
    try {
      const cashedPending = await AsyncStorage.getItem(KEY_STORAGE.PENDING);
      if (cashedPending) set({ pending: JSON.parse(cashedPending) });

      const cashedConfirmed = await AsyncStorage.getItem(KEY_STORAGE.CONFIRMED);
      if (cashedConfirmed) set({ confirmed: JSON.parse(cashedConfirmed) });

      const cashedCallTo = await AsyncStorage.getItem(KEY_STORAGE.CALL_TO);
      if (cashedCallTo) set({ callTo: JSON.parse(cashedCallTo) });
    } catch (error) {
      console.log(error);
    }

    try {
      set({ loading: true, error: false });

      const pendingRes = await getPendingAppointments();
      const confirmedRes = await getConfirmedAppointments();
      const callToRes = await getCallToAction();

      set({ callTo: callToRes.data.data, loading: false });

      await AsyncStorage.setItem(
        KEY_STORAGE.CALL_TO,
        JSON.stringify(callToRes.data.data),
      );
    } catch (error) {
      set({ loading: false, error: true });
    }
  },

  completeApp: async (id, routeName) => {
    try {
      const appointment = get().callTo.find((a) => a._id === id);
      appointment.status = "completed";

      if (routeName === "CompletedAppointments") {
        const updated = get().callTo.filter((a) => a._id !== id);
        set({ callTo: updated });
      }

      const res = await markAppointmentCompleted(id);
    } catch (error) {
      console.log(error);
    }
  },
  noShowApp: async (id, routeName) => {},
  confirmApp: async (id) => {},
  rejectApp: async (id) => {},
}));
