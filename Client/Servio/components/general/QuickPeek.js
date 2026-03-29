import { View, StyleSheet } from "react-native";
import GapContainer from "./GapContainer";
import CardLeftBorder from "../cards/CardLeftBorder";
import { UseCar } from "../../context/CarContext";
import { UseAppointment } from "../../context/AppointmentContext";
import { UseService } from "../../context/ServiceContext";
import { UseUser } from "../../context/UserContext";
import SText from "../text/SText";

function QuickPeek(props) {
  const { isShopOwner } = UseUser();
  const { cars } = UseCar();
  const { countAppointments } = UseAppointment();
  const { countDueServices } = UseService();
  return (
    <GapContainer gap={20}>
      <SText thin color={"sec_text"}>
        Quick Peek
      </SText>

      <View style={styles.grid}>
        <CardLeftBorder
          title={"Cars: "}
          titleIcon={"archive"}
          data={cars?.length}
          style={styles.container}
        />
        <CardLeftBorder
          title={"Due: "}
          titleIcon={"alert-circle"}
          data={countDueServices()}
          style={styles.container}
        />
        {!isShopOwner && (
          <CardLeftBorder
            title={"Bookings: "}
            titleIcon={"book-open"}
            data={countAppointments()}
            style={styles.container}
          />
        )}
      </View>
    </GapContainer>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    gap: 20,
  },
  container: {
    flexGrow: 1,
    
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

export default QuickPeek;
