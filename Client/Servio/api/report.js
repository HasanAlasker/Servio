import { apiClient } from "./client";

const endpoint = "/reports";

export const getOpenReports = () => apiClient.get(`${endpoint}/open`);

export const makeReport = (data) => apiClient.post(`${endpoint}/create`, data);

export const closeReport = (id) => apiClient.patch(`${endpoint}/close/${id}`);
