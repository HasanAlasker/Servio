import { StyleSheet, TouchableOpacity } from "react-native";
import SText from "../text/SText";
import RowCont from "./RowCont";
import { useTheme } from "../../context/ThemeContext";
import useThemedStyles from "../../hooks/useThemedStyles";

function TabNav({ active, onTabChange, one, two }) {
  const styles = useThemedStyles(getStyles);
  const { theme } = useTheme();

  return (
    <RowCont gap={"none"} style={styles.container}>
      <TouchableOpacity
        onPress={onTabChange}
        style={[
          styles.btn,
          {
            borderTopLeftRadius: 15,
            borderBottomLeftRadius: 15,
            backgroundColor: active === "1" ? theme.blue : theme.post,
          },
        ]}
      >
        <SText
          style={[
            styles.text,
            { color: active === "1" ? theme.always_white : theme.blue },
          ]}
        >
          {one}
        </SText>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onTabChange}
        style={[
          styles.btn,
          {
            borderTopRightRadius: 15,
            borderBottomRightRadius: 15,
            backgroundColor: active === "2" ? theme.blue : theme.post,
          },
        ]}
      >
        <SText
          style={[
            styles.text,
            { color: active === "2" ? theme.always_white : theme.blue },
          ]}
        >
          {two}
        </SText>
      </TouchableOpacity>
    </RowCont>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {},
    btn: {
      width: "50%",
      paddingVertical: 8,
      backgroundColor: theme.blue,
    },
    text: {
      textAlign: "center",
    },
    active: {},
  });

export default TabNav;
