import { View, StyleSheet } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import ScrollScreen from "../../components/general/ScrollScreen";
import Navbar from "../../components/general/Navbar";

function Users(props) {
  return (
    <SafeScreen>
      <ScrollScreen style={styles.container}></ScrollScreen>
      <Navbar />
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Users;
