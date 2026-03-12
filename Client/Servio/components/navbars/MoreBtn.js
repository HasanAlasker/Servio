import { View, StyleSheet } from "react-native";
import NavBtn from "./NavBtn";
import { Feather } from "@expo/vector-icons";

function MoreBtn({ onMenu }) {
  return (
    <NavBtn
      name="More"
      icon={<Feather name="more-horizontal" size={26} />}
      isSettings
      onPress={onMenu}
    />
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default MoreBtn;
