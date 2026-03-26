import { View, StyleSheet } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import ScrollScreen from "../../components/general/ScrollScreen";

function History(props) {
  return (
    <SafeScreen>
      <ScrollScreen></ScrollScreen>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default History;
