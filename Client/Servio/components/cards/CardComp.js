import { StyleSheet, Pressable } from "react-native";
import useThemedStyles from "../../hooks/useThemedStyles";

function CardComp({ children, style, onPress, short }) {
  const styles = useThemedStyles(getStyles);
  return (
    <Pressable
      style={[styles.container, style, { width: short ? "90%" : "100%" }]}
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.post,
      paddingHorizontal: 22,
      paddingVertical: 25,
      borderRadius: 15,
      marginHorizontal: "auto",

      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,

      elevation: 2,
    },
  });

export default CardComp;
