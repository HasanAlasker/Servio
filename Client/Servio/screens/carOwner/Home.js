import SafeScreen from "../../components/general/SafeScreen";
import ScrollScreen from "../../components/general/ScrollScreen";
import Navbar from "../../components/general/Navbar";
import GapContainer from "../../components/general/GapContainer";
import OfflineModal from "../../components/general/OfflineModal";
import UsersDash from "../../components/general/UsersDash";
import HelloUser from "../../components/general/HelloUser";
import { UseCar } from "../../context/CarContext";
import EmptyGarage from "../../components/general/EmptyGarage";
import { useState } from "react";
import { UseAppointment } from "../../context/AppointmentContext";
import { UseService } from "../../context/ServiceContext";

function Home(props) {
  const { loadCars, cars, loading } = UseCar();
  const { loadAppointments } = UseAppointment();
  const { loadServices } = UseService();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await loadCars();
      await loadAppointments();
      await loadServices();
    } catch (error) {
    } finally {
      setRefreshing(false);
    }
  };
  return (
    <SafeScreen>
      <ScrollScreen refreshing={refreshing} onRefresh={handleRefresh}>
        <GapContainer gap={40} fullHeight>
          <HelloUser />
          {cars.length > 0 && <UsersDash />}
          {cars.length === 0 && !loading && <EmptyGarage />}
        </GapContainer>
      </ScrollScreen>
      <Navbar />
      <OfflineModal />
    </SafeScreen>
  );
}

export default Home;
