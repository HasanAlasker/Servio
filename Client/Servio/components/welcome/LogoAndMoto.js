import { View, StyleSheet } from "react-native";
import AppText from "../../config/AppText";
import useThemedStyles from "../../hooks/useThemedStyles";
import { useTheme } from "../../context/ThemeContext";

function LogoAndMoto(props) {
  const styles = useThemedStyles(getStyles);
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <AppText style={styles.big}>Servio</AppText>
      <AppText style={styles.faded}>
        You won't need to remember anything about your car
      </AppText>
    </View>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      width: "90%",
      marginHorizontal: "auto",
    //   marginVertical: "auto",
      gap: 10,
    },
    big: {
      fontWeight: "bold",
      fontSize: 55,
      textAlign: "center",
      color: theme.main_text,
    },
    faded: {
      fontSize: 20,
      textAlign: "center",
      color: theme.sec_text,
    },
  });

export default LogoAndMoto;
