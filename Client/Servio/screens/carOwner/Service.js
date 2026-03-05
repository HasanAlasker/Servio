import { StyleSheet } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import Navbar from "../../components/general/Navbar";
import ScrollScreen from "../../components/general/ScrollScreen";
import GapContainer from "../../components/general/GapContainer";
import { dontRemind, remind } from "../../api/upcomingService";
import ServiceCard from "../../components/cards/ServiceCard";
import SText from "../../components/text/SText";
import { UseService } from "../../context/ServiceContext";
import { useState } from "react";

function Service(props) {
  const { services, setServices, loading, loadServices } = UseService();
  const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await loadServices();
    } catch (error) {
    } finally {
      setRefreshing(false);
    }
  };

  const handleReminder = async (id, isActive) => {
    try {
      setServices((prev) =>
        prev.map((service) =>
          service._id === id
            ? {
                ...service,
                reminder: !service.reminder,
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
      sendNotifications={service.reminder}
      handleReminder={handleReminder}
    />
  ));

  return (
    <SafeScreen>
      <ScrollScreen refreshing={refreshing} onRefresh={handleRefresh}>
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
