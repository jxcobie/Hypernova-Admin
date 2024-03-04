import axios from 'axios';

// Create an instance of Axios with a custom baseURL
const axiosInstance = axios.create({
  baseURL: process.env.BACKEND_URL, // Replace 'yourPort' with the actual port number
});

// Action Types
export const FETCH_INVOICES = 'FETCH_INVOICES';
export const ADD_INVOICE = 'ADD_INVOICE';
export const UPDATE_INVOICE = 'UPDATE_INVOICE';
export const DELETE_INVOICE = 'DELETE_INVOICE';

// Action Creators
export const fetchInvoices = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get('/invoices');
    dispatch({ type: FETCH_INVOICES, payload: response.data });
  } catch (error) {
    console.error('Error fetching invoices:', error);
  }
};

export const addInvoice = (invoiceData) => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/invoices', invoiceData);
    dispatch({ type: ADD_INVOICE, payload: response.data });
  } catch (error) {
    console.error('Error adding invoice:', error);
  }
};

export const updateInvoice = (invoiceId, updateData) => async (dispatch) => {
  try {
    const response = await axiosInstance.put(`/invoices/${invoiceId}`, updateData);
    dispatch({ type: UPDATE_INVOICE, payload: response.data });
  } catch (error) {
    console.error('Error updating invoice:', error);
  }
};

export const deleteInvoice = (invoiceId) => async (dispatch) => {
  try {
    await axiosInstance.delete(`/invoices/${invoiceId}`);
    dispatch({ type: DELETE_INVOICE, payload: invoiceId });
  } catch (error) {
    console.error('Error deleting invoice:', error);
  }
};
