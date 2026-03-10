import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, StyleSheet, Pressable, Text } from "react-native";
import useThemedStyles from "../../hooks/useThemedStyles";
import { UseService } from "../../context/ServiceContext";
import MiniRedCircle from "../general/MiniRedCircle";
import { UseAppointment } from "../../context/AppointmentContext";

function UserNav({ onMenu, isMenu }) {
  const { countDueServices } = UseService();
  const { isConfirmedAppointments, loadAppointments } = UseAppointment();
  const navigation = useNavigation();
  const route = useRoute();
  const styles = useThemedStyles(getStyles);

  return (
    <View style={styles.navbar}>
      <Pressable
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
        {/* {route.name === "Home" && <View style={styles.shade}></View>} */}
      </Pressable>

      <Pressable
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
            { bottom: 4 },
          ]}
        >
          Garage
        </Text>
        {/* {route.name === "MyCars" && <View style={styles.shade}></View>} */}
      </Pressable>

      <Pressable
        style={styles.navbarBtn}
        onPress={async () => {
          navigation.navigate("Bookings");
          await loadAppointments();
        }}
      >
        <Feather
          name="calendar"
          size={30}
          style={[styles.icon, route.name === "Bookings" && styles.active]}
        />
        <Text style={[styles.text, route.name === "Bookings" && styles.active]}>
          Bookings
        </Text>
        {isConfirmedAppointments() && route.name !== "Bookings" && (
          <MiniRedCircle />
        )}
        {/* {route.name === "Bookings" && <View style={styles.shade}></View>} */}
      </Pressable>

      <Pressable
        style={styles.navbarBtn}
        onPress={() => navigation.navigate("Service")}
      >
        <Feather
          name="clock"
          size={30}
          style={[styles.icon, route.name === "Service" && styles.active]}
        />
        <Text style={[styles.text, route.name === "Service" && styles.active]}>
          Service
        </Text>
        {countDueServices() > 0 && route.name !== "Service" && (
          <MiniRedCircle />
        )}
        {/* {route.name === "Service" && <View style={styles.shade}></View>} */}
      </Pressable>

      <Pressable style={styles.navbarBtn} onPress={onMenu}>
        <Feather
          name="settings"
          size={30}
          style={[styles.icon, isMenu && styles.active]}
        />
        <Text style={[styles.text, isMenu && styles.active]}>More</Text>
        {/* {route.name === "settings" && <View style={styles.shade}></View>} */}
      </Pressable>
    </View>
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
      zIndex: 1,
    },
    text: {
      color: theme.sec_text,
      fontSize: 12,
      textAlign: "center",
      zIndex: 1,
    },
    active: {
      color: theme.blue,
    },
    // shade: {
    //   backgroundColor: theme.post,
    //   opacity: 1,
    //   width: 55,
    //   height: 50,
    //   borderRadius: 50,
    //   position: "absolute",
    //   alignSelf: "center",
    //   top: 0,
    //   zIndex: 0,
    // },
  });

export default UserNav;
