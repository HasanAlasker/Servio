import { View, StyleSheet, Image } from "react-native";
import GapContainer from "./GapContainer";
import MText from "../text/MText";
import SText from "../text/SText";
import PriBtn from "./PriBtn";
import TText from "../text/TText";
import { useNavigation } from "@react-navigation/native";

function EmptyGarage(props) {
  const navigaiton = useNavigation();
  return (
    <View style={styles.container}>
      <GapContainer gap={20} style={{ marginVertical: "auto" }}>
        <GapContainer gap={5}>
          <View style={styles.imgCont}>
            <Image
              style={styles.img}
              source={require("../../assets/emptyGarage.png")}
            />
          </View>

          <SText style={{ textAlign: "center" }}>You have no cars yet!</SText>
          <TText style={{ textAlign: "center" }} thin color={"sec_text"}>
            Add your first car to start tracking maintenance
          </TText>
        </GapContainer>
        <PriBtn
          auto
          styleText={{ fontSize: 15 }}
          style={{ marginTop: 10, paddingHorizontal: 16 }}
          title={"Add Car"}
          onPress={() => navigaiton.navigate("AddCar")}
        />
      </GapContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    marginVertical: "auto",
  },
  imgCont: {
    width: "100%",
  },
  img: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
  },
});

export default EmptyGarage;
