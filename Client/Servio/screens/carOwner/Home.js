import { StyleSheet } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import ScrollScreen from "../../components/general/ScrollScreen";
import Navbar from "../../components/general/Navbar";
import GapContainer from "../../components/general/GapContainer";
import OfflineModal from "../../components/general/OfflineModal";
import UsersDash from "../../components/general/UsersDash";
import QuickPeek from "../../components/general/QuickPeek";

function Home(props) {
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
