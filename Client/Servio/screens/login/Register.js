import { View, StyleSheet } from "react-native";
import AppText from "../../config/AppText";
import SafeScreen from "../../components/general/SafeScreen";

function Register(props) {
  return (
    <SafeScreen>
      <View style={styles.container}>
        <AppText>Register</AppText>
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Register;
