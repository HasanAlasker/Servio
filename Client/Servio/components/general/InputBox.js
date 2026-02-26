import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import useThemedStyles from "../../hooks/useThemedStyles";

function InputBox({
  placeholder,
  penOn,
  icon,
  value,
  isPassword,
  isBox,
  ...rest
}) {
  const styles = useThemedStyles(getStyles);
  const { theme } = useTheme();
  const [isHidden, setIsHidden] = useState(isPassword ? true : false);

  const handleHidden = () => {
    setIsHidden(!isHidden);
  };

  return (
    <View style={styles.container}>
      {penOn && <Feather name="edit-3" size={24} color={theme.blue} />}
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={24}
          color={theme.blue}
          style={isBox && styles.padding}
        />
      )}
      <TextInput
        style={[
          styles.text,
          isBox && {
            textAlignVertical: "top",
            paddingTop: 6,
            flexWrap: "wrap",
          },
          !value && styles.placeholder,
        ]}
        multiline={isBox}
        placeholder={placeholder}
        placeholderTextColor={theme.blue}
        value={value}
        secureTextEntry={isHidden}
        {...rest}
      />
      {isPassword && (
        <TouchableOpacity onPress={handleHidden}>
          <Feather
            name={isHidden ? "eye" : "eye-off"}
            size={24}
            color={theme.blue}
          />
        </TouchableOpacity>
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
      // marginTop: 20,
      gap: 10,
      minHeight: 40,
    },
    text: {
      color: theme.blue,
      fontWeight: "bold",
      fontSize: 16,
      flex: 1,
      padding: 0,
      margin: 0,
      textAlignVertical: "center",
    },
    placeholder: {
      opacity: 0.6,
    },
    padding: {
      marginTop: 5,
    },
  });

export default InputBox;
