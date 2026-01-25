import { View, StyleSheet } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import useThemedStyles from "../../hooks/useThemedStyles";
import MText from "../text/MText";
import RowCont from "../general/RowCont";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SText from "../text/SText";
import TText from "../text/TText";
import GapContainer from "../general/GapContainer";
import { capFirstLetter } from "../../functions/CapFirstLetterOfWord";

function CardLeftBorder({ title, data, status, parts }) {
  const { theme } = useTheme();
  const styles = useThemedStyles(getstyles);

  let color = "";
  let text = "";
  let backColor = "";

  if (status) {
    switch (status) {
      case "soon":
        color = "gold";
        text = "Check Soon";
        break;
      case "due":
        color = "red";
        text = "Check Immediately";
        break;
      case "overdue":
        color = "darkPink";
        text = "Dangerous";
        break;
    }

    backColor = theme[color] + 20;
  } else {
    color = "blue";
    backColor = "post";
  }

  const RenderParts = parts?.map((part) => (
    <SText thin>{capFirstLetter(part.name)}</SText>
  ));

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: backColor,
          borderColor: theme[color],
          paddingVertical: status ? 15 : 25,
        },
      ]}
    >
      {status && (
        <GapContainer gap={10}>
          <RowCont>
            <MaterialCommunityIcons
              name={
                text === "Dangerous" ? "alert-outline" : "alert-circle-outline"
              }
              size={24}
              color={theme[color]}
            />
            <SText color={color}>{text}</SText>
          </RowCont>
          <View>{RenderParts}</View>
        </GapContainer>
      )}
      {title && <MText color={color}>{title}</MText>}
      {text && <MText color={color}>{data}</MText>}
    </View>
  );
}

const getstyles = (theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.post,
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 22,
      paddingVertical: 25,
      borderRadius: 15,
      borderLeftWidth: 4,
    },
  });

export default CardLeftBorder;
