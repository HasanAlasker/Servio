import { View, StyleSheet } from "react-native";
import RowCont from "./RowCont";
import Pill from "./Pill";
import { UseUser } from "../../context/UserContext";

function QuickActions(props) {
  const { isAdmin, isUser, isShopOwner } = UseUser();

  if (isUser)
    return (
      <RowCont style={styles.container}>
        <Pill icon={"plus-circle"} text={"Car"} navigateTo={"AddCar"} />
        <Pill
          icon={"folder"}
          text={"History"}
          navigateTo={"Bookings"}
          params={{ active: "2" }}
        />
        <Pill
          icon={"shopping-bag"}
          text={"Shops"}
          navigateTo={"Shops"}
          params={{ showBtn: false }}
        />
      </RowCont>
    );

  if (isShopOwner)
    return (
      <RowCont style={styles.container}>
        <Pill icon={"tool"} text={"Service"} navigateTo={"Service"} />
        <Pill icon={"plus-circle"} text={"Car"} navigateTo={"AddCar"} />
        <Pill icon={"plus-circle"} text={"Shop"} navigateTo={"AddShop"} />
      </RowCont>
    );

  if (isAdmin)
    return (
      <RowCont style={styles.container}>
        <Pill icon={"plus-circle"} text={"Car"} navigateTo={"AddCar"} />
        <Pill
          icon={"folder"}
          text={"History"}
          navigateTo={"Bookings"}
          params={{ active: "2" }}
        />
        <Pill
          icon={"shopping-bag"}
          text={"Shops"}
          navigateTo={"Shops"}
          params={{ showBtn: false }}
        />
      </RowCont>
    );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    justifyContent: "space-between",
  },
});

export default QuickActions;
