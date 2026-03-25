import { View, StyleSheet, Pressable } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import useThemedStyles from "../../hooks/useThemedStyles";
import MText from "../text/MText";
import RowCont from "../general/RowCont";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import SText from "../text/SText";
import GapContainer from "../general/GapContainer";
import { capFirstLetter } from "../../functions/CapFirstLetterOfWord";
import { UseUser } from "../../context/UserContext";

function CardLeftBorder({
  icon,
  title,
  titleIcon,
  customColor,
  customTextColor,
  miniTitle,
  customText,
  data,
  status,
  parts,
  onPress,
  showBtn,
  style,
}) {
  const { theme } = useTheme();
  const styles = useThemedStyles(getstyles);
  const { isAdmin } = UseUser();

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
    color = "main_text";
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
          paddingVertical: status ? 15 : 20,
          paddingHorizontal: status ? 18 : 22,
        },
        style,
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
            <RowCont style={{ flexWrap: "wrap" }}>{RenderParts}</RowCont>
          ) : (
            <SText
              thin
              style={{
                marginTop: 5,
                color: theme[customTextColor || "main_text"],
              }}
            >
              {customText}
            </SText>
          )}
        </GapContainer>
      )}
      {title != null && (
        <RowCont gap={10}>
          {isAdmin ? (
            <MaterialCommunityIcons
              name={titleIcon}
              size={26}
              color={theme[color]}
            />
          ) : (
            <Feather name={titleIcon} size={24} color={theme[color]} />
          )}

          <SText thin color={color}>
            {title}
          </SText>
        </RowCont>
      )}

      {data != null && <SText color={color}>{data.toString()}</SText>}

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
    },
    v: {
      alignSelf: "flex-end",
    },
  });

export default CardLeftBorder;
