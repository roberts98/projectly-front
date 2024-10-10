import axios from "axios";

export const baseAxios = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_URL,
});
