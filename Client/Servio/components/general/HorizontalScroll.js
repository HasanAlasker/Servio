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
  container: {},
});

export default HorizontalScroll;
