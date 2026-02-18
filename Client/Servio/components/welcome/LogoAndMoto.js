import { View, StyleSheet, Image } from "react-native";
import useThemedStyles from "../../hooks/useThemedStyles";
import LText from "../text/LText";
import SText from "../text/SText";

function LogoAndMoto({ moto }) {
  const styles = useThemedStyles(getStyles);

  return (
    <View style={styles.container}>
      <View style={styles.imgCont}>
        <Image source={require("../../assets/icon.png")} style={styles.img} />
      </View>
      <LText style={styles.text}>Servio</LText>
      {moto && (
        <SText color={"sec_text"} thin style={styles.text}>
          You won't need to remember anything about your car
        </SText>
      )}
    </View>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      width: "90%",
      marginHorizontal: "auto",
      gap: 10,
    },
    text: {
      textAlign: "center",
    },
    imgCont: {
      width: "35%",
      aspectRatio: 1,
      alignSelf: "center",
    },
    img: {
      width: "100%",
      height: "100%",
      resizeMode: "contain",
    },
  });

export default LogoAndMoto;
