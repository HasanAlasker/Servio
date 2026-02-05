import { StyleSheet } from "react-native";
import SafeScreen from "../../components/general/SafeScreen";
import Navbar from "../../components/general/Navbar";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import KeyboardScrollScreen from "../../components/general/KeyboardScrollScreen";
import AppForm from "../../components/form/AppForm";
import AddImageBtn from "../../components/form/AddImageBtn";
import FormikInput from "../../components/form/FormikInput";
import GapContainer from "../../components/general/GapContainer";
import SubmitBtn from "../../components/form/SubmitBtn";
import OpenHoursInput from "../../components/form/OpenHoursInput";
import { editShop, openShop } from "../../api/shop";
import { useNavigation, useRoute } from "@react-navigation/native";
import ErrorMessage from "../../components/form/ErrorMessage";
import { formatServices, revertServices } from "../../functions/formatServices";
 
const validationSchema = Yup.object({
  image: Yup.string().required("Shop image is required"),
  name: Yup.string().required("Shop name is required"),
  city: Yup.string().trim().required("City is required"),
  area: Yup.string().trim().required("Area is required"),
  street: Yup.string().trim().required("Street is required"),
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
      }),
    )
    .test(
      "at-least-one-open",
      "Shop must be open at least one day",
      (hours) => {
        return hours?.some((day) => day.isOpen);
      },
    ),
  link: Yup.string().required(),
});

const formatValues = (values) => {
  const { city, area, street, services, ...rest } = values;

  return {
    ...values,
    services: formatServices(values.services),
    address: {
      city: values.city,
      area: values.area,
      street: values.street,
    },
  };
};

function AddShop(props) {
  const [hasBeenSubmitted, setHasbeenSubmitted] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState(null);

  const navigate = useNavigation();
  const route = useRoute();
  const params = route?.params;

  useEffect(() => {
    if (params) setEdit(true);
  }, []);

  const handleSubmit = async (values) => {
    setErr(false);
    setErrMsg(null);
    const formattedValues = formatValues(values);

    try {
      const response = await openShop(formattedValues);
      if (response.ok) {
        navigate.navigate("MyShop");
      }
      if (!response.ok) {
        setErr(true);
        if (response?.data?.message) {
          setErrMsg(response.data.message);
        }
        // Fallback to validation errors
        else if (response?.data?.errors?.[0]?.message) {
          setErrMsg(response.data.errors[0].message);
        } else {
          setErrMsg("An error occurred. Please try again.");
        }
      }
    } catch (error) {}
  };

  const handleEdit = async (values) => {
    setErr(false);
    setErrMsg(null);
    const formattedValues = formatValues(values);

    try {
      const response = await editShop(params._id, formattedValues);
      if (response.ok) {
        navigate.navigate("MyShop");
      }
      if (!response.ok) {
        setErr(true);
        if (response?.data?.message) {
          setErrMsg(response.data.message);
        } else if (response?.data?.errors?.[0]?.message) {
          setErrMsg(response.data.errors[0].message);
        } else {
          setErrMsg("An error occurred. Please try again.");
        }
      }
    } catch (error) {}
  };

  console.log(params?.openHours);

  const initialValues = {
    image: params?.image || "",
    name: params?.name || "",
    description: params?.description || "",
    city: params?.address?.city || "",
    area: params?.address?.area || "",
    street: params?.address?.street || "",
    services: revertServices(params?.services) || "",
    openHours: [
      {
        day: "sun",
        dayName: "Sunday",
        isOpen: params?.openHours[0].isOpen || true,
        from: params?.openHours[0].from || "09:00",
        to: params?.openHours[0].to || "18:00",
      },
      {
        day: "mon",
        dayName: "Monday",
        isOpen: params?.openHours[1].isOpen || true,
        from: params?.openHours[1].from || "09:00",
        to: params?.openHours[1].to || "18:00",
      },
      {
        day: "tue",
        dayName: "Tuesday",
        isOpen: params?.openHours[2].isOpen || true,
        from: params?.openHours[2].from || "09:00",
        to: params?.openHours[2].to || "18:00",
      },
      {
        day: "wed",
        dayName: "Wednesday",
        isOpen: params?.openHours[3].isOpen || true,
        from: params?.openHours[3].from || "09:00",
        to: params?.openHours[3].to || "18:00",
      },
      {
        day: "thu",
        dayName: "Thursday",
        isOpen: params?.openHours[4].isOpen || true,
        from: params?.openHours[4].from || "09:00",
        to: params?.openHours[4].to || "18:00",
      },
      {
        day: "fri",
        dayName: "Friday",
        isOpen: params?.openHours[5].isOpen || false,
        from: params?.openHours[5].from || "",
        to: params?.openHours[5].to || "",
      },
      {
        day: "sat",
        dayName: "Saturday",
        isOpen: params?.openHours[6].isOpen || false,
        from: params?.openHours[6].from || "",
        to: params?.openHours[6].to || "",
      },
    ],
    phone: params?.phone || "",
    link: params?.link || "",
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

              <FormikInput
                name={"name"}
                placeholder={"Shop name"}
                icon={"store-outline"}
                hasBeenSubmitted={hasBeenSubmitted}
              />

              <FormikInput
                name={"city"}
                placeholder={"City"}
                icon={"city"}
                hasBeenSubmitted={hasBeenSubmitted}
              />

              <FormikInput
                name={"area"}
                placeholder={"Area"}
                icon={"map-marker-radius-outline"}
                hasBeenSubmitted={hasBeenSubmitted}
              />

              <FormikInput
                name={"street"}
                placeholder={"Street"}
                icon={"road-variant"}
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
                placeholder={"Shop Link (Google maps)"}
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
                defaultText={!isEdit ? "Send Request" : "Edit Shop"}
                submittingText={!isEdit ? "Sending..." : "Editing"}
                setHasBeenSubmitted={setHasbeenSubmitted}
              />

              {err && <ErrorMessage error={errMsg} />}
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
