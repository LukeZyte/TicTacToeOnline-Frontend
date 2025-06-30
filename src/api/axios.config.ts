import axios from 'axios';
import { SessionStorageEnum } from '../utils/enums/session-storage.enum';

const axiosInstance = axios.create({
  baseURL: 'https://localhost:7117/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem(SessionStorageEnum.Token);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;