import { View, StyleSheet } from "react-native";
import useThemedStyles from "../../hooks/useThemedStyles";

function Shade(props) {
  const styles = useThemedStyles(getStyles);
  return <View style={styles.shade}></View>;
}

const getStyles = (theme) =>
  StyleSheet.create({
    shade: {
      backgroundColor: theme.shade,
      opacity: 1,
      width: 44,
      height: 30,
      borderRadius: 10,
      position: "absolute",
      alignSelf: "center",
      top: 0,
      zIndex: 0,
    },
  });

export default Shade;
