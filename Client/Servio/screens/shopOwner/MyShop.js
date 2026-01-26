import React from "react";
import { View, StyleSheet } from "react-native";
import OfflineModal from "../../components/general/OfflineModal";

function MyShop(props) {
  return (
    <View style={styles.container}>
      <OfflineModal />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default MyShop;
