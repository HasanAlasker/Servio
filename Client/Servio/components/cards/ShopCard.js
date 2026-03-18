import { View, StyleSheet, Image } from "react-native";
import CardComp from "./CardComp";
import MText from "../text/MText";
import SText from "../text/SText";
import SquareInfo from "./SquareInfo";
import { capFirstLetter } from "../../functions/CapFirstLetterOfWord";
import { useNavigation, useRoute } from "@react-navigation/native";
import GapContainer from "../general/GapContainer";
import CardLeftBorder from "./CardLeftBorder";
import PriBtn from "../general/PriBtn";
import { useEffect, useState } from "react";
import {
  formatDayRange,
  formatOpenDays,
} from "../../functions/formatOpenHours";
import { useTheme } from "../../context/ThemeContext";
import RowCont from "../general/RowCont";
import { Feather } from "@expo/vector-icons";

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
  isVerified = null,
  isDeleted = null,
  onAction,
  onVerify,
  onDelete,
  onCardPress,
  mini,
  serviceData,
}) {
  const { theme } = useTheme();
  const [showBtn, setShowBtn] = useState(false);
  const navigate = useNavigation();

  const route = useRoute();
  const shopData = { id, name };

  const params = {
    shop: shopData,
    car: serviceData?.car,
    customer: serviceData?.customer,
    parts: serviceData?.parts,
    showBtn: route?.params?.showBtn,
  };

  useEffect(() => {
    if (params?.showBtn) setShowBtn(params?.showBtn);
  }, []);

  const days = openHours.filter((day) => day.isOpen === true);
  const groupDays = formatOpenDays(days);

  const hadlePress = (type) => {
    onAction(type, id);
  };

  return (
    <CardComp style={styles.container} onPress={onCardPress}>
      {image && <Image style={styles.image} source={{ uri: image }} />}

      <View style={styles.textCont}>
        <GapContainer>
          <RowCont style={{ justifyContent: "space-between" }}>
            <GapContainer gap={10}>
              <MText>{capFirstLetter(name)}</MText>
              <SText color={"sec_text"}>{description}</SText>
            </GapContainer>
            <Feather
              name="chevron-right"
              color={theme.sec_text}
              size={25}
              style={{ alignSelf: "flex-start", top: 5 }}
            />
          </RowCont>

          {!mini && (
            <GapContainer gap={10}>
              <SquareInfo
                icon={"map-marker"}
                color={"red"}
                title={address.area + " " + address.street}
                text={address.city}
                flex
              />
              <SquareInfo
                icon={"star"}
                color={"gold"}
                title={ratingCount === 0 ? "Not rated" : rating + "Star Rating"}
                text={
                  ratingCount === 0 ? "No one rated this shop" : ratingCount
                }
              />
            </GapContainer>
          )}

          {!mini && (
            <View>
              {groupDays.map((group, index) => (
                <SText key={index}>
                  {formatDayRange(group)}: {group[0].from} - {group[0].to}
                </SText>
              ))}
            </View>
          )}

          {!mini && (
            <CardLeftBorder
              miniTitle={"Services"}
              customColor={"sec_text"}
              parts={services}
              status={"randomText"}
            />
          )}

          {showBtn && (
            <PriBtn
              full
              square
              title={"Reserve"}
              onPress={() => navigate.navigate("MakeAppointment", params)}
            />
          )}

          {isVerified !== null && (
            <GapContainer gap={15}>
              {!isVerified && (
                <PriBtn
                  full
                  square
                  title={"Verify"}
                  onPress={() => onVerify(id)}
                />
              )}

              {!isDeleted && (
                <PriBtn
                  full
                  square
                  title={"Delete"}
                  onPress={() => onDelete(id)}
                  red
                />
              )}
            </GapContainer>
          )}
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
