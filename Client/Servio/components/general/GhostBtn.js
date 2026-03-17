import { StyleSheet, Pressable } from "react-native";
import AppText from "../../config/AppText";
import useThemedStyles from "../../hooks/useThemedStyles";
import { useTheme } from "../../context/ThemeContext";

function GhostBtn({
  title,
  onPress,
  square,
  disabled,
  full,
  style,
  black = false,
  red = false,
  half,
  auto,
  styleText,
}) {
  const styles = useThemedStyles(getStyles);
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.container,
        disabled && styles.disabled,
        style,
        {
          width: full ? "100%" : half ? "50%" : auto ? "auto " : "90%",
          borderRadius: square ? 15 : 25,
        },
      ]}
    >
      <AppText
        style={[
          styles.text,
          { color: red ? theme.red : black ? theme.main_text : theme.blue },
          styleText,
        ]}
      >
        {title || "Press"}
      </AppText>
    </Pressable>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      width: "90%",
      marginHorizontal: "auto",
      backgroundColor: theme.bacground,
      borderRadius: 25,
      paddingVertical: 5,
      paddingHorizontal: 25
    },
    text: {
      color: theme.blue,
      fontWeight: "bold",
      fontSize: 18,
      textAlign: "center",
    },
  });

export default GhostBtn;
