import { StyleSheet } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import Navbar from "../../components/general/Navbar";
import * as Yup from "yup";
import AppForm from "../../components/form/AppForm";
import KeyboardScrollScreen from "../../components/general/KeyboardScrollScreen";
import FormikInput from "../../components/form/FormikInput";
import GapContainer from "../../components/general/GapContainer";
import { useEffect, useState } from "react";
import SubmitBtn from "../../components/form/SubmitBtn";
import AddImageBtn from "../../components/form/AddImageBtn";
import FormikDropBox from "../../components/form/FormikDropBox";
import { addCar, editCar, getMakeAndModels } from "../../api/car";
import useApi from "../../hooks/useApi";
import { capFirstLetter } from "../../functions/CapFirstLetterOfWord";
import { useNavigation, useRoute } from "@react-navigation/native";
import PriBtn from "../../components/general/PriBtn";
import useThemedStyles from "../../hooks/useThemedStyles";

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

  color: Yup.string().trim().required("Color is required"),

  plateNumber: Yup.string().trim().required("Plate number is required"),

  mileage: Yup.number()
    .min(0, "Mileage cannot be negative")
    .required("Mileage is required")
    .typeError("Mileage must be a number"),
});

function AddCar(props) {
  const styles = useThemedStyles(getStyles);

  const [hasBeenSubmitted, setHasBeenSubmited] = useState(false);
  const [cars, setCars] = useState([]);
  const [selectedMake, setSelectedMake] = useState(null);
  const [namesList, setNamesList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigation();
  const route = useRoute();

  const params = route?.params;
  useEffect(() => {
    if (params) {
      setIsEdit(true);
      setSelectedMake(params.make);
    }
  }, []);

  const initialValues = {
    make: params?.make || "",
    name: params?.name || "",
    model: params?.model?.toString() || "",
    color: params?.color || "",
    plateNumber: params?.plateNumber || "",
    mileage: params?.mileage?.toString() || "",
    image: params?.image || "",
  };

  const {
    data: fetchedCars,
    request: fetchCars,
    loading,
    error,
  } = useApi(getMakeAndModels);

  useEffect(() => {
    fetchCars();
  }, []);

  useEffect(() => {
    setCars(fetchedCars);
  }, [fetchedCars]);

  const makesList = cars.map((car) => ({
    label: capFirstLetter(car.make),
    value: car.make,
  }));

  const getCarNames = () => {
    let selectedCar = cars.find((car) => car.make === selectedMake);
    const namesList = selectedCar?.name;
    if (selectedCar && namesList) {
      const list = namesList.map((name) => ({
        label: capFirstLetter(name),
        value: name,
      }));
      setNamesList(list);
    }
  };

  useEffect(() => {
    if (selectedMake) {
      getCarNames();
    } else {
      setNamesList([]);
    }
  }, [selectedMake, cars]);

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      const response = await addCar(values);
      if (response.ok) {
        navigate.navigate("MyCars");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = async (values) => {
    setIsSubmitting(true);
    try {
      const response = await editCar(params.id, values);
      if (response.ok) {
        navigate.navigate("MyCars");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeScreen>
      <KeyboardScrollScreen>
        <AppForm
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={!isEdit ? handleSubmit : handleEdit}
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

              <FormikDropBox
                name={"make"}
                placeholder={"Make"}
                items={makesList}
                icon={"home-city-outline"}
                hasBeenSubmitted={hasBeenSubmitted}
                onSelectItem={(value) => {
                  setSelectedMake(value);
                  setFieldValue("make", value);
                  // Reset model when make changes
                  setFieldValue("name", "");
                }}
              />

              {selectedMake && (
                <FormikDropBox
                  name={"name"}
                  placeholder={"Name"}
                  items={namesList}
                  icon={"car-lifted-pickup"}
                  hasBeenSubmitted={hasBeenSubmitted}
                  onSelectItem={(value) => {
                    setFieldValue("name", value);
                  }}
                />
              )}

              <FormikInput
                name={"model"}
                placeholder={"Model (Year of make)"}
                icon={"timer-cog-outline"}
                autoCapitalize={"none"}
                keyboardType={"numeric"}
                hasBeenSubmitted={hasBeenSubmitted}
              />

              <FormikInput
                name={"plateNumber"}
                placeholder={"Plate number"}
                icon={"newspaper-variant-outline"}
                autoCapitalize={"none"}
                hasBeenSubmitted={hasBeenSubmitted}
              />

              <FormikInput
                name={"mileage"}
                placeholder={"Mileage"}
                icon={"gauge"}
                autoCapitalize={"none"}
                keyboardType={"numeric"}
                hasBeenSubmitted={hasBeenSubmitted}
              />

              <FormikInput
                name={"color"}
                placeholder={"Color"}
                icon={"palette-outline"}
                autoCapitalize={"none"}
                hasBeenSubmitted={hasBeenSubmitted}
              />

              <SubmitBtn
                defaultText={!isEdit ? "Add Car" : "Edit Car"}
                submittingText={!isEdit ? "Adding Car..." : "Editing Car..."}
                disabled={loading}
                setHasBeenSubmitted={setHasBeenSubmited}
              />

              {isEdit && (
                <PriBtn
                  title={"Cancel"}
                  style={styles.delete}
                  disabled={loading || isSubmitting}
                  onPress={() => navigate.goBack()}
                />
              )}
            </GapContainer>
          )}
        </AppForm>
      </KeyboardScrollScreen>
      <Navbar />
    </SafeScreen>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    delete: {
      backgroundColor: theme.red,
      borderColor: theme.red,
    },
  });

export default AddCar;
