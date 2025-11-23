import axios from "axios";

export const caxios = axios.create({
  baseURL: `http://192.168.0.3/`
});

//모든 일반 api 호출
caxios.interceptors.request.use((config) => {
  if (!config.headers["Authorization"]) {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  }
  return config;
});