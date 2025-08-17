// src/api/eventApi.js
import axios from "axios";

const BASE_URL = "http://localhost:8080/api/event";

export const createEvent = async (event, token, userId) => {
  return axios.post(`${BASE_URL}/create?userId=${userId}`, event, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getAllEvents = async (token) => {
  return axios.get(`${BASE_URL}/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getEventsByUser = async (userId, token) => {
  return axios.get(`${BASE_URL}/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getEventById = async (id, token) => {
  return axios.get(`${BASE_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
