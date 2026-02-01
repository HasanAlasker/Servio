import { StyleSheet, TouchableOpacity } from "react-native";
import TText from "../text/TText";
import useThemedStyles from "../../hooks/useThemedStyles";

function PressText({ onPress }) {
  const styles = useThemedStyles(getStyles);
  return (
    <TouchableOpacity onPress={onPress} style={styles.press}>
      <TText color={"blue"}>Need a month calculator?</TText>
    </TouchableOpacity>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    press: {
        width: "90%",
        marginHorizontal:'auto',
    },
  });

export default PressText;
