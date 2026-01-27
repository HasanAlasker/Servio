import { StyleSheet } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import ScrollScreen from "../../components/general/ScrollScreen";
import Navbar from "../../components/general/Navbar";
import LText from "../../components/text/LText";
import CardLeftBorder from "../../components/cards/CardLeftBorder";
import GapContainer from "../../components/general/GapContainer";
import SquareHome from "../../components/cards/SquareHome";
import { useNavigation } from "@react-navigation/native";
import useApi from "../../hooks/useApi";
import { countDocs } from "../../api/user";
import { useEffect } from "react";
import OfflineModal from "../../components/general/OfflineModal";
import { UseUser } from "../../context/UserContext";

function Home(props) {
  const navigaiton = useNavigation();
  const { user } = UseUser;

  const {
    data: fetchedDocs,
    request: fetchDocs,
    loading,
    error,
  } = useApi(countDocs);

  useEffect(() => {
    fetchDocs();
  }, [user, error]);

  const data = fetchedDocs;

  return (
    <SafeScreen>
      <ScrollScreen>
        <LText>Quick Peek</LText>
        <GapContainer style={styles.container}>
          <CardLeftBorder
            title={"Number of cars: "}
            data={loading ? "..." : data.cars}
          />
          <CardLeftBorder
            title={"Appointments: "}
            data={loading ? "..." : data.appointments}
          />
          <CardLeftBorder
            title={"Due services: "}
            data={loading ? "..." : data.services}
          />
        </GapContainer>

        <LText>Quick Actions</LText>
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
            onPress={() => navigaiton.navigate("Bookings", { active: "past" })}
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
