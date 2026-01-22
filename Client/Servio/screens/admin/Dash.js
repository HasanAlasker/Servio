import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import { UseUser } from "../../context/UserContext";
import PriBtn from "../../components/general/PriBtn";

function Dash(props) {
  const { logout } = UseUser();
  const handlePress = async () => {
    await logout();
    console.log("pressed");
  };
  return (
    <SafeScreen>
      <View style={styles.container}>
        <Text>Admin</Text>
        <PriBtn title={"logout"} onPress={handlePress} />
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Dash;
