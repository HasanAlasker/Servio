import { apiClient } from "./client";

const endPoint = "/slots";

export const getBusySlots = (id, date) =>
  apiClient.get(`${endPoint}/busy/${id}?date=${date}`);

export const checkSlot = (id, data) =>
  apiClient.post(`${endPoint}/checkSlot/${id}`, data);
