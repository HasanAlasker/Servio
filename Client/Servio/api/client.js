import { create } from "apisauce";
import { BASE_URL } from "../constants/baseUrl";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const apiClient = create({
  baseURL: BASE_URL,
});

// Add auth token to all requests
apiClient.addAsyncRequestTransform(async (request) => {
  const token = await AsyncStorage.getItem("@ajroo_token"); // or whatever key you use
  if (token) {
    request.headers["x-auth-token"] = token; // Match your backend's header name
  }
});