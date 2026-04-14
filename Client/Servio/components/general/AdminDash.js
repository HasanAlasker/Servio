import { StyleSheet } from "react-native";
import { UseUser } from "../../context/UserContext";
import CardLeftBorder from "../../components/cards/CardLeftBorder";
import GapContainer from "../../components/general/GapContainer";
import useApi from "../../hooks/useApi";
import { adminCountDocs } from "../../api/user";
import { useEffect } from "react";
import SText from "../text/SText";
import { PieChart } from "react-native-gifted-charts";
import { useTheme } from "../../context/ThemeContext";
import RowCont from "./RowCont";
import DonutCenter from "../charts/DonutCenter";
import Legend from "../charts/Legend";
import LegendCont from "../charts/LegendCont";

function AdminDash(props) {
  const { user } = UseUser();
  const { theme } = useTheme();
  const { data, request, loading, error } = useApi(adminCountDocs);

  // Safe fallback so the chart never gets 0/0 (gifted-charts renders blank on all-zero)
  const carOwners = data?.carOwners || 0;
  const shopOwners = data?.shopOwners || 0;
  const activeUsers = data?.activeUsers || 0;
  const deletedUsers = data?.deletedUsers || 0;
  const adminUsers = data?.adminUsers || 0;
  const total = activeUsers;

  const usersData =
    total > 0
      ? [
          {
            value: carOwners,
            color: theme.blue,
            label: "Car Owners",
          },
          {
            value: shopOwners,
            color: theme.green,
            label: "Shop Owners",
          },

          {
            value: adminUsers,
            color: theme.gold,
            label: "Admins",
          },
          {
            value: deletedUsers,
            color: theme.purple,
            label: "Deleted Users",
          },
        ]
      : [{ value: 1, color: theme.border ?? "#E0E0E0" }];

  useEffect(() => {
    request();
  }, [user, error]);
  return (
    <GapContainer>
      <SText thin color={"sec_text"}>
        Metrics
      </SText>

      <RowCont style={{ justifyContent: "space-between" }}>
        <PieChart
          data={usersData}
          donut
          innerCircleColor={theme.background}
          radius={90}
          innerRadius={58}
          centerLabelComponent={() => (
            <DonutCenter total={loading ? "..." : total} />
          )}
          strokeWidth={2}
          strokeColor={theme.background}
          animationDuration={600}
        />
        <LegendCont>
          {usersData[0].label &&
            usersData.map((d) => (
              <Legend
                key={d.label}
                color={d.color}
                label={d.label}
                value={d.value}
              />
            ))}
        </LegendCont>
      </RowCont>

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
