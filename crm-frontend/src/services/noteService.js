import axiosInstance from '../api/axiosInstance';
import { API_ENDPOINTS } from '../utils/constants';

export const noteService = {
  addNote: async (leadId, content, createdBy) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.NOTES.ADD(leadId),
      { content, createdBy }
    );
    const notes = response.data?.data?.notes || [];
    return {
      note: notes[notes.length - 1] || null,
      notes,
    };
  },

  getNotes: async (leadId) => {
    // Backend exposes notes inside lead payload; use lead details endpoint for notes list.
    const response = await axiosInstance.get(API_ENDPOINTS.LEADS.GET(leadId));
    return {
      notes: response.data?.data?.notes || [],
    };
  },
};
