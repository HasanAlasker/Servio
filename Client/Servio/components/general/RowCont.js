import { View, StyleSheet } from "react-native";

function RowCont({ children, gap, style }) {
  return (
    <View style={[styles.container, { gap: gap || 6 }, style]}>{children}</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: 'center'
  },
});

export default RowCont;
