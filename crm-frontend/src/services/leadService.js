import axiosInstance from '../api/axiosInstance';
import { API_ENDPOINTS } from '../utils/constants';

export const leadService = {
  getAllLeads: async (params = {}) => {
    const response = await axiosInstance.get(API_ENDPOINTS.LEADS.LIST, { params });
    return response.data;
  },

  getLeadById: async (id) => {
    const response = await axiosInstance.get(API_ENDPOINTS.LEADS.GET(id));
    return response.data;
  },

  createLead: async (leadData) => {
    const response = await axiosInstance.post(API_ENDPOINTS.LEADS.CREATE, leadData);
    return response.data;
  },

  updateLead: async (id, leadData) => {
    const response = await axiosInstance.put(
      API_ENDPOINTS.LEADS.UPDATE(id),
      leadData
    );
    return response.data;
  },

  deleteLead: async (id) => {
    const response = await axiosInstance.delete(API_ENDPOINTS.LEADS.DELETE(id));
    return response.data;
  },
};
