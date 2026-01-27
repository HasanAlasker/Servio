import { View, StyleSheet } from "react-native";
import SquareInfo from "./SquareInfo";
import SeparatorComp from "../general/SeparatorComp";
import GapContainer from "../general/GapContainer";
import CardComp from "./CardComp";
import { formatDate } from "../../functions/formatDate";
import { capFirstLetter } from "../../functions/CapFirstLetterOfWord";

function PartCard({part}) {
  const addMonthsToDate = (dateString, monthsToAdd) => {
    const date = new Date(dateString);
    date.setMonth(date.getMonth() + monthsToAdd);
    return date;
  };

  return (
    <CardComp>
      <GapContainer gap={15}>
        <SquareInfo
          color={"lightBlue"}
          icon={"car-door"}
          title={"Part Name"}
          text={capFirstLetter(part?.name)}
          fliped
        />
        <SquareInfo
          color={"green"}
          icon={"calendar-outline"}
          title={"Last Change Date"}
          text={formatDate(part?.lastChangeDate)}
          fliped
        />
        <SquareInfo
          color={"pink"}
          icon={"gauge"}
          title={"Last Change Mileage"}
          text={part?.lastChangeMileage + " Km"}
          fliped
        />
        <SeparatorComp children={"Next Change"} full />
        <SquareInfo
          color={"gold"}
          icon={"calendar-outline"}
          title={"Next Change Date"}
          text={formatDate(
            addMonthsToDate(
              part?.lastChangeDate,
              part?.recommendedChangeInterval.months,
            ),
          )}
          fliped
        />
        <SquareInfo
          color={"gold"}
          icon={"gauge"}
          title={"Next Change Mileage"}
          text={
            part?.lastChangeMileage +
            part.recommendedChangeInterval.miles +
            " Km"
          }
          fliped
        />
      </GapContainer>
    </CardComp>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default PartCard;
