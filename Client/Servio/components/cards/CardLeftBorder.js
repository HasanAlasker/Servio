import { View, StyleSheet } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import useThemedStyles from "../../hooks/useThemedStyles";
import MText from "../text/MText";
import RowCont from "../general/RowCont";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SText from "../text/SText";
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
      default:
        color = "lightBlue";
        text = "Services";
    }

    backColor = theme[color] + 20;
  } else {
    color = "blue";
    backColor = theme.post;
  }

  const RenderParts = parts?.map((part) => (
    <RowCont key={part._id}>
      <MText>{"\u2022"}</MText>
      <SText thin>{capFirstLetter(part.name)}</SText>
    </RowCont>
  ));

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: backColor,
          borderColor: theme[color],
          paddingVertical: status ? 15 : 25,
          paddingHorizontal: status ? 14 : 22,
        },
      ]}
    >
      {status && (
        <GapContainer gap={10}>
          <RowCont>
            <MaterialCommunityIcons
              name={
                text === "Dangerous"
                  ? "alert-outline"
                  : text === "Check Soon"
                    ? "alert-circle-outline"
                    : "toolbox-outline"
              }
              size={24}
              color={theme[color]}
            />
            <SText color={color}>{text}</SText>
          </RowCont>
          <View>{RenderParts}</View>
        </GapContainer>
      )}
      {title != null && <MText color={color}>{title}</MText>}
      {data != null && <MText color={color}>{data.toString()}</MText>}
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
