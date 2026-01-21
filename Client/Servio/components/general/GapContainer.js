import { View, StyleSheet } from "react-native";

function GapContainer({ children }) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
});

export default GapContainer;
