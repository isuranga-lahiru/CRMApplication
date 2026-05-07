import axiosInstance from '../api/axiosInstance';
import { API_ENDPOINTS } from '../utils/constants';

export const dashboardService = {
  getStats: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.DASHBOARD.STATS);
    return response.data;
  },
};
