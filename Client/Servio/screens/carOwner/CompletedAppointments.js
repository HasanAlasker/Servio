import SafeScreen from "../../components/general/SafeScreen";
import ScrollScreen from "../../components/general/ScrollScreen";
import Navbar from "../../components/general/Navbar";
import GapContainer from "../../components/general/GapContainer";
import { useState } from "react";
import { UseAppointment } from "../../context/AppointmentContext";

function CompletedAppointmets(props) {
  const { loadAppointmets, completed } = UseAppointment();
  const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await loadAppointmets();
    } catch (error) {
    } finally {
      setRefreshing(false);
    }
  };
  return (
    <SafeScreen>
      <ScrollScreen refreshing={refreshing} onRefresh={handleRefresh}>
        <GapContainer gap={40} fullHeight></GapContainer>
      </ScrollScreen>
      <Navbar />
    </SafeScreen>
  );
}

export default CompletedAppointmets;
