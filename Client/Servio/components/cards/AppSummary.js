import { View, StyleSheet } from "react-native";
import CardComp from "../../components/cards/CardComp";
import SquareInfo from "../../components/cards/SquareInfo";
import { capFirstLetter } from "../../functions/CapFirstLetterOfWord";
import CardLeftBorder from "../../components/cards/CardLeftBorder";
import GapContainer from "../general/GapContainer";
import MText from "../text/MText";

function AppSummary({ params }) {
  return (
    <>
      <CardComp short>
        <GapContainer gap={15}>
          <SquareInfo
            color={"lightBlue"}
            icon={"car"}
            fliped
            title={"Car"}
            text={
              capFirstLetter(params.car.make) +
              " " +
              capFirstLetter(params.car.name) +
              " - " +
              params.car.model
            }
          />
          <SquareInfo
            color={"green"}
            icon={"store"}
            fliped
            title={"Shop"}
            text={capFirstLetter(params.shop.name)}
          />
        </GapContainer>
        <GapContainer style={{ marginTop: 35 }}>
          <CardLeftBorder
            noPadding
            icon={"invoice-list-outline"}
            miniTitle={"Service Parts"}
            customColor={"sec_text"}
            status={"status"}
            parts={params.parts}
          />
        </GapContainer>
      </CardComp>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AppSummary;
