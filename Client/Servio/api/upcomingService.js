import { apiClient } from "./client";

const endpoint = "/upcomingServices";

export const getUpcomingServices = () => apiClient.get(`${endpoint}/`);

export const isServerAwake = () => apiClient.get(`${endpoint}/wake-up`)