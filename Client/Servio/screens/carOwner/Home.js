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

function Home(props) {
  const { countCars, loadCars } = UseCar();
  const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await loadCars();
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
          {countCars() > 0 && <UsersDash />}
          {countCars() === 0 && <EmptyGarage />}
        </GapContainer>
      </ScrollScreen>
      <Navbar />
      <OfflineModal />
    </SafeScreen>
  );
}

export default Home;
