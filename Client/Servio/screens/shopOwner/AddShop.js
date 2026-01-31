import { View, StyleSheet } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import Navbar from "../../components/general/Navbar";
import * as Yup from "yup";
import { useState } from "react";
import KeyboardScrollScreen from "../../components/general/KeyboardScrollScreen";
import AppForm from "../../components/form/AppForm";
import AddImageBtn from "../../components/form/AddImageBtn";
import FormikInput from "../../components/form/FormikInput";
import GapContainer from "../../components/general/GapContainer";
import SubmitBtn from "../../components/form/SubmitBtn";
import OpenHoursInput from "../../components/form/OpenHoursInput";

const validationSchema = Yup.object({
  image: Yup.string().required("Shop image is required"),
  name: Yup.string().required("Shop name is required"),
  address: Yup.string().required("Shop address is required"),
  phone: Yup.string().required("Shop phone is required"),
  description: Yup.string().required("Shop description is required"),
  services: Yup.string().required("Shop services are required"),
  openHours: Yup.array()
    .of(
      Yup.object().shape({
        day: Yup.string().required(),
        dayName: Yup.string().required(),
        isOpen: Yup.boolean().required(),
        from: Yup.string().when("isOpen", {
          is: true,
          then: (schema) => schema.required("Opening time is required"),
          otherwise: (schema) => schema,
        }),
        to: Yup.string().when("isOpen", {
          is: true,
          then: (schema) => schema.required("Closing time is required"),
          otherwise: (schema) => schema,
        }),
      })
    )
    .test("at-least-one-open", "Shop must be open at least one day", (hours) => {
      return hours?.some((day) => day.isOpen);
    }),
});

function AddShop(props) {
  const [hasBeenSubmitted, setHasbeenSubmitted] = useState(false);

  const handleSubmit = async (values) => {
    console.log("Submitted values:", values);
    // Your submission logic here
  };

  const initialValues = {
    image: "",
    name: "",
    description: "",
    address: "",
    services: "",
    openHours: [
      { day: "sun", dayName: "Sunday", isOpen: true, from: "09:00", to: "18:00" },
      { day: "mon", dayName: "Monday", isOpen: true, from: "09:00", to: "18:00" },
      { day: "tue", dayName: "Tuesday", isOpen: true, from: "09:00", to: "18:00" },
      { day: "wed", dayName: "Wednesday", isOpen: true, from: "09:00", to: "18:00" },
      { day: "thu", dayName: "Thursday", isOpen: true, from: "09:00", to: "18:00" },
      { day: "fri", dayName: "Friday", isOpen: false, from: "", to: "" },
      { day: "sat", dayName: "Saturday", isOpen: false, from: "", to: "" },
    ],
    phone: "",
    link: "",
  };

  return (
    <SafeScreen>
      <KeyboardScrollScreen>
        <AppForm
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, setFieldValue, setStatus }) => (
            <GapContainer gap={15}>
              <AddImageBtn
                image={values.image}
                onImageChange={(imageUri) => {
                  setFieldValue("image", imageUri);
                  setStatus(null);
                }}
                error={hasBeenSubmitted && errors.image}
                errorMessage={errors.image}
              />

              <FormikInput
                name={"name"}
                placeholder={"Shop name"}
                icon={"store-outline"}
                hasBeenSubmitted={hasBeenSubmitted}
              />

              <FormikInput
                name={"address"}
                placeholder={"Shop address"}
                icon={"map-marker-outline"}
                hasBeenSubmitted={hasBeenSubmitted}
              />

              <FormikInput
                name={"phone"}
                placeholder={"Shop phone"}
                icon={"phone-outline"}
                hasBeenSubmitted={hasBeenSubmitted}
              />

              <FormikInput
                name={"link"}
                placeholder={"Shop Link, (Google maps/ Website)"}
                icon={"link"}
                hasBeenSubmitted={hasBeenSubmitted}
              />

              <FormikInput
                name={"description"}
                placeholder={"Shop description"}
                isBox
                height={80}
                icon={"comment-text-outline"}
                hasBeenSubmitted={hasBeenSubmitted}
              />

              <FormikInput
                name={"services"}
                placeholder={"Shop services, (car accessories, oil changes)"}
                isBox
                height={80}
                icon={"wrench-outline"}
                hasBeenSubmitted={hasBeenSubmitted}
              />

              <OpenHoursInput
                name="openHours" 
                hasBeenSubmitted={hasBeenSubmitted}
              />

              <SubmitBtn
                defaultText="Send Request"
                submittingText="Sending..."
                setHasBeenSubmitted={setHasbeenSubmitted}
              />
            </GapContainer>
          )}
        </AppForm>
      </KeyboardScrollScreen>
      <Navbar />
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AddShop;