import { View, StyleSheet, ScrollView } from "react-native";
import RowCont from "./RowCont";
import Pill from "./Pill";
import { UseUser } from "../../context/UserContext";
import HorizontalScroll from "./HorizontalScroll";

function QuickActions(props) {
  const { isAdmin, isUser, isShopOwner } = UseUser();

  if (isAdmin)
    return (
      <HorizontalScroll>
        <RowCont style={styles.container}>
          <Pill
            icon={"message-circle"}
            text={"FeedBack"}
            navigateTo={"SeeSuggestions"}
          />
          <Pill icon={"folder"} text={"Reports"} navigateTo={"Reports"} />
          <Pill
            icon={"shopping-bag"}
            text={"Closed"}
            navigateTo={"DeletedShops"}
          />
        </RowCont>
      </HorizontalScroll>
    );

  if (isUser)
    return (
      <HorizontalScroll>
        <RowCont style={styles.container}>
          <Pill
            icon={"folder"}
            text={"History"}
            navigateTo={"Bookings"}
            params={{ active: "2" }}
          />
          <Pill icon={"plus-circle"} text={"Car"} navigateTo={"AddCar"} />
          <Pill
            icon={"shopping-bag"}
            text={"Shops"}
            navigateTo={"Shops"}
            params={{ showBtn: false }}
          />
        </RowCont>
      </HorizontalScroll>
    );

  if (isShopOwner)
    return (
      <HorizontalScroll>
        <RowCont style={styles.container}>
          <Pill icon={"tool"} text={"Service"} navigateTo={"Service"} />
          <Pill icon={"plus-circle"} text={"Car"} navigateTo={"AddCar"} />
          <Pill icon={"plus-circle"} text={"Shop"} navigateTo={"AddShop"} />
        </RowCont>
      </HorizontalScroll>
    );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    gap: 15,
  },
});

export default QuickActions;
