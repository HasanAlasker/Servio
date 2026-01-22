import React from "react";
import { View, StyleSheet, Text } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import PriBtn from "../../components/general/PriBtn";
import { UseUser } from "../../context/UserContext";

function Home(props) {
  const { logout } = UseUser();
  const handlePress = async () => {
    await logout();
    console.log("pressed");
  };
  return (
    <SafeScreen>
      <View style={styles.container}>
        <Text>carOwner</Text>
        <PriBtn title={"logout"} onPress={handlePress} />
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Home;
