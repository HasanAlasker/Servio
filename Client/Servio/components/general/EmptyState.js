import { View, StyleSheet, Dimensions, useWindowDimensions } from "react-native";
import LottieView from "../onboarding/LottieView";
import SText from "../text/SText";

function EmptyState({
  text,
  lottie,
  loop = false,
  animationHeight,
  moveTextUp,
  lottieStyle,
}) {
  const { width, height } = useWindowDimensions();

  const flatLottieStyle = StyleSheet.flatten([
    { width: width * 0.9, height: animationHeight || 250 },
    lottieStyle,
  ]);

  return (
    <View style={[styles.container, { height: height / 1.5 }]}>
      <LottieView
        style={flatLottieStyle}
        source={lottie}
        autoPlay
        loop={loop}
        speed={0.8}
      />
      <SText
        thin
        color={"sec_text"}
        style={{ bottom: moveTextUp || 0, textAlign: "center" }}
      >
        {text}
      </SText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default EmptyState;