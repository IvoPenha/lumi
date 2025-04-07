import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
}); 
 
api.interceptors.response.use(
  response => {
    return response;
  },
  axiosError => {
    const error = axiosError?.response?.data || {};
    return Promise.resolve({ ...error, success: false, message: error.message || 'unknown_error' });
  }
);
