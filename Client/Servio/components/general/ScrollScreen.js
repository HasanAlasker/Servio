import { StyleSheet, ScrollView } from "react-native";

function ScrollScreen({
  children,
  stickyHeader,
  stickyHeaderIndices,
  ...other
}) {
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 40, paddingTop: 20 }}
      scrollEventThrottle={30}
      stickyHeaderIndices={stickyHeaderIndices}
      stickyHeaderHiddenOnScroll={stickyHeader}
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
