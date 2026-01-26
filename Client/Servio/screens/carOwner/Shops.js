import React from "react";
import { View, StyleSheet } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import FullScreen from "../../components/general/FullScreen";
import Navbar from "../../components/general/Navbar";
import ScrollScreen from "../../components/general/ScrollScreen";
import ShopCard from "../../components/cards/ShopCard";

function Shops(props) {
  return (
    <SafeScreen>
      <ScrollScreen>
        <ShopCard description={"Hello World"} name={"Cars2"} address={"Albayader"} openHours={"fasd"}/>
      </ScrollScreen>
      <Navbar />
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Shops;
