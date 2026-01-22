import { StyleSheet } from "react-native";
import { useFormikContext } from "formik";
import PriBtn from "../general/PriBtn";

function SubmitBtn({
  submittingText = "Submitting...",
  defaultText = "Submit",
  setHasBeenSubmitted,
  disabled,
  style,
  ...otherProps
}) {
  const { handleSubmit, isSubmitting, isValid } = useFormikContext();

  return (
    <PriBtn
      title={isSubmitting ? submittingText : defaultText}
      onPress={() => {
        if (setHasBeenSubmitted) {
          setHasBeenSubmitted(true);
        }
        handleSubmit();
      }}
      disabled={disabled || isSubmitting}
      loading={isSubmitting}
      style={style}
      {...otherProps}
    />
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default SubmitBtn;
