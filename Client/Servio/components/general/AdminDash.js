import { StyleSheet } from "react-native";
import { UseUser } from "../../context/UserContext";
import CardLeftBorder from "../../components/cards/CardLeftBorder";
import GapContainer from "../../components/general/GapContainer";
import useApi from "../../hooks/useApi";
import { adminCountDocs, deleteUser } from "../../api/user";
import { useEffect } from "react";
import SText from "../text/SText";
import { useTheme } from "../../context/ThemeContext";
import RowCont from "./RowCont";
import DonutCenter from "../charts/DonutCenter";
import Legend from "../charts/Legend";
import LegendCont from "../charts/LegendCont";
import Animated, {
  LinearTransition,
  SlideInDown,
  SlideInLeft,
  SlideInUp,
} from "react-native-reanimated";
import CardComp from "../cards/CardComp";
import PieChartComp from "../charts/PieChartComp";
import { useAdminStore } from "../../store/admin/useAdminStore";

function AdminDash(props) {
  const { user } = UseUser();
  const { theme } = useTheme();
  const {
    dashboard: data,
    loadDashboard,
    loading,
    error,
    message,
  } = useAdminStore();

  // Safe fallback so the chart never gets 0/0 (gifted-charts renders blank on all-zero)
  const carOwners = data?.carOwners || 0;
  const shopOwners = data?.shopOwners || 0;
  const activeUsers = data?.activeUsers || 0;
  const deletedUsers = data?.deletedUsers || 0;
  const adminUsers = data?.adminUsers || 0;
  const totalUsers = activeUsers + deletedUsers;

  const activeShops = data?.activeShops || 0;
  const deletedShops = data?.deletedShops || 0;
  const shopRequests = data?.shopRequests || 0;
  const totalShops = activeShops + deletedShops + shopRequests;

  const usersData =
    totalUsers > 0
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
      : [{ value: 1, color: theme.loading }];

  const shopsData =
    totalShops > 0
      ? [
          {
            value: activeShops,
            color: theme.green,
            label: "Active Shops",
          },
          {
            value: shopRequests,
            color: theme.gold,
            label: "Shop Requests",
          },
          {
            value: deletedShops,
            color: theme.purple,
            label: "DeletedShops",
          },
        ]
      : [{ value: 1, color: theme.loading }];

  return (
    <GapContainer>
      <SText thin color={"sec_text"}>
        Metrics
      </SText>

      {!loading && (
        <PieChartComp data={usersData} loading={loading} total={totalUsers} />
      )}
      {!loading && (
        <PieChartComp data={shopsData} loading={loading} total={totalShops} />
      )}

      <CardLeftBorder
        title={"Reports:"}
        titleIcon={"flag-outline"}
        data={loading || !data ? "0" : data.reports}
        style={styles.container}
      />
      <CardLeftBorder
        title={"Suggestions:"}
        titleIcon={"lightbulb-outline"}
        data={loading || !data ? "0" : data.suggestions}
        style={styles.container}
      />
      <CardLeftBorder
        title={"Registered Cars:"}
        titleIcon={"car-multiple"}
        data={loading || !data ? "0" : data.cars}
        style={styles.container}
      />
    </GapContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.14)",
  },
});

export default AdminDash;
