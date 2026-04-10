import { View, StyleSheet, Pressable, Text, Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useFormikContext } from "formik";
import { useTheme } from "../../context/ThemeContext";
import useThemedStyles from "../../hooks/useThemedStyles";
import ErrorMessage from "./ErrorMessage";
import InputCont from "../general/InputCont";
import TText from "../text/TText";

function FormikDatePicker({
  name,
  placeholder = "Select date",
  lable = placeholder,
  icon = "calendar-outline",
  mode = "date",
  minimumDate,
  maximumDate,
  hasBeenSubmitted = false,
  full,
  dontShowLable,
  onDateChange,
}) {
  const styles = useThemedStyles(getStyles);
  const { theme } = useTheme();
  const { values, errors, setFieldValue, handleBlur } = useFormikContext();
  const [show, setShow] = useState(false);
  const shouldShowError = hasBeenSubmitted && errors[name];

  // Get the value from the nested path
  const getNestedValue = (obj, path) => {
    return path
      .split(/[\[\].]/)
      .filter(Boolean)
      .reduce((acc, part) => acc?.[part], obj);
  };

  const fieldValue = getNestedValue(values, name);

  // Parse the value based on mode
  const getDateValue = () => {
    if (!fieldValue) return null;

    if (mode === "time") {
      // If it's a time string like "09:00", convert to Date
      if (typeof fieldValue === "string" && fieldValue.includes(":")) {
        const [hours, minutes] = fieldValue.split(":");
        const date = new Date();
        date.setHours(parseInt(hours), parseInt(minutes), 0, 0);
        return date;
      }
    }

    return new Date(fieldValue);
  };

  const selectedDate = getDateValue();

  const handlePress = () => {
    setShow(true);
  };

  const onChange = (event, selectedDate) => {
    // On Android, dismiss on any interaction
    if (Platform.OS === "android") {
      setShow(false);
    }

    if (selectedDate) {
      if (mode === "time") {
        // Store as "HH:MM" string for time mode
        const hours = selectedDate.getHours().toString().padStart(2, "0");
        const minutes = selectedDate.getMinutes().toString().padStart(2, "0");
        setFieldValue(name, `${hours}:${minutes}`);
      } else {
        // Store as Date for date/datetime modes
        setFieldValue(name, selectedDate);
        onDateChange?.(selectedDate);
      }
    }
  };

  const formatDate = (date) => {
    if (!date) return placeholder;

    if (mode === "time") {
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    }

    if (mode === "datetime") {
      return date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    }

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <InputCont>
      {!dontShowLable && (
        <TText thin color={"darker_gray"}>
          {lable}
        </TText>
      )}
      <Pressable
        style={[styles.container, { width: full ? "100%" : "90%" }]}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        {icon && (
          <MaterialCommunityIcons
            name={icon}
            size={24}
            color={theme.main_text}
          />
        )}
        <Text style={[styles.text, !selectedDate && styles.placeholder]}>
          {formatDate(selectedDate)}
        </Text>
      </Pressable>

      {shouldShowError && <ErrorMessage full error={errors[name]} />}

      {show && (
        <RNDateTimePicker
          mode={mode}
          value={selectedDate || new Date()}
          onChange={onChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          display={Platform.OS === "ios" ? "spinner" : "default"}
        />
      )}
    </InputCont>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      borderRadius: 15,
      borderColor: theme.faded,
      borderWidth: 1,
      backgroundColor: theme.post,
      paddingVertical: 8,
      paddingHorizontal: 15,
      gap: 10,
      minHeight: 40,
      alignItems: "center",
      marginHorizontal: "auto",
      width: "100%",
    },
    text: {
      color: theme.darker_gray,
      fontSize: 16,
      flex: 1,
    },
    placeholder: {
      opacity: 0.6,
    },
  });

export default FormikDatePicker;
