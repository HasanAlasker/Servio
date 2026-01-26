import { View, StyleSheet, Image } from "react-native";
import CardComp from "./CardComp";
import LText from "../text/LText";
import MText from "../text/MText";
import SText from "../text/SText";
import RowCont from "../general/RowCont";
import SquareInfo from "./SquareInfo";
import { capFirstLetter } from "../../functions/CapFirstLetterOfWord";
import { useNavigation } from "@react-navigation/native";

function ShopCard({
  id,
  image,
  name,
  description,
  services,
  address,
  openHours,
  rating,
  ratingCount,
}) {
  const navigate = useNavigation();

  const passToApp = {
    id,
    name,
    services,
    address,
    openHours,
  };

  return (
    <CardComp style={styles.container}>
      {image && <Image style={styles.image} source={{ uri: image }} />}
      <View style={styles.textCont}>
        <MText>{capFirstLetter(name)}</MText>
        <SText color={"sec_text"}>{description}</SText>
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

export default ShopCard;
