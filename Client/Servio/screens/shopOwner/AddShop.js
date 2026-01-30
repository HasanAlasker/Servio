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

const validationSchema = Yup.object({});

function AddShop(props) {
  const [hasBeenSubmitted, setHasbeenSubmitted] = useState(false);

  const handleSubmit = async (values) => {};

  const initialValues = {
    "image": '',
    "name":"",
    "description":"",
    "address":"",
    "services":[""],
    "openHours":"",
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
            <GapContainer>
              <AddImageBtn
                image={values.image}
                onImageChange={(imageUri) => {
                  setFieldValue("image", imageUri);
                  setStatus(null);
                }}
                error={hasBeenSubmitted && errors.image}
                errorMessage={errors.image}
              />

              <FormikInput name={'name'} placeholder={"Shop Name"} icon={"store-outline"} hasBeenSubmitted={hasBeenSubmitted} />
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
