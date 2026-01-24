import { View, StyleSheet } from "react-native";
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
import { addCar, getMakeAndModels } from "../../api/car";
import useApi from "../../hooks/useApi";
import { capFirstLetter } from "../../functions/CapFirstLetterOfWord";
import { useNavigation } from "@react-navigation/native";

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
  const [cars, setCars] = useState([]);
  const [selectedMake, setSelectedMake] = useState(null);
  const [namesList, setNamesList] = useState([]);

  const navigate = useNavigation();

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
    const namesList = selectedCar.name;
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
    try {
      const response = await addCar(values);
      if (response.ok) {
        navigate.navigate("MyCars");
      }
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
                icon={"package"}
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
                  icon={"truck"}
                  hasBeenSubmitted={hasBeenSubmitted}
                  onSelectItem={(value) => {
                    setFieldValue("name", value);
                  }}
                />
              )}

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
                disabled={loading}
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
