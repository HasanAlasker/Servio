import { apiClient } from "./client";

const endpoint = "/upcomingServices";

export const getUpcomingServices = () => apiClient.get(`${endpoint}/`);
