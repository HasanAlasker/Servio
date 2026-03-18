import { StyleSheet } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import ScrollScreen from "../../components/general/ScrollScreen";
import Navbar from "../../components/general/Navbar";
import GapContainer from "../../components/general/GapContainer";
import OfflineModal from "../../components/general/OfflineModal";
import UsersDash from "../../components/general/UsersDash";
import ShopInfo from "../../components/general/ShopInfo";
import HelloUser from "../../components/general/HelloUser";
import { UseShop } from "../../context/ShopContext";
import EmptyGarage from "../../components/general/EmptyGarage";

function Home(props) {
  const { shops } = UseShop();

  return (
    <SafeScreen>
      <ScrollScreen>
        <GapContainer gap={40}>
          <HelloUser />
          {shops.length > 0 && <UsersDash />}
          {shops.length > 0 && <ShopInfo />}
          {shops.length === 0 && (
            <EmptyGarage
              title={"You have no shops yet!"}
              text={"Open your first shop to start tracking appointments"}
              btn={"Open Shop"}
              navigateTo={"AddShop"}
            />
          )}
        </GapContainer>
      </ScrollScreen>
      <Navbar />
      <OfflineModal />
    </SafeScreen>
  );
}

export default Home;
