import { View, StyleSheet } from "react-native";

function GapContainer({ children, gap, style }) {
  return (
    <View style={[styles.container, style, { gap: gap ? gap : 25 }]}>{children}</View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
});

export default GapContainer;
