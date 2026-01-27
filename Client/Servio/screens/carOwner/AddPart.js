import { View, StyleSheet } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import KeyboardScrollScreen from "../../components/general/KeyboardScrollScreen";
import Navbar from "../../components/general/Navbar";
import { useRoute } from "@react-navigation/native";

function AddPart(props) {
  const route = useRoute();
  const carId = route?.params;

  console.log(carId)
  return (
    <SafeScreen>
      <KeyboardScrollScreen></KeyboardScrollScreen>
      <Navbar />
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AddPart;
