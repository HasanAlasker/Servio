import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Navbar from "../../components/general/Navbar";
import FullScreen from "../../components/general/FullScreen";
import SafeScreen from "../../components/general/SafeScreen";
import useApi from "../../hooks/useApi";
import {
  cancelAppointment,
  getPastAppointments,
  getUpcomingAppointments,
} from "../../api/appointment";
import ScrollScreen from "../../components/general/ScrollScreen";
import AppointmentCard from "../../components/cards/AppointmentCard";
import GapContainer from "../../components/general/GapContainer";
import TabNav from "../../components/general/TabNav";
import { useRoute } from "@react-navigation/native";

function Bookings(props) {
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);
  const [activeTab, setTab] = useState("upcoming");

  const route = useRoute();
  const params = route.params;

  useEffect(() => {
    if (params) setTab(params.active);
  }, []);

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
  }, [fetchedUpcoming, fetchedPast]);

  const handleCancel = async (id) => {
    await cancelAppointment(id);
    const canceledApp = upcoming.find((app) => app._id === id);
    canceledApp.status = "canceled"
    setUpcoming((prev) => prev.filter((app) => app._id !== id));
    setPast((prev) => [canceledApp, ...prev]);
  };

  const RenderAppointments =
    activeTab === "upcoming"
      ? upcoming.map((appointment) => (
          <AppointmentCard
            key={appointment._id}
            id={appointment._id}
            car={appointment.car}
            shop={appointment.shop}
            serviceParts={appointment.serviceParts}
            status={appointment.status}
            scheuledAt={appointment.scheduledDate}
            type={"upcoming"}
            onCancel={handleCancel}
          />
        ))
      : past.map((appointment) => (
          <AppointmentCard
            key={appointment._id}
            id={appointment._id}
            car={appointment.car}
            shop={appointment.shop}
            serviceParts={appointment.serviceParts}
            status={appointment.status}
            scheuledAt={appointment.scheduledDate}
            type={"past"}
            onCancel={handleCancel}
          />
        ));

  const onTabChange = () => {
    let changeTo = activeTab === "upcoming" ? "past" : "upcoming";
    setTab(changeTo);
  };

  return (
    <SafeScreen>
      <ScrollScreen>
        <GapContainer>
          <TabNav active={activeTab} onTabChange={onTabChange} />
          {RenderAppointments}
        </GapContainer>
      </ScrollScreen>
      <Navbar />
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Bookings;
