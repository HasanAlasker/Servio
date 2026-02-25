import { StyleSheet, TouchableOpacity, View } from "react-native";
import AppText from "../../config/AppText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import useThemedStyles from "../../hooks/useThemedStyles";

function MenuOption({ text, icon, color, onPress, disabled, showLock }) {
  const { theme } = useTheme();
  const styles = useThemedStyles(getStyles);

  return (
    <TouchableOpacity 
      style={[styles.container, disabled && styles.disabledContainer]} 
      onPress={onPress} 
      disabled={disabled}
    >
      <AppText style={[styles.text, { color: color ? theme[color] : theme['main_text']}, disabled && styles.disabledText]}>
        {text}
      </AppText>
      <View style={styles.iconContainer}>
        {showLock && (
          <Feather name="lock" size={20} color={theme.sec_text} />
        )}
        {icon && (
          <MaterialCommunityIcons
            name={icon}
            size={26}
            color={color ? theme[color] : theme['main_text']}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",

      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.0,

      elevation: 24,
    },
    text: {
      fontSize: 18,
      fontWeight: "bold",
    },
    disabledContainer: {
      opacity: 0.4,
    },
    disabledText: {
      color: theme.sec_text,
    },
    iconContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
  });

export default MenuOption;