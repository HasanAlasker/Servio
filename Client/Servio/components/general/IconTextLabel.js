import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import MText from "../text/MText";
import RowCont from "./RowCont";

function IconTextLabel({ icon, text }) {
  const { theme } = useTheme();

  return (
    <RowCont gap={5} style={styles.container}>
      <MaterialCommunityIcons name={icon} size={32} color={theme.main_text} />
      <MText>{text}</MText>
    </RowCont>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default IconTextLabel;
