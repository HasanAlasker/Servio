import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import FullScreen from "../../components/general/FullScreen";
import Navbar from "../../components/general/Navbar";
import ScrollScreen from "../../components/general/ScrollScreen";
import GapContainer from "../../components/general/GapContainer";
import useApi from "../../hooks/useApi";
import { getUpcomingServices } from "../../api/upcomingService";
import ServiceCard from "../../components/cards/ServiceCard";

function Service(props) {
  const [services, setServices] = useState([]);

  const {
    data: fetchedServices,
    request: fetchServices,
    loading,
  } = useApi(getUpcomingServices);

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    setServices(fetchedServices);
  }, [fetchedServices]);

  const RenderServices = services.map((service) => (
    <ServiceCard
      key={service._id}
      car={service.car}
      parts={service.parts}
      dueBy={service.dueBy}
      status={service.status}
    />
  ));

  return (
    <SafeScreen>
      <ScrollScreen>
        <GapContainer>{RenderServices}</GapContainer>
      </ScrollScreen>
      <Navbar />
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Service;
