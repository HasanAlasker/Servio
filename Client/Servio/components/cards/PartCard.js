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

function PartCard({ part, parentParams, unit }) {
  const { cars } = UseCar();
  const navigate = useNavigation();

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

  const isDangerDate = () => new Date() >= new Date(nextChangeDate);
  const isDangerMileage = () => car?.mileage >= nextChangeMileage;

  const isSoonDate = () => {
    const oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);
    return nextChangeDate <= oneMonthFromNow && nextChangeDate > new Date();
  };

  const isSoonMileage = () =>
    car?.mileage + 500 >= nextChangeMileage && car?.mileage < nextChangeMileage;

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
      <GapContainer gap={15}>
        <SquareInfo
          icon={"engine-outline"}
          title={"Part Name"}
          text={capFirstLetter(part?.name)}
          fliped
        />
        <SquareInfo
          icon={"calendar-outline"}
          title={"Last Change Date"}
          text={formatDate(part?.lastChangeDate)}
          fliped
        />
        <SquareInfo
          icon={"gauge"}
          title={"Last Change Mileage"}
          text={
            part?.lastChangeMileage.toLocaleString() +
            " " +
            capFirstLetter(unit)
          }
          fliped
        />
        <SeparatorComp children={"Next Change"} full />
        <SquareInfo
          danger={isDangerDate()}
          soon={isSoonDate()}
          icon={"calendar"}
          title={"Next Change Date"}
          text={formatDate(nextChangeDate)}
          fliped
        />
        <SquareInfo
          danger={isDangerMileage()}
          soon={isSoonMileage()}
          icon={"gauge"}
          title={"Next Change Mileage"}
          text={nextChangeMileage.toLocaleString() + " " + capFirstLetter(unit)}
          fliped
        />
        {part?.note && (
          <CardLeftBorder
            icon={"information-outline"}
            miniTitle={"Note"}
            customColor={"sec_text"}
            status={"s"}
            customText={part.note}
          />
        )}
      </GapContainer>
    </CardComp>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default PartCard;
