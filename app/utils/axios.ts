import Axios, { AxiosInstance } from 'axios';
import { API_BASE_URL, sessionStorageName } from '@/config';

const axiosInstance: AxiosInstance = Axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000
});

const axios = (url?: string, jwtToken?: string) => {
  if (jwtToken) {
    axiosInstance.defaults.headers.Authorization = jwtToken;
  }
  if (url) {
    axiosInstance.defaults.baseURL = `${API_BASE_URL}${url}`;
  }

  return axiosInstance;
};

axiosInstance.interceptors.request.use(
  (config: any) => {
    let storedSession;
    if (typeof window !== 'undefined') {
      storedSession = sessionStorage.getItem(sessionStorageName);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const AxiosObject = axiosInstance;

export default axios;
