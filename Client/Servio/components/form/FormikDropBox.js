import { StyleSheet } from "react-native";
import { useFormikContext } from "formik";
import ErrorMessage from "./ErrorMessage";
import DropBox from "../general/DropBox";

function FormikDropBox({
  name,
  placeholder,
  items,
  disabled = false,
  penOn = false,
  hasBeenSubmitted = false,
  icon,
  ...other
}) {
  const { values, errors, touched, setFieldTouched, setFieldValue, setStatus } =
    useFormikContext();
  const shouldShowError = hasBeenSubmitted && errors[name];

  return (
    <>
      <DropBox
        placeholder={placeholder}
        penOn={penOn}
        items={items}
        icon={icon}
        selectedValue={values[name]}
        onSelectItem={(value) => {
          setFieldValue(name, value);
          // Don't set field as touched immediately to avoid showing errors
          if (setStatus) {
            setStatus(null);
          }
        }}
        disabled={disabled}
        {...other}
      />
      {shouldShowError && <ErrorMessage error={errors[name]}></ErrorMessage>}
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default FormikDropBox;
