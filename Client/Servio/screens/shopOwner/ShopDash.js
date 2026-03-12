import { StyleSheet } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import ScrollScreen from "../../components/general/ScrollScreen";
import Navbar from "../../components/general/Navbar";
import GapContainer from "../../components/general/GapContainer";
import OfflineModal from "../../components/general/OfflineModal";
import UsersDash from "../../components/general/UsersDash";
import ShopInfo from "../../components/general/ShopInfo";
import HelloUser from "../../components/general/HelloUser";

function Home(props) {

  return (
    <SafeScreen>
      <ScrollScreen>
        <GapContainer gap={40}>
          <HelloUser />
          <UsersDash />
          <ShopInfo />
        </GapContainer>
      </ScrollScreen>
      <Navbar />
      <OfflineModal />
    </SafeScreen>
  );
}

export default Home;
