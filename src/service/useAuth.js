import Cookies from 'js-cookie';
import axios from 'axios';

export const API_URL = import.meta.env.VITE_API_URL;

const ApiLogin = axios.create({
    baseURL: API_URL,
  });
  
  ApiLogin.interceptors.request.use(
    (config) => {
      const token = Cookies.get('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  
  export default ApiLogin;