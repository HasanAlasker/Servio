import { apiClient } from "./client";

const endpoint = "/appointments";

export const getAllAppointments = () => apiClient.get(`${endpoint}/all`);

export const getPastAppointments = () => apiClient.get(`${endpoint}/past`);

export const getUpcomingAppointments = () =>
  apiClient.get(`${endpoint}/upcoming`);

export const getConfirmedAppointments = (id) =>
  apiClient.get(`${endpoint}/confirmed/${id}`);

export const getPendingAppointments = (id) =>
  apiClient.get(`${endpoint}/pending/${id}`);

export const getCompletedAppointments = (id) =>
  apiClient.get(`${endpoint}/completed/${id}`);

export const bookAppointment = (data) =>
  apiClient.post(`${endpoint}/book`, data);

export const confirmAppointment = (id, data) =>
  apiClient.patch(`${endpoint}/confirm/${id}`, data);

export const rejectAppointment = (id, data) =>
  apiClient.patch(`${endpoint}/reject/${id}`, data);

export const markAppointmentCompleted = (id, data) =>
  apiClient.patch(`${endpoint}/mark-completed/${id}`, data);

export const markAppointmentNoShow = (id, data) =>
  apiClient.patch(`${endpoint}/no-show/${id}`, data);

export const cancelAppointment = (id, data) =>
  apiClient.patch(`${endpoint}/cancel/${id}`, data);
