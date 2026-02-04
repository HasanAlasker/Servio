import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import useThemedStyles from "../../hooks/useThemedStyles";

function ShopOwner({ onMenu, isMenu }) {
  const navigation = useNavigation();
  const route = useRoute();
  const styles = useThemedStyles(getStyles);

  return (
    <View style={styles.navbar}>
      <TouchableOpacity
        style={styles.navbarBtn}
        onPress={() => navigation.navigate("ShopDash")}
      >
        <Feather
          name="home"
          size={30}
          style={[styles.icon, route.name === "ShopDash" && styles.active]}
        />
        <Text style={[styles.text, route.name === "ShopDash" && styles.active]}>
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navbarBtn}
        onPress={() => navigation.navigate("MyShop")}
      >
        <Ionicons
          name="storefront-outline"
          size={35}
          style={[styles.icon, route.name === "MyShop" && styles.active]}
        />
        <Text
          style={[
            styles.text,
            route.name === "MyShop" && styles.active,
            { bottom: 3 },
          ]}
        >
          My Shops
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navbarBtn}
        onPress={() => navigation.navigate("ShopBook")}
      >
        <Feather
          name="calendar"
          size={30}
          style={[styles.icon, route.name === "ShopBook" && styles.active]}
        />
        <Text style={[styles.text, route.name === "ShopBook" && styles.active]}>
          Bookings
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
            { bottom: 4 },
          ]}
        >
          My Cars
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navbarBtn} onPress={onMenu}>
        <Feather
          name="settings"
          size={30}
          style={[styles.icon, isMenu && styles.active]}
        />
        <Text style={[styles.text, isMenu && styles.active]}>Settings</Text>
      </TouchableOpacity>
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
  });

export default ShopOwner;
