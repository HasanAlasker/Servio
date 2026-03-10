import { ScrollView, StyleSheet } from "react-native";
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
import QuickActions from "../../components/general/QuickActions";

function Dash(props) {
  const navigate = useNavigation();

  return (
    <SafeScreen>
      <ScrollScreen>
        <GapContainer gap={40}>
          <HelloUser />
          <QuickActions />
          <AdminDash />
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
