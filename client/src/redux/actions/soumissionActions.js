// src/actions/soumissionActions.js

import axios from 'axios';

// Create an instance of Axios with a custom baseURL
const axiosInstance = axios.create({
  baseURL: process.env.BACKEND_URL, // Replace 'yourPort' with the actual port number
});

export const FETCH_SOUSSIONS = 'FETCH_SOUSSIONS';
export const ADD_SOUSSION = 'ADD_SOUSSION';
export const UPDATE_SOUSSION = 'UPDATE_SOUSSION';
export const DELETE_SOUSSION = 'DELETE_SOUSSION';

export const fetchSoumissions = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get('/soumissions');
    dispatch({ type: FETCH_SOUSSIONS, payload: response.data });
  } catch (error) {
    console.error('Error fetching soumissions:', error);
  }
};

export const addSoumission = (soumissionData) => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/soumissions', soumissionData);
    dispatch({ type: ADD_SOUSSION, payload: response.data });
  } catch (error) {
    console.error('Error adding soumission:', error);
  }
};

export const updateSoumission = (soumissionId, updateData) => async (dispatch) => {
  try {
    const response = await axiosInstance.put(`/soumissions/${soumissionId}`, updateData);
    dispatch({ type: UPDATE_SOUSSION, payload: response.data });
  } catch (error) {
    console.error('Error updating soumission:', error);
  }
};

export const deleteSoumission = (soumissionId) => async (dispatch) => {
  try {
    await axiosInstance.delete(`/soumissions/${soumissionId}`);
    dispatch({ type: DELETE_SOUSSION, payload: soumissionId });
  } catch (error) {
    console.error('Error deleting soumission:', error);
  }
};
