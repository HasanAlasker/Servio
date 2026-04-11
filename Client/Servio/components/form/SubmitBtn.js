import { StyleSheet } from "react-native";
import { useFormikContext } from "formik";
import PriBtn from "../general/PriBtn";

function SubmitBtn({
  submittingText = "Submitting...",
  defaultText = "Submit",
  setHasBeenSubmitted,
  disabled,
  style,
  submitRef,
  ...otherProps
}) {
  const { handleSubmit, isSubmitting, isValid } = useFormikContext();

  const handlePress = () => {
    setHasBeenSubmitted?.(true);
    handleSubmit();
  };

  if (submitRef) submitRef.current = handlePress;

  return (
    <PriBtn
      title={isSubmitting ? submittingText : defaultText}
      onPress={handlePress}
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
