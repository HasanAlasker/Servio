import { Alert, Linking } from "react-native";
import { useAlert } from "../config/AlertContext";

// Function to open URLs
export const openURL = async (url, showAlert) => {
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    showAlert({
      title: "Leave App?",
      message: `Your are leaving the app and going to\n ${url}`,
      confirmText: "Yes",
      cancelText: "No",
      onConfirm: async () => {
        try {
          await Linking.openURL(url);
        } catch (error) {
          showAlert({
            title: "Error",
            message: "Something went wrong.",
            confirmText: "Close",
          });
        }
      },
    });
  } else {
    Alert.alert("Error", `Cannot open URL: ${url}`);
  }
};
