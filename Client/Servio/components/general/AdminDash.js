import { StyleSheet } from "react-native";
import { UseUser } from "../../context/UserContext";
import CardLeftBorder from "../../components/cards/CardLeftBorder";
import GapContainer from "../../components/general/GapContainer";
import useApi from "../../hooks/useApi";
import { adminCountDocs } from "../../api/user";
import { useEffect } from "react";
import MText from "../../components/text/MText";

function AdminDash(props) {
  const { user } = UseUser();
  const { data, request, loading, error } = useApi(adminCountDocs);

  useEffect(() => {
    request();
  }, [user, error]);
  return (
    <GapContainer>
      <MText thin color={"sec_text"}>
        Metrics
      </MText>
      <CardLeftBorder
        title={"Shop Requests:"}
        titleIcon={"store-clock-outline"}
        data={loading ? "0" : data.shopRequests}
      />
      <CardLeftBorder
        title={"Reports:"}
        titleIcon={"flag-outline"}
        data={loading ? "0" : data.reports}
      />
      <CardLeftBorder
        title={"Suggestions:"}
        titleIcon={"lightbulb-outline"}
        data={loading ? "0" : data.suggestions}
      />
      <CardLeftBorder
        title={"Active Users:"}
        titleIcon={"account-check-outline"}
        data={loading ? "0" : data.activeUsers}
      />
      <CardLeftBorder
        title={"Car Owners:"}
        titleIcon={"car-outline"}
        data={loading ? "0" : data.carOwners}
      />
      <CardLeftBorder
        title={"Shop Owners:"}
        titleIcon={"store-outline"}
        data={loading ? "0" : data.shopOwners}
      />
      <CardLeftBorder
        title={"Deleted Users:"}
        titleIcon={"account-remove-outline"}
        data={loading ? "0" : data.deletedUsers}
      />
      <CardLeftBorder
        title={"Active Shops:"}
        titleIcon={"storefront-outline"}
        data={loading ? "0" : data.activeShops}
      />
      <CardLeftBorder
        title={"Deleted Shops:"}
        titleIcon={"store-remove-outline"}
        data={loading ? "0" : data.deletedShops}
      />
      <CardLeftBorder
        title={"Registered Cars:"}
        titleIcon={"car-multiple"}
        data={loading ? "0" : data.cars}
      />
    </GapContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AdminDash;
