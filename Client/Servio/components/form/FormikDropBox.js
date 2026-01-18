import { StyleSheet } from "react-native";
import { useFormikContext } from "formik";
import DropBox from '../DropBox'
import ErrorMessage from "./ErrorMessage";

function FormikDropBox({
  name,
  placeholder,
  items,
  disabled = false,
  penOn = false,
  hasBeenSubmitted = false,
  userPlan,
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
        selectedValue={values[name]}
        onSelectItem={(value) => {
          setFieldValue(name, value);
          // Don't set field as touched immediately to avoid showing errors
          if (setStatus) {
            setStatus(null);
          }
        }}
        disabled={disabled}
        userPlan={userPlan}
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
