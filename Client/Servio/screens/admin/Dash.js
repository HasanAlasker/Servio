import { StyleSheet } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import { UseUser } from "../../context/UserContext";
import OfflineModal from "../../components/general/OfflineModal";
import Navbar from "../../components/general/Navbar";
import ScrollScreen from "../../components/general/ScrollScreen";
import CardLeftBorder from "../../components/cards/CardLeftBorder";
import GapContainer from "../../components/general/GapContainer";
import useApi from "../../hooks/useApi";
import { adminCountDocs } from "../../api/user";
import { useEffect } from "react";
import LText from "../../components/text/LText";
import SquareHome from "../../components/cards/SquareHome";
import { useNavigation } from "@react-navigation/native";

function Dash(props) {
  const { user } = UseUser();
  const { data, request, loading, error } = useApi(adminCountDocs);

  const navigate = useNavigation()

  useEffect(() => {
    request();
  }, [user, error]);

  return (
    <SafeScreen>
      <ScrollScreen>
        <LText>Quick Actions</LText>
        <GapContainer style={[styles.container, styles.row]}>
          <SquareHome
            color={"lightBlue"}
            icon={"store-remove-outline"}
            title={"Deleted"}
            onPress={()=> navigate.navigate("DeletedShops")}
          />
          <SquareHome
            color={"green"}
            icon={"chat-outline"}
            title={"Sent"}
            onPress={()=> navigate.navigate("SeeSuggestions")}
          />
        </GapContainer>
        <LText>Metrics</LText>
        <GapContainer style={styles.container}>
          <CardLeftBorder
            title={"Shop Requests:"}
            data={loading ? "..." : data.shopRequests}
          />
          <CardLeftBorder
            title={"Reports:"}
            data={loading ? "..." : data.reports}
          />
          <CardLeftBorder
            title={"Suggestions:"}
            data={loading ? "..." : data.suggestions}
          />
          <CardLeftBorder
            title={"Active Users:"}
            data={loading ? "..." : data.activeUsers}
          />
          <CardLeftBorder
            title={"Car Owners:"}
            data={loading ? "..." : data.carOwners}
          />
          <CardLeftBorder
            title={"Shop Owners:"}
            data={loading ? "..." : data.shopOwners}
          />
          <CardLeftBorder
            title={"Deleted Users:"}
            data={loading ? "..." : data.deletedUsers}
          />
          <CardLeftBorder
            title={"Active Shops:"}
            data={loading ? "..." : data.activeShops}
          />
          <CardLeftBorder
            title={"Deleted Shops:"}
            data={loading ? "..." : data.deletedShops}
          />
          <CardLeftBorder
            title={"Registered Cars:"}
            data={loading ? "..." : data.cars}
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

export default Dash;
