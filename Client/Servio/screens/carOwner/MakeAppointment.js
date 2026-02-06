import { View, StyleSheet } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import ScrollScreen from "../../components/general/ScrollScreen";
import GapContainer from "../../components/general/GapContainer";
import KeyboardScrollScreen from "../../components/general/KeyboardScrollScreen";
import Navbar from "../../components/general/Navbar";
import { useRoute } from "@react-navigation/native";

function MakeAppointment(props) {
  const route = useRoute();
  const params = route.params;

  return (
    <SafeScreen>
      <KeyboardScrollScreen>
        <GapContainer></GapContainer>
      </KeyboardScrollScreen>
      <Navbar />
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default MakeAppointment;
