import { View, StyleSheet } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import LogoAndMoto from "../../components/welcome/LogoAndMoto";
import PriBtn from "../../components/general/PriBtn";
import SecBtn from "../../components/general/SecBtn";
import GapContainer from "../../components/general/GapContainer";
import { useNavigation } from "@react-navigation/native";

function Welcome(props) {
  const navigation = useNavigation();

  return (
    <SafeScreen>
      <View style={styles.container}>
        <LogoAndMoto moto />
        <GapContainer>
          <PriBtn
            title={"Login"}
            onPress={() => navigation.navigate("Login")}
          />
          <SecBtn
            title={"Register"}
            onPress={() => navigation.navigate("Register")}
          />
        </GapContainer>
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: "auto",
    gap: 60,
    paddingBottom: 60,
  },
});

export default Welcome;
