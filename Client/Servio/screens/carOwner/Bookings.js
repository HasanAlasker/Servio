import React from "react";
import { View, StyleSheet } from "react-native";
import Navbar from "../../components/general/Navbar";
import FullScreen from "../../components/general/FullScreen";
import SafeScreen from "../../components/general/SafeScreen";

function Bookings(props) {
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

export default Bookings;
