import { View, StyleSheet } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import ScrollScreen from "../../components/general/ScrollScreen";
import Navbar from "../../components/general/Navbar";
import OfflineModal from "../../components/general/OfflineModal";

function ShopDash(props) {
  return (
    <SafeScreen>
      <ScrollScreen></ScrollScreen>
      <Navbar />
      <OfflineModal />
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ShopDash;
