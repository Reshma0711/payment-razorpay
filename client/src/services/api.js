import axios from 'axios';

const API_URL = 'http://localhost:5555';

// Create a new order
export const createOrder = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/create-order`, data);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};



// Verify and capture payment
export const verifyPayment = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/verify-capture`, data);
    return response.data;
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
};


