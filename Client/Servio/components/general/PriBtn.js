import { StyleSheet, Pressable } from "react-native";
import AppText from "../../config/AppText";
import useThemedStyles from "../../hooks/useThemedStyles";
import { useTheme } from "../../context/ThemeContext";

function PriBtn({
  title,
  onPress,
  disabled,
  full,
  style,
  square,
  blackText = false,
}) {
  const styles = useThemedStyles(getStyles);
  const { theme } = useTheme();

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.container,
        disabled && styles.disabled,
        style,
        { width: full ? "100%" : "90%", borderRadius: square ? 15 : 25 },
      ]}
    >
      <AppText
        style={[
          styles.text,
          { color: blackText ? theme.white : theme.always_white },
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
