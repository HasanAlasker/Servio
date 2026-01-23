import { View, StyleSheet, TouchableWithoutFeedback, Modal } from "react-native";
import useThemedStyles from "../../hooks/useThemedStyles";
import { useTheme } from "../../context/ThemeContext";

function CardModal({ children, isVisibile, onClose }) {
  const styles = useThemedStyles(getStyles);
  const { theme } = useTheme();

  return (
    <Modal transparent={true} visible={isVisibile}>
      <View style={styles.container}>{children}</View>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}></View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      width: "90%",
      margin: "auto",

      backgroundColor: theme.post,
      zIndex: 250,
      borderRadius: 15,
      paddingHorizontal: 20,
      paddingVertical: 25,

      shadowColor: "black",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,

      elevation: 6,
    },
    overlay: {
      position: "absolute",
      width: "100%",
      height: "100%",
      backgroundColor: theme.background,
      opacity: 0.5,
    },
    display: {
      width: "100%",
      backgroundColor: theme.light_gray,
      paddingHorizontal: 20,
      paddingVertical: 20,
      borderRadius: 10,
      gap: 10,
      marginTop: 30,
      marginBottom: 30,
    },
  });

export default CardModal;
