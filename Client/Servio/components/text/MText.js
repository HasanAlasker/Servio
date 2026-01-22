import { View, StyleSheet } from "react-native";
import AppText from "../../config/AppText";
import useThemedStyles from "../../hooks/useThemedStyles";
import { useTheme } from "../../context/ThemeContext";

function MText({ children, color, thin, faded }) {
  const { theme } = useTheme();
  const styles = useThemedStyles(getStyles);
  return (
    <AppText
      style={[
        styles.text,
        { color: theme[color] || theme["main_text"] },
        { fontWeight: thin || "bold" },
      ]}
    >
      {children}
    </AppText>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    text: {
      fontSize: 24,
      fontWeight: "bold",
      color: theme.main_text,
    },
  });

export default MText;
