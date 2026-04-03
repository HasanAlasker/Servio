import SafeScreen from "../../components/general/SafeScreen";
import ScrollScreen from "../../components/general/ScrollScreen";
import Navbar from "../../components/general/Navbar";
import GapContainer from "../../components/general/GapContainer";
import { useState } from "react";
import { UseAppointment } from "../../context/AppointmentContext";
import MenuBackBtn from "../../components/general/MenuBackBtn";
import { useNavigation } from "@react-navigation/native";
import AppointmentCard from "../../components/cards/AppointmentCard";

function CompletedAppointmets(props) {
  const { loadAppointmets, completed } = UseAppointment();
  const [refreshing, setRefreshing] = useState(false);
  const navigate = useNavigation();

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await loadAppointmets();
    } catch (error) {
    } finally {
      setRefreshing(false);
    }
  };

  const completedList = completed.map((appointment) => (
    <AppointmentCard
      key={appointment._id}
      id={appointment._id}
      customer={appointment?.customer}
      car={appointment.car}
      shop={appointment.shop}
      serviceParts={appointment.serviceParts}
      status={appointment.status}
      scheuledAt={appointment.scheduledDate}
      showRateAndReport
    />
  ));
  return (
    <SafeScreen>
      <ScrollScreen refreshing={refreshing} onRefresh={handleRefresh}>
        <MenuBackBtn onClose={() => navigate.goBack()} />
        <GapContainer gap={40}>{completedList}</GapContainer>
      </ScrollScreen>
      <Navbar />
    </SafeScreen>
  );
}

export default CompletedAppointmets;
