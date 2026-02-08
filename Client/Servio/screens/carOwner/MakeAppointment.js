import { StyleSheet } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import GapContainer from "../../components/general/GapContainer";
import KeyboardScrollScreen from "../../components/general/KeyboardScrollScreen";
import Navbar from "../../components/general/Navbar";
import { useNavigation, useRoute } from "@react-navigation/native";
import AppForm from "../../components/form/AppForm";
import * as Yup from "yup";
import FormikDatePicker from "../../components/form/FormikDatePicker";
import SubmitBtn from "../../components/form/SubmitBtn";
import { useState } from "react";
import AppSummary from "../../components/cards/AppSummary";
import { bookAppointment } from "../../api/appointment";

const validationSchema = Yup.object({
  date: Yup.date()
    .required("Please select a date")
    .min(new Date(), "Date cannot be in the past"),
  time: Yup.string().required("Please select a time").nullable(),
});

function MakeAppointment(props) {
  const [hasBeenSubmited, setHasBeenSubmited] = useState(false);
  const navigate = useNavigation();
  const route = useRoute();
  const params = route.params;

  const initialValues = {
    date: "",
    time: "",
  };

  let partsId = route.params.parts.map((part) => part._id);

  const handleSubmit = async (values) => {
    let dateObj = new Date(values.date);
    const [hours, minutes] = values.time.split(":");
    dateObj.setHours(parseInt(hours, 10));
    dateObj.setMinutes(parseInt(minutes, 10));
    dateObj.setSeconds(0);
    dateObj.setMilliseconds(0);

    let date = dateObj.toISOString();

    const data = {
      car: params.car._id,
      shop: params.shop.id,
      serviceParts: partsId,
      scheduledDate: date,
      time: values.time,
    };

    try {
      const response = await bookAppointment(data);
      if (response.ok) navigate.navigate("Bookings");
      else console.log(response);
    } catch (error) {
      console.log(error);
    }
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

const styles = StyleSheet.create({});

export default MakeAppointment;
