import { StyleSheet, Text, Platform } from "react-native";

function AppText({ children, size, style, ...otherProps }) {
  return (
    <Text style={[{ fontSize: size }, styles.text, style]} {...otherProps}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: Platform.OS === "android" ? "roboto" : "San Francisco",
    letterSpacing: -0.5,
  },
});

export default AppText;
