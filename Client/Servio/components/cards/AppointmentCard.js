import { View, StyleSheet } from "react-native";
import CardComp from "./CardComp";
import GapContainer from "../general/GapContainer";
import SquareInfo from "./SquareInfo";
import { capFirstLetter } from "../../functions/CapFirstLetterOfWord";

function AppointmentCard({ scheuledAt, status, car, shop, serviceParts }) {
  return (
    <CardComp>
      <GapContainer>
        <SquareInfo
          color={"lightBlue"}
          icon={"car-outline"}
          title={capFirstLetter(car?.make) + " " + capFirstLetter(car?.name)}
          text={car?.plateNumber}
        />
        <SquareInfo
          color={"pink"}
          icon={"map-marker-outline"}
          title={capFirstLetter(shop?.name)}
          text={shop?.address.area + " " + shop?.address.street}
        />
      </GapContainer>
    </CardComp>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AppointmentCard;
