import { View, StyleSheet, Image } from "react-native";
import CardComp from "./CardComp";
import MText from "../text/MText";
import SText from "../text/SText";
import RowCont from "../general/RowCont";
import SquareInfo from "./SquareInfo";
import { capFirstLetter } from "../../functions/CapFirstLetterOfWord";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import GapContainer from "../general/GapContainer";

function CarCard({
  id,
  image,
  make,
  name,
  model,
  plateNumber,
  color,
  mileage,
  unit,
}) {
  const navigate = useNavigation();
  const { theme } = useTheme();

  const passToEdit = {
    id,
    image,
    make,
    name,
    model,
    plateNumber,
    color,
    mileage,
    unit,
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
        <RowCont style={{ justifyContent: "space-between" }}>
          <GapContainer gap={3}>
            <RowCont>
              <MText>{capFirstLetter(make)}</MText>
              <MText>{capFirstLetter(name)}</MText>
            </RowCont>
            <SText color={"sec_text"}>{plateNumber}</SText>
          </GapContainer>

          <Feather
            name="chevron-right"
            color={theme.sec_text}
            size={30}
            style={{alignSelf:"flex-start", top:5}}
          />
        </RowCont>

        <RowCont gap={25} style={{ marginTop: 20, flexWrap: "wrap" }}>
          <SquareInfo
            icon={"gauge"}
            color={"lightBlue"}
            title={"Mileage"}
            text={`${mileage.toLocaleString() + " " + capFirstLetter(unit)}`}
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
