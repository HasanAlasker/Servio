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
            backgroundColor: active === "1" ? theme.blue : theme.faded,
          },
        ]}
      >
        <SText
          style={[
            styles.text,
            { color: active === "1" ? theme.always_white : theme.sec_text },
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
            backgroundColor: active === "2" ? theme.blue : theme.faded,
          },
        ]}
      >
        <SText
          style={[
            styles.text,
            { color: active === "2" ? theme.always_white : theme.sec_text },
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
    container: {
      backgroundColor: theme.faded,
      borderRadius: 22,
      padding:2,
      alignItems:'center',
    },
    btn: {
      width: "50%",
      paddingVertical: 8,
      backgroundColor: theme.blue,
      borderRadius:20
    },
    text: {
      textAlign: "center",
    },
    active: {},
  });

export default TabNav;
