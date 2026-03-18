import { StyleSheet } from "react-native";
import SquareInfo from "./SquareInfo";
import SeparatorComp from "../general/SeparatorComp";
import GapContainer from "../general/GapContainer";
import CardComp from "./CardComp";
import { formatDate } from "../../functions/formatDate";
import { capFirstLetter } from "../../functions/CapFirstLetterOfWord";
import { useNavigation } from "@react-navigation/native";
import CardLeftBorder from "./CardLeftBorder";
import { UseCar } from "../../context/CarContext";
import SquareTitle from "../general/SquareTitle";
import SimpleTitleText from "../general/SimpleTitleText";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import RowCont from "../general/RowCont";

function PartCard({ part, parentParams, unit }) {
  const { cars } = UseCar();
  const navigate = useNavigation();
  const { theme } = useTheme();

  const car = cars.find((c) => c._id === parentParams?.id);

  const addMonthsToDate = (dateString, monthsToAdd) => {
    const date = new Date(dateString);
    date.setMonth(date.getMonth() + monthsToAdd);
    return date;
  };

  let nextChangeDate = addMonthsToDate(
    part?.lastChangeDate,
    part?.recommendedChangeInterval.months,
  );

  let nextChangeMileage =
    part?.lastChangeMileage + part.recommendedChangeInterval.miles;

  const passPart = {
    partId: part._id,
    partName: part.name,
    lastChangeDate: part.lastChangeDate,
    lastChangeMileage: part.lastChangeMileage,
    recommendedChangeInterval: {
      months: part.recommendedChangeInterval.months,
      miles: part.recommendedChangeInterval.miles,
    },
    note: part?.note,
    isEdit: true,
  };

  return (
    <CardComp
      onPress={() => navigate.navigate("AddPart", { passPart, parentParams })}
    >
      <GapContainer gap={8}>
        <RowCont style={{ justifyContent: "space-between" }}>
          <SquareTitle
            icon={"engine-outline"}
            title={capFirstLetter(part?.name)}
          />
          <Feather
            name="chevron-right"
            color={theme.sec_text}
            size={25}
            style={{ alignSelf: "center" }}
          />
        </RowCont>

        <SeparatorComp full color="faded" />
        <SimpleTitleText
          showStatus
          title={"Next Change"}
          text1={formatDate(nextChangeDate)}
          text2={
            nextChangeMileage.toLocaleString() + " " + capFirstLetter(unit)
          }
          carMileage={car?.mileage}
          nextChangeDate={nextChangeDate}
          nextChangeMileage={nextChangeMileage}
          recomendedMileage={part.recommendedChangeInterval.miles}
          recomendedMonths={part.recommendedChangeInterval.months}
        />
        <SeparatorComp full color="faded" />
        <SimpleTitleText
          title={"Last Change"}
          text1={formatDate(part?.lastChangeDate)}
          text2={
            part?.lastChangeMileage.toLocaleString() +
            " " +
            capFirstLetter(unit)
          }
        />
        {part?.note && <SeparatorComp full color="faded" />}
        {part?.note && <SimpleTitleText title={"Note"} text1={part?.note} />}
      </GapContainer>
    </CardComp>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default PartCard;
