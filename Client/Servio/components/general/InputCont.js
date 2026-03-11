import { View, StyleSheet } from "react-native";

function InputCont({ children }) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: { width: "90%", marginHorizontal: "auto", gap: 5 },
});

export default InputCont;
