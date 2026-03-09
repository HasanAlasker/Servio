import { StyleSheet } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import ScrollScreen from "../../components/general/ScrollScreen";
import Navbar from "../../components/general/Navbar";
import CardLeftBorder from "../../components/cards/CardLeftBorder";
import GapContainer from "../../components/general/GapContainer";
import SquareHome from "../../components/cards/SquareHome";
import { useNavigation } from "@react-navigation/native";
import OfflineModal from "../../components/general/OfflineModal";
import { UseCar } from "../../context/CarContext";
import { UseService } from "../../context/ServiceContext";
import { UseAppointment } from "../../context/AppointmentContext";
import MText from "../../components/text/MText";
import RowCont from "../../components/general/RowCont";
import UsersDash from "../../components/general/UsersDash";

function Home(props) {
  const navigaiton = useNavigation();
  const { cars } = UseCar();
  const { countAppointments } = UseAppointment();
  const { countDueServices } = UseService();

  return (
    <SafeScreen>
      <ScrollScreen>
        <GapContainer gap={40}>
          <UsersDash />

          <GapContainer>
            <MText thin color={"sec_text"}>
              Quick Peek
            </MText>

            <CardLeftBorder
              title={"Cars: "}
              titleIcon={"car"}
              data={cars?.length}
            />
            <CardLeftBorder
              title={"Due: "}
              titleIcon={"clock-outline"}
              data={countDueServices()}
            />
            <CardLeftBorder
              title={"Appointments: "}
              titleIcon={"calendar-blank"}
              data={countAppointments()}
            />
          </GapContainer>

          <GapContainer>
            <MText thin color={"sec_text"}>
              Quick Actions
            </MText>
            <RowCont style={styles.row}>
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
            </RowCont>
          </GapContainer>
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
