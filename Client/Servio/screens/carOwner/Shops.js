import React from "react";
import { View, StyleSheet } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import FullScreen from "../../components/general/FullScreen";
import Navbar from "../../components/general/Navbar";

function Shops(props) {
  return (
    <SafeScreen>
      <View style={styles.container}></View>
      <FullScreen />
      <Navbar />
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Shops;
