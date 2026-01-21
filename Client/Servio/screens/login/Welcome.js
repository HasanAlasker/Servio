import React from "react";
import { View, StyleSheet, Text } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";

function Welcome(props) {
  return (
    <SafeScreen>
      <View style={styles.container}>
        <Text>Welcome</Text>
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Welcome;
