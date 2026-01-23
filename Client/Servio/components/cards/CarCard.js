import { View, StyleSheet, Image } from "react-native";
import CardComp from "./CardComp";
import LText from "../text/LText";
import MText from "../text/MText";
import SText from "../text/SText";
import RowCont from "../general/RowCont";
import SquareInfo from "./SquareInfo";
import { capFirstLetter } from "../../functions/CapFirstLetterOfWord";

function CarCard({ image, make, name, model, plateNumber, color, mileage }) {

  return (
    <CardComp style={styles.container}>
      {image && <Image src={image} />}
      <View style={styles.textCont}>
        <RowCont>
          <MText>{capFirstLetter(make)}</MText>
          <MText>{capFirstLetter(name)}</MText>
        </RowCont>
        <SText color={"sec_text"}>{plateNumber}</SText>
        <RowCont gap={25} style={{ marginTop: 20 }}>
          <SquareInfo
            icon={"gauge"}
            color={"lightBlue"}
            title={"Mileage"}
            text={`${mileage} Km`}
            fliped
          />

          <SquareInfo
            icon={"palette-outline"}
            color={"pink"}
            title={"Color"}
            text={color}
            fliped
          />
        </RowCont>
      </View>
    </CardComp>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  textCont: {
    paddingHorizontal: 22,
    paddingVertical: 25,
  },
});

export default CarCard;
