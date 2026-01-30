import { StyleSheet } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import KeyboardScrollScreen from "../../components/general/KeyboardScrollScreen";
import Navbar from "../../components/general/Navbar";
import AppForm from "../../components/form/AppForm";
import { useState } from "react";
import * as Yup from "yup";
import FormikInput from "../../components/form/FormikInput";
import GapContainer from "../../components/general/GapContainer";
import FormikDropBox from "../../components/form/FormikDropBox";
import { suggestionTypes } from "../../constants/dropList";
import SubmitBtn from "../../components/form/SubmitBtn";
import { makeSuggestion } from "../../api/suggestion";
import { useNavigation } from "@react-navigation/native";

const validationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must not exceed 100 characters"),

  message: Yup.string()
    .trim()
    .required("Message is required")
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must not exceed 1000 characters"),

  type: Yup.string()
    .required("Type is required")
    .oneOf(
      ["feature request", "bug report", "improvement", "question", "other"],
      "Invalid suggestion type",
    ),
});

function Suggestions(props) {
  const [hasBeenSubmitted, setHasBeenSubmited] = useState(false);
  const navigate = useNavigation();

  const initialValues = {
    type: "",
    title: "",
    message: "",
  };

  const handleSubmit = async (values) => {
    try {
      const response = await makeSuggestion(values);
      if (response.ok) navigate.goBack();
      if (!response.ok) console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeScreen>
      <KeyboardScrollScreen>
        <AppForm
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <GapContainer gap={15}>
            <FormikDropBox
              name={"type"}
              placeholder={"Type"}
              icon={"view-day-outline"}
              items={suggestionTypes}
              hasBeenSubmitted={hasBeenSubmitted}
            />

            <FormikInput
              name={"title"}
              placeholder={"Title"}
              icon={"subtitles-outline"}
              hasBeenSubmitted={hasBeenSubmitted}
            />

            <FormikInput
              name={"message"}
              placeholder={"Message"}
              icon={"tooltip-text-outline"}
              hasBeenSubmitted={hasBeenSubmitted}
              isBox
              height={110}
            />

            <SubmitBtn
              setHasBeenSubmitted={setHasBeenSubmited}
              defaultText="Submit Suggestion"
              submittingText="Submitting..."
            />
          </GapContainer>
        </AppForm>
      </KeyboardScrollScreen>
      <Navbar />
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Suggestions;
