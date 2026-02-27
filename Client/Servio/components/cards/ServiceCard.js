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
        <SquareInfo
          color={"lightBlue"}
          icon={"car"}
          title={capFirstLetter(car?.make) + " " + capFirstLetter(car?.name)}
          text={car?.plateNumber}
        />

        <View>
          <IconTextLabel
            icon={"calendar-blank-outline"}
            text={formatDate(dueBy.date)}
          />
          <IconTextLabel
            icon={"gauge"}
            text={dueBy.mileage.toLocaleString() + " " + capFirstLetter(car?.unit)}
          />
        </View>

        <Reminder
          isActive={sendNotifications}
          onPress={() => handleReminder(id, sendNotifications)}
        />

        <CardLeftBorder status={status} parts={parts} />

        {!isShopOwner && (
          <PriBtn
            full
            square
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
