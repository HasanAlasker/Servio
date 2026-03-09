import { StyleSheet } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import ScrollScreen from "../../components/general/ScrollScreen";
import Navbar from "../../components/general/Navbar";
import GapContainer from "../../components/general/GapContainer";
import SquareHome from "../../components/cards/SquareHome";
import { useNavigation } from "@react-navigation/native";
import OfflineModal from "../../components/general/OfflineModal";
import MText from "../../components/text/MText";
import UsersDash from "../../components/general/UsersDash";
import QuickPeek from "../../components/general/QuickPeek";
import RowCont from "../../components/general/RowCont";
import ShopInfo from "../../components/general/ShopInfo";

function Home(props) {
  const navigaiton = useNavigation();

  return (
    <SafeScreen>
      <ScrollScreen>
        <GapContainer gap={40}>
          <UsersDash />
          <QuickPeek />
          <ShopInfo />

          <GapContainer>
            <MText thin color={"sec_text"}>
              Shop Info
            </MText>
            <RowCont style={styles.row}>
              <SquareHome
                title={"Add Car"}
                color={"lightBlue"}
                icon={"plus-circle-outline"}
                onPress={() => navigaiton.navigate("AddCar")}
              />

              <SquareHome
                title={"Services"}
                color={"green"}
                icon={"wrench-outline"}
                onPress={() => navigaiton.navigate("Service")}
              />
              <SquareHome
                title={"New"}
                color={"pink"}
                icon={"store-plus-outline"}
                onPress={() => navigaiton.navigate("AddShop")}
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
  container: {
    marginVertical: 30,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Home;
