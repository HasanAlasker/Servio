import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text } from "react-native";
import { ThemeProvider } from "./context/ThemeContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useApi from "./hooks/useApi";
import { useEffect } from "react";
import { getAllUsers } from "./api/user";
import SafeScreen from "./components/general/SafeScreen";

export default function App() {
  const { data, request, error, message, status } = useApi(getAllUsers);
  useEffect(() => {
    request();
  }, []);

  const Message = <Text>{message}</Text>;

  const users = data;

  const userList =
    users && data.length > 0
      ? users.map((user) => (
          <Text key={user._id}>
            {user.name}, {user.email}
          </Text>
        ))
      : Message;

  if (status) console.log(status);

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <SafeScreen>{userList}</SafeScreen>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
