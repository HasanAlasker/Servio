import { StyleSheet } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import ScrollScreen from "../../components/general/ScrollScreen";
import Navbar from "../../components/general/Navbar";
import GapContainer from "../../components/general/GapContainer";
import SquareHome from "../../components/cards/SquareHome";
import { useNavigation } from "@react-navigation/native";
import OfflineModal from "../../components/general/OfflineModal";
import MText from "../../components/text/MText";
import RowCont from "../../components/general/RowCont";
import UsersDash from "../../components/general/UsersDash";
import QuickPeek from "../../components/general/QuickPeek";

function Home(props) {
  const navigaiton = useNavigation();

  return (
    <SafeScreen>
      <ScrollScreen>
        <GapContainer gap={40}>
          <UsersDash />
          <QuickPeek />

          {/* <GapContainer>
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
          </GapContainer>*/}
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
