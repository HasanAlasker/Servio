import { View, StyleSheet } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import GapContainer from "../../components/general/GapContainer";
import KeyboardScrollScreen from "../../components/general/KeyboardScrollScreen";
import Navbar from "../../components/general/Navbar";
import { useRoute } from "@react-navigation/native";
import AppForm from "../../components/form/AppForm";
import * as Yup from "yup";
import FormikDatePicker from "../../components/form/FormikDatePicker";
import SubmitBtn from "../../components/form/SubmitBtn";
import { useState } from "react";
import AppSummary from "../../components/cards/AppSummary";

const validationSchema = Yup.object({
  date: Yup.date()
    .required("Please select a date")
    .min(new Date(), "Date cannot be in the past"),
  time: Yup.string().required("Please select a time").nullable(),
});

function MakeAppointment(props) {
  const [hasBeenSubmited, setHasBeenSubmited] = useState(false);
  const route = useRoute();
  const params = route.params;

  const initialValues = {
    date: "",
    time: "",
  };

  const handleSubmit = async (values) => {
    // dont forget to format the scheduled date to iso so its date and time
  };

  return (
    <SafeScreen>
      <KeyboardScrollScreen>
        <GapContainer style={{ marginVertical: "auto" }}>
          <AppForm
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <GapContainer gap={15}>
                <AppSummary params={params} />

                <FormikDatePicker
                  name={"date"}
                  icon="calendar-outline"
                  hasBeenSubmitted={hasBeenSubmited}
                />

                {values.date && (
                  <FormikDatePicker
                    name={"time"}
                    mode="time"
                    placeholder="Select time"
                    icon="clock-outline"
                    hasBeenSubmitted={hasBeenSubmited}
                  />
                )}

                <SubmitBtn
                  defaultText="Confirm"
                  submittingText="Confirming"
                  setHasBeenSubmitted={setHasBeenSubmited}
                />
              </GapContainer>
            )}
          </AppForm>
        </GapContainer>
      </KeyboardScrollScreen>
      <Navbar />
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: "auto",
  },
});

export default MakeAppointment;
