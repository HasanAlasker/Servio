import { View, StyleSheet } from "react-native";

function GapContainer({ children, gap, style, flex }) {
  return (
    <View
      style={[
        styles.container,
        style,
        { gap: gap ? gap : 25, flex: flex ? 1 : "none" },
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
    flex: 1,
  },
});

export default GapContainer;
