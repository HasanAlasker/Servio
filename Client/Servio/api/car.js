import { apiClient } from "./client";

const endpoint = "/cars";

export const getAllCars = () => apiClient.get(`${endpoint}/all`);

export const getMakeAndModels = () => apiClient.get(`${endpoint}/car-makes`);

export const getMyCars = () => apiClient.get(`${endpoint}/mine`);

export const getCarById = (id) => apiClient.get(`${endpoint}/${id}`);

export const addCar = (data) =>
  apiClient.post(`${endpoint}/add`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const editCar = (id, data) =>
  apiClient.patch(`${endpoint}/edit/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateMileage = (id, data) =>
  apiClient.patch(`${endpoint}/mileage/${id}`, data);

export const deleteCar = (id) => apiClient.patch(`${endpoint}/delete/${id}`);
