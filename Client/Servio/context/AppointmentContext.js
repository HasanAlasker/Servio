import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useState, useEffect } from "react";
import {
  getPastAppointments,
  getUpcomingAppointments,
} from "../api/appointment";
import useApi from "../hooks/useApi";

export const AppointmentContext = createContext();

export const UseAppointment = () => {
  const context = useContext(AppointmentContext);
  if (!context) throw new Error("UseAppointment must be used within a context");
  return context;
};

export const AppointmentProvider = ({ children }) => {
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);

  const STORAGE_KEYS = {
    PAST_APPOINTMENTS: "@servio_past_appointments",
    UPCOMING_APPOINTMENTS: "@servio_upcoming_appointments",
  };

  const {
    data: fetchedUpcoming,
    request: fetchUpcoming,
    loading: loadingUpcoming,
  } = useApi(getUpcomingAppointments);

  const {
    data: fetchedPast,
    request: fetchPast,
    loading: loadingPast,
  } = useApi(getPastAppointments);

  const loading = loadingPast || loadingUpcoming;

  const storeAppointments = async (upcomingApp, pastApp) => {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.PAST_APPOINTMENTS,
        JSON.stringify(pastApp),
      );
      await AsyncStorage.setItem(
        STORAGE_KEYS.UPCOMING_APPOINTMENTS,
        JSON.stringify(upcomingApp),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getStoredAppointments = async () => {
    try {
      const cachedPastApps = await AsyncStorage.getItem(
        STORAGE_KEYS.PAST_APPOINTMENTS,
      );
      const cachedUpcomingApps = await AsyncStorage.getItem(
        STORAGE_KEYS.UPCOMING_APPOINTMENTS,
      );
      if (cachedPastApps) setPast(JSON.parse(cachedPastApps));
      if (cachedUpcomingApps) setUpcoming(JSON.parse(cachedUpcomingApps));
    } catch (error) {
      console.log(error);
    }
  };

  const loadAppointments = async () => {
    getStoredAppointments();
    fetchUpcoming();
    fetchPast();
  };

  const countAppointments = () => {
    return upcoming.length;
  };

  useEffect(() => {
    if (fetchedUpcoming && fetchedPast) {
      setUpcoming(fetchedUpcoming);
      setPast(fetchedPast);
      storeAppointments(fetchedUpcoming, fetchedPast);
    }
  }, [fetchedUpcoming, fetchedPast]);

  const values = {
    upcoming,
    past,
    setPast,
    setUpcoming,
    loading,
    loadAppointments,
    countAppointments,
  };
  return (
    <AppointmentContext.Provider value={values}>
      {children}
    </AppointmentContext.Provider>
  );
};
