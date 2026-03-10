import { View, StyleSheet, Pressable } from "react-native";
import RowCont from "./RowCont";
import MText from "../text/MText";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { UseUser } from "../../context/UserContext";
import { useTheme } from "../../context/ThemeContext";
import useThemedStyles from "../../hooks/useThemedStyles";
import { useNavigation } from "@react-navigation/native";
import SText from "../text/SText";

function HelloUser(props) {
  const { firstName } = UseUser();
  const styles = useThemedStyles(getStyles);
  const { theme } = useTheme();
  const navigate = useNavigation();

  const welcomePhrase = () => {
    const hour = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Amman",
      hour: "numeric",
      hour12: false,
    });

    const h = parseInt(hour);
    if (h >= 5 && h < 12) return "Good Morning";
    if (h >= 12 && h < 17) return "Good Afternoon";
    if (h >= 17 && h < 21) return "Good Evening";
    return "Good Night";
  };

  return (
    <RowCont style={{ justifyContent: "space-between", marginBottom: 10 }}>
      <SText color={"sec_text"} thin>
        {welcomePhrase()}, {"\n"}
        <MText color={"main_text"}>{firstName + "!"}</MText>
      </SText>
      <Pressable
        style={styles.btn}
        onPress={() => navigate.navigate("Profile")}
      >
        <Feather color={theme.sec_text} size={34} name="user" />
      </Pressable>
    </RowCont>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    btn: {
      backgroundColor: theme.background,
    },
  });

export default HelloUser;
