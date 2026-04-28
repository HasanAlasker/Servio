import { StyleSheet } from "react-native";
import CardLeftBorder from "./CardLeftBorder";

function InfoCard({ title, text, red }) {
  return (
    <CardLeftBorder
      transparent
      icon={red ? "alert-outline":"information-outline"}
      customColor={red ? "red" : "blue"}
      customTextColor={red ? "red" : "blue"}
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
