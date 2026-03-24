import { StyleSheet } from "react-native";
import CardComp from "./CardComp";
import SquareInfo from "./SquareInfo";
import { capFirstLetter } from "../../functions/CapFirstLetterOfWord";
import { formatDate } from "../../functions/formatDate";
import GapContainer from "../general/GapContainer";
import PriBtn from "../general/PriBtn";
import CardLeftBorder from "./CardLeftBorder";
import { useNavigation } from "@react-navigation/native";
import { UseUser } from "../../context/UserContext";
import Reminder from "../general/Reminder";
import SimpleTitleText from "../general/SimpleTitleText";

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
  const { isShopOwner, userLocation, fetchUserLocation } = UseUser();

  const sendParams = {
    car: car,
    customer,
    parts,
    showBtn: true,
  };

  const handlePress = async () => {
    if (!userLocation) await fetchUserLocation();
    navigate.navigate("Shops", sendParams);
  };

  return (
    <CardComp style={styles.container}>
      <GapContainer>
        <GapContainer gap={20}>
          <SimpleTitleText
            text1={formatDate(dueBy.date)}
            text2={
              dueBy.mileage.toLocaleString() + " " + capFirstLetter(car?.unit)
            }
            title={capFirstLetter(car?.make) + " " + capFirstLetter(car?.name) + " - "+car?.plateNumber}
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
            // style={{ marginTop: 15 }}
            title={"Book"}
            onPress={handlePress}
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
