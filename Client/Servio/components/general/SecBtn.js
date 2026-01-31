import { View, StyleSheet, TouchableOpacity } from "react-native";
import AppText from "../../config/AppText";
import useThemedStyles from "../../hooks/useThemedStyles";
import { useTheme } from "@react-navigation/native";

function SecBtn({ title, onPress }) {
  const styles = useThemedStyles(getStyles);
  const { theme } = useTheme();
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <AppText style={styles.text}>{title || "Press"}</AppText>
    </TouchableOpacity>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      width: "90%",
      marginHorizontal: "auto",
      backgroundColor: theme.post,
      padding: 6,
      borderRadius: 25,
      borderColor: theme.blue,
      borderWidth: 1,
    },
    text: {
      color: theme.blue,
      fontWeight: "bold",
      fontSize: 18,
      textAlign: "center",
    },
  });

export default SecBtn;
