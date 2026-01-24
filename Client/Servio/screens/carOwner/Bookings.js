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
import ScrollScreen from "../../components/general/ScrollScreen";
import AppointmentCard from "../../components/cards/AppointmentCard";
import GapContainer from "../../components/general/GapContainer";

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

  const RenderAppointments = upcoming.map((appointment) => (
    <AppointmentCard
      key={appointment._id}
      car={appointment.car}
      shop={appointment.shop}
      serviceParts={appointment.serviceParts}
      status={appointment.status}
    />
  ));

  return (
    <SafeScreen>
      <ScrollScreen>
        <GapContainer>{RenderAppointments}</GapContainer>
      </ScrollScreen>
      <Navbar />
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Bookings;
