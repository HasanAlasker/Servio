import { View, StyleSheet, TouchableOpacity, Text, Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useFormikContext } from "formik";
import { useTheme } from "../../context/ThemeContext";
import useThemedStyles from "../../hooks/useThemedStyles";
import ErrorMessage from "./ErrorMessage";

function FormikDatePicker({
  name,
  placeholder = "Select date",
  icon = "calendar",
  minimumDate,
  maximumDate,
  hasBeenSubmitted = false,
}) {
  const styles = useThemedStyles(getStyles);
  const { theme } = useTheme();
  const { values, errors, setFieldValue, handleBlur } = useFormikContext();
  const [show, setShow] = useState(false);
  const shouldShowError = hasBeenSubmitted && errors[name];

  const selectedDate = values[name] ? new Date(values[name]) : null;

  const handlePress = () => {
    setShow(true);
  };

  const onChange = (event, selectedDate) => {
    // On Android, dismiss on any interaction
    if (Platform.OS === 'android') {
      setShow(false);
    }
    
    if (selectedDate) {
      setFieldValue(name, selectedDate);
    }
  };

  const formatDate = (date) => {
    if (!date) return placeholder;
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <View>
      <TouchableOpacity 
        style={styles.container} 
        onPress={handlePress}
        activeOpacity={0.7}
      >
        {icon && (
          <MaterialCommunityIcons name={icon} size={24} color={theme.blue} />
        )}
        <Text style={[styles.text, !selectedDate && styles.placeholder]}>
          {formatDate(selectedDate)}
        </Text>
      </TouchableOpacity>

      {shouldShowError && <ErrorMessage error={errors[name]} />}

      {show && (
        <RNDateTimePicker
          mode="date"
          value={selectedDate || new Date()}
          onChange={onChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
        />
      )}
    </View>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      borderRadius: 25,
      borderColor: theme.faded,
      borderWidth: 1,
      backgroundColor: theme.post,
      paddingVertical: 8,
      paddingHorizontal: 15,
      width: "90%",
      marginHorizontal: "auto",
      gap: 10,
      minHeight: 40,
      alignItems: "center",
    },
    text: {
      color: theme.blue,
      fontWeight: "bold",
      fontSize: 16,
      flex: 1,
    },
    placeholder: {
      opacity: 0.6,
    },
  });

export default FormikDatePicker;