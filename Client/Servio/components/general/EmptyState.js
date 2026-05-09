import { View, StyleSheet, Dimensions } from "react-native";
import TText from "../text/TText";
import LottieView from "../onboarding/LottieView";
import SText from "../text/SText";

const { height, width } = Dimensions.get("window");

function EmptyState({
  text,
  lottie,
  loop = false,
  animationHeight,
  moveTextUp,
}) {
  return (
    <View style={styles.container}>
      <LottieView
        style={[styles.lottie, { height: animationHeight || 250 }]}
        source={lottie}
        autoPlay
        loop={loop}
        speed={0.8}
      />
      <SText thin color={"sec_text"} style={{ bottom: moveTextUp || 0, textAlign:'center' }}>
        {text}
      </SText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: height / 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  lottie: {
    width: width * 0.9,
  },
});

export default EmptyState;
