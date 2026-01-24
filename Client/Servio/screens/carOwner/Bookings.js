import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Navbar from "../../components/general/Navbar";
import FullScreen from "../../components/general/FullScreen";
import SafeScreen from "../../components/general/SafeScreen";
import useApi from "../../hooks/useApi";
import {
  getPastAppointments,
  getUpcomingAppointments,
} from "../../api/appointment";

function Bookings(props) {
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);

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

  useEffect(() => {
    fetchUpcoming();
    fetchPast();
  }, []);

  useEffect(() => {
    setUpcoming(fetchedUpcoming);
    setPast(fetchedPast);
  }, [fetchUpcoming, fetchedPast]);

  return (
    <SafeScreen>
      <View style={styles.container}></View>
      <FullScreen />
      <Navbar />
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Bookings;
