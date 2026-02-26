import { View, StyleSheet, Image } from "react-native";
import CardComp from "./CardComp";
import MText from "../text/MText";
import SText from "../text/SText";
import RowCont from "../general/RowCont";
import SquareInfo from "./SquareInfo";
import { capFirstLetter } from "../../functions/CapFirstLetterOfWord";
import { useNavigation } from "@react-navigation/native";

function CarCard({
  id,
  image,
  make,
  name,
  model,
  plateNumber,
  color,
  mileage,
}) {
  const navigate = useNavigation();

  const passToEdit = {
    id,
    image,
    make,
    name,
    model,
    plateNumber,
    color,
    mileage,
  };

  return (
    <CardComp
      style={styles.container}
      onPress={() => {
        navigate.navigate("CarParts", passToEdit);
      }}
    >
      {image && <Image style={styles.image} source={{ uri: image }} />}
      <View style={styles.textCont}>
        <RowCont>
          <MText>{capFirstLetter(make)}</MText>
          <MText>{capFirstLetter(name)}</MText>
        </RowCont>
        <SText color={"sec_text"}>{plateNumber}</SText>
        {/* <MText thin style={{ marginVertical: 10 }}>
          {model}
        </MText> */}
        <RowCont gap={25} style={{ marginTop: 20, flexWrap: "wrap" }}>
          <SquareInfo
            icon={"gauge"}
            color={"lightBlue"}
            title={"Mileage"}
            text={`${mileage.toLocaleString()} Km`}
            fliped
          />

          <SquareInfo
            icon={"palette-outline"}
            color={"pink"}
            title={"Color"}
            text={capFirstLetter(color)}
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
    overflow: "hidden",
  },
  textCont: {
    paddingHorizontal: 22,
    paddingVertical: 25,
  },
  image: {
    width: "100%",
    aspectRatio: 31 / 20,
    objectFit: "cover",
  },
});

export default CarCard;
