import { View, StyleSheet } from "react-native";

function BackContainer({ children, style }) {
  return <View style={[styles.container, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginHorizontal: "auto",
    marginVertical: 25,
  },
});

export default BackContainer;
