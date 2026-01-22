import { StyleSheet } from "react-native";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import useThemedStyles from "../../hooks/useThemedStyles";
import { useUser } from "../../config/UserContext";
import { useEffect, useState } from "react";
import SettingsMenu from "../SettingsMenu";
import useApi from "../../hooks/useApi";
import { gotRequests, sentRequests } from "../../api/request";
import MiniRedCircle from "../MiniRedCircle";
import { givenItems } from "../../api/borrow";

function Navbar(props) {
  const navigation = useNavigation();
  const route = useRoute();
  const { logout, isAdmin, user } = useUser();
  const [isMenu, setIsMenu] = useState(false);

  const {
    data: gotReq,
    request: getReq,
    loading: gotLoading,
  } = useApi(gotRequests);

  const {
    data: sentReq,
    request: getSent,
    loading: sentLoading,
  } = useApi(sentRequests);

  const {
    data: given,
    request: getGiven,
    loading: givenLoading,
  } = useApi(givenItems);

  useEffect(() => {
    getReq(user.id);
    getSent(user.id);
    getGiven(user.id);
  }, [user.id]);

  const bookNotification = () => {
    return given.some((item) => item.status === "pending_return");
  };

  let profileNotification = false;

  if (sentReq.length > 0 || gotReq.length > 0) profileNotification = true;

  const styles = useThemedStyles(getStyles);

  // Check if we're on the Profile screen AND it's the current user's profile
  const isMyProfile =
    route.name === "Profile" &&
    (route.params?.userId === user.id || !route.params?.userId);

  return (
    <>
      <SettingsMenu isVisible={isMenu} onClose={() => setIsMenu(false)} />
      {!isAdmin ? ( // Normal user Navbar
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
            onPress={() => navigation.navigate("Have")}
          >
            <Feather
              name="clipboard"
              size={30}
              style={[styles.icon, route.name === "Have" && styles.active]}
            />
            <Text style={[styles.text, route.name === "Have" && styles.active]}>
              Items
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navbarBtn}
            onPress={() => navigation.navigate("Post")}
          >
            <Feather
              name="plus-circle"
              size={30}
              style={[styles.icon, route.name === "Post" && styles.active]}
            />
            <Text style={[styles.text, route.name === "Post" && styles.active]}>
              Post
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navbarBtn}
            onPress={() => navigation.navigate("Book")}
          >
            <Feather
              name="calendar"
              size={30}
              style={[styles.icon, route.name === "Book" && styles.active]}
            />
            <Text style={[styles.text, route.name === "Book" && styles.active]}>
              Book
            </Text>

            {bookNotification() && route.name !== "Book" && <MiniRedCircle />}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navbarBtn}
            onPress={() => navigation.navigate("Profile")}
          >
            <Feather
              name="user"
              size={30}
              style={[styles.icon, isMyProfile && styles.active]}
            />
            <Text style={[styles.text, isMyProfile && styles.active]}>
              Profile
            </Text>

            {profileNotification &&
              !isMyProfile &&
              route.name !== "Requests" && <MiniRedCircle />}
          </TouchableOpacity>
        </View>
      ) : (
        // Admin user Navbar
        <View style={styles.navbar}>
          <TouchableOpacity
            style={styles.navbarBtn}
            onPress={() => navigation.navigate("Dash")}
          >
            <Feather
              name="pie-chart"
              size={30}
              style={[styles.icon, route.name === "Dash" && styles.active]}
            />
            <Text style={[styles.text, route.name === "Dash" && styles.active]}>
              Dash
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navbarBtn}
            onPress={() => navigation.navigate("Search")}
          >
            <Feather
              name="search"
              size={30}
              style={[styles.icon, route.name === "Search" && styles.active]}
            />
            <Text
              style={[styles.text, route.name === "Search" && styles.active]}
            >
              Search
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navbarBtn}
            onPress={() => navigation.navigate("Reports")}
          >
            <Feather
              name="file-text"
              size={30}
              style={[styles.icon, route.name === "Reports" && styles.active]}
            />
            <Text
              style={[styles.text, route.name === "Reports" && styles.active]}
            >
              Reports
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navbarBtn}
            onPress={() => navigation.navigate("Blocks")}
          >
            <Feather
              name="x-circle"
              size={30}
              style={[styles.icon, route.name === "Blocks" && styles.active]}
            />
            <Text
              style={[styles.text, route.name === "Blocks" && styles.active]}
            >
              Blocks
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navbarBtn}
            onPress={() => setIsMenu(true)} // Open menu here
          >
            <Feather name="settings" size={30} style={[styles.icon]} />
            <Text style={[styles.text]}>Settings</Text>
          </TouchableOpacity>
        </View>
      )}
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
