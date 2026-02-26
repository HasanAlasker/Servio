import { View, StyleSheet } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import useThemedStyles from "../../hooks/useThemedStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RowCont from "../general/RowCont";
import GapContainer from "../general/GapContainer";
import SText from "../text/SText";
import TText from "../text/TText";

function SquareInfo({ icon, color, title, text, fliped = false, style }) {
  const styles = useThemedStyles(getStyles);
  const { theme } = useTheme();

  const backColor = theme[color] + "15";

  return (
    <RowCont>
      <View
        style={[
          styles.container,
          { backgroundColor: backColor, borderColor: theme[color] },
        ]}
      >
        <MaterialCommunityIcons name={icon} color={theme[color]} size={30} />
      </View>
      <GapContainer gap={1}>
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
            color={fliped ? "main_text" : "sec_text"}
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
