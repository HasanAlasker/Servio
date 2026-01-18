import { StyleSheet } from 'react-native';
import { useFormikContext } from 'formik';
import InputBox from '../InputBox';
import ErrorMessage from './ErrorMessage';

function FormikInput({name, placeholder, penOn=false, keyboardType, autoCapitalize, hasBeenSubmitted=false, icon ,isBox, isPassword, ...other}) {
  const {values, errors, handleBlur, handleChange} = useFormikContext()
  const shouldShowError = hasBeenSubmitted && errors[name];


  return (
    <>
      <InputBox
        placeholder={placeholder}
        penOn={penOn}
        value={values[name]}
        onChangeText={handleChange(name)}
        onBlur={handleBlur(name)}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        icon={icon}
        isBox={isBox}
        isPassword={isPassword}
        {...other}
      />
      {shouldShowError && <ErrorMessage error={errors[name]} />}
    </>
  );
}

const styles = StyleSheet.create({
  container:{},
})

export default FormikInput;