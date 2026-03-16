import { View, StyleSheet } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import useThemedStyles from "../../hooks/useThemedStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RowCont from "../general/RowCont";
import GapContainer from "../general/GapContainer";
import SText from "../text/SText";
import TText from "../text/TText";

function SquareInfo({
  icon,
  danger,
  soon,
  title,
  text,
  fliped = false,
  flex,
}) {
  const styles = useThemedStyles(getStyles);
  const { theme } = useTheme();

  const backColor = danger
    ? theme.darkPink + "15"
    : soon
      ? theme.orange + "15"
      : theme.light_gray + "50"

  return (
    <RowCont gap={10}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: backColor,
            borderColor: danger
              ? theme.darkPink
              : soon
                ? theme.orange
                : theme["faded"],
          },
        ]}
      >
        <MaterialCommunityIcons
          name={icon}
          color={danger ? theme.darkPink : soon ? theme.orange : theme["main_text"]}
          size={30}
        />
      </View>
      <GapContainer flex={flex} gap={1}>
        {!fliped ? (
          <SText
            thin={fliped}
            color={fliped ? "sec_text" : "main_text"}
            numberOfLines={1}
          >
            {title}
          </SText>
        ) : (
          <TText
            numberOfLines={1}
            thin={fliped}
            color={fliped ? "sec_text" : "main_text"}
          >
            {title}
          </TText>
        )}
        {!fliped ? (
          <TText
            numberOfLines={1}
            thin={!fliped}
            color={fliped ? "main_text" : "sec_text"}
          >
            {text}
          </TText>
        ) : (
          <SText
            numberOfLines={1}
            thin={!fliped}
            color={danger ? 'red' : soon? 'orange' : !fliped ? 'sec_tex' : "main_text"}
          >
            {text}
          </SText>
        )}
      </GapContainer>
    </RowCont>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      aspectRatio: 1,
      borderRadius: 10,
      justifyContent: "center",
      borderWidth: 1.5,
      padding: 4,
    },
  });

export default SquareInfo;
