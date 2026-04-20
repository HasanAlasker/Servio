import { Platform, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ScrollScreen from "./ScrollScreen";

function KeyboardScrollScreen({ children, ...other }) {
  if (Platform.OS === "web") return <ScrollScreen>{children}</ScrollScreen>;
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 30, paddingTop: 20 }}
      enableOnAndroid={true}
      extraScrollHeight={60}
      showsVerticalScrollIndicator={false}
      {...other}
    >
      {children}
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default KeyboardScrollScreen;
