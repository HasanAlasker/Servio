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
import SText from "../../components/text/SText";
import KeyboardScrollScreen from "../../components/general/KeyboardScrollScreen";

function Bookings(props) {
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);
  const [activeTab, setTab] = useState("1");

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

  const loading = loadingPast || loadingUpcoming;

  useEffect(() => {
    fetchUpcoming();
    fetchPast();
  }, []);

  useEffect(() => {
    setUpcoming(fetchedUpcoming);
    setPast(fetchedPast);
  }, [fetchedUpcoming, fetchedPast]);

  const handleCancel = async (id, type) => {
    await cancelAppointment(id);

    if (type === "1") {
      const canceledApp = upcoming.find((app) => app._id === id);
      canceledApp.status = "canceled";
      setUpcoming((prev) => prev.filter((app) => app._id !== id));
      setPast((prev) => [canceledApp, ...prev]);
    } else {
      const canceledApp = past.find((app) => app._id === id);
      canceledApp.status = "canceled";
      setPast((prev) => prev.filter((app) => app._id !== id));
      setPast((prev) => [canceledApp, ...prev]);
    }
  };

  const RenderAppointments =
    activeTab === "1"
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
    let changeTo = activeTab === "1" ? "2" : "1";
    setTab(changeTo);
  };

  return (
    <SafeScreen>
      <ScrollScreen>
        <GapContainer>
          <TabNav
            one={"Upcoming"}
            two={"Past"}
            active={activeTab}
            onTabChange={onTabChange}
          />
          {RenderAppointments.length === 0 && !loading ? (
            <SText
              thin
              color={"sec_text"}
              style={{ margin: "auto", textAlign: "center" }}
            >
              You haven't booked any appointments yet
            </SText>
          ) : (
            RenderAppointments
          )}
          {loading && <SText>Loading</SText>}
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
