import { View, StyleSheet } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import useThemedStyles from "../../hooks/useThemedStyles";
import MText from "../text/MText";

function CardLeftBorder({ title, data, borderColor, backColor, textColor }) {
  const { theme } = useTheme;
  const styles = useThemedStyles(getstyles);

  return (
    <View style={styles.container}>
      <MText color={textColor}>{title}</MText>
      <MText color={textColor}>{data}</MText>
    </View>
  );
}

const getstyles = (theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.post,
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 22,
      paddingVertical: 25,
      borderRadius: 15,
      borderLeftWidth: 4,
      borderColor: theme.blue,
    },
  });

export default CardLeftBorder;
