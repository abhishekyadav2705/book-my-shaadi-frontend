import axios from "axios";
const BASE_URL = "http://localhost:8080/api/booking";

export const createBooking = async (eventId, vendorId, service, token) => {
  return axios.post(
    `${BASE_URL}/create?eventId=${eventId}&vendorId=${vendorId}&service=${service}`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const getBookingsByEvent = async (eventId, token) => {
  return axios.get(`${BASE_URL}/event/${eventId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getBookingsByVendor = async (vendorId, token) => {
  return axios.get(`${BASE_URL}/vendor/${vendorId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
