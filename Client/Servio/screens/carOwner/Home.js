import { StyleSheet } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import PriBtn from "../../components/general/PriBtn";
import { UseUser } from "../../context/UserContext";
import ScrollScreen from "../../components/general/ScrollScreen";
import Navbar from "../../components/general/Navbar";
import LText from "../../components/text/LText";
import CardLeftBorder from "../../components/cards/CardLeftBorder";
import GapContainer from "../../components/general/GapContainer";
import SquareHome from "../../components/cards/SquareHome";
import { useNavigation } from "@react-navigation/native";

function Home(props) {
  const navigaiton = useNavigation();

  return (
    <SafeScreen>
      <ScrollScreen>
        <LText>Quick Peek</LText>
        <GapContainer style={styles.container}>
          <CardLeftBorder
            title={"Number of cars: "}
            data={2}
          />
          <CardLeftBorder
            title={"Appointments: "}
            data={1}
          />
          <CardLeftBorder
            title={"Due services: "}
            data={2}
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
            onPress={() => navigaiton.navigate("Shops")}
          />
          <SquareHome
            title={"History"}
            color={"pink"}
            icon={"folder-outline"}
            onPress={() => navigaiton.navigate("Bookings", { active: "past" })}
          />
        </GapContainer>

        {/* <PriBtn title={"logout"} onPress={handlePress} /> */}
      </ScrollScreen>
      <Navbar />
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
