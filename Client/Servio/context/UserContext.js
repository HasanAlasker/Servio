import { useContext, createContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import useApi from "../hooks/useApi";
import { getMe } from "../api/user";

export const UserContext = createContext();

export const UseUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("UseUser must be used within a provider");
  }
  return context;
};

export const UserProvider = () => {
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

  const getMine = async () => {};

  const login = async () => {};

  const register = async () => {};

  const logout = async () => {};

  const role = user?.role;
  const isAdmin = user?.role === "admin";
  const isUser = user?.role === "user";
  const isShopOwner = user?.role === "shopOwner";

  const value = {
    getMe,
    login,
    register,
    logout,
    role,
    isAdmin,
    isUser,
    isShopOwner,
  };

  return <UserContext.Provider value={value}>{childern}</UserContext.Provider>;
};
