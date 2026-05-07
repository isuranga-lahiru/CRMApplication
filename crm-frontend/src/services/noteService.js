import axiosInstance from '../api/axiosInstance';
import { API_ENDPOINTS } from '../utils/constants';

export const noteService = {
  addNote: async (leadId, content, createdBy) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.NOTES.ADD(leadId),
      { content, createdBy }
    );
    return response.data;
  },

  getNotes: async (leadId) => {
    const response = await axiosInstance.get(API_ENDPOINTS.NOTES.LIST(leadId));
    return response.data;
  },
};
