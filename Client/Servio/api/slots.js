import { apiClient } from "./client";

const endPoint = "/slots";

export const getBusySlots = (id, data) =>
  apiClient.post(`${endPoint}/bush/${id}`, data);

export const checkSlot = (id, data) =>
  apiClient.post(`${endPoint}/checkSlot/${id}`, data);
