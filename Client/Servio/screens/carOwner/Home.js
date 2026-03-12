import { StyleSheet } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import ScrollScreen from "../../components/general/ScrollScreen";
import Navbar from "../../components/general/Navbar";
import GapContainer from "../../components/general/GapContainer";
import OfflineModal from "../../components/general/OfflineModal";
import UsersDash from "../../components/general/UsersDash";
import HelloUser from "../../components/general/HelloUser";
import { UseCar } from "../../context/CarContext";
import EmptyGarage from "../../components/general/EmptyGarage";

function Home(props) {
  const { countCars } = UseCar();
  return (
    <SafeScreen>
      <ScrollScreen>
        <GapContainer gap={40} style={{hieght:"100%"}}>
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

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Home;
