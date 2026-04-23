import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { getUnVerifiedShops, getVerifiedShops } from "../../api/shop";

const STORAGE_KEYS = {
  VERIFIED: "@servio_admin_v_shops",
  UNVERIFIED: "@servio_admin_un_v_shops",
};

export const useShopStore = create((set, get) => ({
  // state
  verifiedShops: null,
  unVerifiedShops: null,
  loading: false,
  error: false,

  // actions
  loadShops: async () => {
    try {
      const chashedVShops = await AsyncStorage.getItem(STORAGE_KEYS.VERIFIED);
      if (chashedVShops) set({ verifiedShops: JSON.parse(chashedVShops) });

      const cashedUnVShops = await AsyncStorage.getItem(
        STORAGE_KEYS.UNVERIFIED,
      );
      if (cashedUnVShops) set({ unVerifiedShops: JSON.parse(cashedUnVShops) });
    } catch (error) {
      console.log(error);
    }

    try {
      set({ loading: true, error: false });
      const fetchedVshops = await getVerifiedShops();
      const fetchedUnVshops = await getUnVerifiedShops();
      set({
        verifiedShops: fetchedVshops.data.data,
        unVerifiedShops: fetchedUnVshops.data.data,
        loading: false,
        error: false,
      });

      await AsyncStorage.setItem(
        STORAGE_KEYS.VERIFIED,
        JSON.stringify(verifiedShops),
      );
      await AsyncStorage.setItem(
        STORAGE_KEYS.UNVERIFIED,
        JSON.stringify(unVerifiedShops),
      );
    } catch (error) {
      set({ error: true, loading: false });
    }
  },
}));
