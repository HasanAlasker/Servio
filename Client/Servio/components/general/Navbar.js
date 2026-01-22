import { StyleSheet } from "react-native";
import { View, Text, TouchableOpacity } from "react-native";
import {
  Feather,
  Ionicons,
} from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import useThemedStyles from "../../hooks/useThemedStyles";
import { UseUser } from "../../context/UserContext";

function Navbar(props) {
  const navigation = useNavigation();
  const route = useRoute();
  const { logout, isAdmin, user } = UseUser();
  const [isMenu, setIsMenu] = useState(false);

  const styles = useThemedStyles(getStyles);

  return (
    <>
      {/* <SettingsMenu isVisible={isMenu} onClose={() => setIsMenu(false)} /> */}
      <View style={styles.navbar}>
        <TouchableOpacity
          style={styles.navbarBtn}
          onPress={() => navigation.navigate("Home")}
        >
          <Feather
            name="home"
            size={30}
            style={[styles.icon, route.name === "Home" && styles.active]}
          />
          <Text style={[styles.text, route.name === "Home" && styles.active]}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navbarBtn}
          onPress={() => navigation.navigate("MyCars")}
        >
          <Ionicons
            name="car-outline"
            size={38}
            style={[styles.icon, route.name === "MyCars" && styles.active]}
          />
          <Text
            style={[
              styles.text,
              route.name === "MyCars" && styles.active,
              { bottom: 6 },
            ]}
          >
            Garage
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navbarBtn}
          onPress={() => navigation.navigate("Bookings")}
        >
          <Feather
            name="calendar"
            size={30}
            style={[styles.icon, route.name === "Bookings" && styles.active]}
          />
          <Text
            style={[styles.text, route.name === "Bookings" && styles.active]}
          >
            Bookings
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navbarBtn}
          onPress={() => navigation.navigate("Service")}
        >
          <Feather
            name="clock"
            size={30}
            style={[styles.icon, route.name === "Service" && styles.active]}
          />
          <Text
            style={[styles.text, route.name === "Service" && styles.active]}
          >
            Service
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navbarBtn}
          onPress={() => setIsMenu(!isMenu)}
        >
          <Feather
            name="settings"
            size={30}
            style={[styles.icon, isMenu && styles.active]}
          />
          <Text style={[styles.text, isMenu && styles.active]}>Settings</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottom}></View>
    </>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    navbar: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 22,
      backgroundColor: theme.post,
      paddingTop: 10,
      paddingBottom: 13,
      borderTopRightRadius: 22,
      borderTopLeftRadius: 22,
      height: 73,
      width: "100%",
      zIndex: 100,
      alignItems: "center",
    },
    navbarBtn: {
      display: "flex",
      textAlign: "center",
      justifyContent: "space-between",
    },
    icon: {
      textAlign: "center",
      color: theme.sec_text,
      fontWeight: "900",
    },
    text: {
      color: theme.sec_text,
      fontWeight: "700",
      fontSize: 12,
      textAlign: "center",
    },
    active: {
      color: theme.blue,
    },
    bottom: {
      position: "absolute",
      width: "100%",
      backgroundColor: theme.post,
      height: 50,
      bottom: 0,
      zIndex: 90,
    },
  });

export default Navbar;
