import axios from "axios";

const API_URL = "http://localhost:3000/api/ai";

export const chatWithTutor = async (payload) => {
  return axios.post(`${API_URL}/tutor`, payload);
};
