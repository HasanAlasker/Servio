import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import Navbar from "../../components/general/Navbar";
import ScrollScreen from "../../components/general/ScrollScreen";
import GapContainer from "../../components/general/GapContainer";
import useApi from "../../hooks/useApi";
import {
  dontRemind,
  getUpcomingServices,
  remind,
} from "../../api/upcomingService";
import ServiceCard from "../../components/cards/ServiceCard";
import SText from "../../components/text/SText";

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

  const handleReminder = async (id, isActive) => {
    try {
      setServices((prev) =>
        prev.map((service) =>
          service._id === id
            ? {
                ...service,
                notificationSent: !service.notificationSent,
              }
            : service,
        ),
      );
      if (isActive) {
        const res = await dontRemind(id);
      } else {
        const res = await remind(id);
      }
    } catch (error) {}
  };

  const RenderServices = services.map((service) => (
    <ServiceCard
      key={service._id}
      id={service._id}
      car={service.car}
      customer={service.customer}
      parts={service.parts}
      dueBy={service.dueBy}
      status={service.status}
      sendNotifications={!service.notificationSent}
      handleReminder={handleReminder}
    />
  ));

  return (
    <SafeScreen>
      <ScrollScreen>
        <GapContainer>
          {RenderServices.length === 0 && !loading ? (
            <SText
              thin
              color={"sec_text"}
              style={{ marginHorizontal: "auto", textAlign: "center" }}
            >
              You don't have any upcoming services
            </SText>
          ) : (
            RenderServices
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

export default Service;
