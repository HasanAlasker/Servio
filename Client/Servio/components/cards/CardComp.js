import { View, StyleSheet, TouchableOpacity } from "react-native";
import useThemedStyles from "../../hooks/useThemedStyles";

function CardComp({ children, style, onPress }) {
  const styles = useThemedStyles(getStyles);
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      {children}
    </TouchableOpacity>
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
