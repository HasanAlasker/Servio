import { View, StyleSheet } from "react-native";

function GapContainer({ children, style }) {
  return <View style={[styles.container, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
});

export default GapContainer;
