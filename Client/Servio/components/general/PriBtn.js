import { View, StyleSheet, TouchableOpacity } from "react-native";
import AppText from "../../config/AppText";
import useThemedStyles from "../../hooks/useThemedStyles";
import { useTheme } from "../../context/ThemeContext";

function PriBtn({ title, onPress, disabled, full, style, square, isRed }) {
  const styles = useThemedStyles(getStyles);
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.container,
        disabled && styles.disabled,
        style,
        {
          width: full ? "100%" : "90%",
          borderRadius: square ? 15 : 25,
          backgroundColor: isRed ? theme.red : theme.blue,
          borderBlockColor: isRed ? theme.red : theme.blue,
        },
      ]}
    >
      <AppText style={styles.text}>{title || "Press"}</AppText>
    </TouchableOpacity>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      width: "90%",
      marginHorizontal: "auto",
      backgroundColor: theme.blue,
      padding: 6,
      borderRadius: 25,
      borderColor: theme.blue,
      borderWidth: 1,
    },
    text: {
      color: theme.always_white,
      fontWeight: "bold",
      fontSize: 18,
      textAlign: "center",
    },
    disabled: {
      opacity: 0.5,
    },
  });

export default PriBtn;
