import { View, StyleSheet } from "react-native";
import CardComp from "./CardComp";
import GapContainer from "../general/GapContainer";
import SquareInfo from "./SquareInfo";
import { capFirstLetter } from "../../functions/CapFirstLetterOfWord";
import SeparatorComp from "../general/SeparatorComp";
import SText from "../text/SText";

function AppointmentCard({ scheuledAt, status, car, shop, serviceParts }) {
  const partsList = serviceParts?.map((part) => (
    <SText thin>{capFirstLetter(part.name)}</SText>
  ));
  console.log(partsList);
  return (
    <CardComp>
      <GapContainer gap={12}>
        <SquareInfo
          color={"lightBlue"}
          icon={"car-outline"}
          title={capFirstLetter(car?.make) + " " + capFirstLetter(car?.name)}
          text={car?.plateNumber}
        />
        <SquareInfo
          color={"darkPink"}
          icon={"map-marker-outline"}
          title={capFirstLetter(shop?.name)}
          text={shop?.address.area + " " + shop?.address.street}
        />
        <View>
          <SeparatorComp children={"Service Parts"} full color="sec_text" />
          {partsList}
        </View>
      </GapContainer>
    </CardComp>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AppointmentCard;
