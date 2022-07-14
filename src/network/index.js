import axios from "axios";

const service = axios.create({
  timeout: 50000,
});

service.interceptors.request.use((config) => {
  return config;
});
service.interceptors.response.use((res) => {
  return res.data;
});

export default service;
