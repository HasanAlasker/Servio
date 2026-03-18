import { StyleSheet } from "react-native";
import { UseUser } from "../../context/UserContext";
import CardLeftBorder from "../../components/cards/CardLeftBorder";
import GapContainer from "../../components/general/GapContainer";
import useApi from "../../hooks/useApi";
import { adminCountDocs } from "../../api/user";
import { useEffect } from "react";
import MText from "../../components/text/MText";
import SText from "../text/SText";

function AdminDash(props) {
  const { user } = UseUser();
  const { data, request, loading, error } = useApi(adminCountDocs);

  useEffect(() => {
    request();
  }, [user, error]);
  return (
    <GapContainer>
      <SText thin color={"sec_text"}>
        Metrics
      </SText>
      <CardLeftBorder
        title={"Shop Requests:"}
        titleIcon={"store-clock-outline"}
        data={loading ? "0" : data.shopRequests}
        style={styles.container}
      />
      <CardLeftBorder
        title={"Reports:"}
        titleIcon={"flag-outline"}
        data={loading ? "0" : data.reports}
        style={styles.container}
      />
      <CardLeftBorder
        title={"Suggestions:"}
        titleIcon={"lightbulb-outline"}
        data={loading ? "0" : data.suggestions}
        style={styles.container}
      />
      <CardLeftBorder
        title={"Active Users:"}
        titleIcon={"account-check-outline"}
        data={loading ? "0" : data.activeUsers}
        style={styles.container}
      />
      <CardLeftBorder
        title={"Car Owners:"}
        titleIcon={"car-outline"}
        data={loading ? "0" : data.carOwners}
        style={styles.container}
      />
      <CardLeftBorder
        title={"Shop Owners:"}
        titleIcon={"store-outline"}
        data={loading ? "0" : data.shopOwners}
        style={styles.container}
      />
      <CardLeftBorder
        title={"Deleted Users:"}
        titleIcon={"account-remove-outline"}
        data={loading ? "0" : data.deletedUsers}
        style={styles.container}
      />
      <CardLeftBorder
        title={"Active Shops:"}
        titleIcon={"storefront-outline"}
        data={loading ? "0" : data.activeShops}
        style={styles.container}
      />
      <CardLeftBorder
        title={"Deleted Shops:"}
        titleIcon={"store-remove-outline"}
        data={loading ? "0" : data.deletedShops}
        style={styles.container}
      />
      <CardLeftBorder
        title={"Registered Cars:"}
        titleIcon={"car-multiple"}
        data={loading ? "0" : data.cars}
        style={styles.container}
      />
    </GapContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
});

export default AdminDash;
