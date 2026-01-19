import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text } from "react-native";
import { ThemeProvider } from "./context/ThemeContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useApi from "./hooks/useApi";
import { useEffect } from "react";
import { getAllUsers } from "./api/user";
import SafeScreen from "./components/general/SafeScreen";

export default function App() {
  const { data, request } = useApi(getAllUsers);
  useEffect(() => {
    request();
  }, []);

  const users = data.data;
  const userList = users
    ? users.map((user) => (
        <Text key={user.id}>
          {user.name}, {user.email}
        </Text>
      ))
    : null;

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
