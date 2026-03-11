import { View, StyleSheet, Pressable } from "react-native";
import RowCont from "./RowCont";
import { Feather } from "@expo/vector-icons";
import SText from "../text/SText";
import useThemedStyles from "../../hooks/useThemedStyles";
import { useTheme } from "../../context/ThemeContext";
import { useNavigation } from "@react-navigation/native";

function Pill({ icon, text, navigateTo, params }) {
  const styles = useThemedStyles(getStyles);
  const { theme } = useTheme();
  const navigate = useNavigation();

  return (
    <Pressable onPress={() => navigate.navigate(navigateTo, params)}>
      <RowCont style={styles.container}>
        <Feather color={theme.main_text} size={20} name={icon} />
        <SText thin>{text}</SText>
      </RowCont>
    </Pressable>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.light_gray,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 25,
      alignItems: "center",
      justifyContent: "center",
      minWidth: "28%",
    },
  });

export default Pill;
