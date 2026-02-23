import { StyleSheet } from "react-native";
import SquareInfo from "./SquareInfo";
import SeparatorComp from "../general/SeparatorComp";
import GapContainer from "../general/GapContainer";
import CardComp from "./CardComp";
import { formatDate } from "../../functions/formatDate";
import { capFirstLetter } from "../../functions/CapFirstLetterOfWord";
import { useNavigation } from "@react-navigation/native";

function PartCard({ part }) {
  const navigate = useNavigation();

  const addMonthsToDate = (dateString, monthsToAdd) => {
    const date = new Date(dateString);
    date.setMonth(date.getMonth() + monthsToAdd);
    return date;
  };

  const passPart = {
    partId: part._id,
    partName: part.name,
    lastChangeDate: part.lastChangeDate,
    lastChangeMileage: part.lastChangeMileage,
    recommendedChangeInterval: {
      months: part.recommendedChangeInterval.months,
      miles: part.recommendedChangeInterval.miles,
    },
    isEdit: true,
  };

  return (
    <CardComp onPress={() => navigate.navigate("AddPart", passPart)}>
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
          icon={"calendar"}
          title={"Last Change Date"}
          text={formatDate(part?.lastChangeDate)}
          fliped
        />
        <SquareInfo
          color={"pink"}
          icon={"gauge"}
          title={"Last Change Mileage"}
          text={part?.lastChangeMileage.toLocaleString() + " Km"}
          fliped
        />
        <SeparatorComp children={"Next Change"} full />
        <SquareInfo
          color={"gold"}
          icon={"calendar"}
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
            (
              part?.lastChangeMileage + part.recommendedChangeInterval.miles
            ).toLocaleString() + " Km"
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
