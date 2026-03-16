import { View, StyleSheet } from "react-native";
import CardLeftBorder from "./CardLeftBorder";

function InfoCard({ title, text }) {
  return (
    <CardLeftBorder
      icon={"information-outline"}
      customColor={"blue"}
      customTextColor={"blue"}
      miniTitle={title}
      customText={text}
      status={" "}
    />
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default InfoCard;
