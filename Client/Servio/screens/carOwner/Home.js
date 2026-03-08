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
import HelloUser from "../../components/general/HelloUser";
import MText from "../../components/text/MText";
import { capFirstLetter } from "../../functions/CapFirstLetterOfWord";

function Home(props) {
  const navigaiton = useNavigation();
  const { cars } = UseCar();
  const { countAppointments } = UseAppointment();
  const { countDueServices, services, loading } = UseService();

  const statusPriority = { overdue: 0, soon: 1, upcoming: 2 };

  const goThrough = () => {
    const carMap = {};

    for (const service of services) {
      const carId = service.car._id;
      if (
        !carMap[carId] ||
        statusPriority[service.status] < statusPriority[carMap[carId].status]
      ) {
        carMap[carId] = service;
      }
    }

    return Object.values(carMap).sort(
      (a, b) => statusPriority[a.status] - statusPriority[b.status],
    );
  };
  const ServiceList = goThrough().map((s) => (
    <CardLeftBorder
      key={s._id}
      status={s.status}
      customText={capFirstLetter(s.car.make + " " + s.car.name)}
    />
  ));

  return (
    <SafeScreen>
      <ScrollScreen>
        <GapContainer gap={20}>
          <HelloUser />

          {!loading && ServiceList.length > 0 ? (
            <GapContainer>
              <MText
                thin
                color={
                  ServiceList[0].props.status === "soon" ? "orange" : "darkPink"
                }
              >
                Attention Needed
              </MText>
              {ServiceList}
            </GapContainer>
          ) : (
            <CardLeftBorder
              status={" "}
              icon={"checkbox-marked-circle-outline"}
              customColor={"green"}
              miniTitle={"You're all set"}
              customText={"No services required!"}
            />
          )}

          <MText thin color={"sec_text"}>
            Quick Peek
          </MText>
          <GapContainer>
            <CardLeftBorder title={"Number of cars: "} data={cars?.length} />
            <CardLeftBorder
              title={"Appointments: "}
              data={countAppointments()}
            />
            <CardLeftBorder
              title={"Due services: "}
              data={countDueServices()}
            />
          </GapContainer>

          <MText thin color={"sec_text"}>
            Quick Actions
          </MText>
          <GapContainer style={[styles.row]}>
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
