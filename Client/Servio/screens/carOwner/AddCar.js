import { View, StyleSheet } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import Navbar from "../../components/general/Navbar";
import * as Yup from "yup";
import AppForm from "../../components/form/AppForm";
import KeyboardScrollScreen from "../../components/general/KeyboardScrollScreen";
import FormikInput from "../../components/form/FormikInput";
import GapContainer from "../../components/general/GapContainer";
import { useState } from "react";
import SubmitBtn from "../../components/form/SubmitBtn";
import AddImageBtn from "../../components/form/AddImageBtn";

export const validationSchema = Yup.object({
  make: Yup.string().trim().required("Car make is required"),

  name: Yup.string().trim().required("Car model name is required"),

  image: Yup.string().default(""),

  model: Yup.number()
    .integer("Year must be a whole number")
    .min(1900, "Year must be 1900 or later")
    .max(new Date().getFullYear() + 1, "Year cannot be in the future")
    .required("Year is required")
    .typeError("Year must be a number"),

  color: Yup.string().trim(),

  plateNumber: Yup.string().trim().required("Plate number is required"),

  mileage: Yup.number()
    .min(0, "Mileage cannot be negative")
    .required("Mileage is required")
    .typeError("Mileage must be a number"),
});

const initialValues = {
  name: "",
  make: "",
  model: "",
  color: "",
  plateNumber: "",
  mileage: "",
  image: "",
};

function AddCar(props) {
  const [hasBeenSubmitted, setHasBeenSubmited] = useState(false);

  const handleSubmit = async (values) => {};

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
                name={"model"}
                placeholder={"Model"}
                icon={"hash"}
                autoCapitalize={"none"}
                keyboardType={"numeric"}
                hasBeenSubmitted={hasBeenSubmitted}
              />

              <FormikInput
                name={"plateNumber"}
                placeholder={"Plate number"}
                icon={"credit-card"}
                autoCapitalize={"none"}
                hasBeenSubmitted={hasBeenSubmitted}
              />

              <FormikInput
                name={"mileage"}
                placeholder={"Mileage"}
                icon={"disc"}
                autoCapitalize={"none"}
                keyboardType={"numeric"}
                hasBeenSubmitted={hasBeenSubmitted}
              />

              <FormikInput
                name={"color"}
                placeholder={"Color"}
                icon={"droplet"}
                autoCapitalize={"none"}
                hasBeenSubmitted={hasBeenSubmitted}
              />

              <SubmitBtn
                defaultText="Add Car"
                submittingText="Adding Car..."
                setHasBeenSubmitted={setHasBeenSubmited}
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

export default AddCar;
