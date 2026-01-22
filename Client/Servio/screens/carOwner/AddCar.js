import React from "react";
import { View, StyleSheet } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import Navbar from "../../components/general/Navbar";
import FullScreen from "../../components/general/FullScreen";

function AddCar(props) {
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

export default AddCar;
