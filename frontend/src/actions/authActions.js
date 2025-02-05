// src/actions/authActions.js

// Action creator for handling successful login
// It takes accessToken and refreshToken as parameters and returns an action with type 'LOGIN_SUCCESS'
export const loginSuccess = (accessToken, refreshToken) => ({
  type: 'LOGIN_SUCCESS',  // Action type indicating login success
  payload: { accessToken, refreshToken },  // Payload containing the tokens to be stored in the state
});

// Action creator for handling failed login
// It takes an error message as a parameter and returns an action with type 'LOGIN_FAILURE'
export const loginFailure = (error) => ({
  type: 'LOGIN_FAILURE',  // Action type indicating login failure
  payload: error,  // Payload containing the error message to be stored in the state
});
