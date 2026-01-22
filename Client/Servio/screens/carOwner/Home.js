import { StyleSheet } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import PriBtn from "../../components/general/PriBtn";
import { UseUser } from "../../context/UserContext";
import ScrollScreen from "../../components/general/ScrollScreen";
import Navbar from "../../components/general/Navbar";
import LText from "../../components/text/LText";
import CardLeftBorder from "../../components/cards/CardLeftBorder";
import GapContainer from "../../components/general/GapContainer";

function Home(props) {
  const { logout } = UseUser();
  const handlePress = async () => {
    await logout();
    console.log("pressed");
  };
  return (
    <SafeScreen>
      <ScrollScreen>
        <LText>Quick Peek</LText>
        <GapContainer style={styles.container}>
          <CardLeftBorder
            title={"Number of cars: "}
            data={2}
            textColor={"blue"}
          />
          <CardLeftBorder
            title={"Appointments: "}
            data={1}
            textColor={"blue"}
          />
          <CardLeftBorder
            title={"Due services: "}
            data={2}
            textColor={"blue"}
          />
        </GapContainer>

        <LText>Quick Actions</LText>
        <GapContainer style={styles.container}>
          
        </GapContainer>

        <PriBtn title={"logout"} onPress={handlePress} />
      </ScrollScreen>
      <Navbar />
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 30,
  },
});

export default Home;
