export const API_URL = import.meta.env.VITE_API_URL;

export const ORDERS_PATH = {
    POST_ORDER: `${API_URL}/api/orders`,
    UPLOAD_IMAGE: `${API_URL}/api/upload/image`,
  };


export const AUTH_PATH = {
    LOGIN: `${API_URL}/api/login`,
    LOGOUT: `${API_URL}/api/logout`,
  };
