import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  StatusBar,
  Linking,
} from "react-native";
import MenuBackBtn from "../../components/general/MenuBackBtn";
import MenuOption from "../../components/general/MenuOption";
import SeparatorComp from "../../components/general/SeparatorComp";
import { useNavigation } from "@react-navigation/native";
import useThemedStyles from "../../hooks/useThemedStyles";
import { useTheme } from "../../context/ThemeContext";
import GapContainer from "../../components/general/GapContainer";
import { UseUser } from "../../context/UserContext";
import { openURL } from "../../functions/openURL";
import SafeScreen from "../../components/general/SafeScreen";
import ScrollScreen from "../../components/general/ScrollScreen";
import SettingsGroup from "../../components/cards/SettingsGroup";
import SettingsOption from "../../components/general/SettingsOption";

function Settings(props) {
  const styles = useThemedStyles(getStyles);
  const { toggleTheme, isDarkMode } = useTheme();
  const { logout, isUser, isAdmin, isShopOwner } = UseUser();
  const navigate = useNavigation();

  return (
    <SafeScreen>
      <ScrollScreen>
        <MenuBackBtn onClose={() => navigate.goBack()} />
        <GapContainer>
          <SettingsGroup label={"Account"}>
            <SettingsOption
              icon={"user"}
              text={"My Profile"}
              onPress={() => navigate.navigate("Profile")}
            />
            <SeparatorComp full color="light_gray" />
            <SettingsOption
              icon={"message-circle"}
              text={"Suggestions"}
              onPress={() => navigate.navigate("Suggestions")}
            />
            <SeparatorComp full color="light_gray" />
            <SettingsOption
              icon={"shield"}
              text={"Permissions"}
              onPress={() => Linking.openSettings()}
            />
          </SettingsGroup>

          <SettingsGroup label={"Preferences"}>
            <SettingsOption
              icon={isDarkMode ? "sun" : "moon"}
              text={isDarkMode ? "Light mode" : "Dark mode"}
              onPress={toggleTheme}
            />
          </SettingsGroup>

          <SettingsGroup label={"Business"}>
            <SettingsOption
              icon={"shopping-bag"}
              text={"Open Shop"}
              onPress={() => navigate.navigate("AddShop")}
            />
          </SettingsGroup>

          <SettingsGroup label={"Support"}>
            <SettingsOption
              icon={"headphones"}
              text={"Help"}
              onPress={() =>
                openURL("https://servio-maintenance.netlify.app/how-it-works")
              }
            />
            <SeparatorComp full color="light_gray" />
            <SettingsOption
              icon={"file-text"}
              text={"Privacy & Terms"}
              onPress={() =>
                openURL("https://servio-maintenance.netlify.app/privacy-policy")
              }
            />
          </SettingsGroup>

          <SettingsGroup label={"Danger Zone"}>
            <SettingsOption
              icon={"log-out"}
              text={"Logout"}
              onPress={logout}
              red
            />
            <SeparatorComp full color="light_gray" />
            <SettingsOption
              icon={"user-x"}
              text={"Delete Account"}
              red
              onPress={() =>
                openURL("https://servio-maintenance.netlify.app/delete-account")
              }
            />
          </SettingsGroup>
        </GapContainer>

        {/*        <MenuBackBtn onClose={() => navigate.goBack()} />
        <GapContainer gap={5}>
          <MenuOption
            text={isDarkMode ? "Light mode" : "Dark mode"}
            icon={"circle-half-full"}
            onPress={toggleTheme}
          />
          <SeparatorComp full color="faded" />

          <MenuOption
            text={"My Profile"}
            icon={"account-circle-outline"}
            onPress={() => navigate.navigate("Profile")}
          />
          <SeparatorComp full color="faded" />

          <MenuOption
            text={"Suggestions"}
            icon={"chat-outline"}
            onPress={() =>
              navigate.navigate(!isAdmin ? "Suggestions" : "SeeSuggestions")
            }
          />
          <SeparatorComp full color="faded" />

          {isUser && (
            <MenuOption
              text={"Open Shop"}
              icon={"storefront-plus-outline"}
              onPress={() => navigate.navigate("AddShop")}
            />
          )}
          {isUser && <SeparatorComp full color="faded" />}

          {isShopOwner && (
            <MenuOption
              text={"Upcoming Services"}
              icon={"clock-outline"}
              onPress={() => navigate.navigate("Service")}
            />
          )}
          {isShopOwner && <SeparatorComp full color="faded" />}

          <MenuOption
            text={"Help"}
            icon={"headphones"}
            onPress={() =>
              openURL("https://servio-maintenance.netlify.app/how-it-works")
            }
          />
          <SeparatorComp full color="faded" />

          <MenuOption
            text={"Log out"}
            icon={"logout"}
            color={"red"}
            onPress={logout}
          />
        </GapContainer> */}
      </ScrollScreen>
    </SafeScreen>
  );
}
const getStyles = (theme) =>
  StyleSheet.create({
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

export default Settings;
