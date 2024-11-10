export const API_URL = import.meta.env.VITE_API_URL;
export const MODEL_URL = import.meta.env.VITE_MODEL_URL;

export const ORDERS_PATH = {
    INDEX: `${API_URL}/api/orders`,
    POST_ORDER: `${API_URL}/api/orders`,
    UPLOAD_IMAGE: `${API_URL}/api/upload/image`,
  };

export const AUTH_PATH = {
    LOGIN: `${API_URL}/api/auth/login`,
    LOGOUT: `${API_URL}/api/logout`,
  };

export const MODEL_PATH = {
  HEALTH : `${MODEL_URL}/api/v1/health`,
  PREDICT : `${MODEL_URL}/api/v1/predict`,
}
