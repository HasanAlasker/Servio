import { StyleSheet } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import Navbar from "../../components/general/Navbar";
import ScrollScreen from "../../components/general/ScrollScreen";
import AddCarCard from "../../components/cards/AddCarCard";

function MyCars(props) {
  return (
    <SafeScreen>
      <ScrollScreen>
        <AddCarCard />
      </ScrollScreen>
      <Navbar />
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default MyCars;
