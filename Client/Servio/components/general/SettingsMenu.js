import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import MenuBackBtn from "./MenuBackBtn";
import MenuOption from "./MenuOption";
import SeparatorComp from "./SeparatorComp";
import { useNavigation } from "@react-navigation/native";
import { Modal } from "react-native";
import useThemedStyles from "../../hooks/useThemedStyles";
import { useTheme } from "../../context/ThemeContext";
import GapContainer from "./GapContainer";
import { UseUser } from "../../context/UserContext";

function SettingsMenu({ isVisible, onClose }) {
  const styles = useThemedStyles(getStyles);
  const { toggleTheme, isDarkMode } = useTheme();
  const { logout, isAdmin } = UseUser();
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

          {!isAdmin && (
            <MenuOption
              text={"Open Shop"}
              icon={"storefront-plus-outline"}
              color={"blue"}
              onPress={() => navigate.navigate("AddShop")}
            />
          )}
          {!isAdmin && <SeparatorComp full />}

          <MenuOption
            text={"Suggestions"}
            icon={"chat-outline"}
            color={"green"}
            onPress={() => navigate.navigate("Suggestions")}
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
      paddingTop: 20,
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
