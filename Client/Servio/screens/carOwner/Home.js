import React from "react";
import { View, StyleSheet, Text } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import PriBtn from "../../components/general/PriBtn";
import { UseUser } from "../../context/UserContext";
import ScrollScreen from "../../components/general/ScrollScreen";
import FullScreen from "../../components/general/FullScreen";
import Navbar from "../../components/general/Navbar";

function Home(props) {
  const { logout } = UseUser();
  const handlePress = async () => {
    await logout();
    console.log("pressed");
  };
  return (
    <SafeScreen>
      <ScrollScreen>
        <FullScreen></FullScreen>
      </ScrollScreen>
      <Navbar />
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Home;
