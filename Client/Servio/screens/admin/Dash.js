import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import { UseUser } from "../../context/UserContext";
import PriBtn from "../../components/general/PriBtn";
import LText from "../../components/text/LText";
import OfflineModal from "../../components/general/OfflineModal";

function Dash(props) {
  const { logout, user } = UseUser();
  const handlePress = async () => {
    await logout();
    console.log("pressed");
  };
  return (
    <SafeScreen>
      <View style={styles.container}>
        <Text>Admin</Text>
        <LText>{user.name}</LText>
        <LText>{user.phone}</LText>
        <LText>{user.email}</LText>
        <LText>{user.createdAt}</LText>
        <LText>{user._id}</LText>
        <PriBtn title={"logout"} onPress={handlePress} />
      </View>
      <OfflineModal />
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Dash;
