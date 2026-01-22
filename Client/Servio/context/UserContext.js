import { useContext, createContext, useState } from "react";
import { editUser, getMe, loginUser, registerUser } from "../api/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isServerAwake } from "../api/upcomingService";

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
  const [appStart, setAppStart] = useState(false);
  const [status, setStatus] = useState(null);
  const [serverAwake, setServerAwake] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const STORAGE_KEYS = {
    USER: "@servio_user",
    TOKEN: "@servio_token",
  };

  const loadUserData = async () => {
    setLoading(false);
    setAppStart(false);
    try {
      setLoading(true);
      setAppStart(true);
      const loadedUser = await AsyncStorage.getItem(STORAGE_KEYS.USER);
      const loadedToken = await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
      if (loadedUser && loadedToken) {
        setUser(JSON.parse(loadedUser));
        setToken(loadedToken);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error loading stored user", error);
    } finally {
      setLoading(false);
      setAppStart(false);
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

  const checkServerConnection = async () => {
    try {
      setLoading(true);
      setError(false);
      setMessage(null);
      setStatus(null);
      setServerAwake(false);

      const res = await isServerAwake();

      const responseMessage = res.data?.message;
      const responseStatus = res.status;

      if (!res.ok) {
        setError(true);
        setMessage(responseMessage);
        setStatus(responseStatus);
        return {
          success: false,
          message: responseMessage,
          status: responseStatus,
        };
      }

      setMessage(responseMessage);
      setStatus(responseStatus);
      setServerAwake(true);

      return {
        success: true,
        message: responseMessage,
        status: responseStatus,
      };
    } catch (error) {
      console.error("Connection error:", error);
      setError(true);
      setMessage(
        error.message || "An error occurred while connecting to the server",
      );
      return {
        success: false,
        message:
          error.message || "An error occurred while connecting to the server",
      };
    } finally {
      setLoading(false);
    }
  };

  const getMyProfile = async () => {
    try {
      setLoading(true);
      setError(false);
      setMessage(null);
      setStatus(null);

      const res = await getMe();

      const responseMessage = res.data?.message;
      const responseStatus = res.status;

      if (!res.ok) {
        setError(true);
        setMessage(responseMessage);
        setStatus(responseStatus);
        return {
          success: false,
          message: responseMessage,
          status: responseStatus,
        };
      }

      const userData = res.data.data;

      setUser(userData);
      setMessage(responseMessage);
      setStatus(responseStatus);

      await storeUserData(userData, token);

      return {
        success: true,
        message: responseMessage,
        status: responseStatus,
      };
    } catch (error) {
      console.error("User fetch error:", error);
      setError(true);
      setMessage(error.message || "An error occurred while fetching");
      return {
        success: false,
        message: error.message || "An error occurred while fetching",
      };
    } finally {
      setLoading(false);
    }
  };

  const login = async (data) => {
    try {
      setLoading(true);
      setError(false);
      setMessage(null);
      setStatus(null);

      const res = await loginUser(data);

      const responseMessage = res.data?.message;
      const responseStatus = res.status;

      if (!res.ok) {
        setError(true);
        setMessage(responseMessage); // Don't clear user/token here
        setStatus(responseStatus);
        return {
          success: false,
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
      setIsAuthenticated(true);

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

  const register = async (data) => {
    try {
      setLoading(true);
      setError(false);
      setMessage(null);
      setStatus(null);

      const res = await registerUser(data);

      const responseMessage = res.data?.message;
      const responseStatus = res.status;

      if (!res.ok) {
        setError(true);
        return {
          success: false,
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
      setIsAuthenticated(true);

      await storeUserData(userData, tokenData);
      return {
        success: true,
        message: responseMessage,
        status: responseStatus,
      };
    } catch (error) {
      console.error("Registration error:", error);
      setError(true);
      setMessage(error.message || "An error occurred during registration");
      return {
        success: false,
        message: error.message || "An error occurred during registration",
      };
    } finally {
      setLoading(false);
    }
  };

  const editProfile = async (id, data) => {
    try {
      setLoading(true);
      setError(false);
      setMessage(null);
      setStatus(null);

      const res = await editUser(id, data);

      const responseMessage = res.data?.message;
      const responseStatus = res.status;

      if (!res.ok) {
        setError(true);
        return {
          success: false,
          message: responseMessage,
          status: responseStatus,
        };
      }

      const userData = res.data.data;

      setUser(userData);
      setMessage(responseMessage);
      setStatus(responseStatus);

      await storeUserData(userData, token);
      return {
        success: true,
        message: responseMessage,
        status: responseStatus,
      };
    } catch (error) {
      console.error("Editing error:", error);
      setError(true);
      setMessage(error.message || "An error occurred during editing");
      return {
        success: false,
        message: error.message || "An error occurred during editing",
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      setToken(null);
      setIsAuthenticated(false);

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
    isAuthenticated,
    loading,
    appStart,
    error,
    message,
    status,
    getMyProfile,
    login,
    register,
    editProfile,
    logout,
    role,
    isAdmin,
    isUser,
    isShopOwner,
    loadUserData,
    serverAwake,
    checkServerConnection,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
