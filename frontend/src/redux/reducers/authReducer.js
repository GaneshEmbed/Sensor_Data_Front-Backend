// src/reducers/authReducer.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: null,
  refreshToken: null,
  error: null,
  registrationStatus: null, // Track registration status
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Login Actions
    loginSuccess: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.error = null;
    },

    // Registration Actions
    registrationSuccess: (state) => {
      state.registrationStatus = 'success';
      state.error = null;
    },
    registrationFailure: (state, action) => {
      state.registrationStatus = 'failed';
      state.error = action.payload;
    },
    resetRegistrationStatus: (state) => {
      state.registrationStatus = null;
    },
  },
});

export const {
  loginSuccess,
  loginFailure,
  logout,
  registrationSuccess,
  registrationFailure,
  resetRegistrationStatus,
} = authSlice.actions;

export default authSlice.reducer;
