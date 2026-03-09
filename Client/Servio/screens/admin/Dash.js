import { StyleSheet } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import OfflineModal from "../../components/general/OfflineModal";
import Navbar from "../../components/general/Navbar";
import ScrollScreen from "../../components/general/ScrollScreen";
import GapContainer from "../../components/general/GapContainer";
import SquareHome from "../../components/cards/SquareHome";
import { useNavigation } from "@react-navigation/native";
import HelloUser from "../../components/general/HelloUser";
import MText from "../../components/text/MText";
import RowCont from "../../components/general/RowCont";
import AdminDash from "../../components/general/AdminDash";

function Dash(props) {
  const navigate = useNavigation();

  return (
    <SafeScreen>
      <ScrollScreen>
        <GapContainer gap={40}>
          <HelloUser />

          <GapContainer>
            <MText thin color={"sec_text"}>
              Quick Actions
            </MText>
            <RowCont style={styles.row}>
              <SquareHome
                color={"lightBlue"}
                icon={"store-remove-outline"}
                title={"Deleted"}
                onPress={() => navigate.navigate("DeletedShops")}
              />
              <SquareHome
                color={"green"}
                icon={"chat-outline"}
                title={"Received"}
                onPress={() => navigate.navigate("SeeSuggestions")}
              />

              <SquareHome
                color={"pink"}
                icon={"close-circle-outline"}
                title={"Closed"}
                onPress={() => navigate.navigate("Reports")}
              />
            </RowCont>
            <AdminDash />
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

export default Dash;
