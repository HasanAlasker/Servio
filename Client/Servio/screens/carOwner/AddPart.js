import { View, StyleSheet } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import KeyboardScrollScreen from "../../components/general/KeyboardScrollScreen";
import Navbar from "../../components/general/Navbar";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Yup from "yup";
import AppForm from "../../components/form/AppForm";
import { useEffect, useState } from "react";
import GapContainer from "../../components/general/GapContainer";
import FormikInput from "../../components/form/FormikInput";
import SeparatorComp from "../../components/general/SeparatorComp";
import SubmitBtn from "../../components/form/SubmitBtn";
import { addPart, editPart, unTrackPart } from "../../api/part";
import ErrorMessage from "../../components/form/ErrorMessage";
import PriBtn from "../../components/general/PriBtn";
import { useTheme } from "../../context/ThemeContext";

const validationSchema = Yup.object({
  name: Yup.string().trim().lowercase().required("Part name is required"),

  months: Yup.number()
    .min(0, "Months cannot be negative")
    .required("Recommended months are required")
    .transform((value, originalValue) =>
      originalValue === "" ||
      originalValue === null ||
      originalValue === undefined
        ? null
        : value,
    )
    .typeError("Months must be a number"),

  miles: Yup.number()
    .min(0, "Miles cannot be negative")
    .required("Recommended miles are required")
    .transform((value, originalValue) =>
      originalValue === "" ||
      originalValue === null ||
      originalValue === undefined
        ? null
        : value,
    )
    .typeError("Miles must be a number"),

  lastChangeDate: Yup.date()
    .max(new Date(), "Last change date cannot be in the future")
    .required("Last change date is required")
    .typeError("Last change date must be a valid date"),

  lastChangeMileage: Yup.number()
    .min(0, "Mileage cannot be negative")
    .required("Last change mileage is required")
    .typeError("Mileage must be a number"),
});

function AddPart(props) {
  const { theme } = useTheme();
  const [hasBeenSubmitted, setHasBeenSubmited] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const [isEdit, setEdit] = useState(false);

  const navigate = useNavigation();
  const route = useRoute();
  const params = route?.params;

  const initialValues = {
    name: params?.partName || "",
    lastChangeDate: params?.lastChangeDate || "",
    lastChangeMileage: params?.lastChangeMileage?.toString() || "",
    months: params?.recommendedChangeInterval?.months?.toString() || null,
    miles: params?.recommendedChangeInterval?.miles?.toString() || null,
  };

  useEffect(() => {
    if (params.isEdit) {
      setEdit(true);
    }
  }, [params]);

  const handleSubmit = async (values) => {
    const data = {
      name: values.name,
      lastChangeDate: values.lastChangeDate,
      lastChangeMileage: Number(values.lastChangeMileage),
      recommendedChangeInterval: {
        months: Number(values.months),
        miles: Number(values.miles),
      },
    };
    try {
      const response = await addPart(params.id, data);
      if (response.ok) {
        navigate.navigate("CarParts", params);
      }
      if (!response.ok) {
        setErrMsg(response.data.errors[0].message);
      }
    } catch (error) {}
  };

  const handleEdit = async (values) => {
    const data = {
      name: values.name,
      lastChangeDate: values.lastChangeDate,
      lastChangeMileage: Number(values.lastChangeMileage),
      recommendedChangeInterval: {
        months: Number(values.months),
        miles: Number(values.miles),
      },
    };
    try {
      const response = await editPart(params.partId, data);
      if (response.ok) {
        navigate.navigate("MyCars");
      }
      if (!response.ok) {
        setErrMsg(response.data.errors[0].message);
      }
    } catch (error) {}
  };

  const handleDelete = async (values) => {
    try {
      const response = await unTrackPart(params.partId);
      if (response.ok) {
        navigate.navigate("MyCars");
      }
      if (!response.ok) {
        setErrMsg(response.data.errors[0].message);
      }
    } catch (error) {}
  };

  return (
    <SafeScreen>
      <KeyboardScrollScreen>
        <AppForm
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={!isEdit ? handleSubmit : handleEdit}
        >
          <GapContainer gap={15}>
            <FormikInput
              name={"name"}
              placeholder={"Part Name"}
              icon={"engine-outline"}
              hasBeenSubmitted={hasBeenSubmitted}
            />

            <FormikInput
              name={"lastChangeDate"}
              placeholder={"Last change date"}
              icon={"clock-outline"}
              hasBeenSubmitted={hasBeenSubmitted}
            />

            <FormikInput
              name={"lastChangeMileage"}
              placeholder={"Last change mileage"}
              icon={"gauge"}
              hasBeenSubmitted={hasBeenSubmitted}
            />
            <SeparatorComp children={"Recommended change after"} />
            <FormikInput
              name={"months"}
              placeholder={"Months"}
              icon={"calendar-outline"}
              hasBeenSubmitted={hasBeenSubmitted}
            />

            <FormikInput
              name={"miles"}
              placeholder={"Miles/ Kilometers"}
              icon={"skip-next-circle-outline"}
              hasBeenSubmitted={hasBeenSubmitted}
            />

            {errMsg && <ErrorMessage error={errMsg} />}

            <SubmitBtn
              defaultText={!isEdit ? "Add Part" : "Edit Part"}
              submittingText={!isEdit ? "Adding Part..." : "Editing Part..."}
              setHasBeenSubmitted={setHasBeenSubmited}
            />
            <PriBtn
              style={{ backgroundColor: theme.red, borderColor: theme.red }}
              title={"Delete Part"}
              onPress={handleDelete}
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

export default AddPart;
