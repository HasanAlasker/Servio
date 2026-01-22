import { View, StyleSheet } from "react-native";
import AppText from "../../config/AppText";
import SafeScreen from "../../components/general/SafeScreen";
import KeyboardScrollScreen from "../../components/general/KeyboardScrollScreen";
import LogoAndMoto from "../../components/welcome/LogoAndMoto";
import AppForm from "../../components/form/AppForm";
import * as Yup from "yup";
import useThemedStyles from "../../hooks/useThemedStyles";
import { useNavigation } from "@react-navigation/native";
import { UseUser } from "../../context/UserContext";
import FormikInput from "../../components/form/FormikInput";
import { useState } from "react";
import PriBtn from "../../components/general/PriBtn";
import GapContainer from "../../components/general/GapContainer";
import SeparatorComp from "../../components/general/SeparatorComp";
import SecBtn from "../../components/general/SecBtn";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required")
    .trim(),
  password: Yup.string().required("Password is required").trim(),
});

const initialValues = {
  password: "",
  email: "",
};

function Login(props) {
  const styles = useThemedStyles(getStyles);
  const navigation = useNavigation();
  const { login, error, message, loading, status } = UseUser();

  const [hasBeenSubmitted, setHasBeenSubmited] = useState(false);

  const handleSubmit = async () => {};

  return (
    <SafeScreen>
      <KeyboardScrollScreen>
        <View style={styles.container}>
          <LogoAndMoto />
          <AppForm
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <GapContainer style={{ marginTop: "40" }}>
              <FormikInput
                name={"email"}
                placeholder={"Email"}
                autoCapitalize={"none"}
                icon={"mail"}
                hasBeenSubmitted={hasBeenSubmitted}
              />

              <FormikInput
                name={"password"}
                placeholder={"Password"}
                autoCapitalize={"none"}
                icon={"lock"}
                isPassword={true}
                hasBeenSubmitted={hasBeenSubmitted}
              />

              <PriBtn title={"Login"} />
              <SeparatorComp children={"Or"} />
              <SecBtn title={"Create Account"} />
            </GapContainer>
          </AppForm>
        </View>
      </KeyboardScrollScreen>
    </SafeScreen>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      marginVertical:"auto"
    },
  });

export default Login;
