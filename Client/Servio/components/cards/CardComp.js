import { StyleSheet, Pressable } from "react-native";
import useThemedStyles from "../../hooks/useThemedStyles";

function CardComp({ children, style, onPress }) {
  const styles = useThemedStyles(getStyles);
  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
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
    },
  });

export default CardComp;
