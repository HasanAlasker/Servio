import { View, StyleSheet, Pressable } from "react-native";
import SText from "../text/SText";
import RowCont from "./RowCont";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";

function Reminder({ isActive, onPress }) {
  const { theme } = useTheme();

  return (
    <Pressable onPress={onPress}>
      <RowCont style={styles.container}>
        <MaterialCommunityIcons
          name={isActive ? "bell-ring-outline" : "bell-off-outline"}
          size={28}
          color={isActive ? theme.blue : theme.red}
        />
        <SText color={isActive ? "blue" : "red"}>Daily Reminder</SText>
      </RowCont>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Reminder;
