import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import { UseUser } from "../../context/UserContext";
import PriBtn from "../../components/general/PriBtn";
import LText from "../../components/text/LText";
import OfflineModal from "../../components/general/OfflineModal";
import Navbar from "../../components/general/Navbar";
import ScrollScreen from "../../components/general/ScrollScreen";

function Dash(props) {
  const { user } = UseUser();
  return (
    <SafeScreen>
      <ScrollScreen style={styles.container}>

      </ScrollScreen>
      <Navbar />
      <OfflineModal />
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Dash;
