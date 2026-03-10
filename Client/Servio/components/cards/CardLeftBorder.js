import { View, StyleSheet, Pressable } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import useThemedStyles from "../../hooks/useThemedStyles";
import MText from "../text/MText";
import RowCont from "../general/RowCont";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SText from "../text/SText";
import GapContainer from "../general/GapContainer";
import { capFirstLetter } from "../../functions/CapFirstLetterOfWord";

function CardLeftBorder({
  icon,
  title,
  titleIcon,
  customColor,
  miniTitle,
  customText,
  data,
  status,
  parts,
  onPress,
  showBtn,
}) {
  const { theme } = useTheme();
  const styles = useThemedStyles(getstyles);

  let color = "";
  let text = "";
  let backColor = "";

  if (status) {
    if (miniTitle) {
      text = miniTitle;
      color = customColor;
    } else {
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
          color = "sec_text";
          text = "Services";
      }
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
    <Pressable
      onPress={onPress}
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
                icon
                  ? icon
                  : text === "Dangerous"
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
          {!customText ? (
            <View>{RenderParts}</View>
          ) : (
            <SText style={{marginTop: 5}}>{customText}</SText>
          )}
        </GapContainer>
      )}
      {title != null && (
        <RowCont gap={10}>
          <MaterialCommunityIcons
            name={titleIcon}
            size={28}
            color={theme[color]}
          />
          <MText color={color}>{title}</MText>
        </RowCont>
      )}

      {data != null && <MText color={color}>{data.toString()}</MText>}

      {showBtn && (
        <MaterialCommunityIcons
          size={25}
          name="chevron-right"
          color={theme[color]}
          style={styles.v}
        />
      )}
    </Pressable>
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
      borderWidth: .5,
    },
    v: {
      alignSelf: "flex-end",
    },
  });

export default CardLeftBorder;
