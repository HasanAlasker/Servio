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
