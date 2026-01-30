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

const validationSchema = Yup.object({});

function AddShop(props) {
  const [hasBeenSubmitted, setHasbeenSubmitted] = useState(false);

  const handleSubmit = async (values) => {};

  const initialValues = {
    image: "",
    name: "",
    description: "",
    address: "",
    services: "",
    openHours: "",
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
                placeholder={"Shop Link, ex (google maps/ website)"}
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
