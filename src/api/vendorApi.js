import axios from "axios";
const BASE_URL = "http://localhost:8080/api/vendor"; // singular to match backend

export const getVendors = async (token) => {
  return axios.get(`${BASE_URL}/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getVendorById = async (id, token) => {
  return axios.get(`${BASE_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
