import { useContext, createContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import useApi from "../hooks/useApi";
import { getMe, loginUser } from "../api/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = createContext();

export const UseUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("UseUser must be used within a provider");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState(null);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const navigate = useNavigation();

  const {
    data: fetchedUser,
    request: fetchUser,
    message: resMsg,
    error: resErr,
    loading: resLoading,
    status: resStatus,
  } = useApi(getMe);

  const STORAGE_KEYS = {
    USER: "@servio_user",
    TOKEN: "@servio_token",
  };

  const loadUserData = async () => {
    try {
      const loadedUser = await AsyncStorage.getItem(STORAGE_KEYS.USER);
      const loadedToken = await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
      if (loadedUser && loadedToken) {
        setUser(JSON.parse(loadedUser));
        setToken(loadedToken);
      }
    } catch (error) {
      console.error("Error loading stored user", error);
    }
  };

  const storeUserData = async (user, token) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, token);
    } catch (error) {
      console.error("Error storing user data", error);
    }
  };

  const removeUserData = async () => {
    try {
      await AsyncStorage.multiRemove([STORAGE_KEYS.USER, STORAGE_KEYS.TOKEN]);
    } catch (error) {
      console.error("Error removing user data", error);
    }
  };

  const getMyProfile = async () => {};

  const login = async (data) => {
    try {
      setLoading(true);
      setError(false);
      setMessage(null);
      setStatus(null);

      const res = await loginUser(data);

      const responseMessage = res.data.message;
      const responseStatus = res.status;

      if (!res.ok) {
        setError(true);
        return {
          success: false,
          error: error,
          message: responseMessage,
          status: responseStatus,
        };
      }

      const userData = res.data.data;
      const tokenData = res.headers["x-auth-token"];

      setUser(userData);
      setToken(tokenData);
      setMessage(responseMessage);
      setStatus(responseStatus);

      await storeUserData(userData, tokenData);
      return {
        success: true,
        message: responseMessage,
        status: responseStatus,
      };
    } catch (error) {
      console.error("Login error:", error);
      setError(true);
      setMessage(error.message || "An error occurred during login");
      return {
        success: false,
        message: error.message || "An error occurred during login",
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async () => {
    // save token to asyncStorage
  };

  const logout = async () => {
    try {
      setUser(null);
      setToken(null);
      await removeUserData();
    } catch (error) {
      console.error("Error logging out user", error);
    }
  };

  const role = user?.role;
  const isAdmin = user?.role === "admin";
  const isUser = user?.role === "user";
  const isShopOwner = user?.role === "shopOwner";

  const value = {
    user,
    token,
    loading,
    error,
    message,
    status,
    getMyProfile,
    login,
    register,
    logout,
    role,
    isAdmin,
    isUser,
    isShopOwner,
    loadUserData,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
