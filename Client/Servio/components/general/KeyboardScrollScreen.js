import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function KeyboardScrollScreen({children, ...other}) {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
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
