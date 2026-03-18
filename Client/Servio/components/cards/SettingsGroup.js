import { View, StyleSheet } from "react-native";
import CardComp from "./CardComp";
import SText from "../text/SText";
import GapContainer from "../general/GapContainer";

function SettingsGroup({ label, children }) {
  return (
    <GapContainer gap={10}>
      <SText thin color={"sec_text"}>
        {label}
      </SText>
      <CardComp style={styles.container}>{children}</CardComp>
    </GapContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical:15,
    paddingHorizontal: 15,
    gap:8
  },
});

export default SettingsGroup;
