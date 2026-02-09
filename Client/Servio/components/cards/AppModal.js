import { View, StyleSheet, Modal, Pressable } from "react-native";
import AppForm from "../form/AppForm";
import * as Yup from "yup";
import { useState } from "react";
import FormikDatePicker from "../form/FormikDatePicker";
import SubmitBtn from "../form/SubmitBtn";
import useThemedStyles from "../../hooks/useThemedStyles";
import GapContainer from "../general/GapContainer";
import SText from "../text/SText";
import PriBtn from "../general/PriBtn";
import { useTheme } from "../../context/ThemeContext";
import { getTimeFromDate } from "../../functions/fromatTime";
import { formatDate } from "../../functions/formatDate";
import IconTextLabel from "../general/IconTextLabel";
import { confirmAppointment } from "../../api/appointment";
import ErrorMessage from "../form/ErrorMessage";

const validationSchema = Yup.object({
  to: Yup.string().required("Please select a time"),
});

function AppModal({ from, isVisible, onClose, id, onApproval }) {
  const styles = useThemedStyles(getStyles);
  const { theme } = useTheme();
  const [hasBeenSubmited, setHasBeenSubmited] = useState(false);
  const [err, setErr] = useState(null);

  const initialValues = {
    to: null,
  };
  const handleSubmit = async (values) => {
    setErr(null);
    try {
      const data = {
        to: values.to,
      };
      const response = await confirmAppointment(id, data);
      if (response.ok) {
        onApproval(id);
        onClose();
      } else setErr(response.data.message);
    } catch (error) {
      console.log(error);
      setErr("Error");
    }
  };

  return (
    <Modal transparent visible={isVisible}>
      <Pressable onPress={onClose} style={styles.overlay} />
      <GapContainer style={styles.container}>
        <AppForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <SText style={{ textAlign: "center" }}>Confirmation</SText>

          <View style={styles.grayBox}>
            <IconTextLabel
              icon={"calendar-blank-outline"}
              text={formatDate(from)}
            />
            <IconTextLabel
              icon={"clock-outline"}
              text={getTimeFromDate(from)}
            />
          </View>
          <FormikDatePicker
            name={"to"}
            icon="clock-outline"
            placeholder="Select finish time"
            hasBeenSubmitted={hasBeenSubmited}
            mode="time"
          />
          <GapContainer gap={15}>
            <SubmitBtn
              defaultText="Confirm"
              submittingText="Confirming..."
              setHasBeenSubmitted={setHasBeenSubmited}
            />
            {/* <PriBtn
              style={{ backgroundColor: theme.red, borderColor: theme.red }}
              title={"Cancel"}
              onPress={onClose}
            /> */}
            {err && <ErrorMessage error={err} />}
          </GapContainer>
        </AppForm>
      </GapContainer>
    </Modal>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      width: "90%",
      margin: "auto",
      backgroundColor: theme.post,
      paddingVertical: 20,
      borderRadius: 18,
      zIndex: 100,
    },
    overlay: {
      position: "absolute",
      inset: 0,
      backgroundColor: "black",
      zIndex: 90,
      opacity: 0.5,
    },
    grayBox: {
      margin: "auto",
      backgroundColor: theme.faded + 50,
      width: "90%",
      paddingHorizontal: 10,
      paddingVertical: 15,
      borderRadius: 18,
      borderWidth: 1.5,
      borderColor: theme.faded,
    },
  });

export default AppModal;
