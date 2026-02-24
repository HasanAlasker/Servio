import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  StatusBar,
} from "react-native";
import MenuBackBtn from "./MenuBackBtn";
import MenuOption from "./MenuOption";
import SeparatorComp from "./SeparatorComp";
import { useNavigation } from "@react-navigation/native";
import { Modal } from "react-native";
import useThemedStyles from "../../hooks/useThemedStyles";
import { useTheme } from "../../context/ThemeContext";
import GapContainer from "./GapContainer";
import { UseUser } from "../../context/UserContext";
import { openURL } from "../../functions/openURL";

function SettingsMenu({ isVisible, onClose }) {
  const styles = useThemedStyles(getStyles);
  const { toggleTheme, isDarkMode } = useTheme();
  const { logout, isUser, isAdmin, isShopOwner } = UseUser();
  const navigate = useNavigation();

  if (!isVisible) return null;
  return (
    <Modal transparent animationType="slide">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      <View style={styles.container}>
        <MenuBackBtn onClose={onClose} />
        <GapContainer gap={10}>
          <MenuOption
            text={isDarkMode ? "Light mode" : "Dark mode"}
            icon={"circle-half-full"}
            onPress={toggleTheme}
          />
          <SeparatorComp full />

          <MenuOption
            text={"My Profile"}
            icon={"account-circle-outline"}
            onPress={() => navigate.navigate("Profile")}
          />
          <SeparatorComp full />

          <MenuOption
            text={"Suggestions"}
            icon={"chat-outline"}
            onPress={() =>
              navigate.navigate(!isAdmin ? "Suggestions" : "SeeSuggestions")
            }
          />
          <SeparatorComp full />

          {isUser && (
            <MenuOption
              text={"Open Shop"}
              icon={"storefront-plus-outline"}
              color={"blue"}
              onPress={() => navigate.navigate("AddShop")}
            />
          )}
          {isUser && <SeparatorComp full />}

          {isShopOwner && (
            <MenuOption
              text={"Upcoming Services"}
              icon={"clock-outline"}
              color={"blue"}
              onPress={() => navigate.navigate("Service")}
            />
          )}
          {isShopOwner && <SeparatorComp full />}

          <MenuOption
            text={"Help"}
            icon={"headphones"}
            color={"green"}
            onPress={() =>
              openURL("https://servio-maintenance.netlify.app/how-it-works")
            }
          />
          <SeparatorComp full />

          <MenuOption
            text={"Log out"}
            icon={"logout"}
            color={"red"}
            onPress={logout}
          />
        </GapContainer>
      </View>
    </Modal>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      width: "100%",
      backgroundColor: theme.post,
      position: "absolute",
      zIndex: 120,
      paddingHorizontal: 20,
      paddingTop: StatusBar.currentHeight,
      paddingBottom: 40,
      borderBottomRightRadius: 22,
      borderBottomLeftRadius: 22,
    },
    sep: {
      width: "100%",
      marginTop: 5,
    },
    overlay: {
      position: "absolute",
      inset: 0,
      backgroundColor: theme.background,
      zIndex: 90,
      opacity: 0.5,
    },
  });

export default SettingsMenu;
