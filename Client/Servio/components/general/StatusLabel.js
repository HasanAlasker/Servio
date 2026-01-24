import { View, StyleSheet } from "react-native";
import TText from "../text/TText";
import { capFirstLetter } from "../../functions/CapFirstLetterOfWord";
import useThemedStyles from "../../hooks/useThemedStyles";
import { useTheme } from "../../context/ThemeContext";

function StatusLabel({ status }) {
  const styles = useThemedStyles(getStyles);
  const { theme } = useTheme();

  let color = "";

  switch (status) {
    case "pending":
      color = "gold";
      break;

    case "confirmed":
      color = "green";
      break;

    case "canceled":
      color = "red";
      break;
    default:
      color = "lightBlue";
  }

  let backColor = theme[color] + 20;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: backColor, borderColor: theme[color] },
      ]}
    >
      <TText style={{ color: theme[color] }}>{capFirstLetter(status)}</TText>
    </View>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      borderRadius: 25,
      paddingVertical: 2,
      paddingHorizontal: 10,
      borderWidth: 1.4,
      justifyContent: "center",
      alignItems: "center",
      alignSelf:'flex-start'
    },
  });

export default StatusLabel;
