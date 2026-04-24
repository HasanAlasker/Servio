import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { getClosedReports, getOpenReports } from "../../api/report";

const KEY_STORAGE = {
  OPEN_REPORTS: "@servio_open_reports",
  CLOSED_REPORTS: "@servio_closed_reports",
};

export const useReportStore = create((set, get) => ({
  open: null,
  closed: null,
  loading: false,
  error: false,

  loadReports: async () => {
    try {
      const cashedOpen = await AsyncStorage.getItem(KEY_STORAGE.OPEN_REPORTS);
      if (cashedOpen) set({ open: JSON.parse(cashedOpen) });

      const cashedClosed = await AsyncStorage.getItem(
        KEY_STORAGE.CLOSED_REPORTS,
      );
      if (cashedClosed) set({ closed: JSON.parse(cashedClosed) });
    } catch (error) {
      console.log(error);
    }

    try {
      set({ loading: true, error: false });

      const openRes = await getOpenReports();
      const closedRes = await getClosedReports();

      set({
        open: openRes.data.data,
        closed: closedRes.data.data,
        loading: false,
      });

      await AsyncStorage.setItem(
        KEY_STORAGE.OPEN_REPORTS,
        JSON.stringify(openRes.data.data),
      );
      await AsyncStorage.setItem(
        KEY_STORAGE.CLOSED_REPORTS,
        JSON.stringify(closedRes.data.data),
      );
    } catch (error) {
      set({ error: true, loading: false });
    }
  },
}));
