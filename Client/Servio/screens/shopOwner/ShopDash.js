import { StyleSheet } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import ScrollScreen from "../../components/general/ScrollScreen";
import Navbar from "../../components/general/Navbar";
import LText from "../../components/text/LText";
import CardLeftBorder from "../../components/cards/CardLeftBorder";
import GapContainer from "../../components/general/GapContainer";
import SquareHome from "../../components/cards/SquareHome";
import { useNavigation } from "@react-navigation/native";
import useApi from "../../hooks/useApi";
import { countDocs, shopCountDocs } from "../../api/user";
import { useEffect } from "react";
import OfflineModal from "../../components/general/OfflineModal";
import { UseUser } from "../../context/UserContext";
import RowCont from "../../components/general/RowCont";

function Home(props) {
  const navigaiton = useNavigation();
  const { user } = UseUser;

  const { data, request: fetchDocs, loading, error } = useApi(countDocs);

  const {
    data: shopData,
    request: fetchShop,
    loading: loadingShop,
    error: errShop,
  } = useApi(shopCountDocs);

  useEffect(() => {
    fetchDocs();
    fetchShop();
  }, [user, error]);

  return (
    <SafeScreen>
      <ScrollScreen>
        <LText>Quick Actions</LText>
        <GapContainer style={[styles.container, styles.row]}>
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
        </GapContainer>
        
        <LText>Shop Info</LText>
        <GapContainer style={styles.container}>
          <CardLeftBorder
            title={"Active Shops: "}
            data={loading ? "..." : shopData.activeShops}
          />
          {shopData.newShops > 0 && (
            <CardLeftBorder
              title={"Unverified Shops: "}
              data={loading ? "..." : shopData.newShops}
            />
          )}
          <CardLeftBorder
            title={"Pending Appointments: "}
            data={loading ? "..." : shopData.requests}
          />
        </GapContainer>
        <LText>Personal Info</LText>
        <GapContainer style={styles.container}>
          <CardLeftBorder
            title={"Number of cars: "}
            data={loading ? "..." : data.cars}
          />
          <CardLeftBorder
            title={"Due services: "}
            data={loading ? "..." : data.services}
          />
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
