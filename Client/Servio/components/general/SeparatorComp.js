import { StyleSheet, Text, View } from "react-native";
import useThemedStyles from "../../hooks/useThemedStyles";
import { useTheme } from "../../context/ThemeContext";

function SeparatorComp({ children, color = "darker_gray", style }) {
  const styles = useThemedStyles(getStyles);
  const { theme } = useTheme();

  const thingcolors = theme[color] || color;
  return (
    <View style={[styles.sep_cont, style]}>
      <View style={[styles.line, { backgroundColor: thingcolors }]}></View>
      {children && (
        <Text style={[styles.text, { color: thingcolors }]}>{children}</Text>
      )}
      {children && (
        <View style={[styles.line, { backgroundColor: thingcolors }]}></View>
      )}
    </View>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    line: {
      width: "100%",
      backgroundColor: theme.faded_text,
      height: 2,
      marginVertical: 10,
    },
    sep_cont: {
      alignSelf: "center",
      width: "90%",
      flexDirection: "row",
      justifyContent: "center",
      alignContent: "center",
      columnGap: 10,
      overflow: "hidden",
    //   marginTop: 30,
    //   marginBottom: 10,
    },
    text: {
      flexWrap: "nowrap",
      color: theme.main_text,
    },
  });

export default SeparatorComp;
