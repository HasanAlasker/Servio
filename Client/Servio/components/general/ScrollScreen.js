import { StyleSheet, ScrollView } from "react-native";

function ScrollScreen({ children, ...other }) {
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 40, paddingTop: 20 }}
      {...other}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    marginHorizontal: "auto",
  },
});

export default ScrollScreen;
