import { View, StyleSheet, Image } from "react-native";
import CardComp from "./CardComp";
import LText from "../text/LText";
import MText from "../text/MText";
import SText from "../text/SText";
import RowCont from "../general/RowCont";
import SquareInfo from "./SquareInfo";
import { capFirstLetter } from "../../functions/CapFirstLetterOfWord";
import { useNavigation } from "@react-navigation/native";
import GapContainer from "../general/GapContainer";
import CardLeftBorder from "./CardLeftBorder";
import IconTextLabel from "../general/IconTextLabel";
import PriBtn from "../general/PriBtn";
import { useEffect, useState } from "react";

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
  const [days, setDays] = useState([]);

  
  useEffect(() => {
    setDays((prev) => prev.filter((day) => day.isOpen !== true));
  }, []);
  console.log(days);

  return (
    <CardComp style={styles.container}>
      {image && <Image style={styles.image} source={{ uri: image }} />}

      <View style={styles.textCont}>
        <GapContainer>
          <View>
            <MText>{capFirstLetter(name)}</MText>
            <SText color={"sec_text"}>{description}</SText>
          </View>

          <SquareInfo
            icon={"map-marker-outline"}
            color={"darkPink"}
            title={address.area + " " + address.street}
            text={address.city}
          />
          <SquareInfo
            icon={"star-outline"}
            color={"gold"}
            title={ratingCount === 0 ? "Not rated" : rating + "Star Rating"}
            text={ratingCount === 0 ? "No one rated this shop" : ratingCount}
          />

          <CardLeftBorder parts={services} status={"randomText"} />

          <PriBtn full square />
        </GapContainer>
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
