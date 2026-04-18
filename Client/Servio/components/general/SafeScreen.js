import { StyleSheet } from "react-native";
import useThemedStyles from "../../hooks/useThemedStyles";
import { SafeAreaView } from "react-native-safe-area-context";

function SafeScreen({ children, style, gradient }) {
  const styles = useThemedStyles(getStyles);

  return (
    <SafeAreaView style={[styles.container, style, gradient && styles.gradient]}>
      {children}
    </SafeAreaView>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    gradient: {
      experimental_backgroundImage:
        "linear-gradient(147deg,rgba(124, 187, 255, 1) 0%, rgba(192, 220, 251, 1) 11%, rgba(216, 232, 250, 1) 23%, rgba(244, 246, 248, 1) 70%, rgba(217, 233, 250, 1) 80%, rgba(174, 212, 252, 1) 100%, rgba(120, 185, 255, 1) 100%)",
    },

  });

export default SafeScreen;
