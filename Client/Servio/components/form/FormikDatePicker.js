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
  icon = "calendar-outline",
  mode = "date",
  minimumDate,
  maximumDate,
  hasBeenSubmitted = false,
}) {
  const styles = useThemedStyles(getStyles);
  const { theme } = useTheme();
  const { values, errors, setFieldValue, handleBlur } = useFormikContext();
  const [show, setShow] = useState(false);
  const shouldShowError = hasBeenSubmitted && errors[name];

  // Get the value from the nested path
  const getNestedValue = (obj, path) => {
    return path.split(/[\[\].]/).filter(Boolean).reduce((acc, part) => acc?.[part], obj);
  };

  const fieldValue = getNestedValue(values, name);
  
  // Parse the value based on mode
  const getDateValue = () => {
    if (!fieldValue) return null;
    
    if (mode === 'time') {
      // If it's a time string like "09:00", convert to Date
      if (typeof fieldValue === 'string' && fieldValue.includes(':')) {
        const [hours, minutes] = fieldValue.split(':');
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
    if (Platform.OS === 'android') {
      setShow(false);
    }
    
    if (selectedDate) {
      if (mode === 'time') {
        // Store as "HH:MM" string for time mode
        const hours = selectedDate.getHours().toString().padStart(2, '0');
        const minutes = selectedDate.getMinutes().toString().padStart(2, '0');
        setFieldValue(name, `${hours}:${minutes}`);
      } else {
        // Store as Date for date/datetime modes
        setFieldValue(name, selectedDate);
      }
    }
  };

  const formatDate = (date) => {
    if (!date) return placeholder;
    
    if (mode === 'time') {
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    }
    
    if (mode === 'datetime') {
      return date.toLocaleString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    }
    
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
          mode={mode}
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
      width: "100%",
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