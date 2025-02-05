// src/store/registerSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: {
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    mobileNumber: '',
    address: '',
    country: '',
    state: '',
    city: '',
    zipCode: '',
    companyAddress: '',
    companyName: '',
    gstNumber: '',
  },
  error: null,
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetError: (state) => {
      state.error = null;
    },
  },
});

export const { updateFormData, setError, resetError } = registerSlice.actions;

export default registerSlice.reducer;
