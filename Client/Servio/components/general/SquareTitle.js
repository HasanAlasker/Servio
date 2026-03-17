import { View, StyleSheet } from "react-native";
import RowCont from "./RowCont";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useThemedStyles from "../../hooks/useThemedStyles";
import { useTheme } from "../../context/ThemeContext";
import MText from "../text/MText";

function SquareTitle({ icon, title }) {
  const styles = useThemedStyles(getStyles);
  const { theme } = useTheme();

  return (
    <RowCont gap={10}>
      <View style={[styles.container]}>
        <MaterialCommunityIcons name={icon} color={theme.main_text} size={30} />
      </View>
      <MText color={"main_text"}>{title}</MText>
    </RowCont>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      aspectRatio: 1,
      borderRadius: 10,
      justifyContent: "center",
      borderWidth: 1.5,
      padding: 4,
      backgroundColor: theme.light_gray + "50",
      borderColor: theme.faded,
    },
  });

export default SquareTitle;
