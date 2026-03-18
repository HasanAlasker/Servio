import { View, StyleSheet } from "react-native";
import CardComp from "./CardComp";
import SText from "../text/SText";
import GapContainer from "../general/GapContainer";
import TText from "../text/TText";

function SettingsGroup({ label, children }) {
  return (
    <GapContainer gap={8}>
      <TText thin color={"sec_text"}>
        {label}
      </TText>
      <CardComp style={styles.container}>{children}</CardComp>
    </GapContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 15,
    gap: 8,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
});

export default SettingsGroup;
