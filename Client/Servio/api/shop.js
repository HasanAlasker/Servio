import { apiClient } from "./client";

const endpoint = "/shops";

export const getVerifiedShops = () => apiClient.get(`${endpoint}/verified`);

export const getUnVerifiedShops = () =>
  apiClient.get(`${endpoint}/un-verified`);

export const getMyShop = () => apiClient.get(`${endpoint}/mine`);

export const getShopById = (id) => apiClient.get(`${endpoint}/${id}`);

export const openShop = (data) => apiClient.post(`${endpoint}/openShop`, data);

export const editShop = (id, data) =>
  apiClient.patch(`${endpoint}/edit/${id}`, data);

export const deleteShop = (id) => apiClient.patch(`${endpoint}/edit/${id}`);

export const verifyShop = (id) => apiClient.patch(`${endpoint}/verify/${id}`);
