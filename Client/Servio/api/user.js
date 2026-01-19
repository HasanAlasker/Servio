import { apiClient } from "./client";

const endpoint = "/users";

export const getAllUsers = () => apiClient.get(`${endpoint}/all`);

export const getDeleted = () => apiClient.get(`${endpoint}/deleted`);

export const getMe = () => apiClient.get(`${endpoint}/me`);

export const getById = (id) => apiClient.get(`${endpoint}/${id}`);

export const register = (data) => apiClient.post(`${endpoint}/register`, data);

export const login = (data) => apiClient.post(`${endpoint}/login`, data);

export const editUser = (id, data) =>
  apiClient.patch(`${endpoint}/edit/${id}`, data);

export const deleteUser = (id) =>
  apiClient.patch(`${endpoint}/delete/${id}`);

export const undeleteUser = (id) =>
  apiClient.patch(`${endpoint}/un-delete/${id}`);

// export const addPushToken = (token, platform) =>
//   apiClient.post(`${endpoint}/push-token`, { token, platform });

// export const removePushToken = (token) =>
//   apiClient.delete(`${endpoint}/push-token/${token}`);