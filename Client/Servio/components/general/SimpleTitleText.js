import { View, StyleSheet } from "react-native";
import GapContainer from "./GapContainer";
import SText from "../text/SText";
import TText from "../text/TText";
import RowCont from "./RowCont";
import { useTheme } from "../../context/ThemeContext";
import useThemedStyles from "../../hooks/useThemedStyles";

function SimpleTitleText({
  showStatus,
  title,
  text1,
  text2,
  nextChangeDate,
  nextChangeMileage,
  recomendedMonths,
  recomendedMileage,
  carMileage,
}) {
  const styles = useThemedStyles(getStyles);
  const { theme } = useTheme();

  const isDangerDate = () => new Date() >= new Date(nextChangeDate);
  const isDangerMileage = () => carMileage >= nextChangeMileage;

  const isSoonDate = () => {
    const oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);
    const changeDate = new Date(nextChangeDate); // <-- was missing
    return changeDate <= oneMonthFromNow && changeDate > new Date();
  };

  const isSoonMileage = () =>
    carMileage + 500 >= nextChangeMileage && carMileage < nextChangeMileage;

  const partUsage = () => {
    const now = new Date();
    const nextDate = new Date(nextChangeDate);
    const totalMs = recomendedMonths * 30 * 24 * 60 * 60 * 1000;
    const usedMs = now - (nextDate - totalMs);
    const timeUsed = Math.min(Math.max(usedMs / totalMs, 0), 1);

    const mileageUsed = Math.min(
      Math.max(
        (recomendedMileage - (nextChangeMileage - carMileage)) /
          recomendedMileage,
        0,
      ),
      1,
    );

    // worst case drives the bar
    return Math.max(timeUsed, mileageUsed);
  };

  const progressWidth = () => {
    const used = partUsage();
    return (1 - used) * 100;
  };

  const color = () => {
    const width = progressWidth();
    if (width >= 35) return "green";
    else if (width >= 10) return "orange";
    else return "darkPink";
  };

  return (
    <GapContainer gap={5} style={styles.container}>
      <RowCont gap={10}>
        {showStatus && (
          <View style={[styles.dot, { backgroundColor: theme[color()] }]} />
        )}
        {title && (
          <TText thin color={"sec_text"}>
            {title}
          </TText>
        )}
      </RowCont>
      <RowCont gap={10}>
        <SText>{text1}</SText>
        {text2 && <SText color={"sec_text"}>{"\u2022"}</SText>}
        {text2 && <SText>{text2}</SText>}
      </RowCont>
      {showStatus && (
        <View style={styles.bar}>
          <View
            style={[
              styles.progress,
              { width: `${progressWidth()}%`, backgroundColor: theme[color()] }, // add %
            ]}
          />
        </View>
      )}
    </GapContainer>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    dot: {
      width: 12,
      height: 12,
      backgroundColor: theme.green,
      borderRadius: "50%",
    },
    bar: {
      width: "100%",
      height: 8,
      backgroundColor: theme.light_gray,
      borderRadius: 35,
      marginTop: 10,
      overflow: "hidden",
    },
    progress: {
      height: 8,
      backgroundColor: theme.green,
      borderRadius: 35,
    },
  });

export default SimpleTitleText;
