// frontend/src/utils/api.js
import axios from 'axios';
import { BACKEND_URI } from '../config';

const api = axios.create({
  baseURL: `${BACKEND_URI}/api`,
});

export default api;
