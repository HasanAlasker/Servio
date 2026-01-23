import { Feather } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";
import useThemedStyles from "../../hooks/useThemedStyles";
import { useTheme } from "../../context/ThemeContext";

function MenuBackBtn({ onClose, x, style }) {
  const styles = useThemedStyles(getStyles);
  const { theme } = useTheme();

  return (
    <TouchableOpacity onPress={onClose} style={[styles.container, style]}>
      {x ? (
        <Feather name="x" size={35} color={theme.blue}></Feather>
      ) : (
        <Feather name="arrow-left" size={35} color={theme.blue}></Feather>
      )}
    </TouchableOpacity>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      marginBottom: 40,
      alignSelf: "flex-start",
    },
  });

export default MenuBackBtn;
