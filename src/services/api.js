import Axios from "axios";

const api = Axios.create({
  baseURL: "https://nodered.brenopereira.com.br/api",
});

api.interceptors.request.use(
  async (config) => {
    config.headers = {
      ...config.headers,
      "Content-Type": "application/j1son",
      Accept: "application/json",
    };
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;