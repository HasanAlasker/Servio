import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserProvider, UseUser } from "./context/UserContext";
import LoadingCircle from "./components/general/LoadingCircle";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/carOwner/Home";
import Shops from "./screens/carOwner/Shops";
import AddCar from "./screens/carOwner/AddCar";
import Bookings from "./screens/carOwner/Bookings";
import Service from "./screens/carOwner/Service";
import Parts from "./screens/carOwner/Parts";
import MyCars from "./screens/carOwner/MyCars";
import Welcome from "./screens/login/Welcome";
import Login from "./screens/login/Login";
import Register from "./screens/login/Register";
import Dash from "./screens/admin/Dash";
import MyShop from "./screens/shopOwner/MyShop";
import { useEffect } from "react";
import Profile from "./screens/carOwner/Profile";
import Suggestions from "./screens/shared/Suggestions";

const Stack = createNativeStackNavigator();

const AdminStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Dash"
      screenOptions={{ headerShown: false, animation: "none" }}
    >
      <Stack.Screen name="Dash" component={Dash} />
    </Stack.Navigator>
  );
};

const CarOwnerStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false, animation: "none" }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Shops" component={Shops} />
      <Stack.Screen name="AddCar" component={AddCar} />
      <Stack.Screen name="Bookings" component={Bookings} />
      <Stack.Screen name="Service" component={Service} />
      <Stack.Screen name="Parts" component={Parts} />
      <Stack.Screen name="MyCars" component={MyCars} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Suggestions" component={Suggestions} />
    </Stack.Navigator>
  );
};

const ShopOwnerStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="MyShop"
      screenOptions={{ headerShown: false, animation: "none" }}
    >
      <Stack.Screen name="MyShop" component={MyShop} />
      <Stack.Screen name="Suggestions" component={Suggestions} />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false, animation: "simple_push" }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  const {
    appStart,
    isUser,
    isShopOwner,
    isAdmin,
    isAuthenticated,
    loadUserData,
  } = UseUser();
  const { isDarkMode } = useTheme();

  useEffect(() => {
    loadUserData();
  }, []);

  if (appStart) return <LoadingCircle />;

  return (
    <>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <NavigationContainer>
        {!isAuthenticated ? (
          <AuthStack />
        ) : isUser ? (
          <CarOwnerStack />
        ) : isShopOwner ? (
          <ShopOwnerStack />
        ) : isAdmin ? (
          <AdminStack />
        ) : (
          <CarOwnerStack />
        )}
      </NavigationContainer>
    </>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <UserProvider>
          <AppNavigator />
        </UserProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});
