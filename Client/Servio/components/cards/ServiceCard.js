import { View, StyleSheet } from "react-native";
import CardComp from "./CardComp";
import SquareInfo from "./SquareInfo";
import { capFirstLetter } from "../../functions/CapFirstLetterOfWord";
import IconTextLabel from "../general/IconTextLabel";
import { formatDate } from "../../functions/formatDate";
import GapContainer from "../general/GapContainer";
import PriBtn from "../general/PriBtn";
import CardLeftBorder from "./CardLeftBorder";
import { useNavigation } from "@react-navigation/native";
import { UseUser } from "../../context/UserContext";
import Reminder from "../general/Reminder";
import { getTimeFromDate } from "../../functions/fromatTime";

function ServiceCard({
  id,
  car,
  customer,
  dueBy,
  parts,
  status,
  sendNotifications,
  handleReminder,
}) {
  const navigate = useNavigation();
  const { isShopOwner } = UseUser();

  const sendParams = {
    car: car,
    customer,
    parts,
    showBtn: true,
  };

  return (
    <CardComp style={styles.container}>
      <GapContainer>
        <GapContainer gap={20}>
          <SquareInfo
            color={"lightBlue"}
            icon={"car-outline"}
            title={capFirstLetter(car?.make) + " " + capFirstLetter(car?.name)}
            text={car?.plateNumber}
          />

          <SquareInfo
            color={"green"}
            icon={"calendar-outline"}
            title={formatDate(dueBy.date)}
            text={"Change Date"}
            flex
          />

          <SquareInfo
            color={"green"}
            icon={"clock-outline"}
            title={
              dueBy.mileage.toLocaleString() + " " + capFirstLetter(car?.unit)
            }
            text={"Change Mileage"}
            flex
          />
        </GapContainer>

        <Reminder
          isActive={sendNotifications}
          onPress={() => handleReminder(id, sendNotifications)}
        />

        <CardLeftBorder status={status} parts={parts} />

        {!isShopOwner && (
          <PriBtn
            full
            square
            black
            style={{ marginTop: 15 }}
            title={"Book Appointment"}
            onPress={() => navigate.navigate("Shops", sendParams)}
          />
        )}
      </GapContainer>
    </CardComp>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ServiceCard;
