import axios from 'axios';
import { BACKEND_URI } from './config';

export const searchFlights = async (searchParams) => {
  try {
    const response = await axios.post(`${BACKEND_URI}/api/flights/search`, searchParams);
    return response.data;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};
