import { View, StyleSheet, ScrollView } from "react-native";

function HorizontalScroll({ children }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.cont}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cont: {
    // paddingRight:25,
  },
});

export default HorizontalScroll;
