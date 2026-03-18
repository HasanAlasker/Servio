import {
  StyleSheet,
  Linking,
} from "react-native";
import MenuBackBtn from "../../components/general/MenuBackBtn";
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
        <GapContainer gap={20}>
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
              onPress={() =>
                navigate.navigate(!isAdmin ? "Suggestions" : "SeeSuggestions")
              }
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

          {!isAdmin && (
            <SettingsGroup label={!isShopOwner ? "Business" : "Cars"}>
              <SettingsOption
                icon={!isShopOwner ? "shopping-bag" : "clock"}
                text={!isShopOwner ? "Open Shop" : "Upcoming Services"}
                onPress={() =>
                  navigate.navigate(!isShopOwner ? "AddShop" : "Service")
                }
              />
            </SettingsGroup>
          )}

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
            {isUser && <SeparatorComp full color="light_gray" />}
            {isUser && (
              <SettingsOption
                icon={"user-x"}
                text={"Delete Account"}
                red
                onPress={() =>
                  openURL(
                    "https://servio-maintenance.netlify.app/delete-account",
                  )
                }
              />
            )}
          </SettingsGroup>
        </GapContainer>
      </ScrollScreen>
    </SafeScreen>
  );
}
const getStyles = (theme) =>
  StyleSheet.create({

  });

export default Settings;
