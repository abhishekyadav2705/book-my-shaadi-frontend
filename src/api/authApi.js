import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

export const login = (data) => axios.post(`${API_URL}/login`, data);
export const signup = (data) => axios.post(`${API_URL}/register`, data);
export const fetchMe = (token) =>
  axios.get(`${API_URL}/me`, { headers: { Authorization: `Bearer ${token}` } });
