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
        <LogoAndMoto />
        <AppForm
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
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
        </AppForm>
      </KeyboardScrollScreen>
    </SafeScreen>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {},
  });

export default Login;
