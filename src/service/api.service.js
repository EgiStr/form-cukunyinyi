import axios from 'axios';
import { ORDERS_PATH } from '../constant/apiPath';

export const API_URL = import.meta.env.VITE_API_URL;

export const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await axios.post(ORDERS_PATH.UPLOAD_IMAGE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.data && response.data.data && response.data.data.path) {
      return response.data.data.path;
    } else {
      console.error('Unexpected server response:', response.data);
      throw new Error('Format response server tidak sesuai');
    }
  } catch (error) {
    console.error('Error detail:', error.response || error);
    throw new Error(
      error.response?.data?.message ||
      error.message ||
      'Terjadi kesalahan saat mengupload gambar'
    );
  }
};

export const postOrder = async (orderData) => {
  try {
    const response = await axios.post(ORDERS_PATH.POST_ORDER, orderData);
    return response.data;
  } catch (error) {
    console.error('Error submitting order:', error);
    throw new Error(error.response?.data?.message || error.message);
  }
};


