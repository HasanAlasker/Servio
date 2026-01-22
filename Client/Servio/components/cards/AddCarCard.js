import { StyleSheet } from "react-native";
import CardComp from "./CardComp";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import MText from "../../components/text/MText";
import { useNavigation } from "@react-navigation/native";

function AddCarCard(props) {
  const { theme } = useTheme();
  const navigation = useNavigation();

  return (
    <CardComp
      style={styles.container}
      onPress={() => navigation.navigate("AddCar")}
    >
      <MaterialCommunityIcons name="plus" color={theme.blue} size={40} />
      <MText color={"blue"}>Add Car</MText>
    </CardComp>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AddCarCard;
