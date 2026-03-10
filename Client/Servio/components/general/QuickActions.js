import { View, StyleSheet, ScrollView } from "react-native";
import RowCont from "./RowCont";
import Pill from "./Pill";
import { UseUser } from "../../context/UserContext";

function QuickActions(props) {
  const { isAdmin, isUser, isShopOwner } = UseUser();

  if (isAdmin)
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <RowCont style={styles.container}>
          <Pill
            icon={"message-circle"}
            text={"FeedBack"}
            navigateTo={"Suggestions"}
          />
          <Pill icon={"folder"} text={"Reports"} navigateTo={"Reports"} />
          <Pill
            icon={"shopping-bag"}
            text={"Closed"}
            navigateTo={"DeletedShops"}
          />
        </RowCont>
      </ScrollView>
    );

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
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    justifyContent: "space-between",
  },
});

export default QuickActions;
