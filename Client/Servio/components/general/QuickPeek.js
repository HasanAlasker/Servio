import { View, StyleSheet } from "react-native";
import GapContainer from "./GapContainer";
import MText from "../text/MText";
import CardLeftBorder from "../cards/CardLeftBorder";
import { UseCar } from "../../context/CarContext";
import { UseAppointment } from "../../context/AppointmentContext";
import { UseService } from "../../context/ServiceContext";

function QuickPeek(props) {
  const { cars } = UseCar();
  const { countAppointments } = UseAppointment();
  const { countDueServices } = UseService();
  return (
    <GapContainer>
      <MText thin color={"sec_text"}>
        Quick Peek
      </MText>

      <CardLeftBorder title={"Cars: "} titleIcon={"car"} data={cars?.length} />
      <CardLeftBorder
        title={"Due: "}
        titleIcon={"clock-outline"}
        data={countDueServices()}
      />
      <CardLeftBorder
        title={"Bookings: "}
        titleIcon={"calendar-blank"}
        data={countAppointments()}
      />
    </GapContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default QuickPeek;
