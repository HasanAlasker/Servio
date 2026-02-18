import { useContext, createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CarContext = createContext();

export const UseCar = () => {
  const context = useContext(CarContext);
  if (!context) {
    throw new Error("UseCar must be used within a provider");
  }
  return context;
};

export const CarProvider = ({ children }) => {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const STORAGE_KEYS = {
    CARS: "@servio_cars",
  };

  // load cars

  // add car

  // edit car

  // delete car

  const value = {};

  return <CarContext.Provider value={value}>{children}</CarContext.Provider>;
};
