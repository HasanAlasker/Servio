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

function Dash(props) {
  const { user } = UseUser();
  const { data, request, loading, error } = useApi(adminCountDocs);

  useEffect(() => {
    request();
  }, [user, error]);

  console.log(data);

  return (
    <SafeScreen>
      <ScrollScreen>
        <GapContainer>
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
  container: {},
});

export default Dash;
