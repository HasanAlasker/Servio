import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, StyleSheet, Pressable, Text } from "react-native";
import useThemedStyles from "../../hooks/useThemedStyles";
import Shade from "./Shade";

function Admin({ onMenu, isMenu }) {
  const navigation = useNavigation();
  const route = useRoute();
  const styles = useThemedStyles(getStyles);

  return (
    <View style={styles.navbar}>
      <Pressable
        style={styles.navbarBtn}
        onPress={() => navigation.navigate("Dash")}
      >
        <Feather
          name="home"
          size={26}
          style={[styles.icon, route.name === "Dash" && styles.active]}
        />
        <Text style={[styles.text, route.name === "Dash" && styles.active]}>
          Home
        </Text>

        {route.name === "Dash" && <Shade />}
      </Pressable>

      <Pressable
        style={styles.navbarBtn}
        onPress={() => navigation.navigate("AdminShops")}
      >
        <Ionicons
          name="storefront-outline"
          size={30}
          style={[styles.icon, route.name === "AdminShops" && styles.active]}
        />
        <Text
          style={[
            styles.text,
            route.name === "AdminShops" && styles.active,
            { bottom: 3 },
          ]}
        >
          Shops
        </Text>
        {route.name === "AdminShops" && <Shade />}
      </Pressable>

      <Pressable
        style={styles.navbarBtn}
        onPress={() => navigation.navigate("Reports")}
      >
        <MaterialCommunityIcons
          name="bullhorn-variant-outline"
          size={26}
          style={[styles.icon, route.name === "Reports" && styles.active]}
        />
        <Text style={[styles.text, route.name === "Reports" && styles.active]}>
          Reports
        </Text>
        {route.name === "Reports" && <Shade />}
      </Pressable>

      <Pressable
        style={styles.navbarBtn}
        onPress={() => navigation.navigate("Users")}
      >
        <Feather
          name="users"
          size={26}
          style={[styles.icon, route.name === "Users" && styles.active]}
        />
        <Text style={[styles.text, route.name === "Users" && styles.active]}>
          Users
        </Text>
        {route.name === "Users" && <Shade />}
      </Pressable>

      <Pressable style={styles.navbarBtn} onPress={onMenu}>
        <Feather
          name="more-horizontal"
          size={26}
          style={[styles.icon, isMenu && styles.active]}
        />
        <Text style={[styles.text, isMenu && styles.active]}>More</Text>
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

export default Admin;
