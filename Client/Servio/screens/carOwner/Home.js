import { StyleSheet } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import ScrollScreen from "../../components/general/ScrollScreen";
import Navbar from "../../components/general/Navbar";
import LText from "../../components/text/LText";
import CardLeftBorder from "../../components/cards/CardLeftBorder";
import GapContainer from "../../components/general/GapContainer";
import SquareHome from "../../components/cards/SquareHome";
import { useNavigation } from "@react-navigation/native";
import OfflineModal from "../../components/general/OfflineModal";
import { UseCar } from "../../context/CarContext";
import { UseService } from "../../context/ServiceContext";
import { UseAppointment } from "../../context/AppointmentContext";
import HelloUser from "../../components/general/HelloUser";
import MText from "../../components/text/MText";

function Home(props) {
  const navigaiton = useNavigation();
  const { cars } = UseCar();
  const { countAppointments } = UseAppointment();
  const { countDueServices } = UseService();

  return (
    <SafeScreen>
      <ScrollScreen>
        <HelloUser />
        <MText thin color={'sec_text'}>Quick Peek</MText>
        <GapContainer style={styles.container}>
          <CardLeftBorder title={"Number of cars: "} data={cars?.length} />
          <CardLeftBorder title={"Appointments: "} data={countAppointments()} />
          <CardLeftBorder title={"Due services: "} data={countDueServices()} />
        </GapContainer>

        <MText thin color={'sec_text'}>Quick Actions</MText>
        <GapContainer style={[styles.container, styles.row]}>
          <SquareHome
            title={"Add Car"}
            color={"lightBlue"}
            icon={"plus-circle-outline"}
            onPress={() => navigaiton.navigate("AddCar")}
          />

          <SquareHome
            title={"Shops"}
            color={"green"}
            icon={"wrench-outline"}
            onPress={() => navigaiton.navigate("Shops", { showBtn: false })}
          />
          <SquareHome
            title={"History"}
            color={"pink"}
            icon={"folder-outline"}
            onPress={() => navigaiton.navigate("Bookings", { active: "2" })}
          />
        </GapContainer>
      </ScrollScreen>
      <Navbar />
      <OfflineModal />
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 30,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Home;
