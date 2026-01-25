import { View, StyleSheet } from "react-native";
import CardComp from "./CardComp";
import SquareInfo from "./SquareInfo";
import { capFirstLetter } from "../../functions/CapFirstLetterOfWord";
import IconTextLabel from "../general/IconTextLabel";
import { formatDate } from "../../functions/formatDate";
import GapContainer from "../general/GapContainer";
import PriBtn from "../general/PriBtn";

function ServiceCard({ car, dueBy, parts, status }) {
  return (
    <CardComp style={styles.container}>
      <GapContainer>
        <SquareInfo
          color={"lightBlue"}
          icon={"car-outline"}
          title={capFirstLetter(car?.make) + " " + capFirstLetter(car?.name)}
          text={car?.plateNumber}
        />

        <View>
          <IconTextLabel
            icon={"calendar-blank-outline"}
            text={formatDate(dueBy.date)}
          />
          <IconTextLabel icon={"gauge"} text={dueBy.mileage + " Km"} />
        </View>

        <PriBtn full title={"Book Appointment"}/>
      </GapContainer>
    </CardComp>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ServiceCard;
