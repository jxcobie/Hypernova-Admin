// src/actions/inspectionActions.js

import axios from 'axios';

// Create an instance of Axios with a custom baseURL
const axiosInstance = axios.create({
  baseURL: process.env.BACKEND_URL, // Replace 'yourPort' with the actual port number
});

export const FETCH_INSPECTIONS = 'FETCH_INSPECTIONS';
export const ADD_INSPECTION = 'ADD_INSPECTION';
export const UPDATE_INSPECTION = 'UPDATE_INSPECTION';
export const DELETE_INSPECTION = 'DELETE_INSPECTION';

export const fetchInspections = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get('/inspections');
    dispatch({ type: FETCH_INSPECTIONS, payload: response.data });
  } catch (error) {
    console.error('Error fetching inspections:', error);
    console.log('houni l mochkla')
  }
};

export const addInspection = (inspectionData) => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/inspections', inspectionData);
    dispatch({ type: ADD_INSPECTION, payload: response.data });
  } catch (error) {
    console.error('Error adding inspection:', error);
  }
};

export const updateInspection = (inspectionId, updateData) => async (dispatch) => {
  try {
    const response = await axiosInstance.put(`/inspections/${inspectionId}`, updateData);
    dispatch({ type: UPDATE_INSPECTION, payload: response.data });
  } catch (error) {
    console.error('Error updating inspection:', error);
  }
};

export const deleteInspection = (inspectionId) => async (dispatch) => {
  try {
    await axiosInstance.delete(`/inspections/${inspectionId}`);
    dispatch({ type: DELETE_INSPECTION, payload: inspectionId });
  } catch (error) {
    console.error('Error deleting inspection:', error);
  }
};
