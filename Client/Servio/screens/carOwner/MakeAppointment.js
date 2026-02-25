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
import { checkSlot } from "../../api/slots";
import ErrorMessage from "../../components/form/ErrorMessage";

const validationSchema = Yup.object({
  date: Yup.date()
    .required("Please select a date")
    .min(
      new Date(new Date().setHours(0, 0, 0, 0)),
      "Date cannot be in the past",
    ),
  time: Yup.string()
    .required("Please select a time")
    .test("is-future-time", "Time must be in the future", function (value) {
      const { date } = this.parent;
      if (!date || !value) return true;

      const selectedDate = new Date(date);
      const [hours, minutes] = value.split(":");
      selectedDate.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);

      return selectedDate > new Date();
    }),
});

function MakeAppointment(props) {
  const [hasBeenSubmited, setHasBeenSubmited] = useState(false);
  const [err, setErr] = useState(null);
  const [overlapping, setOverlapping] = useState(null);
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

    try {
      const slotData = {
        date: date,
        from: values.time,
      };

      const slotCheck = await checkSlot(params.shop.id, slotData);

      if (!slotCheck.ok) {
        setErr("Failed to check slot availability");
        return;
      }

      if (!slotCheck.data.available) {
        setErr(slotCheck.data.message);
        setOverlapping(slotCheck.data.overlappingSlots);
        return;
      }

      const appointmentData = {
        car: params.car._id,
        shop: params.shop.id,
        serviceParts: partsId,
        scheduledDate: date,
        time: values.time,
      };

      const response = await bookAppointment(appointmentData);

      if (response.ok) {
        navigate.navigate("Bookings", { active: "1", celebrate: true });
      } else {
        setErr("This car has another appointment in this time");
        console.log(response);
      }
    } catch (error) {
      console.log(error);
      setErr("An error occurred. Please try again.");
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
                  submittingText="Confirming..."
                  setHasBeenSubmitted={setHasBeenSubmited}
                />

                {err && <ErrorMessage error={err} />}
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
