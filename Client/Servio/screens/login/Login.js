import { View, StyleSheet } from "react-native";
import AppText from "../../config/AppText";
import SafeScreen from "../../components/general/SafeScreen";
import KeyboardScrollScreen from "../../components/general/KeyboardScrollScreen";
import LogoAndMoto from "../../components/welcome/LogoAndMoto";

function Login(props) {
  return (
    <SafeScreen>
      <KeyboardScrollScreen>
        <View style={styles.container}>
          <LogoAndMoto />
        </View>
      </KeyboardScrollScreen>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Login;
