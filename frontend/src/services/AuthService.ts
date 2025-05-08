import axios from "axios";

const API_URL = "http://localhost:3000/auth"; // adjust if your backend URL/port is different

export const register = (name: string, email: string, password: string) => {
  return axios.post(`${API_URL}/register`, { name, email, password });
};

export const login = (email: string, password: string) => {
  return axios.post(`${API_URL}/login`, { email, password });
};
