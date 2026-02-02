import { StyleSheet } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import Navbar from "../../components/general/Navbar";
import KeyboardScrollScreen from "../../components/general/KeyboardScrollScreen";
import * as Yup from "yup";
import AppForm from "../../components/form/AppForm";
import { UseUser } from "../../context/UserContext";
import GapContainer from "../../components/general/GapContainer";
import FormikInput from "../../components/form/FormikInput";
import { useState } from "react";
import SeparatorComp from "../../components/general/SeparatorComp";
import SubmitBtn from "../../components/form/SubmitBtn";
import UserCard from "../../components/cards/UserCard";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters long")
    .max(25, "Name must not exceed 25 characters")
    .matches(
      /^[a-zA-Z\s'-]+$/,
      "Name can only contain letters, spaces, hyphens, and apostrophes",
    )
    .trim()
    .required("Name is required"),

  phone: Yup.string()
    .required("Phone is required")
    .test(
      "phone-validation",
      "Please enter a valid phone number",
      function (value) {
        if (!value || value.trim() === "") return true;
        const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
        const isValidFormat = phoneRegex.test(value);
        const isValidLength = value.length >= 10 && value.length <= 15;
        return isValidFormat && isValidLength;
      },
    ),
});

function Profile(props) {
  const [hasBeenSubmitted, setHasBeenSubmited] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const { user, editProfile } = UseUser();

  const initialValues = {
    name: user.name,
    phone: user.phone,
  };

  const handleEditPress = () => {
    setEdit(!isEdit);
  };

  const handleSubmit = async (values) => {
    setHasBeenSubmited(true);
    try {
      const response = await editProfile(values);
      if (response.status !== 200) console.log(response.message);
      setEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeScreen>
      <KeyboardScrollScreen>
        <GapContainer style={{ marginVertical: "auto" }}>
          <UserCard
            passedUser={user}
            handleEditPress={handleEditPress}
            isEdit={isEdit}
          />
          {isEdit && (
            <AppForm
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <GapContainer>
                <SeparatorComp children={"Edit your info"} />
                <FormikInput
                  name={"name"}
                  placeholder={"Name"}
                  hasBeenSubmitted={hasBeenSubmitted}
                />
                <FormikInput
                  name={"phone"}
                  placeholder={"Phone"}
                  hasBeenSubmitted={hasBeenSubmitted}
                />

                <SubmitBtn
                  defaultText="Save"
                  submittingText="Saving..."
                  disabled={!isEdit}
                />
              </GapContainer>
            </AppForm>
          )}
        </GapContainer>
      </KeyboardScrollScreen>
      <Navbar />
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Profile;
