
import * as ImagePicker from 'expo-image-picker';

export const requestImagePermission = async () => {
  const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!result.granted) {
    alert("enable permission to continue");
    return false;
  }
  return true;
};

export const selectImageFromLibrary = async (options = {}) => {
  try {
    const hasPermission = await requestImagePermission();
    if (!hasPermission) return null;

    const defaultOptions = {
      mediaTypes: ['images'],
      quality: 0.5,
      ...options, // Allow custom options to override defaults
    };

    const result = await ImagePicker.launchImageLibraryAsync(defaultOptions);
    
    if (!result.canceled) {
      return result.assets[0].uri;
    }
    return null;
  } catch (error) {
    alert("error while choosing image");
    return null;
  }
};

export const selectImageFromCamera = async (options = {}) => {
  try {
    const hasPermission = await ImagePicker.requestCameraPermissionsAsync();
    if (!hasPermission.granted) {
      alert("Camera permission required");
      return null;
    }

    const defaultOptions = {
      mediaTypes: ['images'],
      quality: 0.5,
      ...options,
    };

    const result = await ImagePicker.launchCameraAsync(defaultOptions);
    
    if (!result.canceled) {
      return result.assets[0].uri;
    }
    return null;
  } catch (error) {
    alert("error while taking photo");
    return null;
  }
};